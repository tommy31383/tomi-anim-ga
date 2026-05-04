# 🐰 Tomi Anim Gà — Design Document

> **Tagline**: Trình tạo nhân vật pixel art LPC + bake animation cho mọi sprite, kiểu AI-era game dev (Vampire Survivors / Brotato / Archero style).

**Stack**: Mithril + Tailwind + Vite (main app) · Vanilla JS + Canvas 2D (Bouncer)
**License**: Fork của [liberatedpixelcup/Universal-LPC-Spritesheet-Character-Generator](https://github.com/liberatedpixelcup/Universal-LPC-Spritesheet-Character-Generator), giữ nguyên CC-BY-SA / GPL / OGA-BY.
**Live**: https://tommy31383.github.io/tomi-anim-ga/

---

## 📦 Hai tool trong cùng repo

### 1. `/` — Tool LPC chính (đại tu UI tiếng Việt)
Tool gốc làm character từ thư viện sprite LPC (5000+ assets, mọi layer body/head/torso/legs/arms/weapons/...). Em đã làm vỏ Tailwind tiếng Việt (`sources/components/v2/`), giữ nguyên engine LPC cũ.

### 2. `/bouncer/` — Tomi Bouncer (standalone, vibe-coding)
Single-page tool: upload **bất kỳ ảnh** (chibi cartoon, 3D render, pixel art, AI-gen) + tùy chọn vũ khí → chọn 1 trong 9 preset anim → bake PNG sheet drop thẳng vào game engine. Không cần rigging, không cần vẽ frame.

---

## 🏗 Kiến trúc

### Tool chính (`sources/`)
```
sources/
├── main.js                         # Entry, mount Mithril Shell on #app-shell
├── version.js                      # APP_VERSION constant (TopBar badge)
├── components/v2/                  # New Vietnamese UI shell
│   ├── Shell.js                    # Top-level layout
│   ├── TopBar.js                   # Brand + version + Bouncer link + Export
│   ├── AssetLibrary.js             # Left panel: search + categories + tree
│   ├── CanvasArea.js               # Center: anim pills + preview + sheet
│   ├── Inspector.js                # Right: layer list + thumbnails
│   ├── ExportModal.js              # PNG / Unity export
│   ├── ProjectsDialog.js           # Save / load project
│   └── Toast.js                    # Notifications
├── components/                     # Legacy (still in use, embedded via .legacy-host)
│   ├── tree/                       # CategoryTree, TreeNode, ItemWithRecolors, …
│   ├── filters/                    # SearchControl, AnimationFilters, …
│   └── …
├── canvas/
│   ├── renderer.js                 # 832×3456 offscreen sheet builder
│   ├── preview-animation.js        # rAF loop, frame cycling
│   ├── preview-canvas.js           # On-screen previews
│   ├── palette-recolor.js          # WebGL + CPU recolor
│   └── download.js                 # PNG export helpers
├── state/                          # state, hash, palettes, zip, projects, …
└── styles/                         # critical + deferred Bulma + custom overrides
bouncer/
└── index.html                      # Self-contained page (Tailwind CDN)
index.html                          # Main app shell, mounts #app-shell
vite.config.js                      # Builds both / and /bouncer
```

### Bouncer (`bouncer/index.html`)
Single file, tự đứng. **Không** import Mithril hay engine LPC. Tất cả Canvas 2D + vanilla JS. Build vào `dist/bouncer/index.html` qua `rolldownOptions.input.bouncer`.

---

## 🎨 Tool chính — vỏ UI v2 (Vietnamese reskin)

### TopBar
- Brand "Tomi Anim Gà" + version badge `v0.x.y`
- Project chip + Quick Save
- Undo/Redo (placeholder), Random, Reset, Share, Export
- Chip 🐰 **Bouncer** link → `./bouncer/`

### AssetLibrary (380px trái)
- Search ô input
- Filter chip "Anim"
- Tab category icon: Cơ thể / Đầu / Tóc / ... (nhấn = filter tree dưới chỉ show category đó)
- Embed legacy CategoryTree (heavily restyled qua `.legacy-host` CSS)
- ItemWithRecolors row → click swatch → mở **Palette Modal** redesigned theo Stitch (cards 180px+, ✓ badge, blurred backdrop)

### CanvasArea (flex-1 giữa)
- **Sticky Animation pills** (Niệm phép / Đâm / Đi bộ / Chém / Bắn / Trúng đòn / Tưới nước / + locked: Leo / Đứng yên / Nhảy / ... / Chém 1 tay / 128 / Oversize)
- Pill 🔒 = chưa mở khóa với selection hiện tại → click hiện banner checklist gợi ý cần thêm item gì
- Pill 🐰 **Tưng tưng** = synthetic CSS-only preset bounce 1 frame walk-south (Vampire Survivors vibe)
- Center: **Animation preview canvas** (`#previewAnimations`) + zoom slider
- Below: **Full Spritesheet preview** với Show transparency grid + Replace Mask (Pink) + zoom 0.25×–2×

### Inspector (320px phải)
- Header "Lớp đã chọn" + badge số mục
- Layer list: drag handle + **sprite thumbnail thực** (canvas, crop preview frame qua `getLayersToLoad`) + name + visibility + delete
- Tab "Lớp" / "Màu sắc"
- Sticky bottom: GENERATE SPRITE SHEET button + info bar

### Export Modal
- Tải PNG Anim đang chọn (chỉ animation hiện tại — fallback custom anim cho slash_128/oversize/etc.)
- Tải PNG (cả sheet 832×3456)
- **Unity Asset Pack** (.zip với .anim + .meta sliced)

### Engine cleanup (đã làm)
- **Decouple** từ `window.canvasRenderer` — components import `isOffscreenCanvasInitialized()` trực tiếp
- Loại bỏ dynamic imports → fix INEFFECTIVE_DYNAMIC_IMPORT warning
- A11y trên CollapsibleSection (role/tabindex/aria-expanded/keyboard)
- chunkSizeWarningLimit lên 1000

---

## 🐰 Tomi Bouncer — feature chi tiết

### 9 anim preset (cùng 1 transform fn `(t, s)` → `{tx, ty, sx, sy, rot, alpha, filter, weaponRot, weaponTx}`)

| Preset | Loop | Mô tả |
|---|---|---|
| 🐰 Hop (Tưng tưng) | ✓ | Squash & stretch + nhảy lên xuống. Vampire Survivors. |
| 🌬 Idle thở | ✓ | scaleY pulse nhẹ, "alive without moving" |
| 💥 Trúng đòn | × | Recoil punch + flash. Soul Knight |
| 💀 Chết | × | Rotate 90° + sink + fade. Brotato |
| ⚔ Đánh thường | × | Wind-up → lunge + weapon swing arc |
| ✨ Niệm phép | ✓ | Pulse + violet drop-shadow glow |
| 🎉 Chiến thắng | ✓ | Double hop + sway tilt |
| 💫 Choáng | ✓ | Jitter sway + tilt rotation |
| 🏃 Chạy | ✓ | Aggressive squash + lean forward |

Mỗi preset có **slider riêng** từ 1 list 18 sliders (frames, duration, height, squash, stretch, intensity, flash, fall, fade, lunge, windup, swing, pulse, glow, hop, sway, tilt, lean, breathe).

### Body + Vũ khí pipeline

```
weaponSrcImg (upload gốc)
   ↓ crop (drag rect / 🪄 auto-detect non-transparent bbox)
weaponImg (cropped canvas)
   ↓ anchor editor (drag 🟣 đuôi/cán + 🌹 đầu/mũi, hoặc 🪄 PCA auto-detect)
weapon = { x, y, scale, rot, behind, grip%, tip% }
   ↓ drawWeapon trong drawFrameAt (cùng transform chain với bake)
Final composite frame
```

### Direction (Phải / Trái)
Chỉ flip **vũ khí**, không flip body. `ctx.scale(dirSign, 1)` chỉ áp inside `drawWeapon()`. Drag-position vũ khí trên preview hoạt động đúng cả 2 hướng nhờ tính `dirSign × weapon.x`.

Toggle `Bake cả 2 hướng` → output sheet 2 hàng (top=Phải, bottom=Trái) → engine load 1 file dùng cho cả 2.

### Slash trail (✨)
- `bodyLocalTip(t, dirSign)` replays drawWeapon transform chain → tip in body-local
- `drawSlashTrail` sample 7 tip positions trong 18% trailing window → fading polyline (white core + teal glow)

### Onion skinning (👻)
Frame trước (hue +80°, alpha 0.18) + sau (hue -80°) hiện mờ dưới frame current.

### Timeline scrubber (⏱)
Pause/play button + range 0–100% cycle + counter `frame N / total`. Kéo → pause + freeze.

### Hit-frame + visual feedback
- Slider chọn frame gây sát thương (-1..N-1)
- **⚡ Flash trắng**: brightness 1.5× + saturate 0.4× decay 1.6 frame
- **💥 Particle burst**: 14 sparkles deterministic (trig-hash) từ tip + impact ring trắng
- Live preview wrap dashed rose box quanh hit frame
- All baked vào PNG sheet

### Save / Load preset
File `.tomi-anim.json`:
```json
{
  "_format": "tomi-bouncer-preset/1",
  "preset": "attack",
  "settings": { "frames": 10, "duration": 420, ... },
  "direction": "right",
  "weapon": { "x": 20, "y": 40, "grip": {"x":50,"y":92}, ... , "srcImageDataUrl": "data:image/png;base64,..." },
  "body": { "name": "orc", "dataUrl": "data:image/png;base64,..." }
}
```

### Bundle export (PNG + JSON metadata)
Tải cả `.png` và `.json` sidecar:
```json
{
  "_format": "tomi-bouncer-meta/1",
  "preset": "attack",
  "frames": 10,
  "rows": 1,
  "directions": ["right"],
  "tile_width": 192,
  "tile_height": 144,
  "duration_ms": 420,
  "ms_per_frame": 42,
  "fps": 24,
  "hit_frame": 4,
  "weapon_anchors": { "grip": {...}, "tip": {...} }
}
```

Drop-in cho Unity AnimationEvent / Godot AnimationPlayer / Phaser anim config.

### 🪄 AI auto-detect anchors (PCA)
1. Lấy alpha-on pixels của cropped weapon
2. Tính principal axis (eigenvector lambda lớn của ma trận covariance)
3. Project pixels → tìm 2 extreme endpoints
4. Đo bề rộng cross-section (TOL = 5% min dim) tại 2 đầu
5. Đầu rộng hơn = **đuôi (cán)**, đầu nhọn hơn = **đầu (mũi)**

Hoạt động tốt với sword, axe, staff, mace, arrow, wand vì những weapon này đều có grip-rộng + tip-nhọn.

---

## 📐 Tech decisions

### Tại sao Mithril (không React)?
Tool gốc đã dùng Mithril từ trước. Em không rewrite — chỉ thêm `components/v2/` với cùng Mithril. Tránh dual-stack overhead.

### Tại sao Bouncer dùng vanilla JS thay vì Mithril?
- Standalone, không phụ thuộc engine LPC
- Tải vào tab mới không cần load metadata 754kB
- Single-file dễ host, dễ embed vào trang khác

### Tại sao bake bằng Canvas 2D thay vì WebGL?
- Đơn giản, không cần shader pipeline
- Filter/composition built-in (`ctx.filter`, `globalAlpha`)
- Browser support đầy đủ
- 8-16 frame bake mất < 50ms — không cần GPU

### Tại sao 1 transform function cho cả preview lẫn bake?
**Single source of truth**. Live preview dùng rAF loop sample t mỗi frame, bake sample N frames của cùng function. Không bao giờ drift giữa CSS preview và PNG xuất.

### Direction flip ở đâu?
**Bên trong** drawWeapon, không bao quanh body. Vì user chỉ muốn vũ khí đổi tay, không phải xoay nhân vật. Body sprite giữ pose gốc.

### Hit-flash là `ctx.filter` thay vì pixel manipulation
Vì:
- Composable với preset's existing filter (vd Spell có drop-shadow glow)
- GPU-accelerated trong browser
- Bake và preview dùng cùng cú pháp

---

## 🗺 Roadmap (chưa làm)

### Tier S — game-changer
- [ ] **Body parts riêng** — upload đầu / thân / tay riêng biệt → swing tay khi đánh, body-only walk cycle. Yêu cầu user có asset đã tách layer (rare).
- [ ] **Pose library + blend** — upload 2 pose (idle + attack ready) → tween tự động giữa chúng, không cần transform thuần CSS.

### Tier A — quality of life
- [ ] **Multi-weapon (dual-wield)** — slot 2 weapon, sword + shield
- [ ] **Color tint per-frame** (custom color, không chỉ flash trắng)
- [ ] **Sound sync metadata** (pin SFX file path + frame trong JSON)

### Tier B — flair
- [ ] **Camera shake on hit** (output sheet với offset x/y per frame)
- [ ] **Speed line / motion blur lines** trong tile
- [ ] **GIF / WebP / MP4 export** (gif.js)
- [ ] **Pose interpolation từ AI** (ảnh tĩnh → pose graph qua MediaPipe)

### Tool chính
- [ ] Drag-reorder layers trong Inspector
- [ ] Undo/Redo thật (đang disabled)
- [ ] Mobile responsive (panels collapse → bottom sheet)

---

## 🚀 Deploy

GitHub Pages qua workflow `.github/workflows/deploy-pages.yml`:
1. `npm ci`
2. `npm run build` → `dist/index.html` + `dist/bouncer/index.html` + assets
3. Upload `dist/` qua `actions/upload-pages-artifact@v3`
4. Deploy qua `actions/deploy-pages@v4`

Trigger: push to `master` hoặc `workflow_dispatch`.

---

## 📝 Convention

- **Version bump** mỗi commit có code change. Major (X.0.0) = đại tu, Minor (0.X.0) = feature mới, Patch (0.0.X) = fix/polish.
- **Commit message**: tiếng Anh, prefix `vX.Y.Z:` rồi tóm tắt 1 dòng + body chi tiết. Co-author Claude Opus 4.7.
- **UI text**: tiếng Việt 100%. Filename xuất: snake_case underscore.
- **Mithril warning**: KHÔNG bao giờ inline class chứa `[`, `]`, `/`, `:` (vd `text-[10px]`, `bg-slate-900/40`, `hover:underline`) trong selector `m("div.cls...")` — luôn dùng `class:` attribute object.

---

*Tomi Anim Gà — 2026 · vibe-coded với Claude*
