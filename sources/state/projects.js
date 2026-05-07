// Save/load named project snapshots (selections + bodyType + small extras) to
// localStorage. Each project carries an 80×80 thumbnail of the standing pose
// (walk, frame 0, down) so the dialog UI is scannable.

import m from "mithril";
import { state } from "./state.js";
import { syncSelectionsToHash } from "./hash.js";
import { renderCharacter } from "../canvas/renderer.js";
import { getCanvas } from "../canvas/renderer.js";
import { FRAME_SIZE } from "./constants.ts";

const STORAGE_KEY = "lpc.projects";
const SCHEMA_VERSION = 1;
const THUMB_SIZE = 80;

// Walk row Y on the standard sheet (row 8 → 8 * FRAME_SIZE = 512).
// Down direction is the 3rd row of an animation block (DIRECTIONS index 2).
const STANDING_X = 0;
const STANDING_Y = 8 * FRAME_SIZE + 2 * FRAME_SIZE; // walk + down

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function writeAll(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

/** Newest first. */
export function listProjects() {
  const map = readAll();
  return Object.values(map).sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getProject(id) {
  return readAll()[id] ?? null;
}

export function deleteProject(id) {
  const map = readAll();
  delete map[id];
  writeAll(map);
  if (state.currentProjectId === id) {
    state.currentProjectId = null;
    state.currentProjectName = null;
  }
  m.redraw();
}

function captureThumbnail() {
  const canvas = getCanvas();
  if (!canvas) return null;
  try {
    const out = document.createElement("canvas");
    out.width = THUMB_SIZE;
    out.height = THUMB_SIZE;
    const ctx = out.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      canvas,
      STANDING_X,
      STANDING_Y,
      FRAME_SIZE,
      FRAME_SIZE,
      0,
      0,
      THUMB_SIZE,
      THUMB_SIZE,
    );
    return out.toDataURL("image/png");
  } catch {
    return null;
  }
}

function snapshotState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    bodyType: state.bodyType,
    selections: state.selections,
    selectedAnimation: state.selectedAnimation,
    enabledAnimations: state.enabledAnimations,
    customImageZPos: state.customImageZPos,
  };
}

function newId() {
  return `prj_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * Save current state under `name`. Overwrites the matching name if `id` given,
 * otherwise creates a new entry.
 */
export function saveProject(name, id = null) {
  const trimmed = String(name || "").trim();
  if (!trimmed) throw new Error("Tên project không được rỗng");

  const map = readAll();
  const projectId = id ?? newId();
  const now = Date.now();
  const existing = map[projectId];
  map[projectId] = {
    id: projectId,
    name: trimmed,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    thumbnail: captureThumbnail(),
    data: snapshotState(),
  };
  writeAll(map);
  state.currentProjectId = projectId;
  state.currentProjectName = trimmed;
  m.redraw();
  return projectId;
}

/** Save into the currently-open project. Returns false if none is open. */
export function quickSaveCurrent() {
  if (!state.currentProjectId || !state.currentProjectName) return false;
  saveProject(state.currentProjectName, state.currentProjectId);
  return true;
}

/** Apply a saved snapshot back into state and trigger a render. */
export async function loadProject(id) {
  const project = getProject(id);
  if (!project?.data) throw new Error("Project không tồn tại");

  const d = project.data;
  // Older snapshots may omit bodyType. Fall back to current bodyType, then
  // to default — never let undefined slip through (renderer crashes on it).
  state.bodyType = d.bodyType || state.bodyType || "male";
  state.selections = d.selections ?? {};
  if (d.selectedAnimation) state.selectedAnimation = d.selectedAnimation;
  if (d.enabledAnimations) state.enabledAnimations = d.enabledAnimations;
  if (typeof d.customImageZPos === "number") {
    state.customImageZPos = d.customImageZPos;
  }
  state.customUploadedImage = null; // can't restore Image from storage

  state.currentProjectId = project.id;
  state.currentProjectName = project.name;

  syncSelectionsToHash();
  await renderCharacter(state.selections, state.bodyType);
  m.redraw();
  return project;
}

/** Serialize a project to a downloadable .json blob. */
export function exportProjectFile(id) {
  const project = getProject(id);
  if (!project) return;
  const blob = new Blob([JSON.stringify(project, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.name.replace(/[^A-Za-z0-9_-]+/g, "_")}.lpc-project.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Import a project file. Always creates a new id (so importing twice doesn't
 * overwrite an existing one). Returns the new project's id.
 */
export async function importProjectFile(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  if (!parsed?.data || typeof parsed.data !== "object") {
    throw new Error("File project không hợp lệ");
  }

  const map = readAll();
  const id = newId();
  map[id] = {
    id,
    name: parsed.name ?? file.name.replace(/\.json$/i, ""),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    thumbnail: parsed.thumbnail ?? null,
    data: parsed.data,
  };
  writeAll(map);
  m.redraw();
  return id;
}
