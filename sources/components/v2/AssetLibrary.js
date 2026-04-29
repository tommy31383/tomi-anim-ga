import m from "mithril";
import { state } from "../../state/state.js";
import * as catalog from "../../state/catalog.js";
import { CategoryTree } from "../tree/CategoryTree.js";
import { SearchControl } from "../filters/SearchControl.js";
import { LicenseFilters } from "../filters/LicenseFilters.js";
import { AnimationFilters } from "../filters/AnimationFilters.js";

const CATEGORY_ICONS = {
  body: "person",
  head: "face",
  hair: "cut",
  facial: "face",
  eyes: "visibility",
  beards: "face",
  torso: "checkroom",
  legs: "straighten",
  feet: "ssid_chart",
  arms: "pan_tool",
  hat: "shield",
  weapon: "build",
  shield: "shield",
  cape: "waves",
  neck: "diamond",
  shoulders: "fitness_center",
  backpack: "backpack",
  quiver: "build",
  tools: "build",
  dress: "checkroom",
  facing: "compare_arrows",
  expression: "mood",
  shadow: "blur_on",
};

function categoryIcon(name) {
  const lower = (name || "").toLowerCase();
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (lower.includes(key)) return CATEGORY_ICONS[key];
  }
  return "category";
}

const CATEGORY_LABEL_VI = {
  body: "Cơ thể",
  head: "Đầu",
  hair: "Tóc",
  facial: "Khuôn mặt",
  eyes: "Mắt",
  beards: "Râu",
  expression: "Biểu cảm",
  torso: "Thân áo",
  legs: "Chân",
  feet: "Giày",
  arms: "Tay",
  hat: "Mũ",
  weapon: "Vũ khí",
  shield: "Khiên",
  cape: "Áo choàng",
  neck: "Cổ áo",
  shoulders: "Vai",
  backpack: "Ba lô",
  quiver: "Bao tên",
  tools: "Dụng cụ",
  dress: "Váy",
  shadow: "Bóng",
};
function categoryLabelVi(name) {
  const lower = (name || "").toLowerCase();
  for (const key of Object.keys(CATEGORY_LABEL_VI)) {
    if (lower.includes(key)) return CATEGORY_LABEL_VI[key];
  }
  return name;
}

export const AssetLibrary = {
  oninit: (vnode) => {
    vnode.state.activeCategory = null;
    vnode.state.showAdvanced = false;
  },
  view: function (vnode) {
    const tree = catalog.isIndexReady() ? catalog.getCategoryTree() : null;
    const categories = tree ? Object.keys(tree.children || {}) : [];
    if (!vnode.state.activeCategory && categories.length > 0) {
      vnode.state.activeCategory = categories[0];
    }
    const active = vnode.state.activeCategory;

    return m(
      "aside",
      {
        class:
          "bg-slate-800 border-r border-slate-700 w-[380px] shrink-0 flex flex-col h-full overflow-hidden",
      },
      [
        // Header
        m(
          "div",
          {
            class:
              "p-4 border-b border-slate-700 bg-slate-900/30",
          },
          [
          m("h2.text-white.text-lg.font-bold", "Thư viện tài nguyên"),
          m("p.text-slate-400.text-xs.font-normal", "Bộ sưu tập LPC"),
          m(
            "div.mt-3.legacy-host",
            { style: { "--tw": "x" } },
            m(SearchControl),
          ),
          m(
            "div.flex.gap-2.mt-3.overflow-x-auto.pb-1.scrollbar-thin",
            [
              ["License", "Bản quyền"],
              ["Animation", "Anim"],
            ].map(([key, label]) =>
              m(
                "button",
                {
                  class:
                    "bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-[10px] whitespace-nowrap hover:bg-slate-600 transition-colors",
                  onclick: () => {
                    vnode.state.showAdvanced =
                      vnode.state.showAdvanced === key ? false : key;
                  },
                },
                label,
              ),
            ),
          ),
          vnode.state.showAdvanced &&
            m(
              "div.mt-3.p-3.bg-slate-900.rounded-lg.legacy-host.text-xs",
              vnode.state.showAdvanced === "License"
                ? m(LicenseFilters)
                : m(AnimationFilters),
            ),
        ]),

        // Category tabs
        categories.length > 0 &&
          m(
            "div",
            {
              class:
                "flex flex-wrap gap-1 bg-slate-900/50 p-2 m-3 rounded-xl",
            },
            categories.map((cat) => {
              const isActive = cat === active;
              return m(
                "button",
                {
                  class: [
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                    isActive
                      ? "text-slate-900 bg-cyan-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50",
                  ].join(" "),
                  onclick: () => {
                    vnode.state.activeCategory = cat;
                    state.expandedNodes[cat] = true;
                  },
                  title: cat,
                },
                [
                  m(
                    "span",
                    {
                      class: "material-symbols-outlined",
                      style: { fontSize: "16px" },
                      "aria-hidden": "true",
                    },
                    categoryIcon(cat),
                  ),
                  m("span", categoryLabelVi(cat)),
                ],
              );
            }),
          ),

        // Tree (existing functional component, restyled via .legacy-host)
        m(
          "div.flex-1.overflow-y-auto.px-3.pb-4.legacy-host.scrollbar-thin",
          m(CategoryTree),
        ),
      ],
    );
  },
};
