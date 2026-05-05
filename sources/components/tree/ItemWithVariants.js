// Item with variants component
import m from "mithril";
import classNames from "classnames";
import { state, getSelectionGroup, selectItem } from "../../state/state.js";
import { getLayersToLoad } from "../../state/meta.js";
import { COMPACT_FRAME_SIZE, FRAME_SIZE } from "../../state/constants.ts";
import { capitalize } from "../../utils/helpers.ts";
import { getWeaponClass } from "../../state/weapon-classes-data.js";

const CLASS_BADGE_STYLE = {
  "1H": "background:rgba(34,197,94,0.18);color:#86efac;",
  "2H": "background:rgba(168,85,247,0.18);color:#d8b4fe;",
  Ranged: "background:rgba(251,146,60,0.18);color:#fdba74;",
  Shield: "background:rgba(56,189,248,0.18);color:#7dd3fc;",
  Tool: "background:rgba(148,163,184,0.18);color:#cbd5e1;",
};

function classBadge(itemId) {
  const cls = getWeaponClass(itemId);
  if (!cls || cls === "Unknown") return null;
  return m(
    "span",
    {
      class: "ml-1 px-1 rounded text-[9px] font-mono font-bold align-middle",
      style: CLASS_BADGE_STYLE[cls] ?? "",
      title: `Loại: ${cls}`,
    },
    cls,
  );
}

export const ItemWithVariants = {
  view: function (vnode) {
    const {
      itemId,
      meta,
      isSearchMatch,
      isCompatible,
      tooltipText,
      showItemTooltips = true,
    } = vnode.attrs;
    const rowTitle = showItemTooltips ? tooltipText : undefined;
    const compactDisplay = state.compactDisplay;
    const displayName = meta.name;
    const rootViewNode = vnode;
    let nodePath = itemId;
    if (displayName === "Body Color") {
      nodePath = "body-body";
    }
    const isExpanded = state.expandedNodes[nodePath] || false;
    const layers = getLayersToLoad(meta, state.bodyType, state.selections);

    return m(
      "div",
      {
        class: classNames({
          "search-result": isSearchMatch,
          "has-text-grey": !isCompatible,
        }),
        oninit: () => {
          rootViewNode.state.isLoading = meta.variants.length > 0;
          rootViewNode.state.imagesToLoad =
            meta.variants.length * layers.length;
          rootViewNode.state.imagesLoaded = 0;
        },
        onupdate: () => {
          if (isExpanded && rootViewNode.state.isLoading) {
            if (
              rootViewNode.state.imagesLoaded >= rootViewNode.state.imagesToLoad
            ) {
              rootViewNode.state.isLoading = false;
            }
          }
        },
      },
      [
        m(
          "div.tree-label",
          {
            title: rowTitle,
            onclick: () => {
              state.expandedNodes[nodePath] = !isExpanded;
              if (state.expandedNodes[nodePath]) {
                rootViewNode.state.isLoading = meta.variants.length > 0;
                rootViewNode.state.imagesToLoad =
                  meta.variants.length * layers.length;
                rootViewNode.state.imagesLoaded = 0;
              }
            },
          },
          [
            m("span.tree-arrow", {
              class: isExpanded ? "expanded" : "collapsed",
            }),
            m("span", displayName),
            classBadge(itemId),
            !isCompatible ? m("span.ml-1", "⚠️") : null,
          ],
        ),
        isExpanded
          ? m("div", [
              m("div", {
                class: rootViewNode.state.isLoading ? "loading" : "",
              }),
              m(
                "div.variants-container.ml-5.is-flex.is-flex-wrap-wrap",
                meta.variants.map((variant) => {
                  const selectionGroup = getSelectionGroup(itemId);
                  const isSelected =
                    state.selections[selectionGroup]?.itemId === itemId &&
                    state.selections[selectionGroup]?.variant === variant;
                  const variantDisplayName = variant.replaceAll("_", " ");

                  // Get preview metadata from item metadata
                  const previewRow = meta.preview_row ?? 2;
                  const previewCol = meta.preview_column ?? 0;
                  const previewXOffset = meta.preview_x_offset ?? 0;
                  const previewYOffset = meta.preview_y_offset ?? 0;

                  return m(
                    "div.variant-item.is-flex.is-flex-direction-column.is-align-items-center.is-clickable",
                    {
                      key: variant,
                      class: classNames({
                        "has-background-link-light has-text-weight-bold has-text-link":
                          isSelected,
                        "is-not-compatible": !isCompatible,
                      }),
                      title: rowTitle,
                      onmouseover: (e) => {
                        if (!isCompatible) return;
                        const div = e.currentTarget;
                        if (!isSelected)
                          div.classList.add("has-background-white-ter");
                      },
                      onmouseout: (e) => {
                        if (!isCompatible) return;
                        const div = e.currentTarget;

                        if (!isSelected)
                          div.classList.remove("has-background-white-ter");
                      },
                      onclick: () => {
                        if (!isCompatible) return; // Prevent selecting incompatible
                        selectItem(itemId, variant, isSelected);
                      },
                    },
                    [
                      m(
                        "span.variant-display-name.has-text-centered.is-size-7",
                        capitalize(variantDisplayName),
                      ),
                      m("canvas.variant-canvas.box.p-0", {
                        width: compactDisplay ? COMPACT_FRAME_SIZE : FRAME_SIZE,
                        height: compactDisplay
                          ? COMPACT_FRAME_SIZE
                          : FRAME_SIZE,
                        class: compactDisplay ? " compact-display" : "",
                        style: isSelected
                          ? " hsl(217, 71%, 53%)"
                          : " hsl(0, 0%, 86%)",
                        oncreate: (canvasVnode) => {
                          const canvas = canvasVnode.dom;
                          const ctx = canvas.getContext("2d", {
                            willReadFrequently: true,
                          });

                          // Get Layers to Load for Variant
                          const layersToLoad = getLayersToLoad(
                            meta,
                            state.bodyType,
                            state.selections,
                            variant,
                          );

                          // Load and draw all layers
                          Promise.all(
                            layersToLoad.map((layer) => {
                              return new Promise((resolve) => {
                                const img = new Image();
                                img.onload = () => resolve({ img, layer });
                                img.onerror = () =>
                                  resolve({ img: null, layer });
                                img.src = layer.path;
                              });
                            }),
                          ).then((loadedLayers) => {
                            canvas.loadedLayers = loadedLayers;
                            // Draw each layer in zPos order
                            for (const { img } of loadedLayers) {
                              if (img) {
                                const size = compactDisplay
                                  ? COMPACT_FRAME_SIZE
                                  : FRAME_SIZE;
                                // Master branch uses: previewColumn * FRAME_SIZE + previewXOffset
                                const srcX =
                                  previewCol * FRAME_SIZE + previewXOffset;
                                const srcY =
                                  previewRow * FRAME_SIZE + previewYOffset;
                                ctx.drawImage(
                                  img,
                                  srcX,
                                  srcY,
                                  FRAME_SIZE,
                                  FRAME_SIZE,
                                  0,
                                  0,
                                  size,
                                  size,
                                );
                              }
                            }
                            rootViewNode.state.imagesLoaded +=
                              loadedLayers.length;
                            m.redraw();
                          });
                        },
                        onupdate: (canvasVnode) => {
                          const canvas = canvasVnode.dom;
                          const ctx = canvas.getContext("2d", {
                            willReadFrequently: true,
                          });

                          // Process Layers Loaded for Variant
                          if (canvas.loadedLayers) {
                            // Draw each layer in zPos order
                            for (const { img } of canvas.loadedLayers) {
                              if (img) {
                                const size = compactDisplay
                                  ? COMPACT_FRAME_SIZE
                                  : FRAME_SIZE;
                                // Master branch uses: previewColumn * FRAME_SIZE + previewXOffset
                                const srcX =
                                  previewCol * FRAME_SIZE + previewXOffset;
                                const srcY =
                                  previewRow * FRAME_SIZE + previewYOffset;
                                ctx.drawImage(
                                  img,
                                  srcX,
                                  srcY,
                                  FRAME_SIZE,
                                  FRAME_SIZE,
                                  0,
                                  0,
                                  size,
                                  size,
                                );
                              }
                            }
                          }
                        },
                      }),
                    ],
                  );
                }),
              ),
            ])
          : null,
      ],
    );
  },
};
