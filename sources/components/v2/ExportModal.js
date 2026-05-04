import m from "mithril";
import { state } from "../../state/state.js";
import { layers } from "../../canvas/renderer.js";
import { downloadAsPNG } from "../../canvas/download.js";
import {
  extractAnimationFromCanvas,
  extractCustomAnimationFromCanvas,
  bakeTungTungSheet,
} from "../../canvas/renderer.js";
import { UnityExportDialog } from "./UnityExportDialog.js";

function downloadCanvasPng(srcCanvas, filename) {
  srcCanvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

// IMPORTANT: Mithril hyperscript shorthand (".class") cannot parse Tailwind
// classes that contain "[", "]" or "/" (e.g. z-[100], bg-slate-950/80).
// Always pass such classes via the `class:` attribute object.

export const ExportModal = {
  oninit: function (vnode) {
    vnode.state.unityOpen = false;
  },
  oncreate: function () {
    document.body.style.overflow = "hidden";
  },
  onremove: function () {
    document.body.style.overflow = "";
  },
  view: function (vnode) {
    const { onClose } = vnode.attrs;
    const selectionCount = Object.keys(state.selections).length;

    const option = (icon, title, subtitle, onclick, accent = "primary") =>
      m(
        "div",
        {
          class: [
            "flex items-center p-3 bg-slate-900 rounded-xl border transition-colors cursor-pointer group",
            accent === "primary"
              ? "border-violet-500/30 hover:border-violet-500"
              : "border-slate-700 hover:border-cyan-400/60",
          ].join(" "),
          onclick: () => {
            try {
              onclick();
            } catch (err) {
              console.error("Export option failed:", err);
              alert("Xuất thất bại: " + (err?.message || err));
            }
          },
        },
        [
          m("div", { class: "flex-1" }, [
            m("div", { class: "text-sm font-semibold text-white" }, title),
            m("div", { class: "text-[11px] text-slate-400" }, subtitle),
          ]),
          m(
            "span",
            {
              class: [
                "material-symbols-outlined transition-transform group-hover:scale-110",
                accent === "primary"
                  ? "text-violet-400"
                  : "text-slate-400 group-hover:text-cyan-400",
              ].join(" "),
            },
            icon,
          ),
        ],
      );

    return m(
      "div",
      {
        class: "fixed inset-0 flex items-center justify-center p-4",
        style: { zIndex: "100" },
      },
      [
        // Backdrop
        m("div", {
          class: "absolute inset-0 bg-slate-950/80 backdrop-blur-sm",
          onclick: onClose,
        }),

        // Dialog
        m(
          "div",
          {
            class:
              "relative w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col",
          },
          [
            // Header
            m(
              "div",
              {
                class:
                  "p-5 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center shrink-0",
              },
              [
                m("div", [
                  m(
                    "h2",
                    { class: "text-xl font-bold text-white" },
                    "Xuất tài nguyên",
                  ),
                  m(
                    "p",
                    { class: "text-xs text-slate-400" },
                    "Chuẩn bị sprite cho dự án của bạn",
                  ),
                ]),
                m(
                  "button",
                  {
                    class:
                      "p-2 text-slate-400 hover:bg-slate-700 rounded-full transition-colors",
                    onclick: onClose,
                    title: "Đóng",
                  },
                  m("span", { class: "material-symbols-outlined" }, "close"),
                ),
              ],
            ),

            // Body (scrollable)
            m(
              "div",
              {
                class:
                  "p-5 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto scrollbar-thin",
              },
              [
                // Left: Format options
                m("div", { class: "space-y-2" }, [
                  m(
                    "label",
                    {
                      class:
                        "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest",
                    },
                    "Tùy chọn định dạng",
                  ),
                  option(
                    "movie",
                    `Tải PNG Anim đang chọn (${state.selectedAnimation})`,
                    "Chỉ Anim đang xem trên canvas",
                    () => {
                      const name = state.selectedAnimation;
                      // Tưng tưng is a CSS-only preview effect (1 static frame
                      // + transform). Export the underlying Walk frame 0 + a
                      // helpful note for the user to bake the bounce in their
                      // engine (Unity / Godot / Phaser have a built-in tween).
                      if (name === "tung_tung") {
                        // Bake the CSS bounce into a real sprite sheet —
                        // 8 frames horizontal, 96×96 per tile (FRAME_SIZE
                        // 64 + 32px headroom for the hop).
                        const sheet = bakeTungTungSheet(8);
                        if (!sheet) {
                          alert(
                            "Char hiện tại không có Walk frame để bake Tưng tưng. Hãy chọn 1 body trước (mọi body đều có Walk).",
                          );
                          return;
                        }
                        downloadCanvasPng(
                          sheet,
                          "tung_tung_8f_96x96.png",
                        );
                        return;
                      }

                      // Try standard animation slot first, fall back to custom
                      // (1h_slash, slash_oversize, slash_128, …).
                      const c =
                        extractAnimationFromCanvas(name) ||
                        extractCustomAnimationFromCanvas(name);
                      if (!c) {
                        alert(
                          `Anim "${name}" không có dữ liệu để xuất.\n\nLý do thường gặp: layer hiện tại (body / head / weapon...) không có frame cho anim này. Hãy thử thêm/đổi item hỗ trợ anim, hoặc chọn anim khác (Walk / Slash / Thrust luôn có sẵn cho mọi body).`,
                        );
                        return;
                      }
                      downloadCanvasPng(c, `${name}.png`);
                    },
                    "primary",
                  ),
                  option(
                    "image",
                    "Tải PNG (cả sheet)",
                    "Toàn bộ sprite sheet 832×3456",
                    () => downloadAsPNG("character-spritesheet.png"),
                  ),
                  option(
                    "deployed_code",
                    "Xuất Unity Asset Pack (.zip)",
                    "Chọn anim cụ thể, đặt tên — sliced PNG + .anim + .meta drop thẳng vào Assets/",
                    () => {
                      vnode.state.unityOpen = true;
                    },
                    "primary",
                  ),
                ]),

                // Right: Stats
                m("div", { class: "space-y-3" }, [
                  m(
                    "label",
                    {
                      class:
                        "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest",
                    },
                    "Thống kê",
                  ),
                  m(
                    "div",
                    {
                      class:
                        "bg-slate-900 p-3 rounded-xl border border-slate-700 space-y-2",
                    },
                    [
                      m("div", { class: "flex justify-between text-xs" }, [
                        m("span", { class: "text-slate-400" }, "Lớp đã chọn:"),
                        m(
                          "span",
                          { class: "text-white font-mono-id" },
                          String(selectionCount),
                        ),
                      ]),
                      m("div", { class: "flex justify-between text-xs" }, [
                        m("span", { class: "text-slate-400" }, "Lớp đã tải:"),
                        m(
                          "span",
                          { class: "text-white font-mono-id" },
                          String(layers.length),
                        ),
                      ]),
                      m("div", { class: "flex justify-between text-xs" }, [
                        m("span", { class: "text-slate-400" }, "Kiểu cơ thể:"),
                        m(
                          "span",
                          { class: "text-white font-mono-id" },
                          state.bodyType,
                        ),
                      ]),
                      m("div", { class: "flex justify-between text-xs" }, [
                        m(
                          "span",
                          { class: "text-slate-400" },
                          "Kích thước sheet:",
                        ),
                        m(
                          "span",
                          { class: "text-white font-mono-id" },
                          "832 × 3456 px",
                        ),
                      ]),
                    ],
                  ),
                  m(
                    "p",
                    { class: "text-[10px] text-slate-500 leading-relaxed" },
                    "Mọi lựa chọn xuất sẽ áp dụng cho toàn bộ lớp đã chọn ở Bảng điều khiển bên phải. Bạn cần ghi công tác giả khi sử dụng tài nguyên này.",
                  ),
                ]),
              ],
            ),

            // Footer
            m(
              "div",
              {
                class:
                  "p-5 bg-slate-900 flex gap-3 shrink-0 border-t border-slate-700",
              },
              [
                m(
                  "button",
                  {
                    class:
                      "flex-1 py-3 px-6 rounded-xl border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors active:scale-95",
                    onclick: onClose,
                  },
                  "Đóng",
                ),
              ],
            ),
          ],
        ),
        vnode.state.unityOpen &&
          m(UnityExportDialog, {
            onClose: () => {
              vnode.state.unityOpen = false;
            },
          }),
      ],
    );
  },
};
