// Random character generator.
// Picks a body type, then walks every type_name in the catalog and randomly
// fills selections (required types are forced, optional types roll a coin).
// Honors match_body_color so heads/expressions/etc. stay in sync with body.

import { state, getStateDeps } from "./state.js";
import { BODY_TYPES } from "./constants.ts";
import * as catalog from "./catalog.js";
import { dismissToast, showToast } from "./toast.js";
import { BROKEN_ASSET_IDS } from "./broken-assets-data.js";
import { getWeaponClass } from "./weapon-classes-data.js";

const REQUIRED_TYPES = ["body", "head"];

const PROB = {
  hair: 0.95,
  expression: 0.85,
  facial_eyes: 0.7,
  clothes: 0.85,
  legs: 0.85,
  shoes: 0.7,
  hat: 0.35,
  weapon: 0.35,
  shield: 0.15,
  beard: 0.3,
  mustache: 0.2,
  wings: 0.05,
  tail: 0.05,
};
const PROB_DEFAULT = 0.12;

const MUTEX_GROUPS = [
  ["clothes", "dress", "vest", "armour"],
  ["hat", "headcover", "bandana", "visor"],
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function defSupportsBodyType(meta, bodyType) {
  const layers = meta?.layers;
  // No layers means catalog data isn't fully loaded OR the item has no
  // renderable assets — either way it cannot be picked for a random char.
  if (!layers || Object.keys(layers).length === 0) return false;
  for (const k of Object.keys(layers)) {
    if (k.startsWith("layer_") && layers[k]?.[bodyType]) return true;
  }
  return false;
}

function rollEnabled(typeName) {
  const p = PROB[typeName] ?? PROB_DEFAULT;
  return Math.random() < p;
}

function applyMutex(typesByGroup) {
  for (const group of MUTEX_GROUPS) {
    const present = group.filter((t) => typesByGroup.has(t));
    if (present.length > 1) {
      const keep = pick(present);
      for (const t of present) if (t !== keep) typesByGroup.delete(t);
    }
  }
}

/**
 * Build a random selection set and trigger a render.
 * @returns {Promise<void>}
 */
export async function randomizeCharacter() {
  if (!catalog.isLiteReady() || !catalog.isLayersReady()) {
    showToast("⏳ Đang tải dữ liệu, thử lại sau 1 giây...", { kind: "info" });
    return;
  }
  const idx = catalog.getMetadataIndexes();
  if (!idx?.byTypeName) {
    showToast("Không có dữ liệu để random.", { kind: "error" });
    return;
  }

  const loadingId = showToast("🎲 Đang random nhân vật, tải sprite...", {
    kind: "info",
    sticky: true,
    spinner: true,
  });
  state.isRandomizing = true;

  const t0 = performance.now();
  const bodyType = pick(BODY_TYPES);

  // Per type: list of { itemId, meta } supporting this body type.
  /** @type {Map<string, Array<{ itemId: string, meta: object }>>} */
  const candidates = new Map();
  for (const [typeName, rows] of Object.entries(idx.byTypeName)) {
    const list = [];
    for (const row of rows) {
      if (BROKEN_ASSET_IDS.has(row.itemId)) continue; // skip known-bad assets
      const meta = catalog.getItemMerged(row.itemId);
      if (meta && defSupportsBodyType(meta, bodyType)) {
        list.push({ itemId: row.itemId, meta });
      }
    }
    if (list.length) candidates.set(typeName, list);
  }

  const enabledTypes = new Set();
  for (const t of REQUIRED_TYPES) if (candidates.has(t)) enabledTypes.add(t);
  for (const t of candidates.keys()) {
    if (enabledTypes.has(t)) continue;
    if (rollEnabled(t)) enabledTypes.add(t);
  }
  applyMutex(enabledTypes);

  // Pick body first so we can mirror its recolor onto match_body_color items.
  // Bias toward bodies classified as "BodyFull" (have full anim coverage).
  // Fall back to any body if no Full-class candidate is available.
  const bodyCandidates = candidates.get("body");
  if (!bodyCandidates?.length) {
    dismissToast(loadingId);
    state.isRandomizing = false;
    showToast("Catalog chưa có body nào hỗ trợ — thử reload trang.", {
      kind: "error",
    });
    return;
  }
  const fullBodies = bodyCandidates.filter(
    (c) => getWeaponClass(c.itemId) === "BodyFull",
  );
  const bodyChoice = fullBodies.length
    ? pick(fullBodies)
    : pick(bodyCandidates);
  const bodyVariants = bodyChoice.meta.recolors?.[0]?.variants ?? [];
  const bodyRecolor = bodyVariants.length ? pick(bodyVariants) : "";

  /** @type {Record<string, object>} */
  const newSelections = {};
  for (const typeName of enabledTypes) {
    const choice =
      typeName === "body" ? bodyChoice : pick(candidates.get(typeName));
    const meta = choice.meta;
    const useVariants = (meta.variants?.length ?? 0) > 0;
    const recolorOptions = meta.recolors?.[0]?.variants ?? [];

    let variant = null;
    let recolor = null;
    let subId = null;

    if (useVariants) {
      variant = pick(meta.variants);
    } else if (recolorOptions.length) {
      if (meta.matchBodyColor && recolorOptions.includes(bodyRecolor)) {
        recolor = bodyRecolor;
      } else {
        recolor = pick(recolorOptions);
      }
    }

    // If recolors carry their own type_name (sub-selections), pick one.
    // Pick the index from the matching subset only — picking from the full
    // recolors array often lands on a non-sub entry, defeating the intent.
    const subIndices = [];
    const recArr = meta.recolors ?? [];
    for (let i = 0; i < recArr.length; i++) {
      const r = recArr[i];
      if (r?.type_name && r.type_name !== meta.type_name) subIndices.push(i);
    }
    if (subIndices.length) {
      subId = pick(subIndices);
      const sub = recArr[subId];
      if (sub?.variants?.length) recolor = pick(sub.variants);
    }

    const groupKey =
      subId !== null ? (meta.recolors[subId]?.type_name ?? typeName) : typeName;

    newSelections[groupKey] = {
      itemId: choice.itemId,
      subId,
      variant,
      recolor,
      name: `${meta.name} (${variant ?? recolor ?? "default"})`,
    };
  }

  state.bodyType = bodyType;
  state.selections = newSelections;

  const deps = getStateDeps();
  deps.syncSelectionsToHash();
  try {
    await deps.renderCharacter(state.selections, state.bodyType);
  } finally {
    state.isRandomizing = false;
    dismissToast(loadingId);
    deps.redraw();
  }

  const partCount = Object.keys(newSelections).length;
  const ms = Math.round(performance.now() - t0);
  showToast(`✅ Random xong (${ms}ms): ${bodyType} • ${partCount} bộ phận`, {
    kind: "success",
    durationMs: 2500,
  });
}
