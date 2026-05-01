// Scan every sheet_definition for missing or fully-transparent canonical PNGs.
// Outputs:
//   - BROKEN_ASSETS.md   (human-readable report)
//   - sources/state/broken-assets-data.js  (consumed by random-character.js
//     to skip these items)
//
// Run:  node scripts/scan-broken-assets.js

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SHEET_DEF_DIR = path.join(ROOT, "sheet_definitions");
const SPRITESHEETS_DIR = path.join(ROOT, "spritesheets");

const SEX_PRIORITY = [
  "male",
  "female",
  "muscular",
  "pregnant",
  "teen",
  "child",
];
const PREFERRED_ANIMS = ["walk", "spellcast", "thrust", "slash", "idle"];

function itemIdFromPath(jsonPath) {
  // Mirror scripts/generateSources/items.js convention: relative path under
  // sheet_definitions/, drop .json, replace path sep with "_".
  const rel = path.relative(SHEET_DEF_DIR, jsonPath).replace(/\.json$/, "");
  return rel.split(path.sep).join("_");
}

async function walkJsonFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkJsonFiles(full)));
    } else if (
      entry.name.endsWith(".json") &&
      !entry.name.startsWith("meta_")
    ) {
      out.push(full);
    }
  }
  return out;
}

function pickAnimation(def) {
  const anims = Array.isArray(def.animations) ? def.animations : [];
  for (const want of PREFERRED_ANIMS) {
    if (anims.includes(want)) return want;
  }
  return anims[0] ?? "walk";
}

function pickSexAndPath(def) {
  for (let i = 1; i < 10; i++) {
    const layer = def[`layer_${i}`];
    if (!layer) break;
    if (layer.custom_animation) continue; // prefer standard layer for canonical
    for (const sex of SEX_PRIORITY) {
      if (typeof layer[sex] === "string" && layer[sex].length) {
        return { sex, basePath: layer[sex], customAnim: null };
      }
    }
  }
  // Fallback: first layer + first sex even if custom_animation
  const layer1 = def.layer_1;
  if (layer1) {
    for (const sex of SEX_PRIORITY) {
      if (typeof layer1[sex] === "string" && layer1[sex].length) {
        return {
          sex,
          basePath: layer1[sex],
          customAnim: layer1.custom_animation ?? null,
        };
      }
    }
  }
  return null;
}

function expectedPath(def, picked, anim) {
  const variants = Array.isArray(def.variants) ? def.variants : [];
  // Custom animation layers: path is `<base><variant>.png` (no anim subfolder).
  if (picked.customAnim) {
    if (variants.length) {
      return `spritesheets/${picked.basePath}${variants[0]}.png`;
    }
    return `spritesheets/${picked.basePath}${picked.customAnim}.png`;
  }
  if (variants.length) {
    return `spritesheets/${picked.basePath}${anim}/${variants[0]}.png`;
  }
  return `spritesheets/${picked.basePath}${anim}.png`;
}

// Read PNG IDAT minimally to detect "all alpha = 0"? Pure JS PNG parse is
// nontrivial. We approximate: a fully-transparent 64×3456 PNG compresses very
// small. Tier the check by file size first; flag <300 bytes as "likely empty".
// (False-positive rate small; broken assets in this repo are usually 145-200B.)
const TRANSPARENT_BYTE_THRESHOLD = 300;

async function checkPng(absPath) {
  try {
    const stat = await fs.stat(absPath);
    if (stat.size <= TRANSPARENT_BYTE_THRESHOLD) {
      return { status: "empty", size: stat.size };
    }
    return { status: "ok", size: stat.size };
  } catch (e) {
    if (e.code === "ENOENT") return { status: "missing" };
    return { status: "error", error: String(e) };
  }
}

async function main() {
  const jsonFiles = await walkJsonFiles(SHEET_DEF_DIR);
  console.log(`Scanning ${jsonFiles.length} sheet definitions...`);

  const missing = [];
  const empty = [];
  const errored = [];
  const noPath = [];
  let healthy = 0;

  for (const jsonPath of jsonFiles) {
    let def;
    try {
      def = JSON.parse(await fs.readFile(jsonPath, "utf8"));
    } catch (e) {
      errored.push({
        itemId: itemIdFromPath(jsonPath),
        reason: `parse: ${e.message}`,
      });
      continue;
    }

    const itemId = itemIdFromPath(jsonPath);
    if (!def.name && !def.type_name) {
      // probably a meta-only file already filtered, skip
      continue;
    }

    const picked = pickSexAndPath(def);
    if (!picked) {
      noPath.push({ itemId, name: def.name, reason: "no layer with sex path" });
      continue;
    }

    const anim = pickAnimation(def);
    const rel = expectedPath(def, picked, anim);

    // Paths with ${head} / ${other} template vars are resolved at render time
    // against the actual head/body selection. Cannot validate offline — treat
    // as healthy (false positive otherwise).
    if (rel.includes("${")) {
      healthy++;
      continue;
    }

    const abs = path.join(ROOT, rel);
    const result = await checkPng(abs);

    if (result.status === "missing") {
      missing.push({
        itemId,
        name: def.name,
        type_name: def.type_name,
        sex: picked.sex,
        anim,
        path: rel,
      });
    } else if (result.status === "empty") {
      empty.push({
        itemId,
        name: def.name,
        type_name: def.type_name,
        sex: picked.sex,
        anim,
        path: rel,
        size: result.size,
      });
    } else if (result.status === "error") {
      errored.push({ itemId, reason: result.error });
    } else {
      healthy++;
    }
  }

  // --- Markdown report ---
  const md = [];
  md.push(`# Broken Assets Report`);
  md.push(``);
  md.push(
    `Scanned ${jsonFiles.length} sheet definitions on ${new Date().toISOString()}.`,
  );
  md.push(``);
  md.push(`## Summary`);
  md.push(`- ✅ Healthy: ${healthy}`);
  md.push(`- ❌ Missing PNG file: ${missing.length}`);
  md.push(
    `- ⚠️ Likely empty (≤${TRANSPARENT_BYTE_THRESHOLD} bytes, fully transparent): ${empty.length}`,
  );
  md.push(`- ❓ No layer/sex path: ${noPath.length}`);
  md.push(`- 💥 Errored: ${errored.length}`);
  md.push(``);

  if (missing.length) {
    md.push(`## ❌ Missing files (${missing.length})`);
    md.push(`Sheet def references a path but PNG file does not exist.`);
    md.push(``);
    md.push(`| itemId | type | name | sex/anim | expected path |`);
    md.push(`|---|---|---|---|---|`);
    for (const r of missing) {
      md.push(
        `| \`${r.itemId}\` | ${r.type_name ?? "-"} | ${r.name ?? "-"} | ${r.sex}/${r.anim} | \`${r.path}\` |`,
      );
    }
    md.push(``);
  }

  if (empty.length) {
    md.push(`## ⚠️ Likely fully transparent (${empty.length})`);
    md.push(
      `PNG exists but is ≤${TRANSPARENT_BYTE_THRESHOLD} bytes — almost certainly a 0-alpha placeholder.`,
    );
    md.push(``);
    md.push(`| itemId | type | name | sex/anim | size | path |`);
    md.push(`|---|---|---|---|---:|---|`);
    for (const r of empty) {
      md.push(
        `| \`${r.itemId}\` | ${r.type_name ?? "-"} | ${r.name ?? "-"} | ${r.sex}/${r.anim} | ${r.size}B | \`${r.path}\` |`,
      );
    }
    md.push(``);
  }

  if (noPath.length) {
    md.push(`## ❓ No layer/sex path (${noPath.length})`);
    md.push(
      `Sheet def has no layer with a sex-mapped string — may be a meta or container def.`,
    );
    md.push(``);
    for (const r of noPath) {
      md.push(`- \`${r.itemId}\` (${r.name ?? "-"}): ${r.reason}`);
    }
    md.push(``);
  }

  if (errored.length) {
    md.push(`## 💥 Errored (${errored.length})`);
    md.push(``);
    for (const r of errored) md.push(`- \`${r.itemId}\`: ${r.reason}`);
    md.push(``);
  }

  await fs.writeFile(path.join(ROOT, "BROKEN_ASSETS.md"), md.join("\n"));
  console.log(`✓ BROKEN_ASSETS.md written`);

  // --- Data module consumed by app (random-character.js) ---
  const brokenIds = new Set([
    ...missing.map((r) => r.itemId),
    ...empty.map((r) => r.itemId),
  ]);
  const dataJs = `// AUTO-GENERATED by scripts/scan-broken-assets.js. DO NOT EDIT.
// Item IDs whose canonical PNG is missing or fully transparent. Random
// character generation skips these; manual selection still allowed but the
// app warns the user.

export const BROKEN_ASSET_IDS = new Set(${JSON.stringify([...brokenIds].sort(), null, 2)});

export const BROKEN_ASSETS_GENERATED_AT = ${JSON.stringify(new Date().toISOString())};
export const BROKEN_ASSETS_COUNT = ${brokenIds.size};
`;
  await fs.writeFile(
    path.join(ROOT, "sources/state/broken-assets-data.js"),
    dataJs,
  );
  console.log(
    `✓ sources/state/broken-assets-data.js written (${brokenIds.size} items)`,
  );

  console.log(
    `\nSummary: ${healthy} healthy, ${missing.length} missing, ${empty.length} empty, ${noPath.length} no-path, ${errored.length} errored`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
