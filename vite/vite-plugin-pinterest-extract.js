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
import {
  mkdtempSync, rmSync, statSync, createReadStream, accessSync,
  mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve as resolvePath } from "node:path";

// Accept three URL shapes, all delegated to yt-dlp:
//   1. Pinterest pin URL on any pinterest.* TLD (covers .com, .com.vn,
//      .co.uk, .com.au, .ru, etc. — single OR two-part TLDs).
//   2. Pinterest short link  https://pin.it/<id>
//   3. Direct media URL ending .mp4/.webm/.mov/.m3u8 — lets the user
//      bypass Pinterest entirely by grabbing the URL from DevTools.
//
// The pinterest regex still anchors on `pinterest.` as the suffix-host
// label, so `pinterest.evil.com` (the attacker controls the rest) would
// only match if the URL host is exactly `pinterest.evil[.tld]`. yt-dlp
// itself further validates by trying to extract — junk URLs error out
// inside the child process, the user sees the message.
const PINTEREST_LONG_RE = /^https?:\/\/(?:[a-z0-9-]+\.)?pinterest\.[a-z]{2,4}(?:\.[a-z]{2,4})?\/[^\s]+$/i;
const PINTEREST_SHORT_RE = /^https?:\/\/pin\.it\/[A-Za-z0-9]+\/?$/i;
const DIRECT_MEDIA_RE = /^https?:\/\/[^\s]+\.(?:mp4|webm|mov|m4v|m3u8)(?:\?[^\s]*)?$/i;
function _validUrl(u) {
  return PINTEREST_LONG_RE.test(u) || PINTEREST_SHORT_RE.test(u) || DIRECT_MEDIA_RE.test(u);
}

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

export function vitePluginPinterestExtract({ extraPath = [], presetDir } = {}) {
  // Resolve binaries once at plugin construction; remember nulls so we can
  // give a clean error per-request instead of spawning a missing path.
  const ytdlp = which("yt-dlp", extraPath);
  const ffmpeg = which("ffmpeg", extraPath);
  // ffprobe usually ships next to ffmpeg
  const ffprobe = which("ffprobe", extraPath);
  // Where to persist extracted sheets so they show up in the FX dropdown
  // next session. Resolved against process.cwd() (repo root when run via
  // `npm run dev`). Default = bouncer/presets/pinterest.
  const persistDir = resolvePath(presetDir || "bouncer/presets/pinterest");
  const persistManifest = join(persistDir, "manifest.json");

  function _readManifest() {
    if (!existsSync(persistManifest)) return [];
    try {
      const raw = JSON.parse(readFileSync(persistManifest, "utf8"));
      return Array.isArray(raw) ? raw : [];
    } catch { return []; }
  }
  function _writeManifest(list) {
    mkdirSync(persistDir, { recursive: true });
    writeFileSync(persistManifest, JSON.stringify(list, null, 2) + "\n", "utf8");
  }
  function _pinIdFromUrl(url) {
    // Long-form Pinterest pin: prefer the numeric id (stable across queries).
    const m = url.match(/\/pin\/(\d{8,})/) || url.match(/^https?:\/\/[^\/]*pinterest[^\/]*\/[^\/?#]*\/(\d{10,})/);
    if (m) return m[1];
    // pin.it short link: take the slug.
    const sm = url.match(/^https?:\/\/pin\.it\/([A-Za-z0-9]+)/i);
    if (sm) return `pinit-${sm[1].toLowerCase()}`;
    // Direct media URL or anything else: derive a deterministic short hash so
    // cache hits work even though there's no pin number.
    let h = 0;
    for (let i = 0; i < url.length; i++) h = ((h << 5) - h + url.charCodeAt(i)) | 0;
    return `u${(h >>> 0).toString(36)}`;
  }

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
          if (!_validUrl(url)) {
            res.statusCode = 400;
            res.end("URL không hợp lệ — phải là pin Pinterest, link pin.it/, hoặc URL .mp4/.webm trực tiếp");
            return;
          }
          const fps = Math.min(60, Math.max(1, Number(body.fps) || 12));
          const maxwidth = body.maxwidth ? Math.min(4096, Math.max(16, Number(body.maxwidth) || 0)) : 0;
          const force = body.force === true; // bypass cache hit
          // Optional: read auth cookies from a logged-in browser. Default
          // 'chrome'; set to '' / null to disable.
          const cookieBrowser = body.cookieBrowser === undefined
            ? "chrome"
            : (body.cookieBrowser ? String(body.cookieBrowser).toLowerCase() : "");
          const isDirect = DIRECT_MEDIA_RE.test(url);

          // Cache hit — pin already extracted at the same fps/maxwidth. Skip
          // yt-dlp+ffmpeg entirely and stream the persisted file.
          const pinId = _pinIdFromUrl(url);
          const cacheId = `${pinId}-fps${fps}${maxwidth ? "-w" + maxwidth : ""}`;
          const cachedManifest = _readManifest();
          const cachedEntry = cachedManifest.find((e) => e.id === cacheId);
          if (!force && cachedEntry && existsSync(join(persistDir, cachedEntry.file))) {
            const filePath = join(persistDir, cachedEntry.file);
            const sz = statSync(filePath).size;
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Length", String(sz));
            res.setHeader("X-Pinterest-Frames", String(cachedEntry.cols));
            res.setHeader("X-Pinterest-Fps", String(cachedEntry.fps || fps));
            res.setHeader("X-Pinterest-Source", url);
            res.setHeader("X-Pinterest-Saved-As", cachedEntry.id);
            res.setHeader("X-Pinterest-Cache", "hit");
            res.setHeader("Cache-Control", "no-store");
            createReadStream(filePath).pipe(res);
            return;
          }

          tmp = mkdtempSync(join(tmpdir(), "pinterest-extract-"));

          // 1. Download source. For direct .mp4/.webm/.m3u8 URLs we still
          //    use yt-dlp (handles redirects + HLS segmentation). For
          //    Pinterest pins, optionally pull cookies from a browser so
          //    auth-walled videos work.
          const args = [
            "-q", "--no-warnings",
            "-f", "bv*+ba/b",
            "--max-filesize", MAX_FILESIZE,
            "--merge-output-format", "mp4",
            "-o", join(tmp, "source.%(ext)s"),
          ];
          if (cookieBrowser && !isDirect) {
            args.push("--cookies-from-browser", cookieBrowser);
          }
          args.push(url);
          await run(ytdlp, args);

          const fs = await import("node:fs/promises");
          const files = await fs.readdir(tmp);
          const srcName = files.find((f) => f.startsWith("source."));
          if (!srcName) throw new Error("yt-dlp produced no output (video > 200MB or auth required?)");
          const srcPath = join(tmp, srcName);

          // 2. ffprobe → duration → frame count. Cap N to 64 so the sheet
          //    stays manageable for sprite-sheet use (most game anims are
          //    8-16 frames). Long videos: user should lower fps or pass a
          //    slice URL.
          const duration = await probeDuration(ffprobe, srcPath);
          const N = Math.max(1, Math.min(64, Math.round(duration * fps)));

          // 3. SINGLE-PASS ffmpeg: fps → scale → tile → sheet.png
          //    Auto-cap final sheet width at 8192px (PNG safe + browser
          //    canvas safe). If user didn't pass maxwidth and N×nativeW
          //    would exceed it, fall back to maxwidth = 8192/N.
          const probeRes = await run(ffprobe, ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", srcPath]);
          const nativeW = Number(String(probeRes.stdout).trim()) || 0;
          let effectiveMaxW = maxwidth;
          const MAX_SHEET_W = 8192;
          if (nativeW * N > MAX_SHEET_W) {
            const cap = Math.max(16, Math.floor(MAX_SHEET_W / N));
            effectiveMaxW = effectiveMaxW ? Math.min(effectiveMaxW, cap) : cap;
          }
          let vf = `fps=${fps}`;
          if (effectiveMaxW) vf += `,scale=${effectiveMaxW}:-1:flags=neighbor`;
          vf += `,tile=${N}x1`;
          const sheetPath = join(tmp, "sheet.png");
          await run(ffmpeg, [
            "-y", "-loglevel", "error",
            "-i", srcPath,
            "-vf", vf,
            "-frames:v", "1",
            sheetPath,
          ]);

          // 4. Persist into bouncer/presets/pinterest/ so the sheet survives
          //    page reloads and shows up in the FX preset dropdown next time.
          mkdirSync(persistDir, { recursive: true });
          const persistFile = `${cacheId}.png`;
          copyFileSync(sheetPath, join(persistDir, persistFile));
          const newManifest = _readManifest().filter((e) => e.id !== cacheId);
          newManifest.push({
            id: cacheId,
            file: persistFile,
            label: `Pin ${pinId} · ${N}f@${fps}fps`,
            cols: N,
            rows: 1,
            fps,
            maxwidth: maxwidth || null,
            sourceUrl: url,
            addedAt: new Date().toISOString(),
          });
          _writeManifest(newManifest);

          // 5. Stream back
          const sz = statSync(sheetPath).size;
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Content-Length", String(sz));
          res.setHeader("X-Pinterest-Frames", String(N));
          res.setHeader("X-Pinterest-Fps", String(fps));
          res.setHeader("X-Pinterest-Source", url);
          res.setHeader("X-Pinterest-Saved-As", cacheId);
          res.setHeader("X-Pinterest-Cache", "miss");
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
