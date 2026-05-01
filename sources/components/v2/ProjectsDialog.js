// Save/Load project manager. Uses sources/state/projects.js for persistence
// (localStorage + JSON file import/export) and shows the standing-pose
// thumbnail captured at save time so the list is scannable.

import m from "mithril";
import {
  deleteProject,
  exportProjectFile,
  importProjectFile,
  listProjects,
  loadProject,
  saveProject,
} from "../../state/projects.js";
import { showToast } from "../../state/toast.js";

function relativeTime(ts) {
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 60) return "vừa xong";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
  return `${Math.floor(diffSec / 86400)} ngày trước`;
}

export const ProjectsDialog = {
  oninit: function (vnode) {
    vnode.state.newName = "";
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
    const projects = listProjects();

    const handleSave = () => {
      try {
        saveProject(vnode.state.newName);
        showToast(`💾 Đã lưu "${vnode.state.newName}"`, { kind: "success" });
        vnode.state.newName = "";
      } catch (err) {
        showToast(err.message || String(err), { kind: "error" });
      }
    };

    const handleLoad = async (id, name) => {
      vnode.state.busy = true;
      try {
        await loadProject(id);
        showToast(`📂 Đã load "${name}"`, { kind: "success" });
        onClose?.();
      } catch (err) {
        showToast(err.message || String(err), { kind: "error" });
      } finally {
        vnode.state.busy = false;
      }
    };

    const handleDelete = (id, name) => {
      if (!confirm(`Xóa project "${name}"?`)) return;
      deleteProject(id);
      showToast(`🗑 Đã xóa "${name}"`, { kind: "info" });
    };

    const handleImport = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const id = await importProjectFile(file);
        const proj = listProjects().find((p) => p.id === id);
        showToast(`📥 Đã import "${proj?.name ?? "project"}"`, {
          kind: "success",
        });
      } catch (err) {
        showToast(err.message || "Import thất bại", { kind: "error" });
      } finally {
        e.target.value = "";
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
              "relative w-full max-w-xl bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]",
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
                  m("h2", { class: "text-lg font-bold text-white" }, "Dự án"),
                  m(
                    "p",
                    { class: "text-xs text-slate-400" },
                    `Lưu / load nhân vật • ${projects.length} project đã lưu`,
                  ),
                ]),
                m(
                  "button",
                  {
                    class: "p-2 text-slate-400 hover:bg-slate-700 rounded-full",
                    onclick: onClose,
                  },
                  m("span.material-symbols-outlined", "close"),
                ),
              ],
            ),
            // Save row
            m("div", { class: "p-4 border-b border-slate-700 flex gap-2" }, [
              m("input", {
                class:
                  "flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-400 outline-none",
                type: "text",
                placeholder: "Tên project mới (ví dụ: Warrior_Light)",
                value: vnode.state.newName,
                oninput: (e) => {
                  vnode.state.newName = e.target.value;
                },
                onkeydown: (e) => {
                  if (e.key === "Enter" && vnode.state.newName.trim()) {
                    handleSave();
                  }
                },
              }),
              m(
                "button",
                {
                  class:
                    "px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center gap-1",
                  onclick: handleSave,
                  disabled: !vnode.state.newName.trim(),
                },
                [m("span.material-symbols-outlined.text-base", "save"), "Lưu"],
              ),
            ]),
            // List
            m(
              "div",
              {
                class: "flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin",
              },
              projects.length === 0
                ? m(
                    "div",
                    {
                      class: "text-center py-8 text-slate-500 text-sm",
                    },
                    "Chưa có project nào. Tạo nhân vật rồi đặt tên + lưu ở trên.",
                  )
                : projects.map((p) =>
                    m(
                      "div",
                      {
                        key: p.id,
                        class:
                          "flex items-center gap-3 p-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-400/40 transition-colors",
                      },
                      [
                        // Thumbnail
                        p.thumbnail
                          ? m("img", {
                              src: p.thumbnail,
                              class:
                                "w-14 h-14 rounded bg-slate-800 border border-slate-700 object-contain",
                              style: { imageRendering: "pixelated" },
                              alt: p.name,
                            })
                          : m(
                              "div",
                              {
                                class:
                                  "w-14 h-14 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500",
                              },
                              m("span.material-symbols-outlined", "person"),
                            ),
                        // Name + meta
                        m("div", { class: "flex-1 min-w-0" }, [
                          m(
                            "div",
                            {
                              class:
                                "text-sm font-semibold text-white truncate",
                            },
                            p.name,
                          ),
                          m(
                            "div",
                            { class: "text-[10px] text-slate-500" },
                            `${p.data?.bodyType ?? "?"} • ${
                              Object.keys(p.data?.selections ?? {}).length
                            } phần • ${relativeTime(p.updatedAt)}`,
                          ),
                        ]),
                        // Actions
                        m("div", { class: "flex gap-1 shrink-0" }, [
                          m(
                            "button",
                            {
                              class:
                                "px-2 py-1 text-xs rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 disabled:opacity-50",
                              onclick: () => handleLoad(p.id, p.name),
                              disabled: vnode.state.busy,
                              title: "Load project",
                            },
                            "Load",
                          ),
                          m(
                            "button",
                            {
                              class:
                                "p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded",
                              onclick: () => exportProjectFile(p.id),
                              title: "Export .json",
                            },
                            m(
                              "span.material-symbols-outlined.text-base",
                              "download",
                            ),
                          ),
                          m(
                            "button",
                            {
                              class:
                                "p-1.5 text-rose-400 hover:text-white hover:bg-rose-500/40 rounded",
                              onclick: () => handleDelete(p.id, p.name),
                              title: "Xóa",
                            },
                            m(
                              "span.material-symbols-outlined.text-base",
                              "delete",
                            ),
                          ),
                        ]),
                      ],
                    ),
                  ),
            ),
            // Footer (Import)
            m(
              "div",
              {
                class:
                  "p-4 bg-slate-900 border-t border-slate-700 flex items-center justify-between",
              },
              [
                m(
                  "label",
                  {
                    class:
                      "px-3 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 cursor-pointer text-sm flex items-center gap-2",
                  },
                  [
                    m("span.material-symbols-outlined.text-base", "upload"),
                    "Import .json",
                    m("input", {
                      type: "file",
                      accept: "application/json,.json",
                      class: "hidden",
                      onchange: handleImport,
                    }),
                  ],
                ),
                m(
                  "div",
                  { class: "text-[10px] text-slate-500" },
                  "Lưu trên trình duyệt này (localStorage)",
                ),
              ],
            ),
          ],
        ),
      ],
    );
  },
};
