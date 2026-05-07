// Modal picker grid showing all `expression` items in the catalog. Click
// one → applies via state.setExpression() (mirrors body recolor) + closes.
//
// We render a small canvas thumbnail per expression by compositing the
// current head's neutral preview frame + the expression's own frame. To
// keep this component lightweight, the thumbnail just shows the
// expression sprite directly (preview row 2, col 0) with checkered bg —
// gives the user a visual cue without re-rendering full character.

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

const THUMB_SIZE = 56;

// Heuristic Vietnamese label per known expression name (fallback = original).
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

const ExpressionThumb = {
  oncreate(vnode) {
    this.draw(vnode);
  },
  onupdate(vnode) {
    if (vnode.attrs.cacheKey !== vnode.state.lastKey) this.draw(vnode);
  },
  draw(vnode) {
    const { itemId } = vnode.attrs;
    const canvas = vnode.dom;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, THUMB_SIZE, THUMB_SIZE);
    // Checker bg
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, THUMB_SIZE, THUMB_SIZE);
    ctx.fillStyle = "#0f172a";
    const tile = 7;
    for (let yy = 0; yy < THUMB_SIZE; yy += tile) {
      for (
        let xx = (yy / tile) % 2 === 0 ? 0 : tile;
        xx < THUMB_SIZE;
        xx += tile * 2
      ) {
        ctx.fillRect(xx, yy, tile, tile);
      }
    }
    vnode.state.lastKey = vnode.attrs.cacheKey;

    const meta = catalog.isLiteReady() ? catalog.getItemMerged(itemId) : null;
    if (!meta) return;
    const previewRow = meta.preview_row ?? 2;
    const previewCol = meta.preview_column ?? 0;
    let layers;
    try {
      layers = getLayersToLoad(meta, state.bodyType, state.selections, "light");
    } catch {
      return;
    }
    if (!layers?.length) return;

    Promise.all(
      layers.map(
        (l) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = () => res(img);
            img.onerror = () => res(null);
            img.src = l.path;
          }),
      ),
    ).then((imgs) => {
      if (vnode.state.lastKey !== vnode.attrs.cacheKey) return;
      const sx = previewCol * FRAME_SIZE;
      const sy = previewRow * FRAME_SIZE;
      for (const img of imgs) {
        if (!img) continue;
        try {
          ctx.drawImage(
            img,
            sx,
            sy,
            FRAME_SIZE,
            FRAME_SIZE,
            0,
            0,
            THUMB_SIZE,
            THUMB_SIZE,
          );
        } catch {
          /* OOB */
        }
      }
    });
  },
  view() {
    return m("canvas", {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      class: "block rounded",
      style: { imageRendering: "pixelated" },
    });
  },
};

export const ExpressionPickerDialog = {
  oncreate() {
    document.body.style.overflow = "hidden";
  },
  onremove() {
    document.body.style.overflow = "";
  },
  view(vnode) {
    const { onClose } = vnode.attrs;
    const expressions = listExpressions();
    const currentId = getCurrentExpressionId();

    const onPick = async (itemId, label) => {
      const meta = await setExpression(itemId);
      if (meta) {
        showToast(`🎭 ${label}`, { kind: "success", durationMs: 1500 });
        onClose?.();
      } else {
        showToast("Catalog chưa sẵn sàng", { kind: "error" });
      }
    };

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
              "relative w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[85vh]",
          },
          [
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
                    `${expressions.length} biểu cảm — match tone da hiện tại`,
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
            m(
              "div",
              {
                class:
                  "p-3 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-2 scrollbar-thin",
              },
              expressions.length === 0
                ? m(
                    "div",
                    {
                      class:
                        "col-span-full text-center py-6 text-slate-500 text-xs",
                    },
                    "Catalog chưa load xong. Đợi 1-2s rồi mở lại.",
                  )
                : expressions.map((e) => {
                    const meta =
                      catalog.isLiteReady() && catalog.getItemMerged(e.itemId);
                    const label = meta
                      ? VI_LABEL[meta.name] || meta.name
                      : e.name;
                    const active = e.itemId === currentId;
                    return m(
                      "button",
                      {
                        key: e.itemId,
                        class: [
                          "flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors",
                          active
                            ? "bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50"
                            : "bg-slate-900 border-slate-700 hover:border-cyan-400/40 hover:bg-slate-800",
                        ].join(" "),
                        title: meta?.name ?? e.name,
                        onclick: () => onPick(e.itemId, label),
                      },
                      [
                        m(ExpressionThumb, {
                          itemId: e.itemId,
                          cacheKey: `${e.itemId}|${state.bodyType}`,
                        }),
                        m(
                          "span",
                          {
                            class: `text-[10px] truncate max-w-full ${active ? "text-cyan-300 font-semibold" : "text-slate-300"}`,
                          },
                          label,
                        ),
                      ],
                    );
                  }),
            ),
          ],
        ),
      ],
    );
  },
};
