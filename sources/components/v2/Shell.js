import m from "mithril";
import { state } from "../../state/state.js";
import { syncSelectionsToHash } from "../../state/hash.js";
import {
  renderCharacter,
  isOffscreenCanvasInitialized,
} from "../../canvas/renderer.js";
import { TopBar } from "./TopBar.js";
import { AssetLibrary } from "./AssetLibrary.js";
import { CanvasArea } from "./CanvasArea.js";
import { Inspector } from "./Inspector.js";
import { ExportModal } from "./ExportModal.js";

export const Shell = {
  oninit: function (vnode) {
    vnode.state.exportOpen = false;
    vnode.state.prevSelections = JSON.stringify(state.selections);
    vnode.state.prevBodyType = state.bodyType;
    vnode.state.prevCustomImage = state.customUploadedImage;
    vnode.state.prevCustomZPos = state.customImageZPos;
  },
  onupdate: function (vnode) {
    const cur = JSON.stringify(state.selections);
    if (
      cur !== vnode.state.prevSelections ||
      state.bodyType !== vnode.state.prevBodyType ||
      state.customUploadedImage !== vnode.state.prevCustomImage ||
      state.customImageZPos !== vnode.state.prevCustomZPos
    ) {
      syncSelectionsToHash();
      if (isOffscreenCanvasInitialized()) {
        renderCharacter(state.selections, state.bodyType).then(() => m.redraw());
      }
      vnode.state.prevSelections = cur;
      vnode.state.prevBodyType = state.bodyType;
      vnode.state.prevCustomImage = state.customUploadedImage;
      vnode.state.prevCustomZPos = state.customImageZPos;
    }
  },
  view: function (vnode) {
    const openExport = () => {
      vnode.state.exportOpen = true;
    };
    const closeExport = () => {
      vnode.state.exportOpen = false;
    };
    return m("div.flex.flex-col.h-screen.w-screen.bg-background.text-on-background", [
      m(TopBar, { onExport: openExport }),
      m("main.flex-1.flex.overflow-hidden", [
        m(AssetLibrary),
        m(CanvasArea),
        m(Inspector, { onExport: openExport }),
      ]),
      vnode.state.exportOpen && m(ExportModal, { onClose: closeExport }),
    ]);
  },
};
