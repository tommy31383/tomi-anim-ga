// Dev-only Vite plugin — accepts POST /api/pinterest-extract with
// { url, fps?, maxwidth? } JSON body, runs yt-dlp + ffmpeg locally, and
// streams back a horizontal sprite-sheet PNG. Response headers:
//   Content-Type: image/png
//   X-Pinterest-Frames: <N>          — frame count (cols) in the sheet
//   X-Pinterest-Fps:    <fps used>
//   X-Pinterest-Source: <source url>
//
// SECURITY:
// - Only mounts under apply:"serve". Production builds are untouched.
// - URL must match a strict pinterest.{com|de|fr|jp|co.uk|...} regex
//   before being passed to yt-dlp.
// - fps clamped to [1, 60]; maxwidth clamped to [16, 4096]; body ≤ 4KB.
// - --max-filesize 200M caps yt-dlp downloads.
// - 90s wall-clock timeout per child process; killed via SIGKILL after.
// - Output goes to a fresh mktemp dir; cleaned up in finally.
//
// Performance:
// - Binary paths resolved ONCE at plugin init (cached for life of dev server).
// - ffprobe → duration → N = round(d*fps); then ONE ffmpeg call does
//   `fps,scale,tile=Nx1` straight to sheet.png. Saves the per-frame PNG
//   intermediate write/read pass (50% I/O on long clips).

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, statSync, createReadStream, accessSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Whitelist Pinterest TLDs: .com, .ca, .co.uk, .com.au, .de, .fr, .jp, etc.
// Subdomain is restricted to www. or 2-letter locale (e.g. "vn.", "uk.")
// Prevents pinterest.evil.com type spoofs.
const URL_RE = /^https?:\/\/(?:www\.|[a-z]{2}\.)?pinterest\.(?:com|ca|co\.uk|com\.au|de|fr|es|it|nl|jp|kr|ph|nz|ie|at|ch|se|dk|no|fi|pt|com\.mx|cl|info)\/[^\s]+$/i;

const PROC_TIMEOUT_MS = 90_000;
const MAX_BODY_BYTES = 4096;
const MAX_FILESIZE = "200M";

function which(cmd, extraPath = []) {
  // Resolve absolute path WITHOUT spawning `which`. Avoids an extra child
  // process per startup and works in environments where `which` is missing.
  const dirs = [...extraPath, ...(process.env.PATH || "").split(":").filter(Boolean)];
  for (const dir of dirs) {
    const candidate = join(dir, cmd);
    try { accessSync(candidate); return candidate; } catch { /* keep looking */ }
  }
  return null;
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, opts);
    let stderr = "";
    let stdout = "";
    p.stdout?.on("data", (d) => (stdout += d.toString()));
    p.stderr?.on("data", (d) => (stderr += d.toString()));
    const timer = setTimeout(() => {
      p.kill("SIGKILL");
      reject(new Error(`${cmd} timed out after ${PROC_TIMEOUT_MS / 1000}s`));
    }, PROC_TIMEOUT_MS);
    p.on("error", (err) => { clearTimeout(timer); reject(err); });
    p.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${cmd} exited ${code}: ${(stderr || stdout).slice(0, 500)}`));
    });
  });
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on("data", (c) => {
      total += c.length;
      if (total > MAX_BODY_BYTES) { reject(new Error("Body too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

async function probeDuration(ffprobe, srcPath) {
  // ffprobe -v error -show_entries format=duration -of csv=p=0 src
  const { stdout } = await run(ffprobe, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "csv=p=0",
    srcPath,
  ]);
  const d = Number(String(stdout).trim());
  if (!Number.isFinite(d) || d <= 0) throw new Error("ffprobe could not read duration");
  return d;
}

export function vitePluginPinterestExtract({ extraPath = [] } = {}) {
  // Resolve binaries once at plugin construction; remember nulls so we can
  // give a clean error per-request instead of spawning a missing path.
  const ytdlp = which("yt-dlp", extraPath);
  const ffmpeg = which("ffmpeg", extraPath);
  // ffprobe usually ships next to ffmpeg
  const ffprobe = which("ffprobe", extraPath);

  return {
    name: "serve-pinterest-extract",
    apply: "serve",
    configureServer(server) {
      if (!ytdlp || !ffmpeg || !ffprobe) {
        server.config.logger.warn(
          `[pinterest-extract] Missing tool(s): ${[!ytdlp && "yt-dlp", !ffmpeg && "ffmpeg", !ffprobe && "ffprobe"].filter(Boolean).join(", ")} — endpoint will return 500. Install via brew or place in ~/.local/bin.`,
        );
      }

      server.middlewares.use("/api/pinterest-extract", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405; res.end("POST only"); return;
        }
        if (!ytdlp || !ffmpeg || !ffprobe) {
          res.statusCode = 500;
          res.end(`Missing tool(s) at server start: ${[!ytdlp && "yt-dlp", !ffmpeg && "ffmpeg", !ffprobe && "ffprobe"].filter(Boolean).join(", ")}.`);
          return;
        }

        let tmp;
        try {
          const body = await readJsonBody(req);
          const url = String(body.url || "").trim();
          if (!URL_RE.test(url)) {
            res.statusCode = 400; res.end("URL không hợp lệ — phải là pin Pinterest thật"); return;
          }
          const fps = Math.min(60, Math.max(1, Number(body.fps) || 12));
          const maxwidth = body.maxwidth ? Math.min(4096, Math.max(16, Number(body.maxwidth) || 0)) : 0;

          tmp = mkdtempSync(join(tmpdir(), "pinterest-extract-"));

          // 1. yt-dlp → tmp/source.<ext>  (capped at MAX_FILESIZE)
          await run(ytdlp, [
            "-q", "--no-warnings",
            "-f", "bv*+ba/b",
            "--max-filesize", MAX_FILESIZE,
            "--merge-output-format", "mp4",
            "-o", join(tmp, "source.%(ext)s"),
            url,
          ]);

          const fs = await import("node:fs/promises");
          const files = await fs.readdir(tmp);
          const srcName = files.find((f) => f.startsWith("source."));
          if (!srcName) throw new Error("yt-dlp produced no output (video > 200MB or auth required?)");
          const srcPath = join(tmp, srcName);

          // 2. ffprobe → duration → frame count
          const duration = await probeDuration(ffprobe, srcPath);
          const N = Math.max(1, Math.min(512, Math.round(duration * fps)));

          // 3. SINGLE-PASS ffmpeg: fps → scale → tile → sheet.png
          let vf = `fps=${fps}`;
          if (maxwidth) vf += `,scale=${maxwidth}:-1:flags=neighbor`;
          vf += `,tile=${N}x1`;
          const sheetPath = join(tmp, "sheet.png");
          await run(ffmpeg, [
            "-y", "-loglevel", "error",
            "-i", srcPath,
            "-vf", vf,
            "-frames:v", "1",
            sheetPath,
          ]);

          // 4. Stream back
          const sz = statSync(sheetPath).size;
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Content-Length", String(sz));
          res.setHeader("X-Pinterest-Frames", String(N));
          res.setHeader("X-Pinterest-Fps", String(fps));
          res.setHeader("X-Pinterest-Source", url);
          res.setHeader("Cache-Control", "no-store");
          const outDir = tmp;
          tmp = null; // hand ownership to the cleanup-after-stream callback
          createReadStream(sheetPath)
            .on("close", () => rmSync(outDir, { recursive: true, force: true }))
            .pipe(res);
        } catch (e) {
          res.statusCode = res.statusCode === 200 ? 500 : (res.statusCode || 500);
          if (!res.headersSent) res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(String(e?.message || e));
        } finally {
          if (tmp) rmSync(tmp, { recursive: true, force: true });
        }
      });
    },
  };
}
