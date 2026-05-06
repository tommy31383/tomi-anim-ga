// Reusable CollapsibleSection component
import m from "mithril";
export const CollapsibleSection = {
  oninit: function (vnode) {
    const { defaultOpen = true } = vnode.attrs;
    vnode.state.isCollapsed = !defaultOpen;
  },
  view: function (vnode) {
    const {
      title,
      boxClass = "box",
      onToggle,
      defaultOpen: _, // Consume so it doesn't leak to the html
      ...additionalAttrs
    } = vnode.attrs;
    const { isCollapsed } = vnode.state;

    const toggleCollapse = () => {
      vnode.state.isCollapsed = !vnode.state.isCollapsed;

      // Call callback if provided
      // The hack to handle the canvas state from within mithril is here:
      if (onToggle) {
        onToggle(vnode.state.isCollapsed);
      }
    };

    const titleId = `collapsible-title-${(vnode.state.titleId ||= Math.random().toString(36).slice(2, 9))}`;
    const onHeaderKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCollapse();
      }
    };

    return m(`div.${boxClass}`, additionalAttrs, [
      m(
        "div",
        {
          onclick: toggleCollapse,
          onkeydown: onHeaderKey,
          class: "collapsible-header",
          role: "button",
          tabindex: 0,
          "aria-expanded": String(!isCollapsed),
          "aria-controls": titleId,
        },
        [
          m("span", {
            class: isCollapsed ? "tree-arrow collapsed" : "tree-arrow expanded",
            "aria-hidden": "true",
          }),
          m("h3.title.is-5.mb-0", { class: "collapsible-title" }, title),
        ],
      ),

      !isCollapsed &&
        m(
          "div",
          { class: "collapsible-content", id: titleId, role: "region" },
          vnode.children,
        ),
    ]);
  },
};
