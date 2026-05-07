// Expression picker — modal grid of all `expression` items in the catalog.
//
// Improvements over v0.12.9:
//   A. Composite thumbnails (body + head + expression) using current bodyType
//      and body recolor — matches what user actually sees.
//   B. Live hover preview — debounced setExpression on hover so main canvas
//      reflects the picked expression INSTANTLY. Commit on click; restore
//      original on Esc/close-without-click.
//   C. Search box filtering by Vietnamese label or English name.
//   D. Keyboard nav: Esc → close+restore, Enter → commit focused, arrows.
//   E. Skeleton placeholder while thumbnail layers load.
//   F. Size toggle S/M/L (48 / 72 / 96 px).

import m from "mithril";
import {
  listExpressions,
  getCurrentExpressionId,
  setExpression,
} from "../../state/state.js";
import * as catalog from "../../state/catalog.js";
import { showToast } from "../../state/toast.js";
import { state } from "../../state/state.js";
import { getLayersToLoad } from "../../state/meta.js";
import { FRAME_SIZE } from "../../state/constants.ts";

const VI_LABEL = {
  Neutral: "Bình thường",
  Smile: "Cười",
  Happy: "Vui",
  Angry: "Giận",
  Sad: "Buồn",
  Surprised: "Bất ngờ",
  Scared: "Sợ",
  Confused: "Bối rối",
  Crying: "Khóc",
  Blush: "Đỏ mặt",
  "Closed Eyes": "Nhắm mắt",
  "Closing Eyes": "Đang nhắm",
  "Looking Left": "Nhìn trái",
  "Looking Right": "Nhìn phải",
  "Rolling Eyes": "Đảo mắt",
  Sneezing: "Hắt hơi",
  Sleeping: "Ngủ",
  Yawn: "Ngáp",
};

const SIZE_PX = { S: 48, M: 72, L: 96 };
const HOVER_PREVIEW_DEBOUNCE_MS = 110;
const RECENT_KEY = "lpc.expression.recent";
const SIZE_KEY = "lpc.expression.thumbsize";
const RECENT_MAX = 5;

function _readRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function _writeRecent(itemId) {
  try {
    const cur = _readRecent().filter((x) => x !== itemId);
    cur.unshift(itemId);
    localStorage.setItem(RECENT_KEY, JSON.stringify(cur.slice(0, RECENT_MAX)));
  } catch {
    /* quota — ignore */
  }
}
function _readSize() {
  try {
    const v = localStorage.getItem(SIZE_KEY);
    return v === "S" || v === "L" ? v : "M";
  } catch {
    return "M";
  }
}
function _writeSize(v) {
  try {
    localStorage.setItem(SIZE_KEY, v);
  } catch {
    /* ignore */
  }
}

// Score a candidate against the search query. Higher = better match.
// 0 = no match. Prefix > substring > contains-word.
function _scoreMatch(text, q) {
  if (!text) return 0;
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  // word prefix (after space)
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 60;
  if (t.includes(q)) return 30;
  return 0;
}

// Cache loaded Image objects by url so we don't re-fetch on every redraw.
const _imgCache = new Map();
function _loadImg(url) {
  if (_imgCache.has(url)) return _imgCache.get(url);
  const p = new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = url;
  });
  _imgCache.set(url, p);
  return p;
}

// Composite thumbnail: body (current bodyType + recolor) + head + expression
// — at preview row 2 (south facing). Returns Promise<HTMLCanvasElement>.
async function buildCompositeThumb(expressionId, bodyRecolor, sizePx) {
  const bodySel = state.selections.body;
  const headSel = state.selections.head;
  const expMeta = catalog.getItemMerged(expressionId);
  const headMeta = headSel ? catalog.getItemMerged(headSel.itemId) : null;
  const bodyMeta = bodySel ? catalog.getItemMerged(bodySel.itemId) : null;
  if (!expMeta) return null;

  // Build layer URLs from current head + body + expression. Each item's
  // layers expose preview row/col; we use 2/0 (south stand) consistently.
  const recolor = bodyRecolor || "light";
  const previewRow = 2;
  const previewCol = 0;
  const layerStack = [];
  for (const meta of [bodyMeta, headMeta, expMeta]) {
    if (!meta) continue;
    try {
      const ls = getLayersToLoad(
        meta,
        state.bodyType,
        state.selections,
        recolor,
      );
      for (const l of ls) layerStack.push(l);
    } catch {
      // ignore — partial composite is fine
    }
  }
  if (!layerStack.length) return null;

  const imgs = await Promise.all(layerStack.map((l) => _loadImg(l.path)));
  const canvas = document.createElement("canvas");
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  // Checker bg for transparent-pixel readability
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, sizePx, sizePx);
  ctx.fillStyle = "#0f172a";
  const tile = Math.max(4, Math.floor(sizePx / 8));
  for (let yy = 0; yy < sizePx; yy += tile) {
    for (
      let xx = (yy / tile) % 2 === 0 ? 0 : tile;
      xx < sizePx;
      xx += tile * 2
    ) {
      ctx.fillRect(xx, yy, tile, tile);
    }
  }
  const sx = previewCol * FRAME_SIZE;
  const sy = previewRow * FRAME_SIZE;
  for (const img of imgs) {
    if (!img) continue;
    try {
      ctx.drawImage(img, sx, sy, FRAME_SIZE, FRAME_SIZE, 0, 0, sizePx, sizePx);
    } catch {
      /* OOB */
    }
  }
  return canvas;
}

const ExpressionThumb = {
  oninit(vnode) {
    vnode.state.canvas = null;
    vnode.state.lastKey = null;
    this.refresh(vnode);
  },
  onupdate(vnode) {
    if (vnode.attrs.cacheKey !== vnode.state.lastKey) this.refresh(vnode);
  },
  async refresh(vnode) {
    const key = vnode.attrs.cacheKey;
    vnode.state.lastKey = key;
    const c = await buildCompositeThumb(
      vnode.attrs.itemId,
      vnode.attrs.recolor,
      vnode.attrs.size,
    );
    if (vnode.state.lastKey !== key) return; // stale
    vnode.state.canvas = c;
    m.redraw();
  },
  view(vnode) {
    const sz = vnode.attrs.size;
    if (!vnode.state.canvas) {
      // Skeleton shimmer
      return m("div", {
        class: "rounded bg-slate-700/40 animate-pulse",
        style: { width: sz + "px", height: sz + "px" },
      });
    }
    return m("img", {
      src: vnode.state.canvas.toDataURL(),
      class: "rounded block",
      style: {
        width: sz + "px",
        height: sz + "px",
        imageRendering: "pixelated",
      },
    });
  },
};

export const ExpressionPickerDialog = {
  oninit(vnode) {
    vnode.state.original = getCurrentExpressionId();
    vnode.state.committed = false;
    vnode.state.search = "";
    vnode.state.size = _readSize(); // persist S/M/L across sessions
    vnode.state.focusIdx = 0;
    vnode.state.hoverTimer = null;
    vnode.state.hoverApplied = null; // last id applied via hover
    vnode.state.keyHandler = (e) => this.onKey(vnode, e);
    document.addEventListener("keydown", vnode.state.keyHandler);
  },
  oncreate() {
    document.body.style.overflow = "hidden";
  },
  onremove(vnode) {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", vnode.state.keyHandler);
    if (vnode.state.hoverTimer) clearTimeout(vnode.state.hoverTimer);
    // Restore original expression if user closed without committing.
    if (
      !vnode.state.committed &&
      vnode.state.hoverApplied &&
      vnode.state.hoverApplied !== vnode.state.original &&
      vnode.state.original
    ) {
      setExpression(vnode.state.original);
    }
  },
  renderRecent(vnode, sz, bodyRecolor) {
    const ids = _readRecent();
    if (!ids.length) return null;
    const all = listExpressions();
    const items = ids
      .map((id) => all.find((e) => e.itemId === id))
      .filter(Boolean);
    if (!items.length) return null;
    const currentId = getCurrentExpressionId();
    return m(
      "div",
      {
        class: "px-3 pt-2 pb-1 border-b border-slate-700/60 bg-slate-900/30",
        "aria-label": "Vừa dùng gần đây",
      },
      [
        m(
          "div",
          { class: "text-[9px] text-slate-500 uppercase tracking-wider mb-1" },
          "Vừa dùng",
        ),
        m(
          "div",
          { class: "flex gap-1.5 overflow-x-auto scrollbar-thin pb-1" },
          items.map((e) => {
            const meta =
              catalog.isLiteReady() && catalog.getItemMerged(e.itemId);
            const label = meta ? VI_LABEL[meta.name] || meta.name : e.name;
            const active = e.itemId === currentId;
            return m(
              "button",
              {
                key: "recent-" + e.itemId,
                class: [
                  "shrink-0 flex flex-col items-center gap-0.5 p-1 rounded border",
                  active
                    ? "bg-cyan-500/20 border-cyan-400"
                    : "bg-slate-900 border-slate-700 hover:border-cyan-400/40",
                ].join(" "),
                title: meta?.name ?? e.name,
                "aria-label": `Vừa dùng ${label}`,
                onmouseenter: () => this.schedulePreview(vnode, e.itemId),
                onclick: () => this.commit(vnode, e.itemId, label),
              },
              [
                m(ExpressionThumb, {
                  itemId: e.itemId,
                  recolor: bodyRecolor,
                  size: Math.round(sz * 0.65),
                  cacheKey: `${e.itemId}|${state.bodyType}|${bodyRecolor}|${Math.round(sz * 0.65)}`,
                }),
              ],
            );
          }),
        ),
      ],
    );
  },
  filtered(vnode) {
    const all = listExpressions();
    const q = vnode.state.search.trim().toLowerCase();
    if (!q) return all;
    // Score each candidate; sort by best score descending; drop zeros.
    const scored = all
      .map((e) => {
        const meta = catalog.isLiteReady() && catalog.getItemMerged(e.itemId);
        const en = meta?.name || e.name || "";
        const vi = VI_LABEL[meta?.name] || "";
        const score = Math.max(
          _scoreMatch(en, q),
          _scoreMatch(vi, q),
          _scoreMatch(e.itemId, q),
        );
        return { e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.map((r) => r.e);
  },
  schedulePreview(vnode, itemId) {
    if (vnode.state.hoverTimer) clearTimeout(vnode.state.hoverTimer);
    vnode.state.hoverTimer = setTimeout(() => {
      vnode.state.hoverTimer = null;
      if (itemId === vnode.state.hoverApplied) return;
      vnode.state.hoverApplied = itemId;
      setExpression(itemId);
    }, HOVER_PREVIEW_DEBOUNCE_MS);
  },
  cancelPreview(vnode) {
    if (vnode.state.hoverTimer) {
      clearTimeout(vnode.state.hoverTimer);
      vnode.state.hoverTimer = null;
    }
  },
  async commit(vnode, itemId, label) {
    vnode.state.committed = true;
    if (vnode.state.hoverApplied !== itemId) {
      await setExpression(itemId);
    }
    _writeRecent(itemId);
    const original = vnode.state.original;
    // If user changed expression, offer Undo for 5s. Otherwise just confirm.
    if (original && original !== itemId) {
      showToast(`🎭 ${label}`, {
        kind: "success",
        durationMs: 5000,
        action: {
          label: "↶ Hoàn tác",
          onClick: () => {
            setExpression(original);
            showToast("Đã hoàn tác", { kind: "info", durationMs: 1200 });
          },
        },
      });
    } else {
      showToast(`🎭 ${label}`, { kind: "success", durationMs: 1500 });
    }
    vnode.attrs.onClose?.();
  },
  onKey(vnode, e) {
    const list = this.filtered(vnode);
    if (!list.length) return;
    if (e.key === "Escape") {
      e.preventDefault();
      vnode.attrs.onClose?.();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = list[vnode.state.focusIdx] || list[0];
      if (item) {
        const meta = catalog.getItemMerged(item.itemId);
        const label = meta ? VI_LABEL[meta.name] || meta.name : item.name;
        this.commit(vnode, item.itemId, label);
      }
      return;
    }
    const cols =
      vnode.state.size === "S" ? 5 : vnode.state.size === "L" ? 3 : 4;
    let dx = 0;
    let dy = 0;
    if (e.key === "ArrowLeft") dx = -1;
    else if (e.key === "ArrowRight") dx = 1;
    else if (e.key === "ArrowUp") dy = -1;
    else if (e.key === "ArrowDown") dy = 1;
    if (dx === 0 && dy === 0) return;
    e.preventDefault();
    const next = vnode.state.focusIdx + dx + dy * cols;
    if (next >= 0 && next < list.length) {
      vnode.state.focusIdx = next;
      this.schedulePreview(vnode, list[next].itemId);
      m.redraw();
    }
  },
  view(vnode) {
    const { onClose } = vnode.attrs;
    const expressions = this.filtered(vnode);
    const currentId = getCurrentExpressionId();
    const sz = SIZE_PX[vnode.state.size];
    const colsClass =
      vnode.state.size === "S"
        ? "grid-cols-4 sm:grid-cols-5"
        : vnode.state.size === "L"
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-3 sm:grid-cols-4";
    const bodyRecolor = state.selections.body?.recolor || "light";

    return m(
      "div",
      {
        class: "fixed inset-0 flex items-center justify-center p-4",
        style: { zIndex: "150" },
      },
      [
        m("div", {
          class: "absolute inset-0 bg-slate-950/80 backdrop-blur-sm",
          onclick: onClose,
        }),
        m(
          "div",
          {
            class:
              "relative w-full max-w-lg bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[88vh]",
          },
          [
            // Header
            m(
              "div",
              {
                class:
                  "p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center",
              },
              [
                m("div", [
                  m(
                    "h2",
                    { class: "text-base font-bold text-white" },
                    "🎭 Chọn biểu cảm",
                  ),
                  m(
                    "p",
                    { class: "text-[10px] text-slate-400" },
                    `${expressions.length} biểu cảm · hover preview · Esc huỷ · Enter chọn`,
                  ),
                ]),
                m(
                  "button",
                  {
                    class:
                      "p-1.5 text-slate-400 hover:bg-slate-700 rounded-full",
                    onclick: onClose,
                  },
                  m("span.material-symbols-outlined", "close"),
                ),
              ],
            ),
            // Search + size toggle
            m(
              "div",
              {
                class:
                  "px-3 py-2 border-b border-slate-700 flex items-center gap-2",
              },
              [
                m("input", {
                  class:
                    "flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-white text-xs focus:border-cyan-400 outline-none",
                  type: "text",
                  placeholder: "Tìm: vui / sad / blush / nhắm mắt...",
                  value: vnode.state.search,
                  oninput: (e) => {
                    vnode.state.search = e.target.value;
                    vnode.state.focusIdx = 0;
                  },
                  oncreate: ({ dom }) => dom.focus(),
                }),
                ...["S", "M", "L"].map((s) =>
                  m(
                    "button",
                    {
                      class: [
                        "px-2 py-1 text-[10px] font-mono rounded border",
                        vnode.state.size === s
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white",
                      ].join(" "),
                      title: `Thumbnail ${SIZE_PX[s]}px`,
                      "aria-label": `Thumbnail size ${s}`,
                      "aria-pressed": vnode.state.size === s ? "true" : "false",
                      onclick: () => {
                        vnode.state.size = s;
                        _writeSize(s); // persist preference
                      },
                    },
                    s,
                  ),
                ),
              ],
            ),
            // Recently used row — shown only when no search active
            !vnode.state.search.trim() &&
              this.renderRecent(vnode, sz, bodyRecolor),
            // Grid
            m(
              "div",
              {
                class: `p-3 overflow-y-auto grid ${colsClass} gap-2 scrollbar-thin`,
                role: "listbox",
                "aria-label": "Danh sách biểu cảm",
                onmouseleave: () => this.cancelPreview(vnode),
              },
              expressions.length === 0
                ? m(
                    "div",
                    {
                      class:
                        "col-span-full text-center py-6 text-slate-500 text-xs",
                    },
                    vnode.state.search
                      ? `Không có biểu cảm khớp "${vnode.state.search}"`
                      : "Catalog chưa load. Đợi 1-2s rồi mở lại.",
                  )
                : expressions.map((e, idx) => {
                    const meta =
                      catalog.isLiteReady() && catalog.getItemMerged(e.itemId);
                    const label = meta
                      ? VI_LABEL[meta.name] || meta.name
                      : e.name;
                    const active = e.itemId === currentId;
                    const focused = idx === vnode.state.focusIdx;
                    return m(
                      "button",
                      {
                        key: e.itemId,
                        class: [
                          "flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-colors",
                          active
                            ? "bg-cyan-500/20 border-cyan-400"
                            : focused
                              ? "bg-slate-700 border-violet-400"
                              : "bg-slate-900 border-slate-700 hover:border-cyan-400/40 hover:bg-slate-800",
                        ].join(" "),
                        title: meta?.name ?? e.name,
                        role: "option",
                        "aria-selected": active ? "true" : "false",
                        "aria-label": `Biểu cảm ${label}`,
                        onmouseenter: () => {
                          vnode.state.focusIdx = idx;
                          this.schedulePreview(vnode, e.itemId);
                        },
                        onclick: () => this.commit(vnode, e.itemId, label),
                      },
                      [
                        m(ExpressionThumb, {
                          itemId: e.itemId,
                          recolor: bodyRecolor,
                          size: sz,
                          cacheKey: `${e.itemId}|${state.bodyType}|${bodyRecolor}|${sz}`,
                        }),
                        m(
                          "span",
                          {
                            class: `text-[10px] truncate max-w-full ${active ? "text-cyan-300 font-semibold" : focused ? "text-violet-200" : "text-slate-300"}`,
                          },
                          label,
                        ),
                      ],
                    );
                  }),
            ),
            // Footer hint
            m(
              "div",
              {
                class:
                  "px-3 py-2 border-t border-slate-700 bg-slate-900/40 flex items-center justify-between text-[10px] text-slate-500",
              },
              [
                m(
                  "span",
                  vnode.state.committed
                    ? "✅ Đã chọn"
                    : vnode.state.hoverApplied
                      ? "👁 Đang preview — click để giữ, Esc để hoàn tác"
                      : "Hover thumbnail để preview ngay trên canvas",
                ),
                m("span", { class: "font-mono" }, `↑↓←→ · Enter · Esc`),
              ],
            ),
          ],
        ),
      ],
    );
  },
};
