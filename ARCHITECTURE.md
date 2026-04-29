# Tomi Anim Gà — Architecture & Parts Inventory

Tổng hợp kiến trúc src + danh sách bộ phận để làm function **random character**.

---

## 1. Kiến trúc tổng quan

| Thành phần | Mô tả |
|---|---|
| Stack | Mithril 2 + Vite 8 + Bulma + Canvas 2D thuần (không React) |
| Entry | `index.html` → `sources/main.js` |
| Build | `vite.config.js` (dev = `npm run dev`, build = `npm run build`) |
| State | `sources/state/catalog.js` — store toàn bộ metadata (sheet defs, palettes, credits, z-positions); load nhiều stage (index → lite → palettes → layers → credits) |
| Routing | URL hash kiểu `#sex=male&body=Body_Color_light&head=Human_Male_light&...`; parse/serialize 2 chiều với selection state |
| Render | Canvas offscreen 832×3456 (13 frames × 64px). Layer được sort theo `zPos`, recolor theo palette rồi `drawImage` chồng lên |
| Recolor | Palette swap (CPU pixel walk); item có `match_body_color: true` thì auto theo màu body |
| Export | JSZip — đóng gói spritesheet PNG + CREDITS.csv |
| Test | Testem (unit Node) + Playwright (visual regression) + Argos |

### Dữ liệu nguồn

```
sheet_definitions/      # 767 file JSON — định nghĩa từng layer/asset
  body/ head/ hair/ headwear/ torso/ legs/ feet/ arms/ weapons/ tools/
palette_definitions/    # bảng màu cho recolor
spritesheets/           # PNG raw
sources/                # mã nguồn UI Mithril
```

Quan trọng: **folder name chỉ là cách lưu trữ; "bộ phận" thật trong UI là field `type_name` bên trong JSON.** 1 file `headwear/*.json` có thể có `type_name = "hat"`, `"bandana"`, `"visor"`, `"hat_trim"`, v.v.

### Schema 1 file sheet_definition (rút gọn)

```jsonc
{
  "name": "Human_Male",
  "type_name": "head",                 // ← part type trong UI
  "match_body_color": true,            // optional — recolor theo body
  "variants": ["light","tan","dark"],  // optional — recolor riêng
  "layer_1": {
    "zPos": 100,
    "male":     "head/heads/human/male/universal.png",
    "female":   "head/heads/human/female/universal.png",
    "muscular": "...",
    "pregnant": "...",
    "teen":     "...",
    "child":    "..."
  }
}
```

Hash URL = `<type_name>=<DefinitionName>_<variant>` (vd `head=Human_Male_light`).

---

## 2. Inventory: tất cả bộ phận (`type_name`)

**Tổng: 105 type_name riêng biệt / 767 sheet definitions** (655 def có `type_name`, 112 file là layer phụ không có type_name — chỉ dùng nội bộ).

Cột:
- `count` = số sheet definition thuộc type đó (số "lựa chọn" cơ bản)
- `avg variants` = số biến thể recolor trung bình mỗi def (0 nghĩa là chỉ có 1 màu hoặc dùng `match_body_color`)
- `match_body` = số def auto-theo màu body
- `sex` = tập sex được hỗ trợ

### 2.1 Top picks (≥10 definitions)

| # | type_name | count | avg variants | match_body | sex hỗ trợ |
|---|---|---:|---:|---:|---|
| 1 | hair | 91 | 0.0 | 0 | all 6 |
| 2 | hat | 52 | 12.2 | 0 | 5 (no child) |
| 3 | shield_pattern | 48 | 24.0 | 0 | 5 (no child) |
| 4 | head | 45 | 0.0 | 42 | all 6 |
| 5 | weapon | 36 | 4.7 | 0 | 5 (no child) |
| 6 | clothes | 35 | 6.5 | 0 | 5 (no muscular) |
| 7 | legs | 22 | 2.8 | 0 | all 6 |
| 8 | charm | 16 | 17.0 | 0 | 5 (no child) |
| 9 | expression | 15 | 0.0 | 15 | 5 (no child) |
| 10 | facial_eyes | 14 | 28.6 | 0 | all 6 |
| 11 | hat_trim | 13 | 29.2 | 0 | 5 |
| 12 | shoes | 12 | 28.5 | 0 | 5 |
| 13 | wings | 11 | 25.8 | 2 | all 6 |
| 14 | ears | 10 | 9.9 | 7 | all 6 |

### 2.2 Mid (3–9 definitions)

| type_name | count | avg var | match_body | sex |
|---|---:|---:|---:|---|
| accessory | 9 | 0 | 0 | 5 |
| visor | 9 | 0 | 0 | 5 |
| shield | 9 | 3.4 | 0 | 5 |
| mustache | 8 | 0 | 0 | 5 |
| neck | 8 | 22.0 | 0 | 5 |
| belt | 8 | 4.8 | 0 | female,male,teen |
| hairextl | 7 | 0 | 0 | all 6 |
| hairextr | 7 | 0 | 0 | all 6 |
| jacket | 6 | 15.8 | 0 | female,male,teen |
| tail | 5 | 26.4 | 1 | all 6 |
| beard | 5 | 0 | 0 | 5 |
| necklace | 5 | 8.2 | 0 | 5 |
| nose | 5 | 0 | 5 | 5 |
| earrings | 5 | 6.8 | 0 | 5 |
| sleeves | 5 | 0 | 0 | female,male,teen |
| shoulders | 4 | 0 | 0 | 5 |
| bandana | 4 | 18.8 | 0 | 5 |
| hat_accessory | 4 | 24.0 | 0 | 5 |
| apron | 4 | 18.0 | 0 | female,male,pregnant,teen |
| backpack | 4 | 11.3 | 0 | female,male,muscular,pregnant |
| vest | 4 | 23.3 | 0 | female,male |
| dress | 4 | 24.0 | 0 | female,teen |
| sash | 4 | 24.0 | 0 | 5 |
| shield_trim | 4 | 4.0 | 0 | 5 |
| body | 3 | 0.7 | 1 | all 6 |
| socks | 3 | 24.0 | 0 | 5 |
| ponytail | 3 | 0 | 0 | all 6 |
| ears_inner | 3 | 0 | 3 | all 6 |
| headcover | 3 | 24.0 | 0 | all 6 |
| hat_overlay | 3 | 24.0 | 0 | 5 |
| armour | 3 | 0 | 0 | female,male,teen |
| cargo | 3 | 4.3 | 0 | female,male,muscular,pregnant |
| jacket_trim | 3 | 7.0 | 0 | male |

### 2.3 Niche (1–2 definitions)

`wrists, shoes_toe, fins, horns, eyebrows, furry_ears, furry_ears_skin, overalls, cape, dress_sleeves, dress_sleeves_trim, dress_trim, sash_tie, shield_paint, arms, gloves, ring, bauldron, bracers, prosthesis_hand, prosthesis_leg, shadow, wheelchair, wings_dots, wings_edge, wound_arm, wound_brain, wound_eye_left, wound_eye_right, wound_mouth, wound_ribs, updo, eyes, expression_crying, wrinkles, earring_left, earring_right, facial_mask, facial_left, facial_left_trim, facial_right, facial_right_trim, bandana_overlay, hairtie, hairtie_rune, headcover_rune, hat_buckle, backpack_straps, quiver, cape_trim, jacket_collar, jacket_pockets, bandages, chainmail, buckles, weapon_magic_crystal, ammo`

### 2.4 Sex enum

`male, female, muscular, pregnant, teen, child` — 6 giá trị.
- Không phải part nào cũng support đủ 6. Ví dụ `belt/jacket/sleeves/armour/vest/dress` chỉ vài sex.
- `child` chỉ có ở: hair, head, legs, body, ears, ears_inner, facial_eyes, wings, tail, hairextl/r, ponytail, headcover, fins, horns, eyebrows, furry_ears(_skin), shadow, wings_dots/edge, hairtie(_rune), headcover_rune, earring_left/right, facial_mask, facial_left(_trim), facial_right(_trim), eyes.

---

## 3. Bộ phận bắt buộc vs tuỳ chọn

| Loại | type_name | Ghi chú |
|---|---|---|
| **Bắt buộc (luôn pick)** | `body`, `head` | Không có 2 cái này thì char trống |
| **Gần như bắt buộc** | `hair` (hoặc bald) | Đa số preset có |
| **Phụ thuộc sex** | `legs`, `clothes`, `facial_eyes`, `expression` | Có defaults theo sex |
| **Tuỳ chọn (random theo xác suất)** | tất cả còn lại (~95 type) | hat, weapon, shield, wings, tail, beard… |

---

## 4. Thuật toán Random Character

### 4.1 Pseudocode

```js
const SEXES = ["male","female","muscular","pregnant","teen","child"];

// Xác suất "bật" cho từng nhóm optional
const PROB = {
  hair: 0.95, expression: 0.8, facial_eyes: 0.6,
  hat: 0.4, weapon: 0.4, shield: 0.2, wings: 0.05,
  tail: 0.05, beard: 0.3 /* chỉ male/muscular */,
  // mặc định cho mọi type khác:
  _default: 0.15,
};

function randomChar(catalog) {
  const sex = pick(SEXES);

  // Index: type_name -> [definitions support sex này]
  const byType = {};
  for (const def of catalog.allDefinitions) {
    if (!def.type_name) continue;
    if (!supportsSex(def, sex)) continue;
    (byType[def.type_name] ||= []).push(def);
  }

  const sel = { sex };

  // 1) Required
  sel.body = pickDef(byType.body);
  const bodyVariant = pick(sel.body.variants); // vd "light"
  sel.body.variant = bodyVariant;
  sel.head = pickDef(byType.head);

  // 2) Loop tất cả type còn lại
  for (const type of Object.keys(byType)) {
    if (type === "body" || type === "head") continue;
    if (!shouldEnable(type, sex)) continue;          // PROB lookup
    const def = pickDef(byType[type]);
    let variant;
    if (def.match_body_color) variant = bodyVariant; // ép theo body
    else if (def.variants?.length) variant = pick(def.variants);
    sel[type] = { name: def.name, variant };
  }

  return serializeHash(sel);  // → "#sex=male&body=Body_Color_light&head=Human_Male&hair=Plain_blonde&..."
}

function supportsSex(def, sex){
  for (const k of Object.keys(def))
    if (k.startsWith("layer_") && def[k][sex]) return true;
  return false;
}

function shouldEnable(type, sex){
  if (type === "beard" || type === "mustache") return sex==="male"||sex==="muscular" ? Math.random()<0.4 : false;
  if (type === "dress")  return sex==="female"||sex==="teen" ? Math.random()<0.3 : false;
  return Math.random() < (PROB[type] ?? PROB._default);
}
```

### 4.2 URL hash format

```
#sex=<sex>&<type_name>=<DefinitionName>[_<variant>]&<type_name>=...
```

- `<DefinitionName>` lấy từ field `name` của JSON (hoặc tên file không có `.json`)
- `_<variant>` chỉ append nếu def có variants. Nếu `match_body_color`, dùng variant của body.
- Type không chọn thì **không xuất hiện** trong hash (omit).

### 4.3 Ví dụ output

```
#sex=male&body=Body_Color_light&head=Human_Male&hair=Plain_blonde&expression=Neutral_light
&facial_eyes=Eyes_blue&clothes=Shirt_white&legs=Pants_blue&shoes=Shoes_brown
&hat=Cap_red&weapon=Sword_steel
```

---

## 5. Gotchas / lưu ý khi implement random

1. **Variants vs match_body_color**: Hai cơ chế recolor khác nhau cùng tồn tại. Item có `match_body_color: true` thì **không append variant rời** — phải đồng bộ với body. Nếu body random ra `_dark` thì head/ears/expression cũng phải `_dark`.
2. **Sex filter strict**: Pick xong sex thì phải lọc lại danh sách def — nhiều def chỉ có asset cho 1-2 sex (vd `jacket_trim` chỉ male, `dress` chỉ female/teen).
3. **Conflict layer**: Ngoài đời UI có thể chặn `dress` + `legs/clothes` cùng lúc, hoặc `bald hair` + `hairextr`. Random thô có thể xung đột visual nhưng vẫn render được. Nếu cần "hợp lệ" tuyệt đối, cần lookup các rule trong `sources/` (catalog có metadata `excludes` / parent type, kiểm tra thêm khi triển khai).
4. **z-position**: render order do `zPos` trong layer, không phải thứ tự pick — không lo về mặt visual stack.
5. **`(none)` 112 file**: là layer-only definitions (không có type_name) — KHÔNG đưa vào pool random.
6. **Catalog load lazy**: catalog chia stage (index → lite → palettes → layers). Random phải đợi ít nhất stage `lite + palettes` xong mới có đủ data variants.
7. **Validation**: Nếu user paste hash random ra mà sai sex/variant, app silent-skip — random nên fallback gracefully.

---

## 6. TL;DR cho function random

- **6 sex** × **105 type_name** × tổng **655 def có type** + variants → đủ rộng để random vô hạn.
- **2 type bắt buộc**: `body` (3 def) + `head` (45 def).
- Thuật toán: **pick sex → pick body+variant → pick head → loop mọi type khác theo xác suất → serialize hash**.
- Cẩn thận `match_body_color` (đồng bộ variant theo body) và sex filter (lọc def theo `layer_*.<sex>`).
