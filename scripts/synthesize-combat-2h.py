#!/usr/bin/env python3
"""Synthesize combat_idle PNGs for 2H weapons that lack them.

Strategy: take walk.png frame 0 (south, west, north, east) and paste it into a
new 128×256 combat_idle.png at columns 0 and 1 (combat cycle uses 2 frames).
The weapon will be visible during combat anim but pose is "walking neutral"
not "combat ready" — placeholder, NOT artist-quality.

Safety:
- Skips if combat_idle PNG already exists
- Marks each synthesized file in SYNTHESIZED_COMBAT_2H.md
- Updates sheet_definitions JSON to add "combat" to animations array
- Tracked in synthesized_combat_2h_manifest.json (for revert)

Run:  python3 scripts/synthesize-combat-2h.py
Revert: delete files listed in synthesized_combat_2h_manifest.json + git restore
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
    has_oversize_only = has_2h and "combat" not in anims
    # Also exclude shields (they have 1H combat)
    tn = (def_.get("type_name") or "").lower()
    if "shield" in tn or "ammo" in tn or "quiver" in tn:
        return False
    return has_oversize_only

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

def synthesize_one(walk_png_path, combat_png_path):
    """Make combat_idle.png from walk.png by tiling frame 0 across cols 0..1."""
    walk = Image.open(walk_png_path).convert("RGBA")
    out = Image.new("RGBA", (128, 256), (0, 0, 0, 0))
    for dir_idx in range(4):
        y = dir_idx * 64
        if y + 64 > walk.height:
            continue
        frame = walk.crop((0, y, 64, y + 64))
        out.paste(frame, (0, y))
        out.paste(frame, (64, y))
    out.save(combat_png_path, "PNG")

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
        wrote_any = False
        for layer_idx, base in base_paths:
            walk_dir = SPRITES_DIR / base / "walk"
            combat_dir = SPRITES_DIR / base / "combat_idle"

            if not walk_dir.is_dir():
                skipped.append({"weapon": def_["name"], "base": base, "reason": "no walk/ dir"})
                continue

            walk_pngs = sorted(walk_dir.glob("*.png"))
            if not walk_pngs:
                skipped.append({"weapon": def_["name"], "base": base, "reason": "walk/ empty"})
                continue

            combat_dir.mkdir(parents=True, exist_ok=True)
            for walk_png in walk_pngs:
                combat_png = combat_dir / walk_png.name
                if combat_png.exists():
                    skipped.append({"weapon": def_["name"], "file": str(combat_png.relative_to(ROOT)), "reason": "already exists"})
                    continue
                try:
                    synthesize_one(walk_png, combat_png)
                    manifest.append({
                        "weapon": def_["name"],
                        "layer": layer_idx,
                        "base": base,
                        "walk": str(walk_png.relative_to(ROOT)),
                        "combat": str(combat_png.relative_to(ROOT)),
                    })
                    wrote_any = True
                except Exception as e:
                    skipped.append({"weapon": def_["name"], "file": str(walk_png), "reason": f"err: {e}"})

        if wrote_any:
            anims = def_.get("animations") or []
            if "combat" not in anims:
                anims.append("combat")
                def_["animations"] = anims
                json_path.write_text(json.dumps(def_, indent=2))
                updated_jsons.append(str(json_path.relative_to(ROOT)))

    # Manifest
    (ROOT / "synthesized_combat_2h_manifest.json").write_text(
        json.dumps({"synthesized": manifest, "skipped": skipped, "updated_jsons": updated_jsons}, indent=2)
    )

    # MD report
    md = ["# Synthesized Combat 2H Placeholders", ""]
    md.append(f"Generated {len(manifest)} PNG files for {len(set(m['weapon'] for m in manifest))} weapon(s).")
    md.append(f"Updated {len(updated_jsons)} sheet_definitions JSON to add `combat` to animations.")
    md.append(f"Skipped {len(skipped)} files (existing or no source).")
    md.append("")
    md.append("⚠️ **These are placeholders** — weapon will appear at walk-frame-0 pose during combat anim, ")
    md.append("which means hand position may be slightly off. Acceptable for prototyping.")
    md.append("")
    md.append("To revert: `git restore sheet_definitions/ && rm $(jq -r '.synthesized[].combat' synthesized_combat_2h_manifest.json)`")
    md.append("")
    md.append("## Synthesized files")
    md.append("")
    md.append("| Weapon | Combat PNG | From Walk PNG |")
    md.append("|---|---|---|")
    for m in manifest:
        md.append(f"| {m['weapon']} | `{m['combat']}` | `{m['walk']}` |")
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
