// Modal dialog asking the user to pick character name + animations to include
// in a Unity Asset Pack export. Calls exportUnityPackage with the picked set.

import m from "mithril";
import { ANIMATIONS } from "../../state/constants.ts";
import {
  exportUnityPackage,
  SUPPORTED_CUSTOM_ANIMATION_KEYS,
} from "../../state/zip-unity.js";

const SUPPORTED_ANIM_KEYS = new Set([
  "spellcast",
  "thrust",
  "walk",
  "slash",
  "shoot",
  "hurt",
  "climb",
  "idle",
  "jump",
  "sit",
  "emote",
  "run",
  "combat",
  "1h_backslash",
  "1h_halfslash",
]);

// Labels shown in dialog; mirrors CanvasArea preview tabs.
const CUSTOM_ANIM_LABELS = {
  slash_128: "Chém 128px",
  backslash_128: "Chém ngược 128px",
  halfslash_128: "Chém nửa 128px",
  thrust_128: "Đâm 128px",
  walk_128: "Đi bộ 128px",
  thrust_oversize: "Đâm Oversize",
  slash_oversize: "Chém Oversize",
  slash_reverse_oversize: "Chém ngược Oversize",
  whip_oversize: "Roi Oversize",
};

function defaultPickedSet() {
  const out = {};
  for (const a of ANIMATIONS) {
    if (a.noExport) continue;
    if (!SUPPORTED_ANIM_KEYS.has(a.value)) continue;
    out[a.value] = true;
  }
  for (const key of SUPPORTED_CUSTOM_ANIMATION_KEYS) {
    out[key] = true;
  }
  return out;
}

export const UnityExportDialog = {
  oninit: function (vnode) {
    vnode.state.charName = "Character";
    vnode.state.fps = 10;
    vnode.state.picked = defaultPickedSet();
    vnode.state.busy = false;
  },
  oncreate: function () {
    document.body.style.overflow = "hidden";
  },
  onremove: function () {
    document.body.style.overflow = "";
  },
  view: function (vnode) {
    const { onClose } = vnode.attrs;
    const animList = ANIMATIONS.filter(
      (a) => !a.noExport && SUPPORTED_ANIM_KEYS.has(a.value),
    );
    const customList = SUPPORTED_CUSTOM_ANIMATION_KEYS.map((value) => ({
      value,
      label: CUSTOM_ANIM_LABELS[value] ?? value,
    }));
    const allKeys = [
      ...animList.map((a) => a.value),
      ...customList.map((c) => c.value),
    ];
    const pickedCount = allKeys.filter((k) => vnode.state.picked[k]).length;
    const totalCount = allKeys.length;

    const toggleAll = (on) => {
      const next = {};
      for (const k of allKeys) next[k] = on;
      vnode.state.picked = next;
    };

    const submit = async () => {
      const selected = Object.keys(vnode.state.picked).filter(
        (k) => vnode.state.picked[k],
      );
      if (!selected.length) {
        alert("Hãy chọn ít nhất 1 animation.");
        return;
      }
      vnode.state.busy = true;
      try {
        await exportUnityPackage({
          charName: vnode.state.charName,
          fps: Number(vnode.state.fps) || 10,
          selectedAnimations: selected,
        });
        onClose?.();
      } finally {
        vnode.state.busy = false;
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
          onclick: vnode.state.busy ? undefined : onClose,
        }),
        m(
          "div",
          {
            class:
              "relative w-full max-w-lg bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]",
          },
          [
            // Header
            m(
              "div",
              {
                class:
                  "p-5 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center",
              },
              [
                m("div", [
                  m(
                    "h2",
                    { class: "text-lg font-bold text-white" },
                    "Xuất Unity Asset Pack",
                  ),
                  m(
                    "p",
                    { class: "text-xs text-slate-400" },
                    "Chọn tên nhân vật và animation muốn include",
                  ),
                ]),
                m(
                  "button",
                  {
                    class: "p-2 text-slate-400 hover:bg-slate-700 rounded-full",
                    onclick: onClose,
                    disabled: vnode.state.busy,
                  },
                  m("span.material-symbols-outlined", "close"),
                ),
              ],
            ),
            // Body
            m(
              "div",
              { class: "p-5 overflow-y-auto space-y-4 scrollbar-thin" },
              [
                // Char name
                m("label", { class: "block" }, [
                  m(
                    "span",
                    {
                      class:
                        "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest",
                    },
                    "Tên nhân vật",
                  ),
                  m("input", {
                    class:
                      "mt-1 w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-400 outline-none",
                    type: "text",
                    value: vnode.state.charName,
                    oninput: (e) => {
                      vnode.state.charName = e.target.value;
                    },
                  }),
                ]),
                // FPS
                m("label", { class: "block" }, [
                  m(
                    "span",
                    {
                      class:
                        "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest",
                    },
                    "FPS (mặc định 10)",
                  ),
                  m("input", {
                    class:
                      "mt-1 w-32 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-400 outline-none",
                    type: "number",
                    min: 1,
                    max: 60,
                    value: vnode.state.fps,
                    oninput: (e) => {
                      vnode.state.fps = e.target.value;
                    },
                  }),
                ]),
                // Anim picker
                m("div", [
                  m(
                    "div",
                    { class: "flex justify-between items-center mb-2" },
                    [
                      m(
                        "span",
                        {
                          class:
                            "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest",
                        },
                        `Animations (${pickedCount}/${totalCount})`,
                      ),
                      m("div", { class: "flex gap-1" }, [
                        m(
                          "button",
                          {
                            class:
                              "text-[10px] px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200",
                            onclick: () => toggleAll(true),
                          },
                          "Chọn hết",
                        ),
                        m(
                          "button",
                          {
                            class:
                              "text-[10px] px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200",
                            onclick: () => toggleAll(false),
                          },
                          "Bỏ hết",
                        ),
                      ]),
                    ],
                  ),
                  m(
                    "div",
                    {
                      class:
                        "grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-700",
                    },
                    animList.map((a) =>
                      m(
                        "label",
                        {
                          class:
                            "flex items-center gap-2 text-sm text-slate-200 cursor-pointer hover:text-white",
                        },
                        [
                          m("input", {
                            type: "checkbox",
                            checked: !!vnode.state.picked[a.value],
                            onchange: (e) => {
                              vnode.state.picked = {
                                ...vnode.state.picked,
                                [a.value]: e.target.checked,
                              };
                            },
                          }),
                          m("span", a.label),
                          a.value.startsWith("1h_") &&
                            m(
                              "span",
                              {
                                class:
                                  "text-[9px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded",
                                title:
                                  "Một số vũ khí có thể không hiển thị trong anim 1-hand",
                              },
                              "1H",
                            ),
                        ],
                      ),
                    ),
                  ),
                ]),
                // Custom (oversize / 128px) anims
                m("div", [
                  m(
                    "span",
                    {
                      class:
                        "text-[11px] font-mono-tag text-cyan-400 uppercase tracking-widest block mb-2",
                    },
                    "Anim Oversize / 128px (vũ khí to)",
                  ),
                  m(
                    "div",
                    {
                      class:
                        "grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-700",
                    },
                    customList.map((c) =>
                      m(
                        "label",
                        {
                          class:
                            "flex items-center gap-2 text-sm text-slate-200 cursor-pointer hover:text-white",
                        },
                        [
                          m("input", {
                            type: "checkbox",
                            checked: !!vnode.state.picked[c.value],
                            onchange: (e) => {
                              vnode.state.picked = {
                                ...vnode.state.picked,
                                [c.value]: e.target.checked,
                              };
                            },
                          }),
                          m("span", { class: "flex-1 truncate" }, c.label),
                          m(
                            "span",
                            {
                              class:
                                "text-[9px] px-1.5 py-0.5 bg-violet-500/20 text-violet-300 rounded",
                              title:
                                "Custom animation, frameSize 128 — chỉ có data nếu char đang dùng vũ khí oversize tương ứng",
                            },
                            c.value.endsWith("_oversize") ? "OS" : "128",
                          ),
                        ],
                      ),
                    ),
                  ),
                ]),
              ],
            ),
            // Footer
            m(
              "div",
              {
                class: "p-4 bg-slate-900 border-t border-slate-700 flex gap-3",
              },
              [
                m(
                  "button",
                  {
                    class:
                      "flex-1 py-2 px-4 rounded-lg border border-slate-700 text-white hover:bg-slate-800",
                    onclick: onClose,
                    disabled: vnode.state.busy,
                  },
                  "Đóng",
                ),
                m(
                  "button",
                  {
                    class:
                      "flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold hover:opacity-90 active:scale-95 disabled:opacity-50",
                    onclick: submit,
                    disabled: vnode.state.busy,
                  },
                  vnode.state.busy ? "Đang xuất..." : "Xuất ZIP",
                ),
              ],
            ),
          ],
        ),
      ],
    );
  },
};
