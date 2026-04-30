<template>
  <div class="blueprint-root">
    <div ref="stageRef" class="blueprint-stage"></div>
    <div
      v-if="labelTooltip.visible"
      class="blueprint-node-tooltip"
      :style="{ left: `${labelTooltip.x}px`, top: `${labelTooltip.y}px`, '--accent': labelTooltip.accent }"
    >
      <span>{{ labelTooltip.level }}</span>
      <strong>{{ labelTooltip.title }}</strong>
    </div>

    <!-- 左上：产业链快速切换面板 -->
    <nav class="blueprint-sector-menu" aria-label="产业链切换">
      <div class="blueprint-sector-menu-title">产业切换</div>
      <button
        v-for="entry in sectorMenu"
        :key="entry.dataKey"
        type="button"
        :class="['blueprint-sector-menu-item', { 'is-active': activeSectorKey === entry.dataKey }]"
        :style="{ '--accent': entry.colorHex }"
        @click="onSectorMenuClick(entry)"
      >
        <span class="blueprint-sector-menu-dot"></span>
        <span class="blueprint-sector-menu-name">{{ entry.name }}</span>
      </button>
      <button
        type="button"
        class="blueprint-expand-all-btn"
        :class="{ 'is-active': allExpanded }"
        :disabled="!activeSectorKey"
        @click="onToggleExpandAll"
      >
        {{ allExpanded ? '收起所有链路' : '一键展开' }}
      </button>
    </nav>

    <div class="blueprint-hud">
      <div class="blueprint-status">
        <div class="blueprint-status-kicker">场景状态</div>
        <div class="blueprint-status-title">{{ statusTitle }}</div>
        <div class="blueprint-status-body">{{ statusBody }}</div>
      </div>
    </div>

    <div class="blueprint-footer">
      <div class="blueprint-legend">
        <span><i class="blueprint-dot" style="color:#86e4ff"></i>主链</span>
        <span><i class="blueprint-dot" style="color:#78a3ff"></i>分支</span>
        <span><i class="blueprint-dot" style="color:#fff4c4"></i>脉冲</span>
      </div>
      <div class="blueprint-actions">
        <span>Esc 重置</span>
        <button type="button" @click="onReset">返回总览</button>
        <button type="button" class="blueprint-back" @click="emit('exit')">← 返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  OutlineEffect,
  RenderPass,
  SelectiveBloomEffect,
  ShockWaveEffect
} from 'postprocessing'
import { industryChainGraphData } from '../data/industry-chain-graph.js'

const emit = defineEmits(['exit'])

const stageRef = ref(null)
const statusTitle = ref('总览')
const statusBody = ref('点击任意漂浮产业扇区。镜头会推近，核心脉冲触发，主链节点依次生长，分支节点随后展开。')

const labelTooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  level: '',
  accent: '#86e4ff'
})

let resetSceneFn = () => {}
const onReset = () => resetSceneFn()

// 左上角切换面板：6 个产业 dataKey + 名字 + 颜色（与下方 SECTOR_DEFS 保持一致）
const sectorMenu = [
  { name: '人工智能', dataKey: 'ai', colorHex: '#6ab6ff' },
  { name: '新能源', dataKey: 'newenergy', colorHex: '#6bffcf' },
  { name: '生物医药', dataKey: 'pharma', colorHex: '#86e4ff' },
  { name: '酵母制造', dataKey: 'yeast', colorHex: '#9ca8ff' },
  { name: '船舶制造', dataKey: 'ship', colorHex: '#8fd1ff' },
  { name: '湿化学品', dataKey: 'wetchem', colorHex: '#7bfff2' },
]
const activeSectorKey = ref(null)
let selectSectorByKeyFn = () => {}
function onSectorMenuClick(entry) {
  if (activeSectorKey.value === entry.dataKey) {
    resetSceneFn()
  } else {
    selectSectorByKeyFn(entry.dataKey)
  }
}

// 一键展开所有 L1 子树
const allExpanded = ref(false)
let toggleExpandAllFn = () => {}
function onToggleExpandAll() {
  toggleExpandAllFn()
}

let cleanup = () => {}

onMounted(() => {
  const stage = stageRef.value
  if (!stage) return

  const getStageSize = () => {
    const w = stage.clientWidth || window.innerWidth
    const h = stage.clientHeight || window.innerHeight
    return { width: w, height: h }
  }

  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  const initialSize = getStageSize()
  renderer.setSize(initialSize.width, initialSize.height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  stage.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x030712)
  scene.fog = new THREE.FogExp2(0x04101d, 0.026)

  const camera = new THREE.PerspectiveCamera(42, initialSize.width / initialSize.height, 0.1, 160)
  const overviewCameraBase = new THREE.Vector3(-0.75, 1.18, 12.8)
  const overviewLookBase = new THREE.Vector3(-0.6, 0.2, 0)
  const orbitCenter = new THREE.Vector3(-0.25, 0, -1.1)
  camera.position.copy(overviewCameraBase)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomEffect = new SelectiveBloomEffect(scene, camera, {
    blendFunction: BlendFunction.ADD,
    mipmapBlur: true,
    luminanceThreshold: 0.18,
    luminanceSmoothing: 0.24,
    intensity: 2.4
  })
  bloomEffect.ignoreBackground = true

  const outlineEffect = new OutlineEffect(scene, camera, {
    blendFunction: BlendFunction.SCREEN,
    edgeStrength: 3.1,
    pulseSpeed: 0,
    visibleEdgeColor: 0xb8ecff,
    hiddenEdgeColor: 0x08131f,
    xRay: true,
    blur: false
  })

  const shockWaveEffect = new ShockWaveEffect(camera, new THREE.Vector3(), {
    speed: 1.25,
    maxRadius: 0.42,
    waveSize: 0.18,
    amplitude: 0.06
  })

  composer.addPass(new EffectPass(camera, bloomEffect, outlineEffect, shockWaveEffect))

  const world = new THREE.Group()
  const driftGroup = new THREE.Group()
  world.add(driftGroup)
  scene.add(world)

  const ambient = new THREE.AmbientLight(0x7fb8ff, 0.7)
  const key = new THREE.DirectionalLight(0x6bc8ff, 1.5)
  key.position.set(5, 7, 8)
  const rim = new THREE.DirectionalLight(0x5d7cff, 1.1)
  rim.position.set(-6, 2, -8)
  scene.add(ambient, key, rim)

  const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const driftTarget = new THREE.Vector3()
  const lookTarget = overviewLookBase.clone()
  const lookTargetProxy = lookTarget.clone()
  const hoverTarget = new THREE.Vector2()
  const sectorHitAreas = []
  const sectors = []
  const chainGroup = new THREE.Group()
  driftGroup.add(chainGroup)

  // —— 点击 L1 分支详情：hit areas、当前聚焦节点、镜头存档 ——
  const branchHitAreas = []
  let focusedBranchNode = null
  let savedCamPos = null
  let savedLookTarget = null

  const sceneState = {
    busy: false,
    focusedSector: null,
    mainProgress: 0,
    branchProgress: 0,
    pulse: 0
  }

  let currentTimeline = null
  let activeChain = null
  let rafId = null

  function shortenLabel(text, maxLength = 12) {
    const chars = Array.from(String(text || '').trim())
    if (chars.length <= maxLength) return chars.join('')
    return `${chars.slice(0, Math.max(2, maxLength - 3)).join('')}...`
  }

  function colorToCss(color, alpha = 1) {
    return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${alpha})`
  }

  function drawRoundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + r)
    ctx.lineTo(x + width, y + height - r)
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    ctx.lineTo(x + r, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  function makeLabelSprite(text, color, scale = 1, options = {}) {
    const shortText = shortenLabel(text, options.maxLength ?? 12)
    const canvas = document.createElement('canvas')
    const fontSize = options.fontSize ?? 42
    const font = `700 ${fontSize}px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`
    const measure = document.createElement('canvas').getContext('2d')
    measure.font = font
    const textWidth = Math.ceil(measure.measureText(shortText).width)
    canvas.width = Math.max(260, Math.min(720, textWidth + 92))
    canvas.height = 132
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRoundRect(ctx, 16, 31, canvas.width - 32, 70, 22)
    ctx.fillStyle = 'rgba(9, 19, 36, 0.52)'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = colorToCss(color, 0.34)
    ctx.stroke()
    ctx.shadowBlur = 24
    ctx.shadowColor = colorToCss(color, 0.42)
    ctx.lineWidth = 8
    ctx.strokeStyle = 'rgba(10, 22, 38, 0.45)'
    ctx.fillStyle = 'rgba(236, 246, 255, 0.98)'
    ctx.font = font
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeText(shortText, canvas.width / 2, canvas.height / 2 + 2)
    ctx.fillText(shortText, canvas.width / 2, canvas.height / 2 + 2)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0 })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set((canvas.width / 120) * scale, 0.82 * scale, 1)
    sprite.userData.fullLabel = String(text || '')
    sprite.userData.shortLabel = shortText
    return sprite
  }

  function createStarField() {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 45
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.55
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 8
      color.setHSL(0.54 + Math.random() * 0.08, 0.72, 0.55 + Math.random() * 0.3)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 0.14,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const points = new THREE.Points(geometry, material)
    driftGroup.add(points)
    return points
  }

  function createGridTunnel() {
    const group = new THREE.Group()
    const material = new THREE.LineBasicMaterial({ color: 0x173252, transparent: true, opacity: 0.45 })
    for (let i = -7; i <= 7; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 1.6, -3.8, 6),
        new THREE.Vector3(i * 2.8, -3.8, -42)
      ])
      group.add(new THREE.Line(geo, material))
    }
    for (let j = 0; j < 12; j++) {
      const z = 6 - j * 4.2
      const width = 14 + j * 2.4
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-width, -3.8, z),
        new THREE.Vector3(width, -3.8, z)
      ])
      group.add(new THREE.Line(geo, material))
    }
    driftGroup.add(group)
    return group
  }

  function setObjectOpacity(root, opacity) {
    root.traverse((child) => {
      if (!child.material) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if ('opacity' in material) {
          material.transparent = true
          material.opacity = opacity
        }
      })
    })
  }

  function createSectorNode(data) {
    const group = new THREE.Group()
    group.position.copy(data.position)
    const basePosition = data.position.clone()
    const orbitOffset = basePosition.clone().sub(orbitCenter)
    group.userData.basePosition = basePosition
    group.userData.orbitRadius = Math.hypot(orbitOffset.x, orbitOffset.z)
    group.userData.orbitAngle = Math.atan2(orbitOffset.z, orbitOffset.x)
    group.userData.orbitYOffset = basePosition.y
    group.userData.data = data
    group.userData.fullLabel = data.name
    group.userData.labelLevel = '产业'
    group.userData.labelColor = data.color
    group.userData.state = { opacity: 1, glow: 0.8, ring: 0.3 }

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.24, 4),
      new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 1.35,
        metalness: 0.18,
        roughness: 0.22,
        transparent: true,
        opacity: 1
      })
    )

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.08, 18, 120),
      new THREE.MeshBasicMaterial({
        color: data.color.clone().lerp(new THREE.Color(0xffffff), 0.28),
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    halo.rotation.x = Math.PI * 0.55

    const spindle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 3.4, 16),
      new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.16 })
    )
    spindle.rotation.z = Math.PI * 0.5

    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 16, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    )
    hit.userData.owner = group
    hit.userData.labelOwner = group

    const label = makeLabelSprite(data.name, data.color, 1, { maxLength: 8 })
    label.position.set(0, 2.58, 0)

    group.add(spindle, halo, shell, hit, label)
    group.userData.shell = shell
    group.userData.halo = halo
    group.userData.label = label
    group.userData.hit = hit

    bloomEffect.selection.add(shell)
    bloomEffect.selection.add(halo)
    sectorHitAreas.push(hit)
    driftGroup.add(group)
    sectors.push(group)
    return group
  }

  // 6 大产业的视觉配置（颜色、漂浮位置、对应数据 key）
  const SECTOR_DEFS = [
    { name: '人工智能', dataKey: 'ai',         color: new THREE.Color('#6ab6ff'), position: new THREE.Vector3(-6.8, 2.8, -1.6) },
    { name: '新能源',   dataKey: 'newenergy',  color: new THREE.Color('#6bffcf'), position: new THREE.Vector3(-8.2, -1.4, -3.5) },
    { name: '生物医药', dataKey: 'pharma',     color: new THREE.Color('#86e4ff'), position: new THREE.Vector3(-2.6, -3.2, 0.4) },
    { name: '酵母制造', dataKey: 'yeast',      color: new THREE.Color('#9ca8ff'), position: new THREE.Vector3(5.8, 2.5, -3.8) },
    { name: '船舶制造', dataKey: 'ship',       color: new THREE.Color('#8fd1ff'), position: new THREE.Vector3(7.9, -0.8, -1.2) },
    { name: '湿化学品', dataKey: 'wetchem',    color: new THREE.Color('#7bfff2'), position: new THREE.Vector3(1.6, 4.3, 1.1) },
  ]

  // 由真实产业链数据构建扇区：main = ['上游','中游','下游']，branches = 每段一级 children 的前 5 个完整节点
  const BRANCH_LIMIT = 5
  const SEGMENT_KEYS = ['upstream', 'midstream', 'downstream']
  const SEGMENT_LABELS = ['上游', '中游', '下游']
  const sectorData = SECTOR_DEFS.map((def) => {
    const graph = industryChainGraphData[def.dataKey] || {}
    const branches = []
    SEGMENT_KEYS.forEach((segKey, segIndex) => {
      const root = graph[segKey]?.root
      const children = (root?.children || []).slice(0, BRANCH_LIMIT)
      if (children.length) {
        branches.push({ from: segIndex, nodes: children })
      }
    })
    return {
      dataKey: def.dataKey,
      name: def.name,
      color: def.color,
      position: def.position,
      chain: { main: SEGMENT_LABELS.slice(), branches },
    }
  })

  const stars = createStarField()
  const tunnel = createGridTunnel()
  sectorData.forEach(createSectorNode)

  function createNode(label, color, scale = 0.42, options = {}) {
    const group = new THREE.Group()
    const state = { opacity: 0, glow: 0, scale: 0.1 }
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(scale, 0),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.0,
        metalness: 0.12,
        roughness: 0.16,
        transparent: true,
        opacity: 0.0
      })
    )
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(scale * 1.7, scale * 0.1, 12, 44),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    )
    ring.rotation.x = Math.PI * 0.5
    const labelSprite = makeLabelSprite(label, color, 0.65, {
      maxLength: options.maxLength ?? 12,
      fontSize: options.fontSize ?? 40
    })
    labelSprite.position.set(0, scale * 2.3, 0)
    group.add(ring, core, labelSprite)
    group.scale.setScalar(state.scale)
    group.userData = {
      state,
      core,
      ring,
      label: labelSprite,
      fullLabel: String(label || ''),
      shortLabel: labelSprite.userData.shortLabel,
      labelLevel: options.levelLabel || '节点',
      labelColor: color
    }
    core.userData.labelOwner = group
    setObjectOpacity(group, 0)
    return group
  }

  function buildGrowthLine(points, color, opacity = 0.92, tubeRadius = 0.025) {
    const curve = new THREE.CatmullRomCurve3(points)
    const tubularSegments = 120
    const radialSegments = 6
    const geometry = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)
    const indicesPerRing = radialSegments * 6
    geometry.setDrawRange(0, 0)
    const tube = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    bloomEffect.selection.add(tube)
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    chainGroup.add(head)
    return { curve, line: tube, head, tubularSegments, indicesPerRing }
  }

  function updateGrowth(lineObject, progress) {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1)
    const rings = Math.floor(lineObject.tubularSegments * clamped)
    lineObject.line.geometry.setDrawRange(0, rings * lineObject.indicesPerRing)
    lineObject.head.position.copy(lineObject.curve.getPoint(Math.max(0.001, clamped)))
    lineObject.head.visible = clamped > 0.001 && clamped < 0.995
  }

  function clearChain() {
    hideLabelTooltip()
    if (activeChain) {
      activeChain.nodes.forEach((node) => {
        bloomEffect.selection.delete(node.userData.core)
        outlineEffect.selection.delete(node.userData.core)
      })
      activeChain.branchNodes.forEach((node) => {
        bloomEffect.selection.delete(node.userData.core)
        outlineEffect.selection.delete(node.userData.core)
        // 子树节点 / 连线也从 bloom 选区清掉
        ;(node.userData.subtreeNodes || []).forEach((sub) => {
          if (sub.userData?.core) {
            bloomEffect.selection.delete(sub.userData.core)
            outlineEffect.selection.delete(sub.userData.core)
          }
        })
        ;(node.userData.subtreeLines || []).forEach((lo) => {
          if (lo?.line) bloomEffect.selection.delete(lo.line)
        })
      })
      ;[activeChain.mainLine, ...activeChain.branchLines].forEach((lo) => {
        bloomEffect.selection.delete(lo.line)
      })
      chainGroup.clear()
    }
    activeChain = null
    sceneState.mainProgress = 0
    sceneState.branchProgress = 0
    // 切换/重置时清空分支详情状态
    focusedBranchNode = null
    savedCamPos = null
    savedLookTarget = null
    branchHitAreas.length = 0
    allExpanded.value = false
  }

  function buildChainForSector(sector) {
    clearChain()
    const data = sector.userData.data
    const growthDir = new THREE.Vector3(1, 0.03, -0.14).normalize()
    const sideDir = new THREE.Vector3(0, 1, 0)
    const center = new THREE.Vector3(-2.65, 0.12, 1.02)
    // main 链 3 段（上/中/下）→ 4 个点
    const mainPoints = [
      center,
      center.clone().add(new THREE.Vector3(2.6, 0.12, -0.18)),
      center.clone().add(new THREE.Vector3(6.3, 0.62, -0.74)),
      center.clone().add(new THREE.Vector3(10.4, 0.42, -1.86))
    ]

    const mainLine = buildGrowthLine(mainPoints, data.color, 0.95)
    chainGroup.add(mainLine.line)

    const centerOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24),
      new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    centerOrb.position.copy(center)
    chainGroup.add(centerOrb)
    bloomEffect.selection.add(centerOrb)

    const nodes = data.chain.main.map((label, index) => {
      const node = createNode(label, data.color.clone().lerp(new THREE.Color(0xffffff), 0.2), 0.4 + index * 0.04, {
        maxLength: 8,
        levelLabel: '主链'
      })
      node.position.copy(mainPoints[index + 1])
      chainGroup.add(node)
      return node
    })

    const branchLines = []
    const branchNodes = []
    // 跨段 L1 分支位置集合（碰撞检测用）+ MIN_DIST（包含标签宽 + padding）
    const placedBranchEnds = []
    const MIN_BRANCH_DIST = 1.15
    data.chain.branches.forEach((branch, branchIndex) => {
      const origin = mainPoints[branch.from + 1].clone()
      const branchSign = branchIndex % 2 === 0 ? 1 : -1
      const items = branch.nodes || []
      items.forEach((nodeData, itemIndex) => {
        const offsetIndex = itemIndex - (items.length - 1) / 2
        const baseDX = 2.3 + branchIndex * 0.85 + itemIndex * 0.55
        const baseDY = branchSign * (1.8 + Math.abs(offsetIndex) * 0.9)
        const baseDZ = -1.08 - branchIndex * 0.35 - itemIndex * 0.48
        // mul=1 起步，撞了就乘 1.18 外推，最多 6 次
        let mul = 1
        let end
        for (let attempt = 0; attempt < 6; attempt++) {
          end = origin.clone().add(new THREE.Vector3(baseDX * mul, baseDY * mul, baseDZ * mul))
          const collides = placedBranchEnds.some((p) => p.distanceTo(end) < MIN_BRANCH_DIST)
          if (!collides) break
          mul *= 1.18
        }
        placedBranchEnds.push(end.clone())
        const mid = origin.clone().lerp(end, 0.56).add(new THREE.Vector3(0.65, branchSign * 0.55, -0.3))
        const lineObject = buildGrowthLine([origin, mid, end], data.color.clone().lerp(new THREE.Color('#8aa7ff'), 0.48), 0.68, 0.016)
        lineObject.line.visible = false
        lineObject.head.visible = false
        chainGroup.add(lineObject.line)
        branchLines.push(lineObject)
        const node = createNode(nodeData.name, data.color.clone().lerp(new THREE.Color('#8aa7ff'), 0.46), 0.28, {
          maxLength: 12,
          levelLabel: '分支'
        })
        node.position.copy(end)
        chainGroup.add(node)
        branchNodes.push(node)
        // hover/click 用的元数据
        node.userData.nodeData = nodeData
        node.userData.branchSign = branchSign
        node.userData.color = data.color
        node.userData.core.userData.branchOwner = node
        branchHitAreas.push(node.userData.core)
      })
    })

    activeChain = { center, centerOrb, growthDir, sideDir, mainLine, nodes, branchLines, branchNodes }
    updateGrowth(mainLine, 0.001)
    branchLines.forEach((line) => updateGrowth(line, 0.001))
    return activeChain
  }

  function activateNode(node) {
    const { state, core, ring, label } = node.userData
    outlineEffect.selection.add(core)
    bloomEffect.selection.add(core)
    gsap.to(state, { opacity: 0.95, glow: 1.8, scale: 1, duration: 0.55, ease: 'power2.out', onUpdate: () => {
      core.material.opacity = state.opacity
      core.material.emissiveIntensity = state.glow
      ring.material.opacity = state.opacity * 0.65
      label.material.opacity = state.opacity
      node.scale.setScalar(state.scale)
    }})
  }

  function triggerPulse(position, color) {
    shockWaveEffect.epicenter.copy(position)
    shockWaveEffect.explode()
    sceneState.pulse = 1
    gsap.fromTo(sceneState, { pulse: 1 }, { pulse: 0, duration: 1.6, ease: 'power2.out' })
    if (activeChain?.centerOrb) {
      activeChain.centerOrb.material.color.copy(color)
      gsap.fromTo(activeChain.centerOrb.scale, { x: 0.3, y: 0.3, z: 0.3 }, { x: 3.4, y: 3.4, z: 3.4, duration: 0.8, ease: 'power2.out' })
      gsap.fromTo(activeChain.centerOrb.material, { opacity: 1 }, { opacity: 0.05, duration: 0.8, ease: 'power2.out' })
    }
  }

  // ── 点击 L1 后子树展开（L2 / L3 / L4） ─────────────────────────────────────
  // 子树连线（与 buildGrowthLine 接口兼容，head 挂在指定 parent）
  function buildSubtreeGrowthLine(points, color, parent, tubeRadius = 0.012) {
    const curve = new THREE.CatmullRomCurve3(points)
    const tubularSegments = 80
    const radialSegments = 6
    const geometry = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)
    const indicesPerRing = radialSegments * 6
    geometry.setDrawRange(0, 0)
    const tube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    bloomEffect.selection.add(tube)
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(0.05, tubeRadius * 5), 12, 12),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    )
    head.visible = false
    parent.add(tube)
    parent.add(head)
    return { curve, line: tube, head, tubularSegments, indicesPerRing }
  }

  function activateChildNode(node, scaleTarget = 1) {
    const { state, core, ring, label } = node.userData
    gsap.killTweensOf(state)
    gsap.killTweensOf(node.scale)
    gsap.to(state, {
      opacity: 0.92, glow: 1.4, scale: scaleTarget,
      duration: 0.36, ease: 'power2.out',
      onUpdate: () => {
        core.material.opacity = state.opacity
        core.material.emissiveIntensity = state.glow
        ring.material.opacity = state.opacity * 0.55
        label.material.opacity = state.opacity
        node.scale.setScalar(state.scale)
      }
    })
  }

  function buildSubtreeFor(branchNode) {
    if (branchNode.userData.subtreeBuilt) return
    branchNode.userData.subtreeBuilt = true
    const nodeData = branchNode.userData.nodeData
    const l2List = nodeData?.children || []
    if (!l2List.length) return

    const branchSign = branchNode.userData.branchSign || 1
    const baseColor = branchNode.userData.color
    const l2Color = baseColor.clone().lerp(new THREE.Color('#a3b8ff'), 0.55)
    const l3Color = baseColor.clone().lerp(new THREE.Color('#c0d0ff'), 0.65)

    const subtreeNodes = []
    const subtreeLines = []
    const allLocalPositions = []

    // 通用扇形布置 + 全局碰撞外推 + 方向感知
    function placeFan(parent, list, opts) {
      const {
        axisUp, axisSide, axisDepth, spread, baseRadius, depthBase, depthStep,
        scale, color, lineColor, lineRadius, minDist, lineMidLift, level, parentL1Pos,
      } = opts
      const placedNodes = []
      const placedLines = []
      const N = list.length
      if (!N) return { nodes: placedNodes, lines: placedLines }

      list.forEach((data, i) => {
        const t = N === 1 ? 0.5 : i / (N - 1)
        let theta = -spread / 2 + spread * t
        let radius = baseRadius
        const pos = new THREE.Vector3()
        let l1Pos = new THREE.Vector3()
        pos.copy(axisUp).multiplyScalar(Math.cos(theta) * radius)
          .addScaledVector(axisSide, Math.sin(theta) * radius * 0.78)
          .addScaledVector(axisDepth, depthBase + i * depthStep)
        l1Pos.copy(pos).add(parentL1Pos)
        for (let attempt = 0; attempt < 10; attempt++) {
          let nearest = null
          let nearestDist = Infinity
          for (const p of allLocalPositions) {
            const d = p.distanceTo(l1Pos)
            if (d < minDist && d < nearestDist) { nearest = p; nearestDist = d }
          }
          if (!nearest) break
          if (attempt < 5) {
            const pushDir = l1Pos.clone().sub(nearest)
            if (pushDir.lengthSq() < 1e-6) {
              pushDir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            }
            pushDir.normalize()
            pos.addScaledVector(pushDir, (minDist - nearestDist) + 0.05)
          } else {
            radius *= 1.22
            theta += (Math.random() - 0.5) * 0.18
            pos.copy(axisUp).multiplyScalar(Math.cos(theta) * radius)
              .addScaledVector(axisSide, Math.sin(theta) * radius * 0.78)
              .addScaledVector(axisDepth, depthBase + i * depthStep)
          }
          l1Pos.copy(pos).add(parentL1Pos)
        }
        allLocalPositions.push(l1Pos.clone())

        const node = createNode(data.name, color.clone(), scale, {
          maxLength: level <= 2 ? 12 : 10,
          levelLabel: `L${level}`
        })
        node.position.copy(pos)
        node.userData.nodeData = data
        node.userData.subtreeLevel = level
        node.userData.l1LocalPos = l1Pos.clone()
        parent.add(node)
        placedNodes.push(node)

        const mid = new THREE.Vector3().lerpVectors(new THREE.Vector3(), pos, 0.55)
          .addScaledVector(axisUp, lineMidLift)
          .addScaledVector(axisDepth, 0.06)
        const lineObj = buildSubtreeGrowthLine(
          [new THREE.Vector3(0, 0, 0), mid, pos], lineColor, parent, lineRadius
        )
        lineObj.level = level
        placedLines.push(lineObj)
      })
      return { nodes: placedNodes, lines: placedLines }
    }

    const fwdX = new THREE.Vector3(1, 0, 0)

    // L2：围绕 L1 扇形展开（不再线性单向铺开），主轴 +X、上下 ±Y 扇展，spread 270° 避开背向主链
    const lineColorL2 = baseColor.clone().lerp(new THREE.Color('#8aa7ff'), 0.5)
    const l2BaseRadius = 1.7 + 0.22 * Math.sqrt(l2List.length)
    const l2 = placeFan(branchNode, l2List, {
      axisUp: new THREE.Vector3(1, 0, 0),
      axisSide: new THREE.Vector3(0, 1, 0),
      axisDepth: new THREE.Vector3(0, 0, -1),
      spread: Math.PI * 1.5,
      baseRadius: l2BaseRadius,
      depthBase: 0,
      depthStep: 0.18,
      scale: 0.18,
      color: l2Color,
      lineColor: lineColorL2,
      lineRadius: 0.012,
      minDist: 1.6,
      lineMidLift: 0.2,
      level: 2,
      parentL1Pos: new THREE.Vector3(0, 0, 0),
    })
    subtreeNodes.push(...l2.nodes)
    subtreeLines.push(...l2.lines)
    const l2Nodes = l2.nodes

    // L3：每个 L2 上方/下方扇形展开。相邻 L2 反向倾斜
    l2List.forEach((l2Data, i) => {
      const l3List = l2Data.children || []
      if (!l3List.length) return
      const l2Node = l2Nodes[i]
      const tilt3 = (i % 2 === 0 ? 1 : -1) * Math.PI * 0.3
      const tiltedUp3 = new THREE.Vector3(0, branchSign, 0).applyAxisAngle(fwdX, tilt3)
      const tiltedSide3 = new THREE.Vector3(0, 0, -1).applyAxisAngle(fwdX, tilt3)
      const l3BaseRadius = 1.0 + 0.32 * Math.sqrt(l3List.length)

      const l3 = placeFan(l2Node, l3List, {
        axisUp: tiltedUp3, axisSide: tiltedSide3, axisDepth: fwdX,
        spread: Math.PI * 0.5, baseRadius: l3BaseRadius,
        depthBase: 0.3, depthStep: 0.13,
        scale: 0.13, color: l3Color,
        lineColor: l2Color.clone().lerp(new THREE.Color('#a3b8ff'), 0.5),
        lineRadius: 0.008, minDist: 1.15, lineMidLift: 0.14, level: 3,
        parentL1Pos: l2Node.userData.l1LocalPos,
      })
      subtreeNodes.push(...l3.nodes)
      subtreeLines.push(...l3.lines)

      // L4 不再展开（用户决策）
    })

    // 三轮全局弛豫：所有节点放完后，仍重叠的两两节点互相轻推
    const minDistByLevel = { 2: 1.8, 3: 1.15 }
    for (let pass = 0; pass < 3; pass++) {
      const pushVecs = subtreeNodes.map(() => new THREE.Vector3())
      for (let a = 0; a < subtreeNodes.length; a++) {
        const posA = subtreeNodes[a].userData.l1LocalPos
        const lvA = subtreeNodes[a].userData.subtreeLevel || 3
        for (let b = a + 1; b < subtreeNodes.length; b++) {
          const posB = subtreeNodes[b].userData.l1LocalPos
          const lvB = subtreeNodes[b].userData.subtreeLevel || 3
          const pairMin = Math.max(minDistByLevel[lvA], minDistByLevel[lvB])
          const d = posA.distanceTo(posB)
          if (d >= pairMin || d < 1e-4) continue
          const dir = posA.clone().sub(posB).normalize()
          const half = (pairMin - d) * 0.45
          pushVecs[a].addScaledVector(dir, half)
          pushVecs[b].addScaledVector(dir, -half)
        }
      }
      pushVecs.forEach((push, idx) => {
        if (push.lengthSq() < 1e-6) return
        push.clampLength(0, 0.1)
        subtreeNodes[idx].position.add(push)
        subtreeNodes[idx].userData.l1LocalPos.add(push)
      })
    }

    branchNode.userData.subtreeNodes = subtreeNodes
    branchNode.userData.subtreeLines = subtreeLines
  }

  function expandSubtree(branchNode) {
    buildSubtreeFor(branchNode)
    const nodes = branchNode.userData.subtreeNodes || []
    const lines = branchNode.userData.subtreeLines || []
    if (!nodes.length && !lines.length) return

    if (branchNode.userData.subtreeTl) {
      branchNode.userData.subtreeTl.kill()
      branchNode.userData.subtreeTl = null
    }
    nodes.forEach((sub) => {
      const { state, core, ring, label } = sub.userData
      gsap.killTweensOf(state)
      gsap.killTweensOf(sub.scale)
      state.opacity = 0; state.glow = 0; state.scale = 0.1
      core.material.opacity = 0
      ring.material.opacity = 0
      label.material.opacity = 0
      sub.scale.setScalar(0.1)
    })
    lines.forEach((lo) => {
      if (lo.line?.geometry?.setDrawRange) lo.line.geometry.setDrawRange(0, 0)
      if (lo.head) lo.head.visible = false
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        lo.line.material.opacity = 0.85
      }
    })

    const linesByLv = { 2: [], 3: [], 4: [] }
    lines.forEach((lo) => { (linesByLv[lo.level] || linesByLv[2]).push(lo) })
    const nodesByLv = { 2: [], 3: [], 4: [] }
    nodes.forEach((n) => { (nodesByLv[n.userData.subtreeLevel] || nodesByLv[2]).push(n) })

    const tl = gsap.timeline()
    branchNode.userData.subtreeTl = tl
    const stages = [
      { lv: 2, lineStart: 0.0,  lineDur: 0.55, lineStagger: 0.04, nodeStart: 0.32, nodeStagger: 0.05 },
      { lv: 3, lineStart: 0.45, lineDur: 0.5,  lineStagger: 0.03, nodeStart: 0.78, nodeStagger: 0.04 },
      { lv: 4, lineStart: 0.95, lineDur: 0.42, lineStagger: 0.03, nodeStart: 1.22, nodeStagger: 0.03 },
    ]
    stages.forEach((stage) => {
      linesByLv[stage.lv].forEach((lo, i) => {
        const proxy = { p: 0 }
        tl.to(proxy, {
          p: 1, duration: stage.lineDur, ease: 'power2.out',
          onUpdate: () => updateGrowth(lo, proxy.p),
        }, stage.lineStart + i * stage.lineStagger)
      })
      nodesByLv[stage.lv].forEach((node, i) => {
        tl.call(() => activateChildNode(node, 1), null, stage.nodeStart + i * stage.nodeStagger)
      })
    })
  }

  function collapseSubtree(branchNode) {
    if (branchNode.userData.subtreeTl) {
      branchNode.userData.subtreeTl.kill()
      branchNode.userData.subtreeTl = null
    }
    const nodes = branchNode.userData.subtreeNodes || []
    const lines = branchNode.userData.subtreeLines || []
    nodes.forEach((sub) => {
      const { state, core, ring, label } = sub.userData
      gsap.killTweensOf(state)
      gsap.killTweensOf(sub.scale)
      gsap.to(state, {
        opacity: 0, glow: 0, scale: 0.1,
        duration: 0.26, ease: 'power2.in',
        onUpdate: () => {
          core.material.opacity = state.opacity
          core.material.emissiveIntensity = state.glow
          ring.material.opacity = state.opacity * 0.55
          label.material.opacity = state.opacity
          sub.scale.setScalar(state.scale)
        }
      })
    })
    lines.forEach((lo) => {
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        gsap.to(lo.line.material, {
          opacity: 0, duration: 0.24, ease: 'power2.in',
          onComplete: () => {
            if (lo.line?.geometry?.setDrawRange) lo.line.geometry.setDrawRange(0, 0)
            if (lo.head) lo.head.visible = false
          }
        })
      }
    })
  }

  function highlightBranchNode(node, on) {
    if (!node?.userData?.state) return
    const { state, core, ring, label } = node.userData
    gsap.killTweensOf(state)
    gsap.to(state, {
      opacity: on ? 1 : 0.95, glow: on ? 2.6 : 1.8,
      duration: 0.28, ease: 'power2.out',
      onUpdate: () => {
        core.material.opacity = state.opacity
        core.material.emissiveIntensity = state.glow
        ring.material.opacity = state.opacity * (on ? 0.95 : 0.65)
        label.material.opacity = state.opacity
      }
    })
  }

  function dimSurroundings(dim) {
    if (!activeChain) return
    const targetOpacity = dim ? 0.22 : 0.95
    const targetGlow = dim ? 0.55 : 1.4
    ;[...activeChain.nodes, ...activeChain.branchNodes].forEach((node) => {
      if (node === focusedBranchNode) return
      const { state, core, ring, label } = node.userData
      gsap.killTweensOf(state)
      gsap.to(state, {
        opacity: targetOpacity, glow: targetGlow,
        duration: 0.32, ease: 'power2.out',
        onUpdate: () => {
          core.material.opacity = state.opacity
          core.material.emissiveIntensity = state.glow
          ring.material.opacity = state.opacity * 0.55
          label.material.opacity = state.opacity
        }
      })
    })
    if (activeChain.mainLine?.line?.material) {
      gsap.killTweensOf(activeChain.mainLine.line.material)
      gsap.to(activeChain.mainLine.line.material, { opacity: dim ? 0.18 : 0.85, duration: 0.32 })
    }
    activeChain.branchLines.forEach((lo) => {
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        gsap.to(lo.line.material, { opacity: dim ? 0.14 : 0.62, duration: 0.32 })
      }
    })
  }

  function switchFocusBranch(newFocused) {
    if (newFocused === focusedBranchNode) return
    if (focusedBranchNode) {
      collapseSubtree(focusedBranchNode)
      highlightBranchNode(focusedBranchNode, false)
    }
    focusedBranchNode = newFocused
    if (newFocused) {
      expandSubtree(newFocused)
      highlightBranchNode(newFocused, true)
      dimSurroundings(true)
    } else {
      dimSurroundings(false)
    }
  }

  function openBranchDetail(branchNode) {
    if (!branchNode || branchNode === focusedBranchNode) return
    // "一键展开"模式下点单个 L1：先收起其它 L1 子树，进入聚焦详情态
    if (allExpanded.value && activeChain) {
      activeChain.branchNodes.forEach((bn) => {
        if (bn !== branchNode && bn.userData.subtreeBuilt) collapseSubtree(bn)
      })
      allExpanded.value = false
    }
    if (!focusedBranchNode) {
      savedCamPos = camera.position.clone()
      savedLookTarget = lookTarget.clone()
    }
    switchFocusBranch(branchNode)
    // L2 围绕 L1 扇形展开，中心 ≈ L1 自身（轻微 +X 偏置以容纳 L3/L4 外延）
    const N = (branchNode.userData.nodeData?.children?.length) || 1
    const fanRadius = 1.7 + 0.22 * Math.sqrt(N)
    const subtreeLocalCenter = new THREE.Vector3(fanRadius * 0.15, 0, -0.3)
    const targetPos = subtreeLocalCenter.clone()
    branchNode.localToWorld(targetPos)
    const refCam = savedCamPos || camera.position
    const refLook = savedLookTarget || lookTarget
    const viewDir = new THREE.Vector3().subVectors(refCam, refLook).normalize()
    // 距离 ≈ 2.5 × 扇半径 + 子级延展余量（L3 半径 ~1.4 + L4 ~0.8 ≈ 2.2 padding）
    const distance = fanRadius * 2.5 + 4
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookTarget)
    gsap.to(camera.position, {
      x: targetPos.x + viewDir.x * distance,
      y: targetPos.y + viewDir.y * distance + 0.4,
      z: targetPos.z + viewDir.z * distance,
      duration: 0.85, ease: 'power3.inOut'
    })
    gsap.to(lookTarget, {
      x: targetPos.x, y: targetPos.y, z: targetPos.z,
      duration: 0.85, ease: 'power3.inOut'
    })
  }

  function closeBranchDetail() {
    if (!focusedBranchNode) return
    switchFocusBranch(null)
    if (savedCamPos && savedLookTarget) {
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(lookTarget)
      gsap.to(camera.position, {
        x: savedCamPos.x, y: savedCamPos.y, z: savedCamPos.z,
        duration: 0.85, ease: 'power3.inOut'
      })
      gsap.to(lookTarget, {
        x: savedLookTarget.x, y: savedLookTarget.y, z: savedLookTarget.z,
        duration: 0.85, ease: 'power3.inOut'
      })
      savedCamPos = null
      savedLookTarget = null
    }
  }

  function focusSector(sector) {
    if (sceneState.busy) return
    sceneState.busy = true
    sceneState.focusedSector = sector
    activeSectorKey.value = sector.userData?.data?.dataKey || null
    if (currentTimeline) currentTimeline.kill()
    const chain = buildChainForSector(sector)
    const color = sector.userData.data.color

    statusTitle.value = sector.userData.data.name
    statusBody.value = '已锁定该扇区。扇区压缩为左侧锚点，主链节点向右生长，分支节点随后在其周围展开。点击子节点可展开下一级，Esc 返回上一级。'

    const cameraTarget = { x: 0.95, y: 1.02, z: 8.9 }
    const overviewCameraTarget = { x: 1.55, y: 2.18, z: 12.6 }
    const overviewLookTarget = { x: 2.35, y: 0.28, z: -0.34 }

    currentTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => { sceneState.busy = false } })

    sectors.forEach((item) => {
      const base = item.userData.basePosition.clone()
      const state = item.userData.state
      if (item === sector) {
        currentTimeline.to(item.position, { x: -4.1, y: 0.18, z: 1.2, duration: 1.15 }, 0)
        currentTimeline.to(item.scale, { x: 0.94, y: 0.94, z: 0.94, duration: 1.15 }, 0)
        currentTimeline.to(state, { opacity: 0.94, glow: 1.72, ring: 0.92, duration: 1.15, onUpdate: () => {
          item.userData.shell.material.opacity = state.opacity
          item.userData.shell.material.emissiveIntensity = state.glow
          item.userData.halo.material.opacity = 0.22 + state.ring * 0.18
          item.userData.label.material.opacity = 0.9
        }}, 0)
      } else {
        const push = base.clone().normalize().multiplyScalar(3.5)
        currentTimeline.to(item.position, {
          x: base.x + push.x,
          y: base.y + push.y * 0.7,
          z: base.z - 10 - Math.abs(push.x) * 0.24,
          duration: 1.05
        }, 0)
        currentTimeline.to(item.scale, { x: 0.72, y: 0.72, z: 0.72, duration: 1.05 }, 0)
        currentTimeline.to(item.userData.state, { opacity: 0.08, glow: 0.06, ring: 0.08, duration: 1.05, onUpdate: () => {
          const s = item.userData.state
          item.userData.shell.material.opacity = s.opacity
          item.userData.shell.material.emissiveIntensity = s.glow
          item.userData.halo.material.opacity = s.ring
          item.userData.label.material.opacity = Math.min(0.16, s.opacity)
        }}, 0)
      }
    })

    currentTimeline.to(driftTarget, { x: 0.18, y: 0.02, z: 0, duration: 1.25 }, 0)
    currentTimeline.to(camera.position, { ...cameraTarget, duration: 1.34 }, 0.26)
    currentTimeline.to(lookTarget, { x: 0.62, y: 0.28, z: -0.2, duration: 1.34 }, 0.26)

    currentTimeline.call(() => triggerPulse(chain.center, color), null, 1.06)
    currentTimeline.to(sceneState, {
      mainProgress: 1,
      duration: 1.75,
      ease: 'power2.out',
      onUpdate: () => {
        updateGrowth(chain.mainLine, sceneState.mainProgress)
        const followPoint = chain.mainLine.curve.getPoint(Math.min(sceneState.mainProgress, 0.88))
        lookTarget.lerp(followPoint.clone().add(new THREE.Vector3(0.45, 0.1, -0.08)), 0.14)
      }
    }, 1.12)

    chain.nodes.forEach((node, index) => {
      currentTimeline.call(() => activateNode(node), null, 1.38 + index * 0.22)
    })

    currentTimeline.call(() => {
      chain.branchLines.forEach((line) => {
        line.line.visible = true
        line.head.visible = true
      })
    }, null, 2.26)

    currentTimeline.to(sceneState, {
      branchProgress: 1,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        chain.branchLines.forEach((line) => updateGrowth(line, sceneState.branchProgress))
      }
    }, 2.28)

    chain.branchNodes.forEach((node, index) => {
      currentTimeline.call(() => activateNode(node), null, 2.58 + index * 0.14)
    })

    currentTimeline.to(camera.position, { ...overviewCameraTarget, duration: 1.18, ease: 'power2.inOut' }, 2.8)
    currentTimeline.to(lookTarget, { ...overviewLookTarget, duration: 1.18, ease: 'power2.inOut' }, 2.8)
    currentTimeline.to(driftTarget, { x: 0.04, y: 0.02, z: 0, duration: 1.18, ease: 'power2.inOut' }, 2.8)
  }

  function resetScene() {
    hideLabelTooltip()
    if (currentTimeline) currentTimeline.kill()
    sceneState.busy = false
    sceneState.focusedSector = null
    activeSectorKey.value = null
    sceneState.mainProgress = 0
    sceneState.branchProgress = 0
    driftTarget.set(0, 0, 0)
    lookTarget.copy(overviewLookBase)
    statusTitle.value = '总览'
    statusBody.value = '点击任意漂浮产业扇区。镜头会推近，核心脉冲触发，主链节点依次生长，分支节点随后展开。'
    clearChain()

    gsap.to(camera.position, { x: overviewCameraBase.x, y: overviewCameraBase.y, z: overviewCameraBase.z, duration: 1.15, ease: 'power3.out' })
    gsap.to(lookTarget, { x: overviewLookBase.x, y: overviewLookBase.y, z: overviewLookBase.z, duration: 1.15, ease: 'power3.out' })

    sectors.forEach((sector) => {
      const base = sector.userData.basePosition
      const state = sector.userData.state
      gsap.to(sector.position, { x: base.x, y: base.y, z: base.z, duration: 1.05, ease: 'power3.out' })
      gsap.to(sector.scale, { x: 1.18, y: 1.18, z: 1.18, duration: 1.05, ease: 'power3.out' })
      gsap.to(state, { opacity: 1, glow: 1.4, ring: 0.92, duration: 1.05, ease: 'power3.out', onUpdate: () => {
        sector.userData.shell.material.opacity = state.opacity
        sector.userData.shell.material.emissiveIntensity = state.glow
        sector.userData.halo.material.opacity = state.ring
        sector.userData.label.material.opacity = 0.96
      }})
    })
  }

  resetSceneFn = resetScene

  // 产业切换菜单点击：自动处理"已聚焦其他产业 / 动画进行中"等情况
  selectSectorByKeyFn = (key) => {
    const target = sectors.find((s) => s.userData?.data?.dataKey === key)
    if (!target || sceneState.focusedSector === target) return
    if (currentTimeline) currentTimeline.kill()
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookTarget)
    sceneState.busy = false
    focusSector(target)
  }

  // 一键展开 / 收起所有 L1 子树（不改镜头、不 dim 兄弟，纯子树切换）
  toggleExpandAllFn = () => {
    if (!activeChain) return
    if (allExpanded.value) {
      // 收起
      activeChain.branchNodes.forEach((bn) => {
        if (bn.userData.subtreeBuilt) collapseSubtree(bn)
      })
      allExpanded.value = false
    } else {
      // 展开前若有单独聚焦的 L1，先合上它
      if (focusedBranchNode) closeBranchDetail()
      activeChain.branchNodes.forEach((bn) => expandSubtree(bn))
      allExpanded.value = true
    }
  }

  function pointerToNDC(event) {
    const rect = stage.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    }
  }

  function getLabelOwner(hit) {
    return hit?.object?.userData?.labelOwner || hit?.object?.userData?.branchOwner || hit?.object?.userData?.owner || null
  }

  function getLabelHitAreas() {
    const areas = [...sectorHitAreas, ...branchHitAreas]
    if (!activeChain) return areas
    activeChain.nodes?.forEach((node) => {
      if (node.userData?.core) areas.push(node.userData.core)
    })
    activeChain.branchNodes?.forEach((node) => {
      if (node.userData?.core) areas.push(node.userData.core)
      ;(node.userData?.subtreeNodes || []).forEach((child) => {
        if (child.userData?.core) areas.push(child.userData.core)
      })
    })
    return areas
  }

  function getOwnerTitle(owner) {
    return owner?.userData?.nodeData?.name || owner?.userData?.data?.name || owner?.userData?.fullLabel || ''
  }

  function getOwnerLevel(owner) {
    if (!owner) return ''
    if (owner.userData?.labelLevel) return owner.userData.labelLevel
    if (owner.userData?.subtreeLevel) return `L${owner.userData.subtreeLevel}`
    return '节点'
  }

  function showLabelTooltip(owner, event) {
    const title = getOwnerTitle(owner)
    if (!title) {
      labelTooltip.visible = false
      return
    }
    const rect = stage.getBoundingClientRect()
    const color = owner.userData?.labelColor || owner.userData?.color || owner.userData?.data?.color
    labelTooltip.visible = true
    labelTooltip.x = Math.min(Math.max(event.clientX - rect.left + 18, 18), Math.max(18, rect.width - 360))
    labelTooltip.y = Math.min(Math.max(event.clientY - rect.top + 18, 18), Math.max(18, rect.height - 112))
    labelTooltip.title = title
    labelTooltip.level = getOwnerLevel(owner)
    labelTooltip.accent = color?.isColor ? colorToCss(color, 1) : '#86e4ff'
  }

  function hideLabelTooltip() {
    labelTooltip.visible = false
  }

  function onPointerMove(event) {
    const p = pointerToNDC(event)
    hoverTarget.x = p.x
    hoverTarget.y = p.y
    pointer.x = p.x
    pointer.y = p.y
    raycaster.setFromCamera(pointer, camera)

    const hit = raycaster.intersectObjects(getLabelHitAreas(), false)[0]
    const owner = getLabelOwner(hit)
    if (owner) {
      showLabelTooltip(owner, event)
    } else {
      hideLabelTooltip()
    }

    const canClickBranch = sceneState.focusedSector && !sceneState.busy && hit?.object?.userData?.branchOwner
    const canClickSector = !sceneState.focusedSector && hit?.object?.userData?.owner
    stage.style.cursor = canClickBranch || canClickSector ? 'pointer' : ''
  }

  function onPointerDown(event) {
    hideLabelTooltip()
    const p = pointerToNDC(event)
    pointer.x = p.x
    pointer.y = p.y
    raycaster.setFromCamera(pointer, camera)
    // 已聚焦产业 + 动画完成 → 优先检测 L1 分支点击
    if (sceneState.focusedSector && !sceneState.busy && branchHitAreas.length) {
      const branchHit = raycaster.intersectObjects(branchHitAreas, false)[0]
      if (branchHit?.object?.userData?.branchOwner) {
        openBranchDetail(branchHit.object.userData.branchOwner)
        return
      }
    }
    // 未聚焦时 → 检测扇区点击
    if (!sceneState.focusedSector) {
      const hit = raycaster.intersectObjects(sectorHitAreas, false)[0]
      if (hit?.object?.userData?.owner) {
        focusSector(hit.object.userData.owner)
      }
    }
  }

  function onResize() {
    const { width, height } = getStageSize()
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    composer.setSize(width, height)
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      if (focusedBranchNode) {
        closeBranchDetail()
      } else {
        resetScene()
      }
    }
  }

  function onDblClick() {
    resetScene()
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('dblclick', onDblClick)

  resetScene()

  function render() {
    const elapsed = clock.getElapsedTime()
    const overviewMode = !sceneState.focusedSector
    sectors.forEach((sector, index) => {
      if (sceneState.focusedSector === sector) return
      const base = sector.userData.basePosition
      const orbitRadius = sector.userData.orbitRadius
      const orbitAngle = sector.userData.orbitAngle
      const orbitDrift = elapsed * 0.05 + index * 0.08
      const orbitWave = 1 + Math.sin(elapsed * 0.42 + index * 0.9) * 0.035
      const orbitX = orbitCenter.x + Math.cos(orbitAngle + orbitDrift) * orbitRadius * orbitWave
      const orbitZ = orbitCenter.z + Math.sin(orbitAngle + orbitDrift) * orbitRadius * orbitWave
      const targetX = overviewMode ? orbitX : base.x
      const targetZ = overviewMode ? orbitZ : base.z
      const targetY = sector.userData.orbitYOffset + Math.sin(elapsed * 0.9 + index * 0.85) * 0.22
      sector.position.x += (targetX - sector.position.x) * 0.018
      sector.position.y += (targetY - sector.position.y) * 0.04
      sector.position.z += (targetZ - sector.position.z) * 0.018
      sector.rotation.y += 0.0032
      sector.userData.halo.rotation.z += 0.006 + index * 0.0003
      sector.userData.halo.rotation.x = 1.2 + Math.sin(elapsed * 0.7 + index) * 0.08
      sector.userData.shell.position.y = Math.sin(elapsed * 1.15 + index) * 0.14
      sector.userData.label.position.y = 2.58 + Math.sin(elapsed * 1.15 + index) * 0.12
    })

    if (sceneState.focusedSector) {
      const focus = sceneState.focusedSector
      focus.userData.halo.rotation.z += 0.02
      focus.userData.halo.rotation.x = 1.4 + Math.sin(elapsed * 2.4) * 0.14
      focus.userData.shell.position.y = Math.sin(elapsed * 2.2) * 0.08
      focus.userData.label.position.y = 2.25 + Math.sin(elapsed * 2.2) * 0.12
    }

    const parallaxX = hoverTarget.x * 0.36
    const parallaxY = hoverTarget.y * 0.22
    driftGroup.position.x += (driftTarget.x + parallaxX - driftGroup.position.x) * 0.05
    driftGroup.position.y += (driftTarget.y + parallaxY - driftGroup.position.y) * 0.05

    if (overviewMode) {
      const overviewCamX = overviewCameraBase.x + Math.cos(elapsed * 0.18) * 0.18
      const overviewCamY = overviewCameraBase.y + Math.sin(elapsed * 0.24) * 0.08
      const overviewCamZ = overviewCameraBase.z + Math.sin(elapsed * 0.18) * 0.16
      camera.position.x += (overviewCamX - camera.position.x) * 0.02
      camera.position.y += (overviewCamY - camera.position.y) * 0.02
      camera.position.z += (overviewCamZ - camera.position.z) * 0.02
      lookTarget.x += ((overviewLookBase.x + Math.sin(elapsed * 0.16) * 0.12) - lookTarget.x) * 0.02
      lookTarget.y += ((overviewLookBase.y + Math.cos(elapsed * 0.22) * 0.03) - lookTarget.y) * 0.02
      lookTarget.z += ((overviewLookBase.z + Math.sin(elapsed * 0.14) * 0.08) - lookTarget.z) * 0.02
    }

    lookTargetProxy.lerp(lookTarget, 0.09)
    camera.lookAt(lookTargetProxy)

    if (activeChain) {
      activeChain.centerOrb.rotation.y += 0.03
      activeChain.centerOrb.material.opacity = 0.2 + sceneState.pulse * 0.8
      activeChain.centerOrb.scale.setScalar(1 + sceneState.pulse * 2.2)
      activeChain.nodes.concat(activeChain.branchNodes).forEach((node, index) => {
        // 被点击聚焦的 L1 不再旋转，否则它的子树（作为 children）会被甩着一起转
        if (node === focusedBranchNode) return
        node.rotation.y += 0.01 + index * 0.0008
        node.userData.ring.rotation.z += 0.02
        node.position.y += Math.sin(elapsed * 1.8 + index * 0.55) * 0.0015
      })
      // 当前展开的子树节点：每帧轻微上下漂浮（不旋转），相位各异避免同步
      if (focusedBranchNode?.userData?.subtreeNodes) {
        focusedBranchNode.userData.subtreeNodes.forEach((sub) => {
          if (sub.userData.baseY === undefined) {
            sub.userData.baseY = sub.position.y
            sub.userData.floatPhase = Math.random() * Math.PI * 2
          }
          sub.position.y = sub.userData.baseY + Math.sin(elapsed * 1.4 + sub.userData.floatPhase) * 0.05
        })
      }
    }

    stars.rotation.y += 0.0005
    tunnel.position.z = -Math.sin(elapsed * 0.18) * 0.4
    composer.render()
    rafId = requestAnimationFrame(render)
  }

  render()

  cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId)
    if (currentTimeline) currentTimeline.kill()
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookTarget)
    sectors.forEach((sector) => {
      gsap.killTweensOf(sector.position)
      gsap.killTweensOf(sector.scale)
      gsap.killTweensOf(sector.userData.state)
    })
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('dblclick', onDblClick)
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          if (m.map) m.map.dispose()
          m.dispose()
        })
      }
    })
    composer.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode === stage) stage.removeChild(renderer.domElement)
  }
})

onBeforeUnmount(() => cleanup())
</script>

<style scoped>
.blueprint-root {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: radial-gradient(circle at top, #081628 0%, #020711 56%, #01040a 100%);
  font-family: "Segoe UI", "PingFang SC", sans-serif;
  color: rgba(235, 246, 255, 0.96);
}

.blueprint-stage {
  position: absolute;
  inset: 0;
}

.blueprint-stage :deep(canvas) {
  display: block;
}

.blueprint-node-tooltip {
  position: absolute;
  z-index: 12;
  max-width: min(360px, calc(100% - 36px));
  padding: 10px 13px 12px 15px;
  border-radius: 14px;
  border: 1px solid rgba(134, 228, 255, 0.42);
  background: linear-gradient(135deg, rgba(8, 18, 33, 0.88), rgba(10, 35, 58, 0.72));
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.32), 0 0 26px color-mix(in srgb, var(--accent) 34%, transparent);
  backdrop-filter: blur(14px);
  color: rgba(238, 248, 255, 0.98);
  pointer-events: none;
}

.blueprint-node-tooltip::before {
  content: "";
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

.blueprint-node-tooltip span {
  display: block;
  font-size: 11px;
  line-height: 1;
  letter-spacing: 0.16em;
  color: rgba(158, 210, 240, 0.82);
}

.blueprint-node-tooltip strong {
  display: block;
  margin-top: 7px;
  font-size: 15px;
  line-height: 1.42;
  font-weight: 700;
  overflow-wrap: anywhere;
  text-shadow: 0 0 12px rgba(134, 228, 255, 0.26);
}

.blueprint-hud {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  pointer-events: none;
}

/* 左上角产业切换面板 */
.blueprint-sector-menu {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 6;
  width: 158px;
  padding: 12px 12px 10px;
  border-radius: 16px;
  border: 1px solid rgba(133, 205, 255, 0.2);
  background: rgba(8, 14, 26, 0.62);
  backdrop-filter: blur(14px);
  box-shadow: 0 0 28px rgba(25, 96, 180, 0.16);
  font-family: "Segoe UI", "PingFang SC", sans-serif;
  pointer-events: auto;
}
.blueprint-sector-menu-title {
  margin-bottom: 8px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: rgba(150, 200, 240, 0.78);
}
.blueprint-sector-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 10px;
  margin-bottom: 4px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: rgba(220, 240, 255, 0.82);
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.blueprint-sector-menu-item:last-child {
  margin-bottom: 0;
}
.blueprint-sector-menu-item:hover {
  background: rgba(123, 192, 255, 0.1);
  border-color: rgba(123, 192, 255, 0.32);
  color: #ffffff;
}
.blueprint-sector-menu-item.is-active {
  background: linear-gradient(90deg, rgba(123, 192, 255, 0.18), transparent 80%);
  border-color: var(--accent);
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(123, 192, 255, 0.18);
}
.blueprint-sector-menu-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}
.blueprint-sector-menu-name {
  flex: 1;
  white-space: nowrap;
}
.blueprint-expand-all-btn {
  margin-top: 10px;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(133, 205, 255, 0.4);
  border-radius: 8px;
  background: rgba(123, 192, 255, 0.12);
  color: rgba(220, 240, 255, 0.92);
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.blueprint-expand-all-btn:hover:not(:disabled) {
  background: rgba(123, 192, 255, 0.22);
  border-color: rgba(133, 205, 255, 0.65);
  color: #ffffff;
}
.blueprint-expand-all-btn.is-active {
  background: linear-gradient(90deg, rgba(255, 196, 86, 0.22), rgba(255, 196, 86, 0.08));
  border-color: rgba(255, 196, 86, 0.55);
  color: #ffe9b8;
}
.blueprint-expand-all-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.blueprint-status {
  width: 248px;
  padding: 14px 16px;
  border-radius: 20px;
  border: 1px solid rgba(133, 205, 255, 0.18);
  background: rgba(8, 14, 26, 0.56);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 28px rgba(25, 96, 180, 0.14);
}

.blueprint-status-kicker {
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(128, 191, 225, 0.72);
}

.blueprint-status-title {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(235, 246, 255, 0.96);
}

.blueprint-status-body {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(170, 196, 216, 0.78);
}

.blueprint-footer {
  position: absolute;
  right: 20px;
  bottom: 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 5;
  pointer-events: none;
}

.blueprint-legend,
.blueprint-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(133, 205, 255, 0.18);
  background: rgba(7, 14, 27, 0.52);
  backdrop-filter: blur(16px);
  pointer-events: auto;
}

.blueprint-legend span,
.blueprint-actions span,
.blueprint-actions button {
  font-size: 12px;
  color: rgba(189, 214, 232, 0.9);
}

.blueprint-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  box-shadow: 0 0 12px currentColor;
}

.blueprint-actions button {
  border: 0;
  border-radius: 999px;
  padding: 9px 14px;
  background: linear-gradient(135deg, rgba(98, 198, 255, 0.2), rgba(100, 125, 255, 0.16));
  color: rgba(235, 246, 255, 0.96);
  cursor: pointer;
  font-family: inherit;
}

.blueprint-actions button.blueprint-back {
  background: linear-gradient(135deg, rgba(255, 158, 90, 0.28), rgba(255, 110, 130, 0.22));
}
</style>
