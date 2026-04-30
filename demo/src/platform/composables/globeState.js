/**
 * Shared module-level state for the 3D globe.
 * All composables that need Three.js objects import from here.
 * This is intentionally NOT reactive — Three.js objects should never
 * be wrapped in Vue refs.
 */
import * as THREE from 'three'

export const GLOBE_RADIUS = 5.2
export const DEFAULT_FOCUS_CENTER = [104.113106, 37.570693]
export const DEFAULT_CAMERA_DISTANCE = 8.2
export const PROVINCE_PULSE_MIN_COUNT = 4
export const PROVINCE_PULSE_MAX_COUNT = 6

// Three.js singleton objects (assigned during initScene / createBaseGlobe)
export const ctx = {
  scene: null,
  camera: null,
  renderer: null,
  composer: null,
  controls: null,
  raycaster: null,
  clock: null,
  globeMesh: null,
  atmosphere: null,
  globeWire: null,
  heroHalo: null,
  stars: null,
  introTimeline: null,
  rafId: 0,
}

// Scene graph groups (created once, never replaced)
export const mapRoot = new THREE.Group()
export const provinceRoot = new THREE.Group()
export const cityRoot = new THREE.Group()
export const focusRoot = new THREE.Group()
export const selectionRoot = new THREE.Group()
export const particleRoot = new THREE.Group()

// Shared reusable objects
export const globeSphere = new THREE.Sphere(new THREE.Vector3(), GLOBE_RADIUS + 0.18)
export const mouseNdc = new THREE.Vector2()
export const dummy = new THREE.Object3D()
export const tempColor = new THREE.Color()

// Fat line materials — collected across layers; need resolution update on resize
export const fatLineMaterials = []

// Province layer state
export const provinceFeatureMap = new Map()
export const provincePickables = []
export const pulseProvinceCodes = new Set()
export const pulseProvincePhaseMap = new Map()
export const pulseProvinceWindowMap = new Map()
export const pulseState = { nextSwapAt: 0 }

// City layer state
export const cityPickables = []
export const cityHitPickables = []
export const cityFeatureMap = new Map()
export const focusLayerState = {
  focusCityOverlay: null,
  focusBridge: null,
  focusBridgePairs: [],
  orbitDecorations: null,
}

// Particle cloud state
export const particleState = {
  meshes: [],
  relationLines: null,
  meta: [],
  relationMeta: [],
  hoveredIndex: -1,
  selectedIndex: -1,
  anim: { progress: 0 },
}

export const FOCUS_PROVINCE_GEOS = {}   // populated in useGeoLayers after geo imports
export const FOCUS_CITY_DISTRICT_GEOS = {}

export function isFocusProvince(code) {
  return !!FOCUS_PROVINCE_GEOS[String(code)]
}

export function hasDistrictGeo(code) {
  return !!FOCUS_CITY_DISTRICT_GEOS[String(code)]
}

/**
 * 重置所有 module 级单例：清空 Group 子物体 + Map / Set / Array / 状态对象。
 * 在 ThreeDashboard 卸载时调用，避免 yc-cy 切走再切回时保留上一次的省份高亮、
 * 凸起状态、相机选区残留等。
 */
export function resetGlobeState() {
  // 重置场景图（移除所有子物体，让下一次 mount 从干净状态重建）
  ;[mapRoot, provinceRoot, cityRoot, focusRoot, selectionRoot, particleRoot].forEach((g) => {
    g.clear()
    g.position.set(0, 0, 0)
    g.scale.set(1, 1, 1)
    g.rotation.set(0, 0, 0)
  })

  // 清空集合
  fatLineMaterials.length = 0
  provinceFeatureMap.clear()
  provincePickables.length = 0
  pulseProvinceCodes.clear()
  pulseProvincePhaseMap.clear()
  pulseProvinceWindowMap.clear()
  pulseState.nextSwapAt = 0

  cityPickables.length = 0
  cityHitPickables.length = 0
  cityFeatureMap.clear()

  focusLayerState.focusCityOverlay = null
  focusLayerState.focusBridge = null
  focusLayerState.focusBridgePairs = []
  focusLayerState.orbitDecorations = null

  particleState.meshes = []
  particleState.relationLines = null
  particleState.meta = []
  particleState.relationMeta = []
  particleState.hoveredIndex = -1
  particleState.selectedIndex = -1
  particleState.anim.progress = 0

  // ctx 内的 Three.js 实例由 useGlobeScene.dispose() 自己处理 dispose；
  // 这里只清引用避免下一次复用旧实例
  ctx.scene = null
  ctx.camera = null
  ctx.renderer = null
  ctx.composer = null
  ctx.controls = null
  ctx.raycaster = null
  ctx.clock = null
  ctx.globeMesh = null
  ctx.atmosphere = null
  ctx.globeWire = null
  ctx.heroHalo = null
  ctx.stars = null
  ctx.introTimeline = null
  ctx.rafId = 0
}
