#!/usr/bin/env python3
"""Synthesize MISSING anim PNGs for 2H weapons by tiling walk frame 0.

Target anims (cols × 4 rows × 64px per direction):
  combat_idle (2), idle (2), sit (3), emote (3), jump (5),
  climb (6), run (8), spellcast (7)

Each weapon's missing anim PNG is built by pasting walk frame 0 across all
columns. For static anims (idle/sit/emote) this looks fine. For movement
anims (run/climb/jump) the weapon stays still while body animates — visually
a bit stiff but the weapon is visible.

Safety:
- Skips if target PNG already exists
- Updates sheet_definitions JSON to add the anim
- Manifest in synthesized_combat_2h_manifest.json for revert
- Adds anim name to JSON's `animations` array

Run:  python3 scripts/synthesize-combat-2h.py
"""

import json, os, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SHEET_DEF_DIR = ROOT / "sheet_definitions"
SPRITES_DIR = ROOT / "spritesheets"

ANIM_2H = {
    "slash_oversize", "slash_reverse_oversize", "thrust_oversize",
    "slash_128", "backslash_128", "halfslash_128",
    "thrust_128", "walk_128", "whip_oversize",
}

def is_2h(def_):
    anims = set(def_.get("animations") or [])
    has_2h = bool(anims & ANIM_2H)
    # Exclude shields (they have 1H combat naturally)
    tn = (def_.get("type_name") or "").lower()
    if "shield" in tn or "ammo" in tn or "quiver" in tn:
        return False
    return has_2h

def collect_unique_base_paths(def_):
    """Return list of (layer_idx, base_path). Dedupes paths shared across sexes."""
    out = []
    seen = set()
    for i in range(1, 10):
        layer = def_.get(f"layer_{i}")
        if not layer:
            break
        if layer.get("custom_animation"):
            continue  # skip custom-only layers
        for sex in ["male", "female", "muscular", "pregnant", "teen", "child"]:
            base = layer.get(sex)
            if base and base not in seen:
                seen.add(base)
                out.append((i, base))
    return out

def synthesize_one(walk_png_path, target_png_path, num_cols):
    """Make target anim PNG from walk.png by tiling frame 0 across `num_cols` columns."""
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

# Folder name on disk → (sheet_definitions anim name, num cols).
# combat_idle uses sheet name "combat".
TARGET_ANIMS = {
    "combat_idle": ("combat",    2),
    "idle":        ("idle",      2),
    "sit":         ("sit",       3),
    "emote":       ("emote",     3),
    "jump":        ("jump",      5),
    "climb":       ("climb",     6),
    "run":         ("run",       8),
    "spellcast":   ("spellcast", 7),
}

def main():
    manifest = []  # list of dicts: {weapon, base, walk, combat}
    skipped = []  # reason-tagged
    updated_jsons = []

    for json_path in SHEET_DEF_DIR.rglob("*.json"):
        if json_path.name.startswith("meta_"):
            continue
        if "weapons" not in json_path.parts:
            continue
        try:
            def_ = json.loads(json_path.read_text())
        except Exception:
            continue
        if not is_2h(def_):
            continue

        base_paths = collect_unique_base_paths(def_)
        anims_added = set()
        for layer_idx, base in base_paths:
            walk_dir = SPRITES_DIR / base / "walk"
            if not walk_dir.is_dir():
                skipped.append({"weapon": def_["name"], "base": base, "reason": "no walk/ dir"})
                continue

            walk_pngs = sorted(walk_dir.glob("*.png"))
            if not walk_pngs:
                skipped.append({"weapon": def_["name"], "base": base, "reason": "walk/ empty"})
                continue

            for folder_name, (anim_name, num_cols) in TARGET_ANIMS.items():
                target_dir = SPRITES_DIR / base / folder_name
                target_dir.mkdir(parents=True, exist_ok=True)
                for walk_png in walk_pngs:
                    target_png = target_dir / walk_png.name
                    if target_png.exists():
                        skipped.append({"weapon": def_["name"], "file": str(target_png.relative_to(ROOT)), "reason": "already exists"})
                        continue
                    try:
                        synthesize_one(walk_png, target_png, num_cols)
                        manifest.append({
                            "weapon": def_["name"],
                            "anim": anim_name,
                            "layer": layer_idx,
                            "base": base,
                            "walk": str(walk_png.relative_to(ROOT)),
                            "synthesized": str(target_png.relative_to(ROOT)),
                        })
                        anims_added.add(anim_name)
                    except Exception as e:
                        skipped.append({"weapon": def_["name"], "file": str(walk_png), "reason": f"err: {e}"})

        if anims_added:
            anims = def_.get("animations") or []
            changed = False
            for a in anims_added:
                if a not in anims:
                    anims.append(a)
                    changed = True
            if changed:
                def_["animations"] = anims
                json_path.write_text(json.dumps(def_, indent=2))
                updated_jsons.append(str(json_path.relative_to(ROOT)))

    # Manifest
    (ROOT / "synthesized_combat_2h_manifest.json").write_text(
        json.dumps({"synthesized": manifest, "skipped": skipped, "updated_jsons": updated_jsons}, indent=2)
    )

    # MD report
    md = ["# Synthesized 2H Anim Placeholders", ""]
    md.append(f"Generated {len(manifest)} PNG files for {len(set(m['weapon'] for m in manifest))} weapon(s).")
    md.append(f"Updated {len(updated_jsons)} sheet_definitions JSON.")
    md.append(f"Skipped {len(skipped)} files (existing or no source).")
    md.append("")
    md.append("⚠️ **Placeholders** — weapon stays at walk-frame-0 pose while body animates.")
    md.append("Static anims (idle/sit/emote) look fine. Movement anims (run/climb/jump) look stiff.")
    md.append("Spellcast: weapon visible but doesn't move with cast motion.")
    md.append("Acceptable for prototyping; replace with artist sprites for production.")
    md.append("")
    md.append("To revert: `git restore sheet_definitions/ && jq -r '.synthesized[].synthesized' synthesized_combat_2h_manifest.json | xargs rm`")
    md.append("")
    md.append("## By anim")
    md.append("")
    by_anim = {}
    for m in manifest:
        by_anim.setdefault(m["anim"], []).append(m)
    for anim, items in sorted(by_anim.items()):
        md.append(f"### {anim} ({len(items)} files, {len(set(i['weapon'] for i in items))} weapons)")
        md.append("")
    md.append("## Files")
    md.append("")
    md.append("| Weapon | Anim | Synthesized | From Walk |")
    md.append("|---|---|---|---|")
    for m in manifest:
        md.append(f"| {m['weapon']} | {m['anim']} | `{m['synthesized']}` | `{m['walk']}` |")
    md.append("")
    if skipped:
        md.append("## Skipped")
        md.append("")
        for s in skipped:
            md.append(f"- {s.get('weapon','?')} – {s.get('reason')}: {s.get('file', s.get('base',''))}")
    (ROOT / "SYNTHESIZED_COMBAT_2H.md").write_text("\n".join(md))

    print(f"✓ Synthesized {len(manifest)} PNG files")
    print(f"✓ Updated {len(updated_jsons)} sheet_definition JSONs")
    print(f"✓ Skipped {len(skipped)} files")
    print(f"✓ SYNTHESIZED_COMBAT_2H.md + synthesized_combat_2h_manifest.json")

if __name__ == "__main__":
    main()
