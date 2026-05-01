// Unity Asset Pack export. Produces sliced sprite sheets per (Action, Direction)
// + AnimationClip (.anim) + .meta sidecars so the user can drop the folder into
// `Assets/` and have working sprites + clips immediately.

import m from "mithril";
import { ANIMATIONS, FRAME_SIZE, DIRECTIONS } from "./constants.ts";
import {
  extractAnimationFromCanvas,
  extractCustomAnimationFromCanvas,
} from "../canvas/renderer.js";
import { canvasToBlob } from "../canvas/canvas-utils.ts";
import {
  downloadZipBlob,
  extractFramesFromAnimation,
  extractFramesFromCustomAnimation,
  guardZipExportEnvironment,
  zipExportTimestamp,
  zipGenerateBlobWithProfiler,
} from "../utils/zip-helpers.js";
import { customAnimations } from "../custom-animations.ts";
import { createZipExportProfiler } from "../performance-profiler.js";
import {
  beginZipExportUiSuspend,
  endZipExportUiSuspend,
} from "./../utils/zip-export-ui-suspend.js";
import {
  buildAnimClip,
  buildAnimMeta,
  buildSpriteList,
  buildTextureMeta,
  makeGuid,
} from "../utils/unity-yaml.js";
import { state } from "./state.js";

const ACTION_NAMES = {
  spellcast: "Spellcast",
  thrust: "Thrust",
  walk: "Walk",
  slash: "Slash",
  shoot: "Shoot",
  hurt: "Hurt",
  climb: "Climb",
  idle: "Idle",
  jump: "Jump",
  sit: "Sit",
  emote: "Emote",
  run: "Run",
  combat: "CombatIdle",
  "1h_backslash": "OneHandBackslash",
  "1h_halfslash": "OneHandHalfslash",
};

// Custom animations (separate canvas regions) — exportable with their own
// frameSize. Listed in UnityExportDialog as the "Oversize / 128px" group.
const CUSTOM_ACTION_NAMES = {
  slash_128: "Slash128",
  backslash_128: "Backslash128",
  halfslash_128: "Halfslash128",
  thrust_128: "Thrust128",
  walk_128: "Walk128",
  thrust_oversize: "ThrustOversize",
  slash_oversize: "SlashOversize",
  slash_reverse_oversize: "SlashReverseOversize",
  whip_oversize: "WhipOversize",
};

export const SUPPORTED_CUSTOM_ANIMATION_KEYS = Object.keys(CUSTOM_ACTION_NAMES);

const DIR_NAMES = { up: "Up", left: "Left", down: "Down", right: "Right" };

const DEFAULT_FPS = 10;

function sanitizeName(input) {
  const cleaned = String(input || "").replace(/[^A-Za-z0-9_-]/g, "_");
  return cleaned.length ? cleaned : "Character";
}

function compositeStripCanvas(frameList, frameSize = FRAME_SIZE) {
  const c = document.createElement("canvas");
  c.width = frameList.length * frameSize;
  c.height = frameSize;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  frameList.forEach((f, i) => ctx.drawImage(f.canvas, i * frameSize, 0));
  return c;
}

/** Write one (action × direction) bundle: PNG + .meta + .anim + .anim.meta. */
async function emitDirectionBundle({
  spritesFolder,
  animsFolder,
  frameList,
  frameSize,
  baseName,
  fps,
}) {
  const strip = compositeStripCanvas(frameList, frameSize);
  const blob = await canvasToBlob(strip);
  spritesFolder.file(`${baseName}.png`, blob);

  const spriteList = buildSpriteList(baseName, frameList.length, frameSize);
  const textureGuid = makeGuid();
  spritesFolder.file(
    `${baseName}.png.meta`,
    buildTextureMeta({
      guid: textureGuid,
      sprites: spriteList,
      // Keep PPU = standard tile size so a 128 oversize sprite renders at
      // 2× world units (correct for an oversize attack reaching past the
      // character).
      ppu: FRAME_SIZE,
    }),
  );

  animsFolder.file(
    `${baseName}.anim`,
    buildAnimClip({
      name: baseName,
      textureGuid,
      sprites: spriteList,
      fps,
    }),
  );
  animsFolder.file(
    `${baseName}.anim.meta`,
    buildAnimMeta({ guid: makeGuid() }),
  );
}

function readmeText(charName, fps, exportedActions) {
  const list = exportedActions.length
    ? exportedActions.join(", ")
    : "(không có)";
  return `# ${charName} - Unity Asset Pack

Tạo bởi Tomi Anim Gà.

## Cách dùng

1. Kéo nguyên thư mục \`${charName}/\` này vào \`Assets/\` của project Unity (Unity 2022 LTS hoặc Unity 6).
2. Unity sẽ tự import sprites — đã setup sẵn:
   - Texture Type = Sprite (2D and UI)
   - Sprite Mode = Multiple (đã slice sẵn 64x64)
   - Pixels Per Unit = 64
   - Filter Mode = Point (no filter)
3. Tạo GameObject mới, gắn \`SpriteRenderer\`, kéo 1 file \`.anim\` từ \`Animations/\` vào → animator tự sinh.

## Cấu trúc

- \`Sprites/<Action>_<Direction>.png\` — sliced sprite sheet ngang (mỗi frame 64x64)
- \`Sprites/<Action>_<Direction>.png.meta\` — slice config + GUID
- \`Animations/<Action>_<Direction>.anim\` — Unity AnimationClip (loop, ${fps} fps)
- \`Animations/<Action>_<Direction>.anim.meta\`

## 4 hướng

\`Up\`, \`Down\`, \`Left\`, \`Right\`

## Actions đã export

${list}

## Tip Unity

- **Build Animator Controller nhanh:** chọn tất cả \`.anim\` → kéo lên GameObject, Unity tự tạo controller.
- **Đổi hướng theo input:** dùng Blend Tree 2D, parameter \`MoveX\`/\`MoveY\`, gán 4 clip Up/Down/Left/Right.
- **Tốc độ:** mặc định ${fps} fps. Sửa trong Animator window → speed multiplier.
`;
}

/**
 * @param {{
 *   charName?: string,
 *   fps?: number,
 *   selectedAnimations?: string[]
 * }} [opts]
 * @returns {Promise<void>}
 */
export async function exportUnityPackage(opts = {}) {
  const charName = sanitizeName(opts.charName ?? "Character");
  const fps = opts.fps ?? DEFAULT_FPS;
  const explicitPicked = Array.isArray(opts.selectedAnimations)
    ? new Set(opts.selectedAnimations)
    : null;

  if (!guardZipExportEnvironment()) return;

  state.zipUnity = state.zipUnity || { isRunning: false };
  state.zipUnity.isRunning = true;
  m.redraw();
  beginZipExportUiSuspend();

  const profiler = createZipExportProfiler("unityExport");
  const exportedActions = new Set();

  try {
    const zip = new window.JSZip();
    const root = zip.folder(charName);
    const spritesFolder = root.folder("Sprites");
    const animsFolder = root.folder("Animations");

    const enabled = state.enabledAnimations || {};
    const anyEnabled = Object.values(enabled).some(Boolean);

    for (const animDef of ANIMATIONS) {
      if (animDef.noExport) continue;
      const animKey = animDef.value;
      if (explicitPicked) {
        if (!explicitPicked.has(animKey)) continue;
      } else if (anyEnabled && !enabled[animKey]) {
        continue;
      }

      const action = ACTION_NAMES[animKey];
      if (!action) continue;

      // Try standard sheet row first; for animations whose weapon overlays
      // live in a separate custom canvas (1h_*), fall back to the custom
      // extractor so the weapon is included.
      let animCanvas = extractAnimationFromCanvas(animKey);
      if (!animCanvas) {
        animCanvas = extractCustomAnimationFromCanvas(animKey);
      }
      if (!animCanvas) continue;

      const frames = extractFramesFromAnimation(
        animCanvas,
        animKey,
        DIRECTIONS,
      );

      let exportedAnyDir = false;
      for (const dirKey of DIRECTIONS) {
        const list = frames[dirKey];
        if (!list || !list.length) continue;
        const dir = DIR_NAMES[dirKey];
        const baseName = `${action}_${dir}`;

        await emitDirectionBundle({
          spritesFolder,
          animsFolder,
          frameList: list,
          frameSize: FRAME_SIZE,
          baseName,
          fps,
        });

        exportedAnyDir = true;
      }

      if (exportedAnyDir) exportedActions.add(action);
    }

    // Custom anims (separate canvas regions, may use frameSize 128 etc.)
    for (const animKey of SUPPORTED_CUSTOM_ANIMATION_KEYS) {
      if (explicitPicked && !explicitPicked.has(animKey)) continue;
      // No global filter for custom anims — only run if explicitly picked
      // OR if no explicit pick set was given (legacy behaviour).
      if (!explicitPicked) continue;

      const action = CUSTOM_ACTION_NAMES[animKey];
      const def = customAnimations?.[animKey];
      if (!action || !def) continue;

      const animCanvas = extractCustomAnimationFromCanvas(animKey);
      if (!animCanvas) continue;

      const frames = extractFramesFromCustomAnimation(
        animCanvas,
        def,
        DIRECTIONS,
      );

      let exportedAnyDir = false;
      for (const dirKey of DIRECTIONS) {
        const list = frames[dirKey];
        if (!list || !list.length) continue;
        const dir = DIR_NAMES[dirKey];
        const baseName = `${action}_${dir}`;

        await emitDirectionBundle({
          spritesFolder,
          animsFolder,
          frameList: list,
          frameSize: def.frameSize || FRAME_SIZE,
          baseName,
          fps,
        });

        exportedAnyDir = true;
      }

      if (exportedAnyDir) exportedActions.add(action);
    }

    root.file(
      "README.md",
      readmeText(charName, fps, [...exportedActions].sort()),
    );

    const zipBlob = await zipGenerateBlobWithProfiler(profiler, zip);
    const ts = zipExportTimestamp();
    downloadZipBlob(zipBlob, `${charName}_Unity_${ts}.zip`);
  } finally {
    state.zipUnity.isRunning = false;
    endZipExportUiSuspend();
    m.redraw();
  }
}
