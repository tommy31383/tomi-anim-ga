// Tiny toast notification queue. Components read `getToasts()`; callers fire
// `showToast(message)` from anywhere. Auto-dismiss after `durationMs`.

import m from "mithril";

let nextId = 1;
/** @type {Array<{ id: number, message: string, kind: string, expiresAt: number }>} */
let toasts = [];

export function getToasts() {
  return toasts;
}

/**
 * @param {string} message
 * @param {{ kind?: "info"|"success"|"error", durationMs?: number }} [opts]
 */
/** Active expire timers keyed by toast id, so dismissToast can clearTimeout. */
const _toastTimers = new Map();

export function showToast(message, opts = {}) {
  const kind = opts.kind ?? "info";
  const durationMs = opts.durationMs ?? 2000;
  const sticky = opts.sticky === true || durationMs <= 0;
  const spinner = opts.spinner === true;
  const id = nextId++;
  toasts = [
    ...toasts,
    {
      id,
      message,
      kind,
      spinner,
      expiresAt: sticky ? null : Date.now() + durationMs,
    },
  ];
  m.redraw();
  if (!sticky) {
    const timer = setTimeout(() => {
      _toastTimers.delete(id);
      toasts = toasts.filter((t) => t.id !== id);
      m.redraw();
    }, durationMs);
    _toastTimers.set(id, timer);
  }
  return id;
}

export function updateToast(id, patch) {
  if (!toasts.some((t) => t.id === id)) return;
  toasts = toasts.map((t) => (t.id === id ? { ...t, ...patch } : t));
  m.redraw();
}

export function dismissToast(id) {
  const timer = _toastTimers.get(id);
  if (timer) {
    clearTimeout(timer);
    _toastTimers.delete(id);
  }
  toasts = toasts.filter((t) => t.id !== id);
  m.redraw();
}
