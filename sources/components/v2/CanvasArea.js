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

export const CanvasArea = {
  oninit: (vnode) => {
    vnode.state.selectedAnimation = state.selectedAnimation || "walk";
    vnode.state.isPlaying = true;
    vnode.state.viewMode = "anim"; // "anim" | "sheet"
    vnode.state.sheetZoom = state.fullSpritesheetCanvasZoomLevel || 1;
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
    ];
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
      if (isOffscreenCanvasInitialized()) {
        setPreviewAnimation(val);
      }
    };

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
                  : `${anim.value} — cần thêm item hỗ trợ (vũ khí / prosthesis / oversize body...) để có frame`,
                onclick: () => setAnim(anim.value),
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

    // Animation preview block
    const animBlock = m("div", { class: "p-6 flex flex-col items-center" }, [
      m(
        "div",
        {
          class:
            "relative bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 inline-flex items-center justify-center",
        },
        [
          m(PreviewCanvas, {
            selectedAnimation: vnode.state.selectedAnimation,
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
          [animPills, animBlock, sheetBlock],
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
