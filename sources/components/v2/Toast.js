import m from "mithril";
import { getToasts, dismissToast } from "../../state/toast.js";

const KIND_CLASS = {
  info: "bg-slate-800 border-cyan-400/40 text-cyan-100",
  success: "bg-slate-800 border-emerald-400/40 text-emerald-100",
  error: "bg-slate-800 border-rose-400/40 text-rose-100",
};

export const Toast = {
  view: function () {
    const list = getToasts();
    if (!list.length) return null;
    return m(
      "div",
      {
        class: "fixed top-20 right-4 flex flex-col gap-2 pointer-events-none",
        style: { zIndex: "200" },
      },
      list.map((t) =>
        m(
          "div",
          {
            key: t.id,
            class: [
              "px-4 py-2 rounded-lg border shadow-lg text-sm font-medium pointer-events-auto transition-opacity flex items-center gap-2",
              t.action ? "" : "cursor-pointer",
              KIND_CLASS[t.kind] ?? KIND_CLASS.info,
            ].join(" "),
            onclick: t.action ? null : () => dismissToast(t.id),
          },
          [
            t.spinner &&
              m("span", {
                class:
                  "inline-block w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin",
              }),
            m("span", { class: "flex-1" }, t.message),
            t.action &&
              m(
                "button",
                {
                  class:
                    "ml-2 px-2 py-0.5 text-xs font-bold rounded bg-white/15 hover:bg-white/25 border border-white/20",
                  onclick: (e) => {
                    e.stopPropagation();
                    try {
                      t.action.onClick?.();
                    } catch {
                      /* swallow */
                    }
                    dismissToast(t.id);
                  },
                },
                t.action.label,
              ),
            t.action &&
              m(
                "button",
                {
                  class: "px-1.5 text-xs opacity-60 hover:opacity-100",
                  title: "Đóng",
                  onclick: (e) => {
                    e.stopPropagation();
                    dismissToast(t.id);
                  },
                },
                "✕",
              ),
          ],
        ),
      ),
    );
  },
};
