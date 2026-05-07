#!/usr/bin/env bash
# pinterest-to-sprites.sh — download a Pinterest video and slice it into a
# horizontal sprite-sheet ready to feed into Bouncer.
#
# Usage:
#   scripts/pinterest-to-sprites.sh <pinterest-url> [outdir] [fps] [maxwidth] [--frames]
#
# Examples:
#   scripts/pinterest-to-sprites.sh https://pinterest.com/pin/12345/
#   scripts/pinterest-to-sprites.sh URL out/punch 12
#   scripts/pinterest-to-sprites.sh URL out/punch 24 256
#   scripts/pinterest-to-sprites.sh URL out/punch 12 256 --frames   # also keep per-frame PNGs
#
# Defaults: outdir=tmp/pinterest/<id>, fps=12, maxwidth=keep, frames=off
#
# Output:
#   <outdir>/source.mp4    — downloaded video (200MB cap)
#   <outdir>/sheet.png     — N-cols × 1-row sprite sheet
#   <outdir>/frame_*.png   — only with --frames
#
# Notes:
# - Single-pass ffmpeg: fps → scale → tile → sheet.png (was 2-pass v0.13.6).
# - Pinterest GIFs / image carousels won't work — must be a real video pin.

set -euo pipefail

URL="${1:-}"
OUT="${2:-}"
FPS="${3:-12}"
MAXW="${4:-}"
KEEP_FRAMES=0
for arg in "$@"; do
  [[ "$arg" == "--frames" ]] && KEEP_FRAMES=1
done

if [[ -z "$URL" ]]; then
  cat <<EOF >&2
Usage: $0 <pinterest-url> [outdir] [fps=12] [maxwidth] [--frames]
Example: $0 https://www.pinterest.com/pin/12345/ tmp/punch 12 256
EOF
  exit 1
fi

for cmd in yt-dlp ffmpeg ffprobe; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ $cmd chưa cài. Chạy: brew install yt-dlp ffmpeg" >&2
    exit 1
  fi
done

if [[ -z "$OUT" ]]; then
  PIN_ID=$(echo "$URL" | grep -oE '[0-9]{8,}' | head -1)
  OUT="tmp/pinterest/${PIN_ID:-$(date +%s)}"
fi
mkdir -p "$OUT"

echo "📥 Downloading: $URL → $OUT/source.*"
yt-dlp -q --no-warnings \
  -f 'bv*+ba/b' --max-filesize 200M \
  --merge-output-format mp4 \
  -o "$OUT/source.%(ext)s" "$URL"

SRC=$(ls "$OUT"/source.* 2>/dev/null | head -1)
[[ -z "$SRC" ]] && { echo "❌ Tải thất bại (video > 200MB hoặc cần auth)" >&2; exit 1; }
echo "✅ Tải xong: $SRC"

# Probe duration → compute frame count
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
N=$(awk -v d="$DUR" -v f="$FPS" 'BEGIN { n = int(d * f + 0.5); if (n < 1) n = 1; if (n > 512) n = 512; print n }')
echo "🎞  ${DUR}s × ${FPS}fps = $N frames"

# Build vf chain: fps → optional scale → tile (single ffmpeg pass)
VF="fps=$FPS"
[[ -n "$MAXW" ]] && VF="$VF,scale=$MAXW:-1:flags=neighbor"

if (( KEEP_FRAMES )); then
  # Two-pass only when user explicitly wants individual frames
  echo "🧵 Extracting individual frames (--frames flag)…"
  ffmpeg -y -loglevel error -i "$SRC" -vf "$VF" "$OUT/frame_%03d.png"
fi

echo "🧵 Building sprite-sheet…"
ffmpeg -y -loglevel error -i "$SRC" -vf "$VF,tile=${N}x1" -frames:v 1 "$OUT/sheet.png"
echo "✅ Sheet: $OUT/sheet.png ($N frames in a row)"

cat <<EOF

──────────────────────────────────────────────────────────────
Done.  Open in Bouncer:
  • Full sheet:  $OUT/sheet.png  → 🖼️ FX sprite custom panel,
                 set Cols=$N, Rows=1.
Tip: Right-click → 🧹 Xoá nền in Bouncer to drop the background.
──────────────────────────────────────────────────────────────
EOF
