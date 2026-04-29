import m from "mithril";
import { state, resetAll } from "../../state/state.js";
import { downloadAsPNG } from "../../canvas/download.js";
import { isOffscreenCanvasInitialized } from "../../canvas/renderer.js";
import { APP_VERSION } from "../../version.js";

const iconBtn = (icon, attrs = {}) =>
  m(
    "button",
    {
      class:
        "p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors active:scale-95 duration-200 rounded-lg",
      ...attrs,
    },
    m("span.material-symbols-outlined", icon),
  );

export const TopBar = {
  view: function (vnode) {
    const { onExport } = vnode.attrs;
    return m(
      "header",
      {
        class:
          "bg-slate-900 border-b border-slate-800 shadow-sm flex justify-between items-center px-4 h-16 w-full z-50 shrink-0",
      },
      [
        m("div", { class: "flex items-center gap-3" }, [
          m(
            "span",
            {
              class:
                "text-xl font-bold tracking-tighter bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent",
            },
            "Tomi Anim Gà",
          ),
          m(
            "span",
            {
              class:
                "text-[10px] font-mono-id px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700",
              title: "Phiên bản công cụ",
            },
            `v${APP_VERSION}`,
          ),
        ]),
        m("div.flex.items-center.gap-2", [
          m("div.flex.items-center.gap-1.bg-slate-800.p-1.rounded-lg.mr-4", [
            iconBtn("undo", {
              title: "Hoàn tác (chưa hỗ trợ)",
              disabled: true,
            }),
            iconBtn("redo", {
              title: "Làm lại (chưa hỗ trợ)",
              disabled: true,
            }),
            iconBtn("casino", {
              title: "Đặt lại tất cả",
              onclick: () => {
                if (confirm("Đặt lại tất cả lựa chọn?")) resetAll();
              },
            }),
            iconBtn("share", {
              title: "Sao chép link chia sẻ",
              onclick: async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  alert("Đã sao chép link!");
                } catch {
                  alert("Sao chép link thất bại");
                }
              },
            }),
          ]),
          m(
            "button",
            {
              class:
                "bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-bold py-2 px-6 rounded-lg active:scale-95 duration-200 shadow-lg shadow-violet-500/20",
              onclick: () => {
                if (!isOffscreenCanvasInitialized()) return;
                onExport?.();
              },
            },
            "Xuất file",
          ),
        ]),
      ],
    );
  },
};
