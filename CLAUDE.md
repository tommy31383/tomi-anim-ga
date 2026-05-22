# CLAUDE.md — Rule & Memory cho AI assistant làm việc trên project này

> Anh Tommy là chủ project. Xưng "em" / "anh Tommy". Mỗi session phải đọc file này TRƯỚC khi làm bất cứ việc gì.

---

## 🔴 RULE BẮT BUỘC — KHÔNG ĐƯỢC BỎ QUA

### R1. Đọc context trước khi code
Mỗi lần bắt đầu session mới HOẶC được giao task mới, BẮT BUỘC:
1. Đọc **README.md** — nắm app làm gì
2. Đọc **ARCHITECTURE.md** — nắm kiến trúc + inventory
3. Đọc **DESIGN.md** — design doc tiếng Việt cho tool chính + Bouncer
4. Đọc **CLAUDE.md** (file này) — đọc **toàn bộ Feature Log** ở cuối
5. Đọc các .md liên quan task cụ thể (xem section "MD reference map" bên dưới)

**KHÔNG được hỏi anh Tommy về structure / tech stack / feature đã có. Tự đọc.**

### R2. Self-audit TRƯỚC khi gửi output cho anh Tommy
Mỗi lần sửa code, BẮT BUỘC chạy audit checklist trong đầu trước khi báo "xong":

| Audit item | Cách check |
|---|---|
| **Phase continuity** | Tính giá trị tại boundary của từng phase (vd t=0.12, 0.30, 0.60). Đầu phase N+1 phải = cuối phase N cho mọi field (ty, rot, sx, sy, alpha). |
| **Detach/transition continuity** | Khi tách object (vd vũ khí rời tay): position + rotation lúc detach phải xấp xỉ vị trí trước detach. Diff < 5px / < 10°. |
| **Adaptive vs hardcode** | Giá trị phụ thuộc user setup (weapon.y, bodyImg.height, body sprite size...) → dùng biến global, KHÔNG hardcode. |
| **Slider semantic match** | Label slider phải đúng với thực tế nó điều khiển. Nếu repurpose slider, đổi label luôn. |
| **Description text match anim** | Đọc lại `desc` của preset, đảm bảo mô tả đúng những gì transform thực sự làm. |
| **Visual sanity** | Tự visualize: body rotate ngược hướng có đúng "ngửa" vs "úp" không? Position cuối có "lún xuống đất" không? Có jump giữa phase không? |
| **Side effects** | Sửa SLIDER_CONFIG có affect preset khác không? Sửa FX_REGISTRY có affect preset khác không? |
| **Vite still up** | `curl http://127.0.0.1:5173/...` trả 200 sau khi edit. |

**Nếu audit thấy issue, FIX LUÔN trong cùng turn, không gửi output dirty cho anh Tommy review.**

### R3. Bám theo cách user đang làm
- Anh Tommy thường tự custom theo ý anh. NẾU anh đã có cách làm (vd: combine FX có sẵn), KHÔNG đề xuất rewrite from scratch. Em chỉ tweak / polish theo cách anh đang đi.
- Trước khi rewrite một feature lớn, HỎI anh Tommy trước hoặc đề xuất nhỏ rồi xin confirm.

### R4. Output gọn, không lan man
- Không lặp lại context anh Tommy đã biết
- Không add table/heading thừa khi câu trả lời ngắn
- Khi có nhiều option → AskUserQuestion tool (max 4 options)
- Khi code xong → tóm tắt **3 dòng**: làm gì, file nào, anh test gì

### R5. Vietnamese tone
- Luôn xưng "em" / "anh Tommy"
- Technical term giữ tiếng Anh (transform, slider, FX, preset, canvas...)
- Không formal quá, nói chuyện như đồng nghiệp

---

## 📂 MD reference map — đọc theo task

| Task type | MD bắt buộc đọc |
|---|---|
| Sửa anim Bouncer (preset, transform, FX) | `DESIGN.md` (Bouncer section) + `bouncer/index.html` (PRESETS object + FX_REGISTRY) |
| Sửa main generator UI / state | `ARCHITECTURE.md` + `sources/components/v2/*.js` + `sources/state/*.js` |
| Sửa render / palette / WebGL | `PALETTE_RECOLOR_GUIDE.md` + `PERFORMANCE_PROFILING.md` + `sources/canvas/*` |
| Add asset / sheet definition | `ARCHITECTURE.md` (inventory section) + `sheet_definitions/<category>/meta_*.json` |
| Build / Vite / deploy | `README.md` (dev quickstart) + `vite.config.js` + `vite/*.js` |
| Asset bị hỏng / animation thiếu | `BROKEN_ASSETS.md` + `SYNTHESIZED_BODY_ANIMS.md` + `SYNTHESIZED_COMBAT_2H.md` |
| Phân loại vũ khí | `WEAPONS_CLASSIFICATION.md` |
| Tool z-position | `tools/LPCTOOLS.md` + `tools/REBUILD.md` |
| Tool vitruvian (anatomy ref) | `tools/VITRUVIAN.md` |

---

## 🔧 Tech stack quick reference

**Main app** (`/`): Mithril 2.3.8 + Bulma 1.0 + Tailwind CDN + Canvas 2D + WebGL palette recolor + JS/TS (noEmit) + JSZip

**Bouncer** (`/bouncer/`): Vanilla JS + Tailwind CDN trong 1 file HTML 6000+ dòng + IndexedDB. **KHÔNG share code với main app, chỉ share Vite build pipeline.**

**Build**: Vite 8 (Rolldown) + 8 custom plugins. Multi-entry `index.html` + `bouncer/index.html`.

**Dev server**: `npm run bouncer` (mở /bouncer/) hoặc `npx vite --host 127.0.0.1 --port 5173` (không --open vì sandbox không spawn browser được). Vite khởi động ~3 phút do generate metadata từ 767 sheet definitions.

**Deploy**: Netlify (chính) + GitHub Pages (workflow `deploy-pages.yml`). Push master tự deploy.

---

## 🌳 Branch convention
- `master` — production, push là auto-deploy
- `update_anim` — branch hiện tại anh Tommy đang custom anim
- Push credential: account `lkhoa1011` (Frag) — collaborator của repo `tommy31383/tomi-anim-ga`

---

## 🎬 Bouncer architecture cheat sheet

### Preset object schema (`bouncer/index.html` line 580+, `PRESETS = {...}`)
```js
key: {
  key: 'key', emoji: '...', label: 'Tên VI', desc: '...',
  loop: false,                              // có loop sau khi hết t=1?
  defaults: { frames, duration, ...sliderKeys },
  sliders: ['frames', 'duration', ...],     // whitelist hiển thị slider nào cột phải
  transform: (t, s) => ({
    tx, ty, sx, sy, rot, alpha, filter,     // body
    weaponRot, weaponTx,                    // weapon ATTACHED (delta trong body-local)
    weaponDetached,                         // bool — true thì weapon render ngoài body transform
    weaponWorldDx, weaponWorldDy,           // weapon DETACHED (world/screen space offset từ standing grip)
    weaponWorldRot,                         // weapon DETACHED rotation (cùng convention weapon.rot: 0 = tip up)
  }),
}
```

### Helpers có sẵn (đừng viết lại)
- `lerp(a, b, t)`
- `easeOutCubic(t)`, `easeInOutCubic(t)`, `anticipateEase(t)`
- `cyclicPhase(t)` — chuyển t thành 0→1→0 cho loop
- `phaseUp(t)`, `phaseDown(t)`

### Global state có thể đọc trong transform
- `bodyImg` (Image object — `bodyImg.width`, `.height`)
- `weaponImg`
- `weapon.x, weapon.y, weapon.rot, weapon.grip, weapon.tip, weapon.scale`
- `direction` ('right' | 'left')
- `settings` — current slider values (cùng nội dung với `s` truyền vào)

### Slider config (`SLIDER_CONFIG` ~line 1280+)
Mỗi slider key cần đăng ký: `{ label, min, max, step, suffix }`. Nếu repurpose, cập nhật label luôn.

### FX_REGISTRY (~line 2150+)
Mỗi FX = entry `{ label, draw(ctx, t, cx, cy, dir) }`. Triggered bởi hit frame (qua `_hitProgress(t)`). User tick checkbox cột phải để bật. **KHÔNG hard-code FX vào preset transform — luôn để user compose.**

### Render flow (`drawFrameAt`)
1. `tr = preset.transform(t, settings)` — đọc tất cả field
2. Tính shake, hit flash
3. `ctx.save()` → translate to body position → rotate → scale
4. `drawWeapon()` (nếu attached) trước/sau drawImage body theo `weapon.behind`
5. `drawImage(bodyImg, ...)` — body sprite
6. `ctx.restore()`
7. **Detached weapon render trong world space** (sau restore) — không bị body transform ảnh hưởng

---

## 📜 FEATURE LOG — append khi xong feature

> Format: `### YYYY-MM-DD — Feature name`<br>Block ghi: **vấn đề**, **thay đổi**, **file & line**, **rule learned**.

### 2026-05-21 — Setup CLAUDE.md
- **Vấn đề**: Em không bám rule, làm cẩu thả, anh Tommy phải nhắc nhiều lần.
- **Thay đổi**: Tạo CLAUDE.md với rule đọc MD + self-audit checklist + tech stack + feature log.
- **File**: `CLAUDE.md` (root)
- **Rule learned**: Mỗi session phải mở CLAUDE.md trước. Mỗi feature xong append vào Feature Log.

### 2026-05-21 — Bouncer: Weapon detach system
- **Vấn đề**: Vũ khí dính grip body, không "rơi" thật được khi nhân vật chết.
- **Thay đổi**:
  - Thêm 4 transform field mới: `weaponDetached, weaponWorldDx, weaponWorldDy, weaponWorldRot`
  - `drawFrameAt` (`bouncer/index.html:1395-1505`): destructure field mới, skip `drawWeapon()` nội bộ khi detached, add render block weapon ở world space sau `ctx.restore()`
  - Weapon detached **KHÔNG inherit body alpha** → vũ khí vẫn nằm trên đất khi body fade
- **File**: `bouncer/index.html` (drawFrameAt function ~line 1385-1505)
- **Rule learned**: Khi cần object thoát body's transform chain → render sau `ctx.restore()` của body, dùng world-space coords.

### 2026-05-21 — Bouncer: Ghost/Angel REMOVED (per user request)
- **Vấn đề**: Sau khi thử ghost angel rising, anh Tommy quyết định không cần, giữ chỉ unit ngã + weapon văng.
- **Thay đổi**: Revert toàn bộ 5 chỗ thêm ghost:
  - die preset transform: remove ghost block + remove ghost fields from return
  - drawFrameAt: remove ghost destructure + remove ghost render block
  - resolveFrameFit: remove ghost extent check
  - bake: remove ghost extent check
  - Description text: revert về version không mention angel
- **File**: `bouncer/index.html`
- **Rule learned**: Khi user revert feature → revert clean toàn bộ infrastructure, không để dead code. Document trong Feature Log để biết feature từng có và lý do remove (case sau muốn restore vẫn có git history).

### 2026-05-21 — Bouncer: Ghost/Angel sprite rising after death (REMOVED — see entry above)
- **Vấn đề**: Anh Tommy muốn sau khi unit chết, thiên thần unit (silhouette body trắng glow vàng) bay lên từ vị trí body chết rồi biến mất.
- **Thay đổi**:
  - Thêm 5 transform return field mới: `ghostRise, ghostTy, ghostAlpha, ghostScale, ghostFilter`
  - `drawFrameAt`: destructure ghost fields + add render block sau body và detached weapon. Ghost = bản sao bodyImg vẽ ở (cx, cy+gTy) với scale + filter glow.
  - die preset transform: spawn ghost từ t=0.78 (sau khi body lying yên). Rise từ gTy=-4 đến -110 với easeOutCubic. Scale 0.85→0.7 (perspective shrink). Alpha: fade-in (p<0.25), hold (p<0.80), fade-out (p≥0.80). Filter: `brightness(1.9) saturate(0.2) drop-shadow vàng + trắng glow`.
  - **Frame auto-fit fix**: Cả `resolveFrameFit` (preview) và `bake()` (export) đều cần biết về ghost extent. Add ghost extent check: `extTop = max(extTop, -gTy + ghostH + 14)`. Nếu không add → ghost bay lên cao bị clip ở edge frame cả ở preview lẫn export PNG sheet.
- **File**: `bouncer/index.html` lines:
  - 720-740 (ghost logic trong die preset)
  - 1395-1410 (destructure ghost fields trong drawFrameAt)
  - 1585-1597 (ghost render block sau weapon detached)
  - 2917-2927 (ghost extent in resolveFrameFit)
  - 3474-3484 (ghost extent in bake)
- **Rule learned**:
  - **Khi thêm visual element mới ngoài body** (như ghost, FX overlay) phải tính extent ở CẢ 2 chỗ: `resolveFrameFit` (preview auto-fit) AND `bake()` (export bake). Nếu quên một chỗ → preview hiển thị OK nhưng export bị clip (hoặc ngược lại).
  - Render thêm sprite copy thì destructure params từ `tr` ở đầu `drawFrameAt`, render sau body+weapon (ngoài body's transform context) để có world-space coords độc lập.
  - Filter `drop-shadow` với rgba có thể stack nhiều layer (vd 2 drop-shadow = inner glow + outer glow) cho silhouette glow effect.

### 2026-05-21 — Bouncer: Rewrite preset `die`
- **Vấn đề**: Anh Tommy yêu cầu anim chết "vui hơn": nhún → bật → lật ngửa bụng → đáp tại chỗ + vũ khí rơi khỏi tay. Kết hợp FX Khói + Emoji bubble 👼 ở hit frame để giả "hồn bay lên".
- **Thay đổi**:
  - Rewrite `transform` của preset `die` thành 5 phase (P1 Nhún 0-12%, P2 Bật 12-30%, P3 Lật 30-60%, P4 Đáp 60-72%, P5 Nằm yên fade 72-100%)
  - Weapon detach từ t=0.15 với 3 phase (Falling 0.15-0.40 / Settling 0.40-0.55 / Rest 0.55+)
  - Defaults mới: `{ frames: 16, duration: 900, fall: 14, dieAngle: -95, collapse: 28, fade: 55, pop: 22, weaponDrop: 28 }`
  - Sliders mới trong preset: `pop` (tận dụng có sẵn), `weaponDrop` (mới)
  - SLIDER_CONFIG: add `weaponDrop`, update `dieAngle` range `0-45` → `-180 → 180` để cho phép âm (ngửa thay vì úp)
- **Bug đã fix qua audit pass**:
  1. `dieAngle = +95` → body úp mặt (sai). Fix `-95` để body ngửa bụng đúng cartoon
  2. `ty = s.fall = 14` ở P5 → body lún 14px xuống đất. Fix `ty = 0` để ngã tại chỗ
  3. Weapon teleport 9px down at detach. Fix khởi đầu `wWorldDy = -pop * 0.4`
  4. Weapon rotation snap 35° at detach. Fix khởi đầu `wWorldRot = weapon.rot`
  5. Hardcode `groundDrop = 30`. Fix `groundDrop = weapon.y` adaptive
- **File**: `bouncer/index.html` lines 627-720 (die preset), 1288 (SLIDER_CONFIG.dieAngle), 1292 (SLIDER_CONFIG.weaponDrop)
- **Rule learned**:
  - Canvas rotation: dương = clockwise. "Ngửa bụng" cartoon = rot ÂM (tilt backward). "Úp mặt" = rot DƯƠNG (tilt forward).
  - Body lying at standing-line means `ty = 0`. Bất kỳ `ty > 0` sẽ làm body "lún xuống đất".
  - Khi 2 system có pivot khác nhau (body chain vs world space), phải tính continuity ở moment chuyển giao.
  - Anh Tommy thường COMPOSE existing FX thay vì đòi viết FX mới. Tôn trọng cách anh làm.
