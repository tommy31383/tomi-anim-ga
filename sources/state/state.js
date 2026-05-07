// Global state and state operations
import m from "mithril";
import { LICENSE_CONFIG, ANIMATIONS, BODY_TYPES } from "./constants.ts";
import { syncSelectionsToHash, loadSelectionsFromHash } from "./hash.js";
import * as catalog from "./catalog.js";
import { BROKEN_ASSET_IDS } from "./broken-assets-data.js";
import { showToast } from "./toast.js";
import {
  renderCharacter,
  isOffscreenCanvasInitialized,
} from "../canvas/renderer.js";

// Dependency injection for testability (see setStateDeps / resetStateDeps)
function createDefaultStateDeps() {
  return {
    getItemMetadata: (itemId) => catalog.getItemMerged(itemId),
    selectDefaults,
    redraw: () => m.redraw(),
    syncSelectionsToHash,
    renderCharacter,
    loadSelectionsFromHash,
    getCanvasRenderer: () => (isOffscreenCanvasInitialized() ? {} : null),
  };
}

let stateDeps = createDefaultStateDeps();

export function setStateDeps(overrides) {
  Object.assign(stateDeps, overrides);
}

export function resetStateDeps() {
  stateDeps = createDefaultStateDeps();
}

export function getStateDeps() {
  return stateDeps;
}

// Global state
export const state = {
  // state that is saved in url hash
  selections: {}, // key: selectionGroup, value: { itemId, variant, name }
  bodyType: BODY_TYPES[0],

  // Currently-open project (set by projects.js on load/save).
  currentProjectId: null,
  currentProjectName: null,

  // State that is currently not saved but could be in future
  selectedAnimation: "walk",
  expandedNodes: {}, // key: path string, value: boolean (true if expanded)
  searchQuery: "", // current search query
  showTransparencyGrid: true, // show checkered transparency background
  applyTransparencyMask: false, // apply transparency mask to previews
  matchBodyColorEnabled: true, // auto-match body color to other items (default: enabled)
  compactDisplay: false, // compact item variant display (smaller thumbnails)
  customUploadedImage: null, // custom uploaded image (Image object)
  customImageZPos: 0, // z-position for custom uploaded image
  previewCanvasZoomLevel: 1, // zoom level for animation preview canvas
  fullSpritesheetCanvasZoomLevel: 1, // zoom level for full spritesheet preview canvas
  /** Set in `main.js` before `setDefaultSelections` / first `renderCharacter` (overlay vs render spinner). */
  previewBootstrapRenderDone: false,
  /** Mirrored from `renderCharacter` compositing (see `renderer.js`). */
  isRenderingCharacter: false,
  // License filters - all enabled by default (derived from LICENSE_CONFIG)
  enabledLicenses: Object.fromEntries(
    LICENSE_CONFIG.map((lic) => [lic.key, true]),
  ),
  // Animation filters - all disabled by default (filter only active when at least one is checked)
  enabledAnimations: Object.fromEntries(
    ANIMATIONS.map((anim) => [anim.value, false]),
  ),

  // Following transient state should never be saved
  zipByAnimation: {
    isRunning: false,
  },
  zipByItem: {
    isRunning: false,
  },
  zipByAnimimationAndItem: {
    isRunning: false,
  },
  zipIndividualFrames: {
    isRunning: false,
  },
  renderCharacter: {
    isRendering: false, // true if a character render is in progress
  },
};

// Helper function to get selection group from itemId
// Selection group = type_name (e.g., "body", "heads", "ears")
// This ensures only one item per type can be selected (mimics old radio button behavior)
export function getSelectionGroup(itemId) {
  const meta = stateDeps.getItemMetadata(itemId);
  if (!meta || !meta.type_name) return itemId;
  return meta.type_name;
}

// Helper function to get selection group from recolor option
// Selection group = type_name (e.g., "body", "heads", "ears")
// This ensures only one item per type can be selected (mimics old radio button behavior)
export function getSubSelectionGroup(itemId, idx) {
  const meta = stateDeps.getItemMetadata(itemId);
  const recolor = meta?.recolors?.[idx];
  if (!meta || !meta.type_name) return itemId;
  return recolor?.type_name ?? meta.type_name;
}

// Return all available expression items from the catalog (or empty if not
// ready). Each entry is the byTypeName row { itemId, name, type_name, ... }.
export function listExpressions() {
  const idx = catalog.getMetadataIndexes();
  return idx?.byTypeName?.expression ?? [];
}

/** Currently-selected expression itemId, or null. */
export function getCurrentExpressionId() {
  return state.selections.expression?.itemId ?? null;
}

// Apply a specific expression by itemId. Mirrors body recolor (skin tone).
// Returns the picked metadata or null if itemId isn't a real expression.
export async function setExpression(itemId) {
  const meta = catalog.getItemMerged(itemId);
  if (!meta || meta.type_name !== "expression") return null;
  const bodySel = state.selections[getSelectionGroup("body")];
  const bodyRecolor = bodySel?.recolor || "light";
  state.selections.expression = {
    itemId,
    subId: null,
    variant: null,
    recolor: bodyRecolor,
    name: `${meta.name} (${bodyRecolor})`,
  };
  stateDeps.syncSelectionsToHash();
  await stateDeps.renderCharacter(state.selections, state.bodyType);
  stateDeps.redraw();
  return meta;
}

// Cycle through available `expression` items in the catalog. Returns the
// new expression name (for toast/UI feedback) or null if catalog isn't
// ready yet. Mirrors the body recolor of the current selection so the
// new face matches skin tone via match_body_color.
export async function cycleExpression() {
  const idx = catalog.getMetadataIndexes();
  const rows = idx?.byTypeName?.expression;
  if (!rows?.length) return null;

  const cur = state.selections.expression;
  const curIdx = cur ? rows.findIndex((r) => r.itemId === cur.itemId) : -1;
  const nextIdx = (curIdx + 1) % rows.length;
  const next = rows[nextIdx];
  if (!next) return null;

  const meta = catalog.getItemMerged(next.itemId);
  if (!meta) return null;

  // Mirror current body recolor onto the new expression (match_body_color).
  const bodySel = state.selections[getSelectionGroup("body")];
  const bodyRecolor = bodySel?.recolor || "light";

  state.selections.expression = {
    itemId: next.itemId,
    subId: null,
    variant: null,
    recolor: bodyRecolor,
    name: `${meta.name} (${bodyRecolor})`,
  };
  stateDeps.syncSelectionsToHash();
  await stateDeps.renderCharacter(state.selections, state.bodyType);
  stateDeps.redraw();
  return meta.name;
}

// Replace ONLY the body slot with the default full-anim body ("Body Color"),
// keeping all other selections intact. Use when user picks Zombie/Skeleton
// and wants to bail back to the canonical body without losing their outfit.
//
// Body Color uses palette `recolor` (skin tones light/tan/dark/...), NOT
// `variant`. So we must clear the previous variant ("zombie"/"skeleton")
// and only carry over the previous recolor if it exists.
export async function resetBodyToFull() {
  const bodyItemId = "body";
  const bodySelectionGroup = getSelectionGroup(bodyItemId);
  const prev = state.selections[bodySelectionGroup];
  const recolor = prev?.recolor || "light";
  state.selections[bodySelectionGroup] = {
    itemId: bodyItemId,
    variant: "",
    recolor,
    name: `Body color (${recolor})`,
  };
  stateDeps.syncSelectionsToHash();
  await stateDeps.renderCharacter(state.selections, state.bodyType);
  stateDeps.redraw();
}

// Select default items (body color light + human male light head)
export async function selectDefaults() {
  // Set default body color (light)
  // itemId is now based on filename (e.g., "body")
  const bodyItemId = "body";
  const bodySelectionGroup = getSelectionGroup(bodyItemId);
  state.selections[bodySelectionGroup] = {
    itemId: bodyItemId,
    variant: "",
    recolor: "light",
    name: "Body color (light)",
  };

  // Set default head (human male light)
  // itemId is now based on filename (e.g., "heads_human_male")
  const headItemId = "heads_human_male";
  const headSelectionGroup = getSelectionGroup(headItemId);
  state.selections[headSelectionGroup] = {
    itemId: headItemId,
    variant: "",
    recolor: "light",
    name: "Human Male (light)",
  };

  // Set default expression (neutral light)
  const expressionItemId = "face_neutral";
  const expressionSelectionGroup = getSelectionGroup(expressionItemId);
  state.selections[expressionSelectionGroup] = {
    itemId: expressionItemId,
    variant: "",
    recolor: "light",
    name: "Neutral (light)",
  };

  // Update URL hash
  stateDeps.syncSelectionsToHash();

  await stateDeps.renderCharacter(state.selections, state.bodyType);

  // Trigger redraw to update preview canvas after offscreen render completes
  stateDeps.redraw();
}

// Reset all selections and restore defaults
export async function resetAll() {
  state.selections = {};
  state.customUploadedImage = null;
  state.customImageZPos = 0;
  await stateDeps.selectDefaults();
  stateDeps.redraw();
}

// Apply match body color - when any body-colored part changes, update all items with matchBodyColor: true
export function applyMatchBodyColor(variantToMatch, recolorToMatch) {
  // Only apply if feature is enabled
  if (!state.matchBodyColorEnabled) return;

  // If no variant specified, nothing to match
  if (!variantToMatch && !recolorToMatch) return;

  // Update all selected items that have matchBodyColor: true
  for (const selection of Object.values(state.selections)) {
    const itemId = selection.itemId;
    const meta = stateDeps.getItemMetadata(itemId);

    // Skip if no metadata or matchBodyColor is not enabled for this item
    if (!meta || !meta.matchBodyColor) continue;

    // Skip if subId is enabled and matchBodyColor is not enabled for this item
    if (
      selection.subId !== null &&
      selection.subId !== undefined &&
      !meta.recolors[selection.subId]?.matchBodyColor
    )
      continue;

    // Check if this item has the variant available
    if (meta.variants && meta.variants.includes(variantToMatch)) {
      // Update the variant to match
      selection.variant = variantToMatch;
      selection.name = meta.name + ` (${variantToMatch})`;
    }

    // Check if this item has the recolor available
    if (meta.recolors && meta.recolors[0]?.variants.includes(recolorToMatch)) {
      // Update the recolor to match
      selection.recolor = recolorToMatch;
      selection.name = meta.name + ` (${recolorToMatch})`;
    }
  }
}

// Initialize state with defaults or from URL
export async function initState() {
  // First, try to load from URL hash
  stateDeps.loadSelectionsFromHash();

  // If nothing in hash, set defaults
  if (Object.keys(state.selections).length === 0) {
    await stateDeps.selectDefaults();
  } else {
    // Render with loaded selections
    if (stateDeps.getCanvasRenderer()) {
      await stateDeps.renderCharacter(state.selections, state.bodyType);

      // Trigger redraw to update preview canvas after offscreen render completes
      stateDeps.redraw();
    }
  }
}

// Select Item Asset
export function selectItem(itemId, variant, isSelected = false, subId = null) {
  const selectionGroup = getSelectionGroup(itemId);
  const subSelect =
    subId !== null ? getSubSelectionGroup(itemId, subId) : selectionGroup;

  if (isSelected) {
    delete state.selections[subSelect];
  } else {
    if (BROKEN_ASSET_IDS.has(itemId)) {
      showToast(
        `⚠️ Item này có asset bị thiếu/lỗi (sẽ không render). Xem BROKEN_ASSETS.md.`,
        { kind: "error", durationMs: 4500 },
      );
    }
    // Get Meta Data
    const meta = stateDeps.getItemMetadata(itemId);
    const useVariants = meta.variants?.length > 0;
    const variantDisplayName = variant.replaceAll("_", " ");

    // Get Sub Selection Items
    const subMeta =
      !useVariants && subId !== null ? meta.recolors?.[subId] : null;
    const displayName = subMeta?.type_name ? subMeta.label : meta.name;

    // Select Item
    state.selections[subSelect] = {
      itemId: itemId,
      subId: subMeta?.type_name ? subId : null,
      variant: useVariants ? variant : null,
      recolor: useVariants ? null : variant,
      name: `${displayName} (${variantDisplayName})`,
    };

    // If this item has matchBodyColor enabled, apply to all other body-colored items
    if (
      subMeta?.matchBodyColor ||
      (subSelect === selectionGroup && meta.matchBodyColor)
    ) {
      applyMatchBodyColor(variant, !useVariants ? variant : null);
    }
  }
}
