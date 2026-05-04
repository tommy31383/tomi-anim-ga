import m from "mithril";
import { state } from "../../state/state.js";
import { ANIMATIONS, ANIMATION_DEFAULTS } from "../../state/constants.ts";
import { layers as renderedLayers } from "../../canvas/renderer.js";
import {
  setPreviewAnimation,
  startPreviewAnimation,
  stopPreviewAnimation,
  getCustomAnimations,
  repaintStaticPreviewFrameForTests,
} from "../../canvas/preview-animation.js";
import {
  initPreviewCanvas,
  setPreviewCanvasZoom,
  copyToPreviewCanvas,
  primeSpritesheetPreviewCanvasElement,
} from "../../canvas/preview-canvas.js";
import { isOffscreenCanvasInitialized } from "../../canvas/renderer.js";
import PinchToZoom from "../preview/PinchToZoom.js";

// Renders the FULL spritesheet (832×3456) — all directions / animations.
// Mirrors the legacy FullSpritesheetPreview wiring.
const FullSheetCanvas = {
  oncreate: function (vnode) {
    primeSpritesheetPreviewCanvasElement(vnode.dom);
    if (isOffscreenCanvasInitialized()) {
      copyToPreviewCanvas(
        vnode.dom,
        state.showTransparencyGrid,
        state.applyTransparencyMask,
        vnode.attrs.zoomLevel || 1,
      );
    }
  },
  onupdate: function (vnode) {
    if (isOffscreenCanvasInitialized()) {
      copyToPreviewCanvas(
        vnode.dom,
        state.showTransparencyGrid,
        state.applyTransparencyMask,
        vnode.attrs.zoomLevel || 1,
      );
    }
  },
  view: function () {
    return m("canvas#spritesheet-preview", {
      style: { imageRendering: "pixelated", display: "block" },
    });
  },
};

const PreviewCanvas = {
  oncreate: function (vnode) {
    if (!isOffscreenCanvasInitialized()) return;
    initPreviewCanvas(vnode.dom);
    setPreviewAnimation(vnode.attrs.selectedAnimation);
    startPreviewAnimation();
    vnode.state.lastAnimation = vnode.attrs.selectedAnimation;
    vnode.state.zoomLevel = vnode.attrs.zoomLevel || 1;
    vnode.state._pinchUnmounted = false;
    PinchToZoom.create(
      vnode.dom,
      (scale) => {
        vnode.state.zoomLevel = scale;
        if (isOffscreenCanvasInitialized()) {
          m.redraw();
          setPreviewCanvasZoom(vnode.state.zoomLevel);
        }
        state.previewCanvasZoomLevel = vnode.state.zoomLevel;
      },
      vnode.state.zoomLevel,
    ).then((pinch) => {
      if (vnode.state._pinchUnmounted) {
        pinch.destroy();
        return;
      }
      vnode.state.pinch = pinch;
    });
  },
  onupdate: function (vnode) {
    if (vnode.state.lastAnimation !== vnode.attrs.selectedAnimation) {
      if (isOffscreenCanvasInitialized()) {
        stopPreviewAnimation();
        setPreviewAnimation(vnode.attrs.selectedAnimation);
        initPreviewCanvas(vnode.dom);
        startPreviewAnimation();
      }
      vnode.state.lastAnimation = vnode.attrs.selectedAnimation;
    }
    repaintStaticPreviewFrameForTests();
  },
  onremove: function (vnode) {
    vnode.state._pinchUnmounted = true;
    vnode.state.pinch?.destroy();
    if (isOffscreenCanvasInitialized()) stopPreviewAnimation();
  },
  view: function () {
    return m("canvas#previewAnimations", {
      class: "image-rendering-pixelated",
      style: { imageRendering: "pixelated" },
    });
  },
};

// What each locked animation needs the user to add. Each row is a group of
// alternative requirements (any one unlocks). Used to render a checklist
// popover when the user clicks a locked pill.
const ANIM_REQUIREMENTS = {
  idle: [
    { key: "body-idle", label: "Body có frame Idle (vd. body biến thể có animation Đứng yên)" },
  ],
  jump: [{ key: "body-jump", label: "Body có frame Jump" }],
  sit: [{ key: "body-sit", label: "Body có frame Sit" }],
  emote: [{ key: "body-emote", label: "Body có frame Emote" }],
  run: [{ key: "body-run", label: "Body có frame Run" }],
  climb: [{ key: "body-climb", label: "Body có frame Climb" }],
  combat: [
    { key: "body-combat", label: "Body có Combat Idle (vd. body chiến đấu)" },
  ],
  combat_idle: [
    { key: "body-combat", label: "Body có Combat Idle (vd. body chiến đấu)" },
  ],
  "1h_slash": [
    { key: "weapon-1h", label: "Vũ khí 1 tay (Sword / Axe / Mace / Dagger)" },
  ],
  "1h_backslash": [
    { key: "weapon-1h", label: "Vũ khí 1 tay (Sword / Axe / Mace / Dagger)" },
  ],
  "1h_halfslash": [
    { key: "weapon-1h", label: "Vũ khí 1 tay (Sword / Axe / Mace / Dagger)" },
  ],
  slash_128: [
    { key: "weapon-128", label: "Vũ khí oversize 128px (vd. Greatsword)" },
  ],
  backslash_128: [
    { key: "weapon-128", label: "Vũ khí oversize 128px" },
  ],
  halfslash_128: [
    { key: "weapon-128", label: "Vũ khí oversize 128px" },
  ],
  thrust_128: [
    { key: "weapon-128", label: "Vũ khí oversize 128px (Spear / Polearm)" },
  ],
  walk_128: [
    { key: "weapon-128", label: "Vũ khí oversize 128px" },
  ],
  slash_oversize: [
    { key: "weapon-192", label: "Vũ khí cực lớn 192px (vd. Buster Sword)" },
  ],
  thrust_oversize: [
    { key: "weapon-192", label: "Vũ khí cực lớn 192px (Polearm khổng lồ)" },
  ],
  watering: [
    { key: "tool-watering", label: "Tool tưới nước (Watering Can) trong Dụng cụ" },
  ],
};

export const CanvasArea = {
  oninit: (vnode) => {
    vnode.state.selectedAnimation = state.selectedAnimation || "walk";
    vnode.state.isPlaying = true;
    vnode.state.viewMode = "anim"; // "anim" | "sheet"
    vnode.state.sheetZoom = state.fullSpritesheetCanvasZoomLevel || 1;
    vnode.state.lockedHint = null; // anim value when popover is open
  },
  view: function (vnode) {
    const ANIM_LABEL_VI = {
      walk: "Đi bộ",
      run: "Chạy",
      idle: "Đứng yên",
      slash: "Chém (cũ)",
      thrust: "Đâm",
      shoot: "Bắn",
      spellcast: "Niệm phép",
      hurt: "Trúng đòn",
      jump: "Nhảy",
      sit: "Ngồi",
      emote: "Biểu cảm",
      climb: "Leo",
      combat: "Thủ thế",
      combat_idle: "Thủ thế",
      watering: "Tưới nước",
      "1h_slash": "Chém (1 tay)",
      "1h_backslash": "Chém ngược (1 tay)",
      "1h_halfslash": "Chém nửa (1 tay)",
      slash_128: "Chém 128px",
      backslash_128: "Chém ngược 128px",
      halfslash_128: "Chém nửa 128px",
      thrust_128: "Đâm 128px",
      walk_128: "Đi bộ 128px",
    };
    const labelize = (a) =>
      ANIM_LABEL_VI[a.value] ||
      (a.label || a.value).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    // Show every animation defined in constants + any custom one. Matches the
    // original dropdown. Unsupported ones are kept visible but rendered dim
    // with a tooltip so users see what they could enable.
    const customAnims = Object.keys(getCustomAnimations());
    const supported = new Set(ANIMATION_DEFAULTS);
    for (const layer of renderedLayers || []) {
      const anims = layer?.animations;
      if (Array.isArray(anims)) for (const a of anims) supported.add(a);
    }
    for (const a of customAnims) supported.add(a);

    const allAnimations = [
      // Synthetic CSS-only animation: bounces the rendered Walk frames
      // (Vampire Survivors / Brotato style hop). cssOnly = true → renderer
      // keeps drawing 'walk' under the hood; only the canvas wrapper gets
      // a hop transform.
      {
        value: "tung_tung",
        label: "🐰 Tưng tưng",
        supported: supported.has("walk"),
        cssOnly: true,
        baseAnim: "walk",
      },
      ...ANIMATIONS.map((a) => ({
        ...a,
        label: labelize(a),
        supported: supported.has(a.value),
      })),
      ...customAnims
        .filter((a) => !ANIMATIONS.some((x) => x.value === a))
        .map((a) => ({
          value: a,
          label: labelize({ value: a, label: a }),
          supported: true,
        })),
    ].sort((a, b) => {
      // Supported anims first, then locked ones — preserve original order
      // within each group (stable sort).
      if (a.supported === b.supported) return 0;
      return a.supported ? -1 : 1;
    });
    if (
      !allAnimations.find((a) => a.value === vnode.state.selectedAnimation)
    ) {
      vnode.state.selectedAnimation = "walk";
      state.selectedAnimation = "walk";
    }
    const zoom = state.previewCanvasZoomLevel || 1;

    const setAnim = (val) => {
      vnode.state.selectedAnimation = val;
      state.selectedAnimation = val;
      // For the synthetic "tung_tung" pill, render ONE static frame of walk
      // (frame 0 = standing pose) and freeze the preview loop. The CSS hop
      // does all the motion. This matches Vampire Survivors / Brotato /
      // Archero — single static frame + transform.
      const def = allAnimations.find((a) => a.value === val);
      if (def?.cssOnly) {
        if (isOffscreenCanvasInitialized()) {
          setPreviewAnimation(def.baseAnim || "walk");
          // stopPreviewAnimation freezes whatever frame is currently visible.
          // Wait one tick so the renderer paints frame 0 first, then stop.
          requestAnimationFrame(() => {
            stopPreviewAnimation();
            vnode.state.isPlaying = false;
          });
        }
      } else {
        if (isOffscreenCanvasInitialized()) {
          setPreviewAnimation(val);
          if (vnode.state.isPlaying) startPreviewAnimation();
        }
      }
    };
    const isHop =
      allAnimations.find((a) => a.value === vnode.state.selectedAnimation)
        ?.cssOnly === true;

    const sheetZoom = vnode.state.sheetZoom;

    // Sticky animation pill row
    const animPills = m(
      "div",
      {
        class:
          "sticky top-0 z-20 px-4 py-3 bg-slate-200/80 backdrop-blur-md border-b border-slate-300 flex items-center gap-2 overflow-x-auto scrollbar-thin",
      },
      [
        m(
          "div",
          {
            class:
              "flex gap-1 bg-slate-900/90 p-1 rounded-full shadow-lg border border-slate-700 shrink-0",
          },
          allAnimations.map((anim) => {
            const isActive = anim.value === vnode.state.selectedAnimation;
            const dim = !anim.supported && !isActive;
            return m(
              "button",
              {
                class: [
                  "px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1",
                  isActive
                    ? "bg-cyan-400 text-slate-900"
                    : dim
                      ? "text-slate-600 hover:text-slate-400"
                      : "text-slate-400 hover:text-white",
                ].join(" "),
                title: anim.supported
                  ? anim.value
                  : `${anim.value} — bị khóa, click để xem cần thêm gì`,
                onclick: () => {
                  // Always switch the active pill so the user sees what they
                  // just clicked. For locked pills, also pop the checklist
                  // banner; for supported ones close it.
                  setAnim(anim.value);
                  vnode.state.lockedHint = anim.supported ? null : anim.value;
                },
              },
              [
                anim.label,
                !anim.supported &&
                  !isActive &&
                  m(
                    "span",
                    {
                      class:
                        "material-symbols-outlined opacity-70",
                      style: { fontSize: "12px" },
                      "aria-hidden": "true",
                    },
                    "lock",
                  ),
              ],
            );
          }),
        ),
        m(
          "button",
          {
            class:
              "ml-auto p-2 bg-slate-900 text-cyan-400 rounded-lg shrink-0 hover:bg-slate-800",
            title: vnode.state.isPlaying ? "Tạm dừng" : "Phát",
            onclick: () => {
              vnode.state.isPlaying = !vnode.state.isPlaying;
              if (vnode.state.isPlaying) startPreviewAnimation();
              else stopPreviewAnimation();
            },
          },
          m(
            "span",
            { class: "material-symbols-outlined", style: { fontSize: "20px" } },
            vnode.state.isPlaying ? "pause" : "play_arrow",
          ),
        ),
      ],
    );

    // Locked-anim hint banner (rendered when user clicks a 🔒 pill)
    const hintAnim = vnode.state.lockedHint;
    const hintBanner =
      hintAnim &&
      (() => {
        const reqs = ANIM_REQUIREMENTS[hintAnim] || [
          {
            key: "generic",
            label:
              "Item hiện tại không cung cấp frame cho anim này. Hãy thử thêm vũ khí, body hoặc prosthesis chuyên dụng.",
          },
        ];
        const labelOf = (val) =>
          ANIM_LABEL_VI[val] ||
          val.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        return m(
          "div",
          {
            class:
              "mx-6 mt-3 p-4 bg-slate-900/80 border border-violet-500/40 rounded-xl text-sm text-slate-200 shadow-lg",
          },
          [
            m(
              "div",
              { class: "flex items-center justify-between mb-2" },
              [
                m(
                  "div",
                  { class: "flex items-center gap-2 font-semibold" },
                  [
                    m(
                      "span",
                      {
                        class:
                          "material-symbols-outlined text-violet-400",
                        style: { fontSize: "18px" },
                      },
                      "lock",
                    ),
                    `Cần thêm để dùng "${labelOf(hintAnim)}"`,
                  ],
                ),
                m(
                  "button",
                  {
                    class:
                      "text-slate-400 hover:text-white p-1 rounded",
                    onclick: () => (vnode.state.lockedHint = null),
                    title: "Đóng",
                  },
                  m(
                    "span",
                    {
                      class: "material-symbols-outlined",
                      style: { fontSize: "18px" },
                    },
                    "close",
                  ),
                ),
              ],
            ),
            m(
              "ul",
              { class: "space-y-1.5" },
              reqs.map((r) =>
                m("li", { class: "flex items-start gap-2 text-xs" }, [
                  m(
                    "span",
                    {
                      class:
                        "material-symbols-outlined text-slate-600 mt-0.5",
                      style: { fontSize: "14px" },
                    },
                    "check_box_outline_blank",
                  ),
                  m("span", { class: "leading-snug" }, r.label),
                ]),
              ),
            ),
            m(
              "p",
              {
                class:
                  "text-[11px] text-slate-500 mt-3 leading-relaxed",
              },
              "Mở Thư viện tài nguyên bên trái → chọn category phù hợp (Vũ khí / Cơ thể / Dụng cụ) → click item, pill sẽ tự mở khóa.",
            ),
          ],
        );
      })();

    // Animation preview block
    const animBlock = m("div", { class: "p-6 flex flex-col items-center" }, [
      m(
        "div",
        {
          class: [
            "relative bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 inline-flex items-center justify-center",
            isHop ? "tung-tung-active" : "",
          ].join(" "),
        },
        [
          m(PreviewCanvas, {
            // Render Walk frames under the hood for tung_tung; the bouncing
            // is purely CSS on the wrapper.
            selectedAnimation: isHop ? "walk" : vnode.state.selectedAnimation,
            zoomLevel: zoom,
          }),
          m(
            "div",
            {
              class:
                "absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-mono-id",
            },
            `${Math.round(zoom * 100)}%`,
          ),
          isHop &&
            m(
              "div",
              {
                class: "absolute top-2 left-2 tung-tung-badge",
              },
              [
                m(
                  "span",
                  {
                    class: "material-symbols-outlined",
                    style: { fontSize: "12px" },
                  },
                  "celebration",
                ),
                "TƯNG TƯNG MODE",
              ],
            ),
        ],
      ),
      m(
        "div",
        { class: "mt-3 flex items-center gap-3 w-full max-w-md" },
        [
          m(
            "span",
            { class: "material-symbols-outlined text-slate-500 text-lg" },
            "zoom_out",
          ),
          m("input[type=range]", {
            class: "flex-1 accent-cyan-400",
            min: 0.5,
            max: 4,
            step: 0.1,
            value: zoom,
            oninput: (e) => {
              const z = parseFloat(e.target.value);
              state.previewCanvasZoomLevel = z;
              if (isOffscreenCanvasInitialized()) setPreviewCanvasZoom(z);
            },
          }),
          m(
            "span",
            { class: "material-symbols-outlined text-slate-500 text-lg" },
            "zoom_in",
          ),
        ],
      ),
    ]);

    // Full sheet block
    const sheetBlock = m(
      "div",
      {
        class: "border-t border-slate-300 bg-slate-50",
      },
      [
        m(
          "div",
          {
            class:
              "px-6 py-3 flex flex-wrap items-center gap-4 border-b border-slate-200",
          },
          [
            m(
              "h3",
              { class: "font-bold text-slate-700 text-sm" },
              "Sprite sheet đầy đủ",
            ),
            m("label", { class: "flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer" }, [
              m("input[type=checkbox]", {
                checked: state.showTransparencyGrid,
                onchange: (e) => {
                  state.showTransparencyGrid = e.target.checked;
                },
              }),
              "Lưới trong suốt",
            ]),
            m("label", { class: "flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer" }, [
              m("input[type=checkbox]", {
                checked: state.applyTransparencyMask,
                onchange: (e) => {
                  state.applyTransparencyMask = e.target.checked;
                },
              }),
              "Mask hồng",
            ]),
            m(
              "label",
              { class: "flex items-center gap-2 ml-auto text-xs text-slate-600" },
              [
                "Zoom",
                m("input[type=range]", {
                  class: "accent-cyan-400",
                  min: 0.25,
                  max: 2,
                  step: 0.05,
                  value: sheetZoom,
                  oninput: (e) => {
                    vnode.state.sheetZoom = parseFloat(e.target.value);
                    state.fullSpritesheetCanvasZoomLevel = vnode.state.sheetZoom;
                  },
                }),
                m(
                  "span",
                  { class: "font-mono-id text-slate-500 w-10 text-right" },
                  `${Math.round(sheetZoom * 100)}%`,
                ),
              ],
            ),
          ],
        ),
        m(
          "div",
          {
            class:
              "p-4 overflow-auto scrollbar-thin",
            style: { maxHeight: "60vh" },
          },
          m(FullSheetCanvas, { zoomLevel: sheetZoom }),
        ),
      ],
    );

    return m(
      "section",
      {
        class:
          "flex-1 bg-slate-100 relative flex flex-col overflow-hidden",
      },
      [
        m(
          "div",
          {
            class: "flex-1 overflow-y-auto scrollbar-thin canvas-checkered",
          },
          [animPills, hintBanner, animBlock, sheetBlock],
        ),
        state.isRenderingCharacter &&
          m(
            "div",
            {
              class:
                "absolute top-2 right-2 z-30 flex items-center gap-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-full shadow-lg text-xs",
            },
            [
              m("span", {
                class:
                  "inline-block w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin",
              }),
              "Đang dựng...",
            ],
          ),
      ],
    );
  },
};
