#!/usr/bin/env bash
# pinterest-to-sprites.sh — download a Pinterest video and slice it into PNG
# frames ready to feed into Bouncer / Universal-LPC sheet builders.
#
# Usage:
#   scripts/pinterest-to-sprites.sh <pinterest-url> [outdir] [fps] [maxwidth]
#
# Examples:
#   scripts/pinterest-to-sprites.sh https://pinterest.com/pin/12345/
#   scripts/pinterest-to-sprites.sh URL out/punch 12
#   scripts/pinterest-to-sprites.sh URL out/punch 24 256
#
# Defaults: outdir=tmp/pinterest/<id>, fps=12, maxwidth=keep
#
# Output:
#   <outdir>/source.mp4         — the downloaded video (kept for reference)
#   <outdir>/frame_001.png …    — extracted frames, transparent BG NOT removed
#                                 (use Bouncer's 🧹 Xoá nền or remove.bg later)
#   <outdir>/sheet.png          — horizontal sprite-sheet (all frames in one row)
#
# Notes:
# - Requires yt-dlp + ffmpeg (auto-checked).
# - Pinterest GIFs / image carousels won't work — must be a real video pin.
# - For LPC-style 64×64 frames, pass maxwidth=64 and crop in Bouncer after.

set -euo pipefail

URL="${1:-}"
OUT="${2:-}"
FPS="${3:-12}"
MAXW="${4:-}"

if [[ -z "$URL" ]]; then
  cat <<EOF >&2
Usage: $0 <pinterest-url> [outdir] [fps=12] [maxwidth]
Example: $0 https://www.pinterest.com/pin/12345/ tmp/punch 12 256
EOF
  exit 1
fi

for cmd in yt-dlp ffmpeg; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ $cmd chưa cài. Chạy: brew install $cmd" >&2
    exit 1
  fi
done

# Default outdir = tmp/pinterest/<pin-id>
if [[ -z "$OUT" ]]; then
  PIN_ID=$(echo "$URL" | grep -oE '[0-9]{8,}' | head -1)
  OUT="tmp/pinterest/${PIN_ID:-$(date +%s)}"
fi
mkdir -p "$OUT"

echo "📥 Downloading: $URL → $OUT/source.mp4"
yt-dlp -q --no-warnings -o "$OUT/source.%(ext)s" -f 'bv*+ba/b' --merge-output-format mp4 "$URL"

# yt-dlp may write source.webm or source.mkv; rename to .mp4 if needed for clarity
SRC=$(ls "$OUT"/source.* 2>/dev/null | head -1)
if [[ -z "$SRC" ]]; then echo "❌ Tải thất bại." >&2; exit 1; fi
echo "✅ Tải xong: $SRC"

# Build the ffmpeg vf filter chain
VF="fps=$FPS"
if [[ -n "$MAXW" ]]; then
  VF="$VF,scale=$MAXW:-1:flags=neighbor"   # nearest-neighbor for pixel-art feel
fi

echo "🎞  Extracting frames @${FPS}fps${MAXW:+ scaled to ${MAXW}px wide}…"
ffmpeg -y -loglevel error -i "$SRC" -vf "$VF" "$OUT/frame_%03d.png"

FRAMES=$(ls "$OUT"/frame_*.png | wc -l | tr -d ' ')
echo "✅ Extracted $FRAMES frames → $OUT/frame_*.png"

# Build a horizontal sprite-sheet (single row × N cols)
echo "🧵 Building sprite-sheet…"
ffmpeg -y -loglevel error -framerate "$FPS" -i "$OUT/frame_%03d.png" \
  -vf "tile=${FRAMES}x1" -frames:v 1 "$OUT/sheet.png"
echo "✅ Sheet: $OUT/sheet.png ($FRAMES frames in a row)"

cat <<EOF

──────────────────────────────────────────────────────────────
Done.  Open in Bouncer:
  • Single frame:   $OUT/frame_001.png  → upload as Body / Weapon
  • Full sheet:     $OUT/sheet.png      → upload as 🖼️ FX sprite,
                    set Cols=$FRAMES, Rows=1 in the FX panel.
Tip: Right-click → 🧹 Xoá nền in Bouncer to drop the background.
──────────────────────────────────────────────────────────────
EOF
