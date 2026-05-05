#!/usr/bin/env python3
"""Fix body sheet defs missing the `animations` array AND synthesize missing
animation PNGs for alternate bodies (Zombie / Skeleton / etc.) from walk f0.

Steps:
  1. Walk sheet_definitions/body/**/*.json. For each def with type_name=="body"
     where `animations` array is empty/missing, scan the actual PNG folders
     under spritesheets/<base>/ and write a derived `animations` list to JSON.
  2. For each body def, find missing target anims and synthesize them by
     tiling walk frame 0 (same approach as weapon synth).
  3. Update JSON to add the synthesized anim names to `animations`.

Outputs:
  - SYNTHESIZED_BODY_ANIMS.md
  - synthesized_body_anims_manifest.json
"""

import json, os, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SHEET_DEF_DIR = ROOT / "sheet_definitions"
SPRITES_DIR = ROOT / "spritesheets"

# Folder name → (sheet anim name, num cols). combat_idle uses sheet name "combat".
SYNTH_TARGETS = {
    "combat_idle": ("combat",    2),
    "idle":        ("idle",      2),
    "sit":         ("sit",       3),
    "emote":       ("emote",     3),
    "jump":        ("jump",      5),
    "climb":       ("climb",     6),
    "run":         ("run",       8),
    "spellcast":   ("spellcast", 7),
    "1h_slash":    ("1h_slash",  6),
    "1h_backslash": ("1h_backslash", 13),
    "1h_halfslash": ("1h_halfslash", 6),
}
ALL_KNOWN_ANIMS = {
    "walk", "hurt", "idle", "run", "jump", "sit", "emote", "climb",
    "spellcast", "thrust", "slash", "shoot", "watering", "combat",
    "1h_slash", "1h_backslash", "1h_halfslash",
}

def synthesize_one(walk_png_path, target_png_path, num_cols):
    walk = Image.open(walk_png_path).convert("RGBA")
    out = Image.new("RGBA", (num_cols * 64, 256), (0, 0, 0, 0))
    for dir_idx in range(4):
        y = dir_idx * 64
        if y + 64 > walk.height:
            continue
        frame = walk.crop((0, y, 64, y + 64))
        for col in range(num_cols):
            out.paste(frame, (col * 64, y))
    out.save(target_png_path, "PNG")

def collect_body_paths(def_):
    """Return [(layer_idx, base_path)] for body-type sheet defs."""
    out, seen = [], set()
    for i in range(1, 10):
        layer = def_.get(f"layer_{i}")
        if not layer:
            break
        if layer.get("custom_animation"):
            continue
        for sex in ["male", "female", "muscular", "pregnant", "teen", "child"]:
            base = layer.get(sex)
            if base and base not in seen:
                seen.add(base)
                out.append((i, base))
    return out

def derive_anims_from_pngs(base):
    """Given a layer base path like 'body/bodies/zombie/', list folder names
    under spritesheets/<base>/ that look like anim names."""
    anim_dir = SPRITES_DIR / base
    if not anim_dir.is_dir():
        return []
    found = set()
    # Pattern A: <base>/<anim>.png
    # Pattern B: <base>/<anim>/<variant>.png  (anim is a folder)
    for entry in anim_dir.iterdir():
        if entry.is_file() and entry.suffix == ".png":
            name = entry.stem
            if name in ALL_KNOWN_ANIMS:
                found.add(name)
        elif entry.is_dir():
            name = entry.name
            # combat_idle folder maps to "combat" anim name
            if name == "combat_idle":
                found.add("combat")
            elif name in ALL_KNOWN_ANIMS:
                found.add(name)
    return sorted(found)

def main():
    fixed_jsons = []   # JSONs that had empty animations and got populated
    manifest = []      # synthesized files
    skipped = []
    updated_jsons = [] # JSONs that got new synthesized anim names appended

    for json_path in SHEET_DEF_DIR.rglob("*.json"):
        if json_path.name.startswith("meta_"):
            continue
        if "body" not in json_path.parts:
            continue
        try:
            def_ = json.loads(json_path.read_text())
        except Exception:
            continue
        if def_.get("type_name") != "body":
            continue
        if not def_.get("name"):
            continue

        # ----- Phase 1: derive animations array if missing -----
        anims_listed = def_.get("animations") or []
        bases = collect_body_paths(def_)
        if not anims_listed:
            derived = set()
            for _, base in bases:
                for a in derive_anims_from_pngs(base):
                    derived.add(a)
            if derived:
                def_["animations"] = sorted(derived)
                anims_listed = def_["animations"]
                fixed_jsons.append({
                    "json": str(json_path.relative_to(ROOT)),
                    "name": def_["name"],
                    "derived": sorted(derived),
                })
                json_path.write_text(json.dumps(def_, indent=2))

        # ----- Phase 2: synth missing target anims -----
        anims_in_json = set(def_.get("animations") or [])
        anims_added = set()
        for layer_idx, base in bases:
            walk_dir = SPRITES_DIR / base / "walk"
            if not walk_dir.is_dir():
                skipped.append({"name": def_["name"], "base": base, "reason": "no walk/ dir"})
                continue
            walk_pngs = sorted(walk_dir.glob("*.png"))
            if not walk_pngs:
                skipped.append({"name": def_["name"], "base": base, "reason": "walk/ empty"})
                continue

            for folder_name, (anim_name, num_cols) in SYNTH_TARGETS.items():
                # Already in JSON? skip
                if anim_name in anims_in_json:
                    continue
                target_dir = SPRITES_DIR / base / folder_name
                target_dir.mkdir(parents=True, exist_ok=True)
                for walk_png in walk_pngs:
                    target_png = target_dir / walk_png.name
                    if target_png.exists():
                        skipped.append({"name": def_["name"], "file": str(target_png.relative_to(ROOT)), "reason": "already exists"})
                        continue
                    try:
                        synthesize_one(walk_png, target_png, num_cols)
                        manifest.append({
                            "body": def_["name"],
                            "anim": anim_name,
                            "layer": layer_idx,
                            "base": base,
                            "walk": str(walk_png.relative_to(ROOT)),
                            "synthesized": str(target_png.relative_to(ROOT)),
                        })
                        anims_added.add(anim_name)
                    except Exception as e:
                        skipped.append({"name": def_["name"], "file": str(walk_png), "reason": f"err: {e}"})

        if anims_added:
            anims_list = def_.get("animations") or []
            for a in anims_added:
                if a not in anims_list:
                    anims_list.append(a)
            def_["animations"] = sorted(set(anims_list))
            json_path.write_text(json.dumps(def_, indent=2))
            updated_jsons.append(str(json_path.relative_to(ROOT)))

    # Write manifest + report
    (ROOT / "synthesized_body_anims_manifest.json").write_text(
        json.dumps({"fixed_jsons": fixed_jsons, "synthesized": manifest, "skipped": skipped, "updated_jsons": updated_jsons}, indent=2)
    )

    md = ["# Synthesized Body Animations", ""]
    md.append(f"Fixed {len(fixed_jsons)} body JSON(s) with empty `animations` array (derived from PNG folders).")
    md.append(f"Synthesized {len(manifest)} PNG files for {len(set(m['body'] for m in manifest))} body variant(s).")
    md.append(f"Updated {len(updated_jsons)} body JSON(s) with new anim names.")
    md.append(f"Skipped {len(skipped)} files.")
    md.append("")
    if fixed_jsons:
        md.append("## Phase 1: JSONs fixed (added `animations` array from real PNG folders)")
        md.append("")
        for f in fixed_jsons:
            md.push if False else md.append(f"- **{f['name']}** (`{f['json']}`): `{f['derived']}`")
        md.append("")
    if manifest:
        md.append("## Phase 2: Synthesized PNGs (placeholder, walk frame 0 tiled)")
        md.append("")
        md.append("| Body | Anim | Synthesized | From Walk |")
        md.append("|---|---|---|---|")
        for m in manifest:
            md.append(f"| {m['body']} | {m['anim']} | `{m['synthesized']}` | `{m['walk']}` |")

    (ROOT / "SYNTHESIZED_BODY_ANIMS.md").write_text("\n".join(md))

    print(f"✓ Fixed {len(fixed_jsons)} JSONs (Zombie/Skeleton type) with derived animations array")
    print(f"✓ Synthesized {len(manifest)} body PNG files")
    print(f"✓ Updated {len(updated_jsons)} JSONs with new anims")
    print(f"✓ Skipped {len(skipped)}")
    print(f"✓ SYNTHESIZED_BODY_ANIMS.md + synthesized_body_anims_manifest.json")

if __name__ == "__main__":
    main()
