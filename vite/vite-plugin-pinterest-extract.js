// Dev-only Vite plugin — accepts POST /api/pinterest-extract with
// { url, fps?, maxwidth? } JSON body, runs yt-dlp + ffmpeg locally, and
// streams back a horizontal sprite-sheet PNG. Response headers:
//   Content-Type: image/png
//   X-Pinterest-Frames: <N>          — frame count in the sheet (cols)
//   X-Pinterest-Source: <source url> — echoed for debugging
//
// SECURITY:
// - Only listens on the local dev server (vite's own port). NOT bundled
//   into production; closeBundle is a no-op.
// - URL must match /^https?:\/\/(www\.)?pinterest\.[a-z.]+\// — rejects
//   shell-injection vectors before passing to yt-dlp.
// - fps clamped to [1, 60]; maxwidth clamped to [16, 4096].
// - Output goes to a fresh mktemp dir; cleaned up after response sent.
//
// REQUIRES on PATH: yt-dlp, ffmpeg. Plugin returns 500 with a hint if
// either is missing.

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, statSync, createReadStream } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_RE = /^https?:\/\/(www\.|[a-z]{2}\.)?pinterest\.[a-z.]+\/.+/i;

function which(cmd) {
  return new Promise((resolve) => {
    const p = spawn("which", [cmd]);
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.on("close", (code) => resolve(code === 0 ? out.trim() : null));
  });
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { ...opts });
    let stderr = "";
    p.stderr.on("data", (d) => (stderr += d.toString()));
    p.on("error", reject);
    p.on("close", (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(`${cmd} exited ${code}: ${stderr.slice(0, 500)}`));
    });
  });
}

async function readJsonBody(req, maxBytes = 4096) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on("data", (c) => {
      total += c.length;
      if (total > maxBytes) { reject(new Error("Body too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

export function vitePluginPinterestExtract({ extraPath = [] } = {}) {
  return {
    name: "serve-pinterest-extract",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/pinterest-extract", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405; res.end("POST only"); return;
        }
        const env = { ...process.env };
        if (extraPath.length) env.PATH = `${extraPath.join(":")}:${env.PATH}`;
        let tmp;
        try {
          const body = await readJsonBody(req);
          const url = String(body.url || "").trim();
          if (!URL_RE.test(url)) {
            res.statusCode = 400; res.end("Invalid Pinterest URL"); return;
          }
          const fps = Math.min(60, Math.max(1, Number(body.fps) || 12));
          const maxwidth = body.maxwidth ? Math.min(4096, Math.max(16, Number(body.maxwidth) || 0)) : 0;

          // Tool presence check — give a clear error before launching anything
          const ytdlp = (await which("yt-dlp")) || (extraPath.length && (await whichIn(extraPath, "yt-dlp")));
          const ffmpeg = (await which("ffmpeg")) || (extraPath.length && (await whichIn(extraPath, "ffmpeg")));
          if (!ytdlp || !ffmpeg) {
            res.statusCode = 500;
            res.end(`Missing tool(s): ${[!ytdlp && "yt-dlp", !ffmpeg && "ffmpeg"].filter(Boolean).join(", ")}. Install via brew or place binaries in ~/.local/bin.`);
            return;
          }

          tmp = mkdtempSync(join(tmpdir(), "pinterest-extract-"));
          // 1. yt-dlp → tmp/source.<ext>
          await run(ytdlp, [
            "-q", "--no-warnings",
            "-f", "bv*+ba/b",
            "--merge-output-format", "mp4",
            "-o", join(tmp, "source.%(ext)s"),
            url,
          ], { env });

          // Find downloaded source
          const fs = await import("node:fs/promises");
          const files = await fs.readdir(tmp);
          const src = files.find((f) => f.startsWith("source."));
          if (!src) throw new Error("yt-dlp produced no output");
          const srcPath = join(tmp, src);

          // 2. ffmpeg extract frames
          let vf = `fps=${fps}`;
          if (maxwidth) vf += `,scale=${maxwidth}:-1:flags=neighbor`;
          await run(ffmpeg, [
            "-y", "-loglevel", "error",
            "-i", srcPath,
            "-vf", vf,
            join(tmp, "frame_%03d.png"),
          ], { env });

          // 3. Count + tile into sheet
          const frameFiles = (await fs.readdir(tmp))
            .filter((f) => /^frame_\d+\.png$/.test(f))
            .sort();
          if (!frameFiles.length) throw new Error("ffmpeg produced no frames");
          const sheetPath = join(tmp, "sheet.png");
          await run(ffmpeg, [
            "-y", "-loglevel", "error",
            "-framerate", String(fps),
            "-i", join(tmp, "frame_%03d.png"),
            "-vf", `tile=${frameFiles.length}x1`,
            "-frames:v", "1",
            sheetPath,
          ], { env });

          // 4. Stream back
          const sz = statSync(sheetPath).size;
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Content-Length", String(sz));
          res.setHeader("X-Pinterest-Frames", String(frameFiles.length));
          res.setHeader("X-Pinterest-Source", url);
          res.setHeader("Cache-Control", "no-store");
          createReadStream(sheetPath).pipe(res).on("close", () => {
            if (tmp) rmSync(tmp, { recursive: true, force: true });
          });
        } catch (e) {
          if (tmp) rmSync(tmp, { recursive: true, force: true });
          res.statusCode = 500;
          res.end(String(e?.message || e));
        }
      });
    },
  };
}

async function whichIn(paths, cmd) {
  const fs = await import("node:fs/promises");
  for (const p of paths) {
    const candidate = join(p, cmd);
    try { await fs.access(candidate); return candidate; } catch {}
  }
  return null;
}
