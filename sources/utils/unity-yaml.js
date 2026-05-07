// YAML generators for Unity asset import: texture .meta with sliced multi-sprite,
// AnimationClip (.anim), and .anim.meta. Targets Unity 2022 LTS / Unity 6 format
// (serializedVersion 12 textures, 7 animation clips). Hand-built strings — no
// dependency on a YAML lib.

const SPRITE_FILE_ID_BASE = 21300000;
const ANIM_MAIN_FILE_ID = 7400000;

/** 32-hex GUID (lowercase) for Unity .meta files. */
export function makeGuid() {
  // Use crypto.randomUUID then strip hyphens.
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  let out = "";
  for (let i = 0; i < 32; i++)
    out += Math.floor(Math.random() * 16).toString(16);
  return out;
}

/**
 * Deterministic 32-hex GUID derived from a stable string key. Used for
 * sprite IDs so that re-exporting the same character produces the same
 * spriteID — Unity scenes that referenced a previous import keep working
 * after re-export.
 */
function _stableGuid(key) {
  // FNV-1a 32-bit, repeated 4× with different salts to fill 128 bits.
  const fnv1a = (str, salt) => {
    let h = 2166136261 ^ salt;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  };
  return (
    fnv1a(key, 0x9e3779b1) +
    fnv1a(key, 0x85ebca6b) +
    fnv1a(key, 0xc2b2ae35) +
    fnv1a(key, 0x27d4eb2f)
  );
}

/** Sprite internal fileIDs are even integers starting at 21300000. */
export function spriteFileId(index) {
  return SPRITE_FILE_ID_BASE + index * 2;
}

/**
 * Build sprite descriptors for a horizontal strip of N frames at 64×64.
 * @param {string} baseName e.g. "Walk_Down"
 * @param {number} count
 * @returns {Array<{name:string,rect:{x:number,y:number,w:number,h:number},fileID:number,spriteID:string}>}
 */
export function buildSpriteList(baseName, count, frameSize) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const name = `${baseName}_${i}`;
    list.push({
      name,
      rect: { x: i * frameSize, y: 0, w: frameSize, h: frameSize },
      fileID: spriteFileId(i),
      // Deterministic so re-exports preserve Unity scene references.
      spriteID: _stableGuid(name),
    });
  }
  return list;
}

function indent(str, n) {
  const pad = " ".repeat(n);
  return str
    .split("\n")
    .map((l) => (l.length ? pad + l : l))
    .join("\n");
}

/**
 * Texture .meta YAML for a sliced multi-sprite PNG (PPU=64, Point filter).
 */
export function buildTextureMeta({ guid, sprites, ppu = 64 }) {
  const internalIDTable = sprites
    .map((s) => `  - first:\n      213: ${s.fileID}\n    second: ${s.name}`)
    .join("\n");

  const spriteEntries = sprites
    .map(
      (s) => `    - serializedVersion: 2
      name: ${s.name}
      rect:
        serializedVersion: 2
        x: ${s.rect.x}
        y: ${s.rect.y}
        width: ${s.rect.w}
        height: ${s.rect.h}
      alignment: 0
      pivot: {x: 0.5, y: 0.5}
      border: {x: 0, y: 0, z: 0, w: 0}
      outline: []
      physicsShape: []
      tessellationDetail: 0
      bones: []
      spriteID: ${s.spriteID}
      internalID: ${s.fileID}
      vertices: []
      indices:
      edges: []
      weights: []`,
    )
    .join("\n");

  const nameFileIdTable = sprites
    .map((s) => `    ${s.name}: ${s.fileID}`)
    .join("\n");

  return `fileFormatVersion: 2
guid: ${guid}
TextureImporter:
  internalIDToNameTable:
${internalIDTable}
  externalObjects: {}
  serializedVersion: 12
  mipmaps:
    mipMapMode: 0
    enableMipMap: 0
    sRGBTexture: 1
    linearTexture: 0
    fadeOut: 0
    borderMipMap: 0
    mipMapsPreserveCoverage: 0
    alphaTestReferenceValue: 0.5
    mipMapFadeDistanceStart: 1
    mipMapFadeDistanceEnd: 3
  bumpmap:
    convertToNormalMap: 0
    externalNormalMap: 0
    heightScale: 0.25
    normalMapFilter: 0
  isReadable: 0
  streamingMipmaps: 0
  streamingMipmapsPriority: 0
  vTOnly: 0
  ignoreMasterTextureLimit: 0
  grayScaleToAlpha: 0
  generateCubemap: 6
  cubemapConvolution: 0
  seamlessCubemap: 0
  textureFormat: 1
  maxTextureSize: 2048
  textureSettings:
    serializedVersion: 2
    filterMode: 0
    aniso: 1
    mipBias: 0
    wrapU: 1
    wrapV: 1
    wrapW: 1
  nPOTScale: 0
  lightmap: 0
  compressionQuality: 50
  spriteMode: 2
  spriteExtrude: 1
  spriteMeshType: 1
  alignment: 0
  spritePivot: {x: 0.5, y: 0.5}
  spritePixelsToUnits: ${ppu}
  spriteBorder: {x: 0, y: 0, z: 0, w: 0}
  spriteGenerateFallbackPhysicsShape: 1
  alphaUsage: 1
  alphaIsTransparency: 1
  spriteTessellationDetail: -1
  textureType: 8
  textureShape: 1
  singleChannelComponent: 0
  flipbookRows: 1
  flipbookColumns: 1
  maxTextureSizeSet: 0
  compressionQualitySet: 0
  textureFormatSet: 0
  ignorePngGamma: 0
  applyGammaDecoding: 0
  cookieLightType: 1
  platformSettings:
  - serializedVersion: 3
    buildTarget: DefaultTexturePlatform
    maxTextureSize: 2048
    resizeAlgorithm: 0
    textureFormat: -1
    textureCompression: 1
    compressionQuality: 50
    crunchedCompression: 0
    allowsAlphaSplitting: 0
    overridden: 0
    androidETC2FallbackOverride: 0
    forceMaximumCompressionQuality_BC6H_BC7: 0
  spriteSheet:
    serializedVersion: 2
    sprites:
${spriteEntries}
    outline: []
    physicsShape: []
    bones: []
    spriteID:
    internalID: 0
    vertices: []
    indices:
    edges: []
    weights: []
    secondaryTextures: []
    nameFileIdTable:
${nameFileIdTable}
  spritePackingTag:
  pSDRemoveMatte: 0
  userData:
  assetBundleName:
  assetBundleVariant:
`;
}

/**
 * AnimationClip YAML (.anim) referencing sprites in a texture.
 * Time per frame = 1 / fps. Loops by default.
 */
export function buildAnimClip({ name, textureGuid, sprites, fps = 10 }) {
  const dt = 1 / fps;
  const stopTime = sprites.length * dt;

  // PPtr curve: one keyframe per sprite plus a sentinel at stopTime holding the last sprite.
  const curveItems = sprites
    .map(
      (s, i) =>
        `      - time: ${(i * dt).toFixed(6)}\n        value: {fileID: ${s.fileID}, guid: ${textureGuid}, type: 3}`,
    )
    .join("\n");
  const last = sprites[sprites.length - 1];
  const sentinel = `      - time: ${stopTime.toFixed(6)}\n        value: {fileID: ${last.fileID}, guid: ${textureGuid}, type: 3}`;

  const pptrMapping = sprites
    .map((s) => `    - {fileID: ${s.fileID}, guid: ${textureGuid}, type: 3}`)
    .concat([`    - {fileID: ${last.fileID}, guid: ${textureGuid}, type: 3}`])
    .join("\n");

  return `%YAML 1.1
%TAG !u! tag:unity3d.com,2011:
--- !u!74 &${ANIM_MAIN_FILE_ID}
AnimationClip:
  m_ObjectHideFlags: 0
  m_CorrespondingSourceObject: {fileID: 0}
  m_PrefabInstance: {fileID: 0}
  m_PrefabAsset: {fileID: 0}
  m_Name: ${name}
  serializedVersion: 7
  m_Legacy: 0
  m_Compressed: 0
  m_UseHighQualityCurve: 1
  m_RotationCurves: []
  m_CompressedRotationCurves: []
  m_EulerCurves: []
  m_PositionCurves: []
  m_ScaleCurves: []
  m_FloatCurves: []
  m_PPtrCurves:
  - curve:
${curveItems}
${sentinel}
    attribute: m_Sprite
    path:
    classID: 212
    script: {fileID: 0}
  m_SampleRate: 60
  m_WrapMode: 2
  m_Bounds:
    m_Center: {x: 0, y: 0, z: 0}
    m_Extent: {x: 0, y: 0, z: 0}
  m_ClipBindingConstant:
    genericBindings:
    - serializedVersion: 2
      path: 0
      attribute: 0
      script: {fileID: 0}
      typeID: 212
      customType: 23
      isPPtrCurve: 1
      isIntCurve: 0
      isSerializeReferenceCurve: 0
    pptrCurveMapping:
${pptrMapping}
  m_AnimationClipSettings:
    serializedVersion: 2
    m_AdditiveReferencePoseClip: {fileID: 0}
    m_StartTime: 0
    m_StopTime: ${stopTime.toFixed(6)}
    m_OrientationOffsetY: 0
    m_Level: 0
    m_CycleOffset: 0
    m_HasAdditiveReferencePose: 0
    m_LoopTime: 1
    m_LoopBlend: 0
    m_LoopBlendOrientation: 0
    m_LoopBlendPositionY: 0
    m_LoopBlendPositionXZ: 0
    m_KeepOriginalOrientation: 0
    m_KeepOriginalPositionY: 1
    m_KeepOriginalPositionXZ: 0
    m_HeightFromFeet: 0
    m_Mirror: 0
  m_EditorCurves: []
  m_EulerEditorCurves: []
  m_HasGenericRootTransform: 0
  m_HasMotionFloatCurves: 0
  m_Events: []
`;
}

/** .anim.meta sidecar for an AnimationClip asset. */
export function buildAnimMeta({ guid }) {
  return `fileFormatVersion: 2
guid: ${guid}
NativeFormatImporter:
  externalObjects: {}
  mainObjectFileID: ${ANIM_MAIN_FILE_ID}
  userData:
  assetBundleName:
  assetBundleVariant:
`;
}

// Silence unused warning if external callers only pass partial objects.
export const _spriteFileIdBase = SPRITE_FILE_ID_BASE;
export { indent as _indent };
