import m from "mithril";
import { state, selectItem } from "../../state/state.js";
import * as catalog from "../../state/catalog.js";
import { getLayersToLoad } from "../../state/meta.js";
import { FRAME_SIZE } from "../../state/constants.ts";

const THUMB_SIZE = 36;

// Per-item thumbnail. Loads the item's preview frame (preview_row/column from
// metadata) and draws it onto a small canvas. Reuses getLayersToLoad — same
// path the existing TreeNode uses, so colors / variants match the canvas.
const ItemThumbnail = {
  oncreate: function (vnode) {
    this.draw(vnode);
  },
  onupdate: function (vnode) {
    if (vnode.attrs.cacheKey !== vnode.state.lastKey) this.draw(vnode);
  },
  draw: function (vnode) {
    const { itemId, variant } = vnode.attrs;
    const canvas = vnode.dom;
    const meta = catalog.isLiteReady() ? catalog.getItemMerged(itemId) : null;
    if (!meta) return;
    vnode.state.lastKey = vnode.attrs.cacheKey;

    const previewRow = meta.preview_row ?? 2;
    const previewCol = meta.preview_column ?? 0;
    const previewXOffset = meta.preview_x_offset ?? 0;
    const previewYOffset = meta.preview_y_offset ?? 0;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, THUMB_SIZE, THUMB_SIZE);

    let layers;
    try {
      layers = getLayersToLoad(meta, state.bodyType, state.selections, variant);
    } catch {
      return;
    }
    if (!layers || layers.length === 0) return;

    Promise.all(
      layers.map(
        (l) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = () => res({ img, l });
            img.onerror = () => res({ img: null, l });
            img.src = l.path;
          }),
      ),
    ).then((loaded) => {
      if (vnode.state.lastKey !== vnode.attrs.cacheKey) return;
      ctx.clearRect(0, 0, THUMB_SIZE, THUMB_SIZE);
      const sx = previewCol * FRAME_SIZE + previewXOffset;
      const sy = previewRow * FRAME_SIZE + previewYOffset;
      for (const { img } of loaded) {
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
          /* ignore frame OOB */
        }
      }
    });
  },
  view: function () {
    return m("canvas", {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      class: "block",
      style: { imageRendering: "pixelated", width: "36px", height: "36px" },
    });
  },
};

// Mithril hyperscript selector splits on "." and "[" — Tailwind classes
// containing those chars (text-[10px], bg-slate-900/40, hover:underline)
// must be passed via the `class:` attribute, not inline `m("div.cls...")`.

export const Inspector = {
  oninit: (vnode) => {
    vnode.state.tab = "layers";
  },
  view: function (vnode) {
    const selections = Object.entries(state.selections);
    const tab = vnode.state.tab;

    return m(
      "aside",
      {
        class:
          "bg-slate-800 border-l border-slate-700 w-[320px] shrink-0 flex flex-col h-full overflow-hidden",
      },
      [
        m(
          "div",
          {
            class: "p-4 border-b border-slate-700 bg-slate-900/30",
          },
          [
            m(
              "div",
              { class: "flex items-center justify-between" },
              [
                m(
                  "h2",
                  { class: "text-white text-lg font-bold" },
                  "Lớp đã chọn",
                ),
                m(
                  "span",
                  {
                    class:
                      "text-[10px] font-mono-tag bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded-full",
                  },
                  `${selections.length} mục`,
                ),
              ],
            ),
            m(
              "p",
              { class: "text-slate-500 text-xs mt-0.5" },
              "Tất cả item bạn đang dùng cho nhân vật",
            ),
          ],
        ),

        // Tabs
        m(
          "div",
          { class: "flex border-b border-slate-700" },
          [
            ["layers", "layers", "Lớp"],
            ["palette", "palette", "Màu sắc"],
          ].map(([key, icon, label]) => {
            const active = tab === key;
            return m(
              "button",
              {
                class: [
                  "flex-1 py-3 flex items-center justify-center gap-2 text-xs transition-all",
                  active
                    ? "text-violet-400 border-b-2 border-violet-400 bg-slate-900/50"
                    : "text-slate-500 hover:text-slate-300",
                ].join(" "),
                onclick: () => (vnode.state.tab = key),
              },
              [
                m(
                  "span",
                  { class: "material-symbols-outlined text-sm" },
                  icon,
                ),
                m("span", label),
              ],
            );
          }),
        ),

        // Content
        m("div", { class: "flex-1 overflow-y-auto scrollbar-thin" }, [
          tab === "layers" && m(LayerList, { selections }),
          tab === "palette" && m(PalettePanel),
        ]),

        // Sticky bottom export card
        m(
          "div",
          {
            class:
              "p-4 bg-slate-900 border-t border-slate-700 shadow-2xl shrink-0",
          },
          [
            m(
              "div",
              {
                class:
                  "bg-slate-800 p-3 rounded-xl border border-slate-700 mb-3",
              },
              [
                m(
                  "div",
                  { class: "flex justify-between items-center mb-2" },
                  [
                    m(
                      "span",
                      {
                        class:
                          "text-[10px] font-mono-tag text-slate-400 uppercase tracking-widest",
                      },
                      "Lớp đã chọn",
                    ),
                    m(
                      "span",
                      {
                        class:
                          "text-[10px] font-mono-tag bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded",
                      },
                      `${selections.length} MỤC`,
                    ),
                  ],
                ),
                m(
                  "div",
                  { class: "flex gap-1" },
                  Array.from({ length: 4 }).map((_, i) =>
                    m(
                      "div",
                      { class: "flex-1 h-1 bg-slate-700 rounded-full" },
                      i < Math.min(selections.length, 4) &&
                        m("div", {
                          class: "h-full bg-cyan-400 rounded-full",
                          style: { width: "100%" },
                        }),
                    ),
                  ),
                ),
              ],
            ),
            m(
              "button",
              {
                class:
                  "w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-extrabold py-3 rounded-xl shadow-xl shadow-cyan-500/10 active:scale-95 transition-transform",
                onclick: () => vnode.attrs.onExport?.(),
              },
              "TẠO SPRITE SHEET",
            ),
          ],
        ),
      ],
    );
  },
};

const LayerList = {
  view: function (vnode) {
    const { selections } = vnode.attrs;
    if (selections.length === 0) {
      return m(
        "div",
        { class: "p-6 text-center text-slate-500 text-xs" },
        "Chưa chọn lớp nào. Hãy chọn mục từ Thư viện tài nguyên.",
      );
    }
    return m(
      "div",
      { class: "p-3 space-y-2" },
      selections.map(([key, sel]) => {
        const meta = catalog.isLiteReady()
          ? catalog.getItemMerged(sel.itemId)
          : null;
        const typeName = meta?.type_name || key;
        return m(
          "div",
          {
            class:
              "flex items-center gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-colors group",
          },
          [
            m(
              "span",
              {
                class:
                  "material-symbols-outlined text-slate-600 cursor-grab text-base",
              },
              "drag_indicator",
            ),
            m(
              "div",
              {
                class:
                  "w-9 h-9 bg-slate-800 rounded-md border border-slate-700 shrink-0 flex items-center justify-center text-slate-500 overflow-hidden",
              },
              m(ItemThumbnail, {
                itemId: sel.itemId,
                variant: sel.variant || sel.recolor,
                cacheKey: `${sel.itemId}|${sel.variant || ""}|${sel.recolor || ""}|${state.bodyType}`,
              }),
            ),
            m("div", { class: "flex-1 min-w-0" }, [
              m(
                "div",
                {
                  class: "text-[11px] font-bold text-slate-200 truncate",
                },
                sel.name || sel.itemId,
              ),
              m(
                "div",
                {
                  class: "text-[9px] text-slate-500 font-mono-id truncate",
                },
                typeName,
              ),
            ]),
            m("div", { class: "flex items-center gap-1" }, [
              m(
                "button",
                {
                  class: "text-violet-400 hover:text-violet-300 p-1",
                  title: "Hiển thị",
                },
                m(
                  "span",
                  {
                    class: "material-symbols-outlined text-sm",
                    style: { fontVariationSettings: "'FILL' 1" },
                  },
                  "visibility",
                ),
              ),
              m(
                "button",
                {
                  class: "text-slate-500 hover:text-error p-1",
                  title: "Xóa",
                  onclick: () => {
                    selectItem(sel.itemId, sel.variant, true);
                  },
                },
                m(
                  "span",
                  { class: "material-symbols-outlined text-sm" },
                  "delete",
                ),
              ),
            ]),
          ],
        );
      }),
    );
  },
};

const PALETTE_SWATCHES = [
  "#31009a", "#4816cb", "#947dff", "#cabeff", "#603ce2", "#1c0062",
  "#00ddb5", "#00e0b8", "#44fad0", "#00382c", "#005c4a", "#005141",
];

const PalettePanel = {
  view: function () {
    return m("div", { class: "p-4 space-y-4" }, [
      m("div", { class: "flex justify-between items-center" }, [
        m(
          "h4",
          { class: "text-white text-xs font-bold flex items-center gap-2" },
          [
            m(
              "span",
              {
                class: "material-symbols-outlined text-base text-violet-400",
              },
              "color_lens",
            ),
            "Đổi màu palette",
          ],
        ),
        m(
          "button",
          {
            class:
              "text-violet-400 hover:underline text-[10px] font-mono-tag uppercase",
          },
          "Đặt lại",
        ),
      ]),
      m(
        "p",
        { class: "text-[10px] text-slate-500" },
        "Chọn một mục trong Thư viện tài nguyên để đổi màu. Đây là bảng màu xem trước.",
      ),
      m(
        "div",
        { class: "grid grid-cols-6 gap-2" },
        PALETTE_SWATCHES.map((color) =>
          m("div", {
            class:
              "w-full aspect-square rounded border border-slate-700 cursor-pointer hover:scale-110 transition-transform",
            style: { backgroundColor: color },
          }),
        ),
      ),
    ]);
  },
};
