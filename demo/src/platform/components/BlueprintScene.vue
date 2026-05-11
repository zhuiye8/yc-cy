<template>
  <div :class="['blueprint-root', { 'is-org-drawer-open': orgDrawer.visible }]">
    <div ref="stageRef" class="blueprint-stage"></div>
    <div
      v-if="labelTooltip.visible"
      class="blueprint-node-tooltip"
      :style="{ left: `${labelTooltip.x}px`, top: `${labelTooltip.y}px`, '--accent': labelTooltip.accent }"
    >
      <span>{{ labelTooltip.level }}</span>
      <strong>{{ labelTooltip.title }}</strong>
      <em v-if="labelTooltip.meta">{{ labelTooltip.meta }}</em>
    </div>

    <!-- 入口 Landing：8 张玻璃卡片（7 大类 + 1 全产业），点击后飞入场景 -->
    <Transition name="landing-fade">
      <div v-if="viewState === 'landing'" class="blueprint-landing">
        <div class="blueprint-landing-head">
          <p class="blueprint-landing-eyebrow">产业链全景</p>
          <h1 class="blueprint-landing-title">选择产业大类</h1>
          <p class="blueprint-landing-subtitle">点击进入对应主产业球体视图，或选最后一张查看全部</p>
        </div>
        <div class="blueprint-landing-grid">
          <button
            v-for="card in categoryCards"
            :key="card.key"
            type="button"
            :class="['blueprint-landing-card', `is-${card.kind}`]"
            :style="{ '--accent': card.colorHex }"
            data-landing-card
            :data-key="card.key"
            @click="onPickCategory(card)"
          >
            <div class="blueprint-landing-card-icon">{{ card.kind === 'all' ? '⬡' : '◆' }}</div>
            <h2 class="blueprint-landing-card-name">{{ card.name }}</h2>
            <div class="blueprint-landing-card-count">{{ card.count }} 条产业链</div>
            <p class="blueprint-landing-card-desc">{{ card.desc }}</p>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 左上：产业链快速切换面板（仅 scene 态显示） -->
    <nav
      v-if="viewState === 'scene'"
      class="blueprint-sector-menu"
      aria-label="产业链切换"
    >
      <!-- 静态头部：标题 + 快速跳转 chip（不参与下方滚动） -->
      <div class="blueprint-sector-menu-header">
        <div class="blueprint-sector-menu-title">产业切换</div>
        <div class="blueprint-sector-menu-jumps" aria-label="按大类跳转">
          <button
            v-for="cat in categoryJumps"
            :key="cat.key"
            type="button"
            class="blueprint-jump-chip"
            :style="{ '--accent': cat.colorHex }"
            :title="`${cat.name} · ${cat.count} 条`"
            @click="onJumpToCategory(cat.key)"
          >{{ cat.shortName }}</button>
        </div>
      </div>
      <!-- 可滚动的菜单列表（按 activeFilter 过滤） -->
      <div class="blueprint-sector-menu-list">
        <button
          v-for="entry in sectorMenu"
          :key="entry.dataKey"
          v-show="!activeFilter || entry.groupKey === activeFilter"
          type="button"
          :data-group-key="entry.groupKey"
          :class="['blueprint-sector-menu-item', { 'is-active': activeSectorKey === entry.dataKey }]"
          :style="{ '--accent': entry.colorHex }"
          @click="onSectorMenuClick(entry)"
        >
          <span class="blueprint-sector-menu-dot"></span>
          <span class="blueprint-sector-menu-name">{{ entry.name }}</span>
        </button>
      </div>
    </nav>

    <div v-if="viewState === 'scene'" class="blueprint-hud">
      <button
        v-if="activeFilter && !activeSectorKey"
        type="button"
        class="blueprint-toall-btn"
        title="把所有产业球都飞进来"
        @click="onShowAll"
      >
        <span class="blueprint-toall-icon">⬡</span>
        <span>全产业展示</span>
      </button>
      <button
        type="button"
        class="blueprint-back-btn"
        title="返回上一级（Esc）"
        @click="onGoBack"
      >
        <span class="blueprint-back-arrow">‹</span>
        <span>{{ activeSectorKey ? '返回上一级' : '返回选择' }}</span>
      </button>
      <div class="blueprint-status">
        <div class="blueprint-status-kicker">场景状态</div>
        <div class="blueprint-status-title">{{ statusTitle }}</div>
        <div class="blueprint-status-body">{{ statusBody }}</div>
      </div>
    </div>

    <aside v-if="orgDrawer.visible" class="blueprint-org-drawer">
      <div class="blueprint-org-drawer-head">
        <div>
          <span>{{ orgDrawer.level || '产业链节点' }}</span>
          <strong>{{ orgDrawer.chain }}</strong>
          <em>{{ orgDrawer.loading ? '查询中...' : `共 ${orgDrawer.total} 家相关企业` }}</em>
        </div>
        <button type="button" @click="closeOrgDrawer" aria-label="关闭">×</button>
      </div>
      <div class="blueprint-org-search-line">
        <span>企业列表</span>
        <small>点击球体或标签切换节点</small>
      </div>
      <div class="blueprint-org-filter-row">
        <select v-model="orgDrawer.filters.province" :disabled="orgDrawer.loading" @change="onOrgProvinceChange">
          <option value="">全国</option>
          <option v-for="province in orgProvinceOptions" :key="province.code" :value="province.name">{{ province.name }}</option>
        </select>
        <select v-model="orgDrawer.filters.city" :disabled="orgDrawer.loading || !orgDrawer.filters.province" @change="onOrgCityChange">
          <option value="">全部城市</option>
          <option v-for="city in getOrgCityOptions(orgDrawer.filters.province)" :key="city.code" :value="city.name">{{ city.name }}</option>
        </select>
        <button
          type="button"
          :disabled="orgDrawer.loading || (!orgDrawer.filters.province && !orgDrawer.filters.city)"
          @click="resetOrgRegionFilter"
        >重置</button>
      </div>
      <div v-if="orgDrawer.error" class="blueprint-org-empty">{{ orgDrawer.error }}</div>
      <div v-else-if="orgDrawer.loading" class="blueprint-org-empty">正在获取企业数据...</div>
      <div v-else-if="!orgDrawer.items.length" class="blueprint-org-empty">暂无相关企业</div>
      <div v-else class="blueprint-org-list">
        <article v-for="item in orgDrawer.items" :key="item.id || item.name" class="blueprint-org-card">
          <div class="blueprint-org-icon">企</div>
          <div class="blueprint-org-main">
            <div class="blueprint-org-title">
              <strong>{{ item.name }}</strong>
              <span v-if="item.status">{{ item.status }}</span>
            </div>
            <p>{{ [item.province, item.city, item.district].filter(Boolean).join(' / ') || item.address || '区域未披露' }}</p>
            <div class="blueprint-org-tags">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
              <span v-for="keyword in item.keywords.slice(0, Math.max(0, 3 - item.tags.length))" :key="keyword">{{ keyword }}</span>
            </div>
            <div class="blueprint-org-meta">
              <span>专利 {{ item.patentCount }}</span>
              <span>论文 {{ item.paperCount }}</span>
              <span>成果 {{ item.achievementCount }}</span>
            </div>
          </div>
        </article>
      </div>
      <div class="blueprint-org-pager">
        <button type="button" :disabled="orgDrawer.loading || orgDrawer.page <= 1" @click="loadOrgDrawer(orgDrawer.chain, orgDrawer.level, orgDrawer.page - 1)">上一页</button>
        <span>{{ orgDrawer.page }} / {{ Math.max(1, Math.ceil(orgDrawer.total / orgDrawer.pageSize)) }}</span>
        <button type="button" :disabled="orgDrawer.loading || orgDrawer.page >= Math.ceil(orgDrawer.total / orgDrawer.pageSize)" @click="loadOrgDrawer(orgDrawer.chain, orgDrawer.level, orgDrawer.page + 1)">下一页</button>
      </div>
    </aside>

    <div class="blueprint-footer">
      <div v-if="viewState === 'scene'" class="blueprint-legend">
        <span><i class="blueprint-dot" style="color:#86e4ff"></i>主链</span>
        <span><i class="blueprint-dot" style="color:#78a3ff"></i>分支</span>
        <span><i class="blueprint-dot" style="color:#fff4c4"></i>脉冲</span>
      </div>
      <div class="blueprint-actions">
        <span v-if="viewState === 'scene'">Esc 重置/返回上一级</span>
        <button v-if="viewState === 'scene'" type="button" @click="onReset">返回总览</button>
        <button type="button" class="blueprint-back" @click="emit('exit')">← 返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
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
import { industryChainGraphData, sectorList } from '../data/industry-chain-graph.js'
import { chinaGeo, getProvinceChildren } from '../data/map-scene-data.js'
import { searchChainOrgs } from '../../api/chainOrg.js'

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
  meta: '',
  accent: '#86e4ff'
})

const orgDrawer = reactive({
  visible: false,
  loading: false,
  error: '',
  chain: '',
  level: '',
  total: 0,
  page: 1,
  pageSize: 8,
  items: [],
  requestId: 0,
  filters: {
    province: '',
    city: '',
  },
})

function closeOrgDrawer() {
  orgDrawer.visible = false
  orgDrawer.error = ''
}

async function loadOrgDrawer(chain, level = '', page = 1) {
  const keyword = String(chain || '').trim()
  if (!keyword) return

  const requestId = orgDrawer.requestId + 1
  orgDrawer.requestId = requestId
  orgDrawer.visible = true
  orgDrawer.loading = true
  orgDrawer.error = ''
  orgDrawer.chain = keyword
  orgDrawer.level = level
  orgDrawer.page = page

  try {
    const data = await searchChainOrgs({
      chain: keyword,
      province: normalizeOrgProvinceName(orgDrawer.filters.province),
      city: orgDrawer.filters.city,
      page,
      pageSize: orgDrawer.pageSize,
    })
    if (requestId !== orgDrawer.requestId) return
    orgDrawer.total = data.total
    orgDrawer.page = data.page
    orgDrawer.pageSize = data.pageSize || orgDrawer.pageSize
    orgDrawer.items = data.items
  } catch (error) {
    if (requestId !== orgDrawer.requestId) return
    orgDrawer.total = 0
    orgDrawer.items = []
    orgDrawer.error = '企业数据暂时不可用'
    console.warn('[chain-orgs] search failed', error)
  } finally {
    if (requestId === orgDrawer.requestId) orgDrawer.loading = false
  }
}

function reloadOrgDrawerWithFilters() {
  if (!orgDrawer.chain) return
  loadOrgDrawer(orgDrawer.chain, orgDrawer.level, 1)
}

function onOrgProvinceChange() {
  orgDrawer.filters.city = ''
  reloadOrgDrawerWithFilters()
}

function onOrgCityChange() {
  reloadOrgDrawerWithFilters()
}

function resetOrgRegionFilter() {
  orgDrawer.filters.province = ''
  orgDrawer.filters.city = ''
  reloadOrgDrawerWithFilters()
}

let resetSceneFn = () => {}
const onReset = () => resetSceneFn()
let goBackFn = () => {}
const onGoBack = () => goBackFn()

// 主产业菜单：50 条产业链各一项，顺序按 GICS 大类聚合（dataKey/colorHex/position 全部由 build 脚本生成）
const sectorMenu = sectorList.map((s) => ({
  name: s.name,
  dataKey: s.dataKey,
  colorHex: s.colorHex,
  groupKey: s.groupKey,
}))

const orgProvinceOptions = chinaGeo.features
  .map((feature) => ({
    code: String(feature.properties?.adcode || ''),
    name: String(feature.properties?.name || ''),
  }))
  .filter((item) => item.code && item.name)
  .sort((a, b) => a.code.localeCompare(b.code))

const orgProvinceCodeByName = new Map(orgProvinceOptions.map((item) => [item.name, item.code]))

function getOrgCityOptions(provinceName) {
  const code = orgProvinceCodeByName.get(provinceName)
  if (!code) return []
  return getProvinceChildren(code)
    .map((item) => ({
      code: String(item.adcode || ''),
      name: String(item.name || ''),
    }))
    .filter((item) => item.code && item.name)
}

function normalizeOrgProvinceName(name) {
  return String(name || '')
    .replace(/(壮族|回族|维吾尔)?自治区$/, '')
    .replace(/特别行政区$/, '')
    .replace(/[省市]$/, '')
}

function isStructureChainName(name) {
  const value = String(name || '').trim()
  return !value || value === '上游' || value === '中游' || value === '下游' || value.includes('附录')
}

function collectGraphNodeNames(node, names) {
  if (!node) return
  const name = String(node.name || '').trim()
  if (!isStructureChainName(name)) names.add(name)
  ;(node.children || []).forEach((child) => collectGraphNodeNames(child, names))
}

function buildQueryableChainNames() {
  const names = new Set(sectorList.map((s) => String(s.name || '').trim()).filter(Boolean))
  Object.values(industryChainGraphData).forEach((graph) => {
    ;['upstream', 'midstream', 'downstream'].forEach((key) => {
      collectGraphNodeNames(graph?.[key]?.root, names)
    })
  })
  return names
}

const queryableChainNames = buildQueryableChainNames()

// 顶部快速跳转 chip：按 groupKey 去重，保持原始顺序
const categoryJumps = (() => {
  const seen = new Set()
  const jumps = []
  for (const s of sectorList) {
    if (seen.has(s.groupKey)) continue
    seen.add(s.groupKey)
    jumps.push({
      key: s.groupKey,
      name: s.groupName,
      shortName: s.groupShort,
      colorHex: s.colorHex,
      count: sectorList.filter(x => x.groupKey === s.groupKey).length,
    })
  }
  return jumps
})()

function onJumpToCategory(groupKey) {
  const el = document.querySelector(`.blueprint-sector-menu-item[data-group-key="${groupKey}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const activeSectorKey = ref(null)
let selectSectorByKeyFn = () => {}
function onSectorMenuClick(entry) {
  if (activeSectorKey.value === entry.dataKey) {
    if (orgDrawer.visible && orgDrawer.chain !== entry.name) {
      loadOrgDrawer(entry.name, '产业', 1)
    } else {
      resetSceneFn()
    }
  } else {
    selectSectorByKeyFn(entry.dataKey)
  }
}

// ── Landing 选择页面 ────────────────────────────────────────────────
// viewState: 'landing' = 显示分类卡片选择页；'scene' = 显示 3D 球体场景
// activeFilter: null = 显示全部 50 球；非 null = 只显示该 groupKey 的球
const viewState = ref('landing')
const activeFilter = ref(null)

// 给每个大类添加简短描述（用于 landing 卡片）
const CATEGORY_DESCS = {
  materials:  '专用化学品 · 电子/锂电/医药材料',
  aerospace:  '航空航天与国防装备',
  electrical: '电气零部件 · 锂离子/固态/钠离子电池',
  machinery:  '工程机械 · 工业机器人 · 增材制造',
  auto:       '智能车载 · 汽车零部件 · 新能源整车',
  health:     '医疗保健设备 · 生物制药',
  tech:       '通信设备 · 电子元件 · 半导体',
}

// landing 8 张卡（7 个大类 + 1 个全产业）
const categoryCards = (() => {
  const seen = new Set()
  const list = []
  for (const s of sectorList) {
    if (seen.has(s.groupKey)) continue
    seen.add(s.groupKey)
    list.push({
      kind: 'category',
      key: s.groupKey,
      name: s.groupName,
      colorHex: s.colorHex,
      count: sectorList.filter(x => x.groupKey === s.groupKey).length,
      desc: CATEGORY_DESCS[s.groupKey] || '',
    })
  }
  list.push({
    kind: 'all',
    key: '__all__',
    name: '全产业展示',
    colorHex: '#cfd8e2',
    count: sectorList.length,
    desc: '一次性查看全部 50 条产业链',
  })
  return list
})()

let enterCategoryFn = () => {}
function onPickCategory(card) {
  if (card.kind === 'all') {
    enterCategoryFn(null)
  } else {
    enterCategoryFn(card.key)
  }
}
let backToLandingFn = () => {}
function onBackToLanding() { backToLandingFn() }
let showAllFn = () => {}
function onShowAll() { showAllFn() }

let cleanup = () => {}

onMounted(() => {
  const stage = stageRef.value
  if (!stage) return

  const getStageSize = () => {
    const w = stage.clientWidth || window.innerWidth
    const h = stage.clientHeight || window.innerHeight
    return { width: w, height: h }
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5))
  const initialSize = getStageSize()
  renderer.setSize(initialSize.width, initialSize.height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  stage.appendChild(renderer.domElement)

  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(initialSize.width, initialSize.height)
  labelRenderer.domElement.className = 'blueprint-label-layer'
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.inset = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  stage.appendChild(labelRenderer.domElement)

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
    intensity: 0.95
  })
  bloomEffect.ignoreBackground = true

  const outlineEffect = new OutlineEffect(scene, camera, {
    blendFunction: BlendFunction.SCREEN,
    edgeStrength: 2.35,
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

  const navState = {
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    moved: false
  }

  let currentTimeline = null
  let activeChain = null
  let rafId = null

  function shortenLabel(text, maxLength = 12) {
    const chars = Array.from(String(text || '').trim())
    if (!Number.isFinite(maxLength) || maxLength <= 0) return chars.join('')
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

  function setLabelOpacity(label, opacity) {
    if (!label) return
    const visible = opacity > 0.001
    label.visible = visible
    if (label.element) {
      label.element.style.display = visible ? '' : 'none'
      label.element.style.opacity = String(THREE.MathUtils.clamp(opacity, 0, 1))
      return
    }
    if (label.material) label.material.opacity = opacity
  }

  function detachLabel(label) {
    if (!label) return
    setLabelOpacity(label, 0)
    if (label.element?.parentNode) {
      label.element.parentNode.removeChild(label.element)
    }
  }

  function makeLabelSprite(text, color, scale = 1, options = {}) {
    const shortText = shortenLabel(text, options.maxLength ?? 0)
    const fontSize = options.fontSize ?? 42
    const element = document.createElement('div')
    element.className = 'blueprint-label'
    element.textContent = shortText
    element.title = String(text || '')
    element.style.setProperty('--accent', colorToCss(color, 0.9))
    element.style.setProperty('--accent-soft', colorToCss(color, 0.22))
    element.style.fontSize = `${options.cssFontSize ?? Math.max(12, Math.round(fontSize * 0.36 * scale + 6))}px`
    element.style.opacity = '0'
    const label = new CSS2DObject(element)
    label.userData.fullLabel = String(text || '')
    label.userData.shortLabel = shortText
    return label
  }

  function bindLabelClick(label, owner) {
    if (!label?.element) return
    if (!getQueryableChainName(owner)) return
    label.element.style.pointerEvents = 'auto'
    label.element.style.cursor = 'pointer'
    label.element.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
    label.element.addEventListener('pointerup', (event) => {
      event.preventDefault()
      event.stopPropagation()
      openOrgDrawerForOwner(owner)
    })
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
    // currentBase = 当前"靠拢点"。全产业模式下等于 basePosition；filtered 模式下被重排到场景中心椭球
    group.userData.currentBase = basePosition.clone()
    group.userData.orbitRadius = Math.hypot(orbitOffset.x, orbitOffset.z)
    group.userData.orbitAngle = Math.atan2(orbitOffset.z, orbitOffset.x)
    group.userData.orbitYOffset = basePosition.y
    group.userData.data = data
    group.userData.fullLabel = data.name
    group.userData.labelLevel = '产业'
    group.userData.labelColor = data.color
    group.userData.state = { opacity: 1, glow: 0.5, ring: 0.3 }

    // 50 主产业球密度大，体积缩到原来的 ~50%（半径 1.24 → 0.62），命中区随之缩小
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 3),
      new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.38,
        metalness: 0.18,
        roughness: 0.34,
        transparent: true,
        opacity: 0.82
      })
    )

    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 12, 12),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    )
    hit.userData.owner = group
    hit.userData.labelOwner = group

    const label = makeLabelSprite(data.name, data.color, 0.5, { maxLength: 0, fontSize: 40 })
    label.position.set(0, 1.32, 0)

    group.add(shell, hit, label)
    group.userData.shell = shell
    group.userData.label = label
    group.userData.hit = hit
    group.userData.activated = false   // landing 阶段全部不参与 orbit/绘制；进入场景后逐个置 true
    bindLabelClick(label, group)

    // 初始隐藏：landing 页面 8 张玻璃卡片优先呈现，等用户选完大类才飞入
    group.visible = false
    shell.material.opacity = 0
    shell.material.emissiveIntensity = 0
    group.userData.state.opacity = 0
    group.userData.state.glow = 0
    setLabelOpacity(label, 0)
    group.scale.setScalar(0.001)

    sectorHitAreas.push(hit)
    driftGroup.add(group)
    sectors.push(group)
    return group
  }

  // 50 个主产业球：颜色/位置/dataKey 全部由 build 脚本算好（按 GICS 大类分色，椭球面 Fibonacci 分布）
  const SECTOR_DEFS = sectorList.map((s) => ({
    name: s.name,
    dataKey: s.dataKey,
    groupKey: s.groupKey,
    color: new THREE.Color(s.colorHex),
    position: new THREE.Vector3(s.position.x, s.position.y, s.position.z),
  }))

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
      groupKey: def.groupKey,
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
      new THREE.SphereGeometry(scale, 32, 18),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.0,
        metalness: 0.08,
        roughness: 0.28,
        transparent: true,
        opacity: 0.0
      })
    )
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(scale * 1.62, scale * 0.055, 20, 72),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    )
    ring.rotation.x = Math.PI * 0.5
    const labelSprite = makeLabelSprite(label, color, options.labelScale ?? 0.65, {
      maxLength: options.maxLength ?? 0,
      fontSize: options.fontSize ?? 40
    })
    if (options.labelOffset) {
      labelSprite.position.copy(options.labelOffset)
    } else {
      labelSprite.position.set(0, scale * 2.3, 0)
    }
    group.add(ring, core, labelSprite)
    ring.visible = options.showRing === true
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
    bindLabelClick(labelSprite, group)
    setObjectOpacity(group, 0)
    return group
  }

  // 3 点用二次 Bezier（端点严格贴节点不过冲），4+ 点用 CatmullRom（多控制点平滑）
  function makeChainCurve(points) {
    if (points.length === 3) {
      return new THREE.QuadraticBezierCurve3(points[0], points[1], points[2])
    }
    return new THREE.CatmullRomCurve3(points)
  }

  function buildGrowthLine(points, color, opacity = 0.86, tubeRadius = 0.019) {
    const curve = makeChainCurve(points)
    const tubularSegments = 160
    const radialSegments = 14
    const indicesPerRing = radialSegments * 6

    // 内核：现有亮线，进 bloom 选区
    const coreGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)
    coreGeo.setDrawRange(0, 0)
    const tube = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    bloomEffect.selection.add(tube)

    // 外层 halo：同曲线、半径 ×2.5、低透明，不进 bloom（纯软光晕）
    const haloGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius * 2.1, radialSegments, false)
    haloGeo.setDrawRange(0, 0)
    const halo = new THREE.Mesh(
      haloGeo,
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: opacity * 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    chainGroup.add(halo)

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    chainGroup.add(head)
    return { curve, line: tube, halo, head, tubularSegments, indicesPerRing }
  }

  function updateGrowth(lineObject, progress) {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1)
    const rings = Math.floor(lineObject.tubularSegments * clamped)
    const drawCount = rings * lineObject.indicesPerRing
    lineObject.line.geometry.setDrawRange(0, drawCount)
    if (lineObject.halo?.geometry) lineObject.halo.geometry.setDrawRange(0, drawCount)
    lineObject.head.position.copy(lineObject.curve.getPoint(Math.max(0.001, clamped)))
    lineObject.head.visible = clamped > 0.001 && clamped < 0.995
  }

  function clearChain() {
    hideLabelTooltip()
    if (activeChain) {
      activeChain.nodes.forEach((node) => {
        detachLabel(node.userData?.label)
        bloomEffect.selection.delete(node.userData.core)
        outlineEffect.selection.delete(node.userData.core)
      })
      activeChain.branchNodes.forEach((node) => {
        detachLabel(node.userData?.label)
        bloomEffect.selection.delete(node.userData.core)
        outlineEffect.selection.delete(node.userData.core)
        // 子树节点 / 连线也从 bloom 选区清掉
        ;(node.userData.subtreeNodes || []).forEach((sub) => {
          if (sub.userData?.core) {
            detachLabel(sub.userData?.label)
            bloomEffect.selection.delete(sub.userData.core)
            outlineEffect.selection.delete(sub.userData.core)
          }
        })
        hideSubtreeVisuals(node, true)
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
    focusedL2Node = null
    savedCamPos = null
    savedLookTarget = null
    branchHitAreas.length = 0
  }

  function buildChainForSector(sector) {
    clearChain()
    const data = sector.userData.data
    const growthDir = new THREE.Vector3(1, 0.03, -0.14).normalize()
    const sideDir = new THREE.Vector3(0, 1, 0)
    // 主产业球聚焦时被推到 (-4.1, 0.18, 1.2)（见 focusSector），让链路从这里发起，省掉中间多余的 orb
    const center = new THREE.Vector3(-4.1, 0.18, 1.2)
    // main 链 3 段（上/中/下）→ 4 个点
    const mainPoints = [
      center,
      center.clone().add(new THREE.Vector3(2.6, 0.12, -0.18)),
      center.clone().add(new THREE.Vector3(6.3, 0.62, -0.74)),
      center.clone().add(new THREE.Vector3(10.4, 0.42, -1.86))
    ]

    const mainLine = buildGrowthLine(mainPoints, data.color, 0.95)
    chainGroup.add(mainLine.line)

    const nodes = data.chain.main.map((label, index) => {
      const node = createNode(label, data.color.clone().lerp(new THREE.Color(0xffffff), 0.2), 0.4 + index * 0.04, {
        maxLength: 0,
        fontSize: 42,
        labelScale: 0.56,
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
          maxLength: 0,
          fontSize: 36,
          labelScale: 0.5,
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

    activeChain = { center, growthDir, sideDir, mainLine, nodes, branchLines, branchNodes }
    updateGrowth(mainLine, 0.001)
    branchLines.forEach((line) => updateGrowth(line, 0.001))
    return activeChain
  }

  function activateNode(node) {
    const { state, core, ring, label } = node.userData
    outlineEffect.selection.add(core)
    gsap.to(state, { opacity: 0.88, glow: 0.62, scale: 1, duration: 0.55, ease: 'power2.out', onUpdate: () => {
      core.material.opacity = state.opacity
      core.material.emissiveIntensity = state.glow
      ring.material.opacity = state.opacity * 0.65
      setLabelOpacity(label, state.opacity)
      node.scale.setScalar(state.scale)
    }})
  }

  function triggerPulse(position, color) {
    shockWaveEffect.epicenter.copy(position)
    shockWaveEffect.explode()
    sceneState.pulse = 1
    gsap.fromTo(sceneState, { pulse: 1 }, { pulse: 0, duration: 1.6, ease: 'power2.out' })
  }

  // ── 点击 L1 后子树展开（L2 / L3 / L4） ─────────────────────────────────────
  // 子树连线（与 buildGrowthLine 接口兼容，head/halo 挂在指定 parent）
  function buildSubtreeGrowthLine(points, color, parent, tubeRadius = 0.012) {
    const curve = makeChainCurve(points)
    const tubularSegments = 110
    const radialSegments = 12
    const indicesPerRing = radialSegments * 6

    const coreGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)
    coreGeo.setDrawRange(0, 0)
    const tube = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    bloomEffect.selection.add(tube)

    const haloGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius * 2.5, radialSegments, false)
    haloGeo.setDrawRange(0, 0)
    const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.85 * 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(0.05, tubeRadius * 5), 12, 12),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    )
    head.visible = false
    parent.add(tube)
    parent.add(halo)
    parent.add(head)
    return { curve, line: tube, halo, head, tubularSegments, indicesPerRing }
  }

  function activateChildNode(node, scaleTarget = 1) {
    const { state, core, ring, label } = node.userData
    gsap.killTweensOf(state)
    gsap.killTweensOf(node.scale)
    gsap.to(state, {
      opacity: 0.86, glow: 0.52, scale: scaleTarget,
      duration: 0.36, ease: 'power2.out',
      onUpdate: () => {
        core.material.opacity = state.opacity
        core.material.emissiveIntensity = state.glow
        ring.material.opacity = state.opacity * 0.55
        setLabelOpacity(label, state.opacity)
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

        // 标签做小 + 朝径向外侧偏移：相邻子节点的 sprite 在屏幕上拉开间距，避免重叠
        const radialDir = l1Pos.length() > 1e-3
          ? l1Pos.clone().normalize()
          : new THREE.Vector3(1, 0, 0)
        const radialPush = level === 2 ? 0.85 : 0.55
        const yLift = scale * 1.4
        const labelOffset = radialDir.clone().multiplyScalar(radialPush)
          .add(new THREE.Vector3(0, yLift, 0))
        const node = createNode(data.name, color.clone(), scale, {
          maxLength: 0,
          fontSize: level === 2 ? 34 : 30,
          labelScale: level === 2 ? 0.42 : 0.34,
          labelOffset,
          levelLabel: `L${level}`
        })
        node.position.copy(pos)
        node.userData.nodeData = data
        node.userData.subtreeLevel = level
        node.userData.l1LocalPos = l1Pos.clone()
        // L3 节点（###）去掉光环，跟 L2 拉开视觉差异 + 减少密集时的视觉噪声
        if (node.userData.ring) {
          node.userData.ring.visible = false
        }
        parent.add(node)
        placedNodes.push(node)

        // 中点沿 axisSide 抬一点点，但方向跟节点所在半区一致（上面的往上抬、下面的往下抬）
        // 这样每条线朝自己外侧弓出去，不会经过中心绕行 → 不交叉但有曲线感
        const sideSign = pos.dot(axisSide) >= 0 ? 1 : -1
        const mid = new THREE.Vector3().lerpVectors(new THREE.Vector3(), pos, 0.55)
          .addScaledVector(axisSide, lineMidLift * sideSign)
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
      // 去掉 L2 的 Z stagger：所有 L2 节点都在 XY 平面，避免标签径向方向倾斜飘出
      depthStep: 0,
      scale: 0.18,
      color: l2Color,
      lineColor: lineColorL2,
      lineRadius: 0.012,
      minDist: 1.6,
      // L2 连线沿 axisSide 抬中点（带符号），每条线朝自己外侧弓出去，不交叉
      lineMidLift: 0.25,
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
        // L3 保留沿 fwdX 的 depth（让 L3 从 L2 向外伸，跟 L2 不重合），但去掉 i*step 的渐进偏移
        depthBase: 0.3, depthStep: 0,
        scale: 0.13, color: l3Color,
        lineColor: l2Color.clone().lerp(new THREE.Color('#a3b8ff'), 0.5),
        // L3 连线同样沿 axisSide 带符号弓出（spread 90° 已经不容易交叉，但保留曲线感）
        lineRadius: 0.008, minDist: 1.15, lineMidLift: 0.16, level: 3,
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
      sub.visible = true
      gsap.killTweensOf(state)
      gsap.killTweensOf(sub.scale)
      state.opacity = 0; state.glow = 0; state.scale = 0.1
      core.material.opacity = 0
      ring.material.opacity = 0
      detachLabel(label)
      sub.scale.setScalar(0.1)
    })
    lines.forEach((lo) => {
      if (lo.line) lo.line.visible = true
      if (lo.halo) lo.halo.visible = true
      if (lo.line?.geometry?.setDrawRange) lo.line.geometry.setDrawRange(0, 0)
      if (lo.halo?.geometry?.setDrawRange) lo.halo.geometry.setDrawRange(0, 0)
      if (lo.head) lo.head.visible = false
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        lo.line.material.opacity = 0.85
      }
      if (lo.halo?.material) {
        gsap.killTweensOf(lo.halo.material)
        lo.halo.material.opacity = 0.85 * 0.22
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

  function hideSubtreeVisuals(branchNode, killTweens = false) {
    const nodes = branchNode?.userData?.subtreeNodes || []
    const lines = branchNode?.userData?.subtreeLines || []
    nodes.forEach((sub) => {
      const { state, core, ring, label } = sub.userData || {}
      if (killTweens) {
        gsap.killTweensOf(state)
        gsap.killTweensOf(sub.scale)
      }
      if (state) {
        state.opacity = 0
        state.glow = 0
        state.scale = 0.1
      }
      if (core?.material) {
        core.material.opacity = 0
        core.material.emissiveIntensity = 0
      }
      if (ring?.material) ring.material.opacity = 0
      detachLabel(label)
      sub.visible = false
      sub.scale.setScalar(0.1)
    })
    lines.forEach((lo) => {
      if (killTweens) {
        if (lo.line?.material) gsap.killTweensOf(lo.line.material)
        if (lo.halo?.material) gsap.killTweensOf(lo.halo.material)
      }
      if (lo.line?.geometry?.setDrawRange) lo.line.geometry.setDrawRange(0, 0)
      if (lo.halo?.geometry?.setDrawRange) lo.halo.geometry.setDrawRange(0, 0)
      if (lo.head) lo.head.visible = false
      if (lo.line?.material) lo.line.material.opacity = 0
      if (lo.halo?.material) lo.halo.material.opacity = 0
      if (lo.line) lo.line.visible = false
      if (lo.halo) lo.halo.visible = false
    })
  }

  function collapseSubtree(branchNode) {
    if (branchNode.userData.subtreeTl) {
      branchNode.userData.subtreeTl.kill()
      branchNode.userData.subtreeTl = null
    }
    focusedL2Node = null
    const nodes = branchNode.userData.subtreeNodes || []
    const lines = branchNode.userData.subtreeLines || []
    nodes.forEach((sub) => {
      const { state, core, ring, label } = sub.userData
      gsap.killTweensOf(state)
      gsap.killTweensOf(sub.scale)
      detachLabel(label)
      gsap.to(state, {
        opacity: 0, glow: 0, scale: 0.1,
        duration: 0.26, ease: 'power2.in',
        onUpdate: () => {
          core.material.opacity = state.opacity
          core.material.emissiveIntensity = state.glow
          ring.material.opacity = state.opacity * 0.55
          sub.scale.setScalar(state.scale)
        },
        onComplete: () => {
          sub.visible = false
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
            if (lo.halo?.geometry?.setDrawRange) lo.halo.geometry.setDrawRange(0, 0)
            if (lo.head) lo.head.visible = false
            if (lo.line) lo.line.visible = false
            if (lo.halo) lo.halo.visible = false
          }
        })
      }
      if (lo.halo?.material) {
        gsap.killTweensOf(lo.halo.material)
        gsap.to(lo.halo.material, { opacity: 0, duration: 0.24, ease: 'power2.in' })
      }
    })
  }

  function highlightBranchNode(node, on) {
    if (!node?.userData?.state) return
    const { state, core, ring, label } = node.userData
    gsap.killTweensOf(state)
    gsap.to(state, {
      opacity: on ? 0.9 : 0.84, glow: on ? 0.76 : 0.56,
      duration: 0.28, ease: 'power2.out',
      onUpdate: () => {
        core.material.opacity = state.opacity
        core.material.emissiveIntensity = state.glow
        ring.material.opacity = state.opacity * (on ? 0.95 : 0.65)
        setLabelOpacity(label, state.opacity)
      }
    })
  }

  function dimSurroundings(dim) {
    if (!activeChain) return
    const targetOpacity = dim ? 0.2 : 0.84
    const targetGlow = dim ? 0.28 : 0.54
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
          setLabelOpacity(label, state.opacity)
        }
      })
    })
    if (activeChain.mainLine?.line?.material) {
      gsap.killTweensOf(activeChain.mainLine.line.material)
      gsap.to(activeChain.mainLine.line.material, { opacity: dim ? 0.18 : 0.85, duration: 0.32 })
    }
    if (activeChain.mainLine?.halo?.material) {
      gsap.killTweensOf(activeChain.mainLine.halo.material)
      gsap.to(activeChain.mainLine.halo.material, { opacity: (dim ? 0.18 : 0.85) * 0.22, duration: 0.32 })
    }
    activeChain.branchLines.forEach((lo) => {
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        gsap.to(lo.line.material, { opacity: dim ? 0.14 : 0.62, duration: 0.32 })
      }
      if (lo.halo?.material) {
        gsap.killTweensOf(lo.halo.material)
        gsap.to(lo.halo.material, { opacity: (dim ? 0.14 : 0.62) * 0.22, duration: 0.32 })
      }
    })
  }

  function switchFocusBranch(newFocused) {
    if (newFocused === focusedBranchNode) return
    // 切换 L1 时先解除 L2 聚焦，避免悬挂状态
    focusedL2Node = null
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

  // ── L2 节点（## 段）聚焦：高亮选中那条路径，其它 L2 兄弟 + 它们的 L3 子节点变透明
  let focusedL2Node = null

  function setSubtreeNodeOpacity(node, targetOpacity) {
    const ud = node?.userData
    if (!ud?.state || !ud?.core || !ud?.ring || !ud?.label) return
    const { state, core, ring, label } = ud
    gsap.killTweensOf(state)
    gsap.to(state, {
      opacity: targetOpacity,
      duration: 0.28, ease: 'power2.out',
      onUpdate: () => {
        core.material.opacity = state.opacity
        core.material.emissiveIntensity = state.glow
        ring.material.opacity = state.opacity * 0.55
        setLabelOpacity(label, state.opacity)
      }
    })
  }

  function applyL2Highlight() {
    if (!focusedBranchNode) return
    const subtree = focusedBranchNode.userData.subtreeNodes || []
    for (const node of subtree) {
      const lvl = node.userData.subtreeLevel
      if (lvl !== 2 && lvl !== 3) continue
      let dimmed = false
      if (focusedL2Node) {
        if (lvl === 2) dimmed = (node !== focusedL2Node)
        else dimmed = (node.parent !== focusedL2Node)
      }
      setSubtreeNodeOpacity(node, dimmed ? 0.02 : 0.92)
    }
    // 聚焦了 L2 时，主链 backbone 和分支线非常透明（保留淡淡的轮廓感，不完全消失）；
    // 解除 L2 聚焦时恢复到 L1 详情态的常规透明度（mainLine 0.18、branchLines 0.14）
    const mainOpa = focusedL2Node ? 0.06 : 0.18
    const branchOpa = focusedL2Node ? 0.04 : 0.14
    if (activeChain?.mainLine) {
      const ml = activeChain.mainLine
      if (ml.line?.material) {
        gsap.killTweensOf(ml.line.material)
        gsap.to(ml.line.material, { opacity: mainOpa, duration: 0.28 })
      }
      if (ml.halo?.material) {
        gsap.killTweensOf(ml.halo.material)
        gsap.to(ml.halo.material, { opacity: mainOpa * 0.22, duration: 0.28 })
      }
    }
    activeChain?.branchLines?.forEach((lo) => {
      if (lo.line?.material) {
        gsap.killTweensOf(lo.line.material)
        gsap.to(lo.line.material, { opacity: branchOpa, duration: 0.28 })
      }
      if (lo.halo?.material) {
        gsap.killTweensOf(lo.halo.material)
        gsap.to(lo.halo.material, { opacity: branchOpa * 0.22, duration: 0.28 })
      }
    })
  }

  function openL2Detail(l2Node) {
    if (!focusedBranchNode || l2Node?.userData?.subtreeLevel !== 2) return
    if (l2Node === focusedL2Node) {
      // 同一 L2 再点 → 解除聚焦
      focusedL2Node = null
    } else {
      focusedL2Node = l2Node
    }
    applyL2Highlight()
  }

  function getSubtreeHitAreas() {
    if (!focusedBranchNode) return []
    return (focusedBranchNode.userData.subtreeNodes || [])
      .filter(n => n.userData.subtreeLevel === 2)
      .map(n => n.userData.core)
      .filter(Boolean)
  }

  function openBranchDetail(branchNode) {
    if (!branchNode || branchNode === focusedBranchNode) return
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
    // 退回 L1 后，右侧抽屉应该跟随回到当前聚焦的主产业
    if (orgDrawer.visible && sceneState.focusedSector) {
      const sectorChain = getQueryableChainName(sceneState.focusedSector)
      if (sectorChain && orgDrawer.chain !== sectorChain) {
        loadOrgDrawer(sectorChain, '产业', 1)
      }
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
    const queryChain = getQueryableChainName(sector)
    if (orgDrawer.visible && queryChain && orgDrawer.chain !== queryChain) {
      loadOrgDrawer(queryChain, getOwnerLevel(sector), 1)
    }

    statusTitle.value = sector.userData.data.name
    statusBody.value = '已锁定该扇区。扇区压缩为左侧锚点，主链节点向右生长，分支节点随后在其周围展开。点击子节点可展开下一级，Esc 返回上一级。'

    const cameraTarget = { x: 0.95, y: 1.02, z: 8.9 }
    const overviewCameraTarget = { x: 1.55, y: 2.18, z: 12.6 }
    const overviewLookTarget = { x: 2.35, y: 0.28, z: -0.34 }

    currentTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => { sceneState.busy = false } })

    sectors.forEach((item) => {
      // 推开方向用 currentBase（filter 模式下也朝中心椭球的对应位置外推，避免推到屏幕外乱跑）
      const base = item.userData.currentBase.clone()
      const state = item.userData.state
      if (item === sector) {
        item.visible = true   // 切换聚焦目标时，新聚焦的球可能上一轮被 visible=false，先打开
        currentTimeline.to(item.position, { x: -4.1, y: 0.18, z: 1.2, duration: 1.15 }, 0)
        currentTimeline.to(item.scale, { x: 0.94, y: 0.94, z: 0.94, duration: 1.15 }, 0)
        currentTimeline.to(state, { opacity: 0.82, glow: 0.42, duration: 1.15, onUpdate: () => {
          item.userData.shell.material.opacity = state.opacity
          item.userData.shell.material.emissiveIntensity = state.glow
          setLabelOpacity(item.userData.label, 0.9)
        }}, 0)
      } else {
        // 聚焦时其它产业球完全隐藏：fade 到 alpha 0，动画结束后整组设 visible=false，
        // 既不占 z 缓冲（不会挡住选中产业链），也不会被 hover/click 命中
        const push = base.clone().normalize().multiplyScalar(3.5)
        currentTimeline.to(item.position, {
          x: base.x + push.x,
          y: base.y + push.y * 0.7,
          z: base.z - 10 - Math.abs(push.x) * 0.24,
          duration: 1.05
        }, 0)
        currentTimeline.to(item.scale, { x: 0.72, y: 0.72, z: 0.72, duration: 1.05 }, 0)
        currentTimeline.to(item.userData.state, {
          opacity: 0, glow: 0, duration: 1.05,
          onUpdate: () => {
            const s = item.userData.state
            item.userData.shell.material.opacity = s.opacity
            item.userData.shell.material.emissiveIntensity = s.glow
            setLabelOpacity(item.userData.label, s.opacity)
          },
          onComplete: () => { item.visible = false },
        }, 0)
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
    // 回到 50/N 球总览：右侧抽屉无锁定对象，直接关掉
    if (orgDrawer.visible) closeOrgDrawer()
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
      // 按 activeFilter 过滤：不属于当前大类的球继续保持隐藏，不要"返回总览"就一齐冒出来
      const matches = !activeFilter.value || sector.userData.data.groupKey === activeFilter.value
      if (!matches) {
        gsap.killTweensOf(sector.position)
        gsap.killTweensOf(sector.scale)
        gsap.killTweensOf(sector.userData.state)
        sector.visible = false
        sector.userData.activated = false
        sector.userData.state.opacity = 0
        sector.userData.state.glow = 0
        sector.userData.shell.material.opacity = 0
        sector.userData.shell.material.emissiveIntensity = 0
        setLabelOpacity(sector.userData.label, 0)
        sector.scale.setScalar(0.001)
        return
      }
      sector.visible = true   // 之前可能因聚焦被 visible=false 隐藏，回到总览先打开
      // filter 模式下 currentBase 已重排到中心小椭球；全产业则 currentBase = 原始 basePosition
      const base = sector.userData.currentBase
      const state = sector.userData.state
      gsap.to(sector.position, { x: base.x, y: base.y, z: base.z, duration: 1.05, ease: 'power3.out' })
      gsap.to(sector.scale, { x: 1.18, y: 1.18, z: 1.18, duration: 1.05, ease: 'power3.out' })
      gsap.to(state, { opacity: 0.82, glow: 0.38, duration: 1.05, ease: 'power3.out',
        onUpdate: () => {
          sector.userData.shell.material.opacity = state.opacity
          sector.userData.shell.material.emissiveIntensity = state.glow
          setLabelOpacity(sector.userData.label, 0.96)
        },
        onComplete: () => { sector.userData.activated = true }
      })
    })
  }

  // ── 方案 B：filtered 模式下用中心小椭球重排，避免少量球被挤到原大球面顶部 ──
  // groupKey=null 时直接把每个球的 currentBase 恢复成原始 basePosition（全产业模式）
  function applyLayoutForFilter(groupKey) {
    if (!groupKey) {
      sectors.forEach((s) => {
        s.userData.currentBase.copy(s.userData.basePosition)
        const off = s.userData.basePosition.clone().sub(orbitCenter)
        s.userData.orbitRadius = Math.hypot(off.x, off.z)
        s.userData.orbitAngle = Math.atan2(off.z, off.x)
        s.userData.orbitYOffset = s.userData.basePosition.y
      })
      return
    }
    const matching = sectors.filter((s) => s.userData.data.groupKey === groupKey)
    const N = matching.length
    if (!N) return
    // 中心对齐 overviewLookBase 附近；半径随 N 缓涨，扁度 ry 较小防止上下太空
    const center = new THREE.Vector3(0, 0.4, -0.2)
    const rx = N <= 3 ? 2.2 : N <= 6 ? 3.0 : 3.7
    const ry = N <= 3 ? 0.7 : N <= 6 ? 1.15 : 1.45
    const rz = N <= 3 ? 2.2 : N <= 6 ? 3.0 : 3.7
    const golden = Math.PI * (3 - Math.sqrt(5))
    matching.forEach((s, i) => {
      let nx, ny, nz
      if (N === 1) { nx = 0; ny = 0; nz = 0 }
      else {
        const y = 1 - 2 * ((i + 0.5) / N)
        const r = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = golden * i
        nx = Math.cos(theta) * r
        ny = y
        nz = Math.sin(theta) * r
      }
      const target = new THREE.Vector3(
        center.x + nx * rx,
        center.y + ny * ry,
        center.z + nz * rz,
      )
      s.userData.currentBase.copy(target)
      const off = target.clone().sub(orbitCenter)
      s.userData.orbitRadius = Math.hypot(off.x, off.z)
      s.userData.orbitAngle = Math.atan2(off.z, off.x)
      s.userData.orbitYOffset = target.y
    })
  }

  // 卡片爆裂式飞入：选中大类后从画面中心炸出对应的球，依次到达基础位置
  function flyInSectors(groupKey, { fromOrigin = true } = {}) {
    hideLabelTooltip()
    if (currentTimeline) currentTimeline.kill()
    sceneState.busy = false
    sceneState.focusedSector = null
    activeSectorKey.value = null
    statusTitle.value = groupKey
      ? (sectorList.find(s => s.groupKey === groupKey)?.groupName || '产业大类')
      : '总览'
    statusBody.value = groupKey
      ? '已进入该大类，点击任意球体可展开产业链。点击"全产业展示"可把其它大类的球一起飞入。'
      : '点击任意漂浮产业扇区。镜头会推近，核心脉冲触发，主链节点依次生长，分支节点随后展开。'

    // 相机回到总览
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookTarget)
    gsap.to(camera.position, { x: overviewCameraBase.x, y: overviewCameraBase.y, z: overviewCameraBase.z, duration: 1.0, ease: 'power3.out' })
    gsap.to(lookTarget, { x: overviewLookBase.x, y: overviewLookBase.y, z: overviewLookBase.z, duration: 1.0, ease: 'power3.out' })

    // 关键：进入大类视图前，先把 currentBase 重排到中心小椭球（方案 B）
    applyLayoutForFilter(groupKey || null)

    const targets = sectors.filter((s) => !groupKey || s.userData.data.groupKey === groupKey)
    targets.forEach((sector, index) => {
      const base = sector.userData.currentBase
      const state = sector.userData.state
      gsap.killTweensOf(sector.position)
      gsap.killTweensOf(sector.scale)
      gsap.killTweensOf(state)
      sector.visible = true
      sector.userData.activated = false
      // 起点：fromOrigin=true → 从屏幕中心炸出；否则从场景边缘（base 方向远端）扫入
      if (fromOrigin) {
        sector.position.set(0, 0.2, 6.4)
      } else {
        const dir = base.clone().normalize()
        sector.position.set(dir.x * 22 + base.x * 0.2, base.y + dir.y * 6, dir.z * 22 + base.z * 0.2)
      }
      sector.scale.setScalar(0.001)
      state.opacity = 0
      state.glow = 0
      sector.userData.shell.material.opacity = 0
      sector.userData.shell.material.emissiveIntensity = 0
      setLabelOpacity(sector.userData.label, 0)

      const delay = index * 0.05
      const dur = 1.05
      gsap.to(sector.position, { x: base.x, y: base.y, z: base.z, duration: dur, delay, ease: 'back.out(1.2)' })
      gsap.to(sector.scale, { x: 1.18, y: 1.18, z: 1.18, duration: dur, delay, ease: 'power3.out' })
      gsap.to(state, {
        opacity: 0.82, glow: 0.38, duration: dur, delay, ease: 'power2.out',
        onUpdate: () => {
          sector.userData.shell.material.opacity = state.opacity
          sector.userData.shell.material.emissiveIntensity = state.glow
          setLabelOpacity(sector.userData.label, Math.min(0.96, state.opacity * 1.2))
        },
        onComplete: () => { sector.userData.activated = true }
      })
    })
  }

  // 全产业展示：
  //  · 当前 filter 内已经可见的球：从"中心小椭球位置"滑回原始 basePosition（扩散）
  //  · filter 之外仍隐藏的球：从场景边缘扫入到 basePosition
  function showAllRemaining() {
    if (!activeFilter.value) return   // 已经是全产业态，不需要再飞
    const prevFilter = activeFilter.value
    activeFilter.value = null
    statusTitle.value = '总览'
    statusBody.value = '已展示全部 50 条产业链。点击任意产业球可展开对应产业链。'

    // 把所有球的 currentBase 复位到原始 basePosition，并刷新 orbit 参数
    applyLayoutForFilter(null)

    sectors.forEach((sector, index) => {
      const base = sector.userData.basePosition
      const state = sector.userData.state
      gsap.killTweensOf(sector.position)
      gsap.killTweensOf(sector.scale)
      gsap.killTweensOf(state)
      sector.userData.activated = false

      const wasVisible = sector.visible
      if (!wasVisible) {
        // 隐藏的球：从场景边缘 base 方向远端扫入
        sector.visible = true
        const dir = base.clone().normalize()
        sector.position.set(dir.x * 24 + base.x * 0.1, base.y + dir.y * 4, dir.z * 24 + base.z * 0.1)
        sector.scale.setScalar(0.001)
        state.opacity = 0
        state.glow = 0
        sector.userData.shell.material.opacity = 0
        sector.userData.shell.material.emissiveIntensity = 0
        setLabelOpacity(sector.userData.label, 0)
      }
      // 可见球（原 filter 内）当前位于中心小椭球；直接 tween 回原始 basePosition 即可

      const delay = index * 0.018
      const dur = wasVisible ? 1.25 : 1.1
      const ease = wasVisible ? 'power3.inOut' : 'power3.out'
      gsap.to(sector.position, { x: base.x, y: base.y, z: base.z, duration: dur, delay, ease })
      gsap.to(sector.scale, { x: 1.18, y: 1.18, z: 1.18, duration: dur, delay, ease })
      gsap.to(state, {
        opacity: 0.82, glow: 0.38, duration: dur, delay, ease: 'power2.out',
        onUpdate: () => {
          sector.userData.shell.material.opacity = state.opacity
          sector.userData.shell.material.emissiveIntensity = state.glow
          setLabelOpacity(sector.userData.label, Math.min(0.96, state.opacity * 1.2))
        },
        onComplete: () => { sector.userData.activated = true }
      })
    })
  }

  // 返回 landing：先把当前可见的球缩成黑点，再切回选择页
  function flyOutToLanding() {
    hideLabelTooltip()
    if (currentTimeline) currentTimeline.kill()
    sceneState.busy = false
    sceneState.focusedSector = null
    activeSectorKey.value = null
    // 回到 landing：没有锁定节点，右侧抽屉一并关掉
    if (orgDrawer.visible) closeOrgDrawer()

    const targets = sectors.filter((s) => s.visible)
    if (!targets.length) {
      viewState.value = 'landing'
      activeFilter.value = null
      return
    }
    targets.forEach((sector, index) => {
      const state = sector.userData.state
      gsap.killTweensOf(sector.position)
      gsap.killTweensOf(sector.scale)
      gsap.killTweensOf(state)
      sector.userData.activated = false
      const delay = index * 0.012
      const dur = 0.55
      gsap.to(sector.scale, { x: 0.001, y: 0.001, z: 0.001, duration: dur, delay, ease: 'power2.in' })
      gsap.to(state, {
        opacity: 0, glow: 0, duration: dur, delay, ease: 'power2.in',
        onUpdate: () => {
          sector.userData.shell.material.opacity = state.opacity
          sector.userData.shell.material.emissiveIntensity = state.glow
          setLabelOpacity(sector.userData.label, state.opacity)
        },
        onComplete: () => { sector.visible = false }
      })
    })
    gsap.delayedCall(0.55 + targets.length * 0.012, () => {
      viewState.value = 'landing'
      activeFilter.value = null
    })
  }

  resetSceneFn = resetScene
  // landing → scene：选中某个大类（或全产业）后调用
  enterCategoryFn = (groupKey) => {
    viewState.value = 'scene'
    activeFilter.value = groupKey || null
    flyInSectors(groupKey, { fromOrigin: true })
  }
  showAllFn = () => { showAllRemaining() }
  backToLandingFn = () => { flyOutToLanding() }

  // "返回上一级"语义：
  // 1) 展开了 L2 子树 → 关掉子树
  // 2) 聚焦了某个产业 → 退到该 filter 下的总览
  // 3) 只是站在 filter/全产业总览 → 退回 landing 选择页
  goBackFn = () => {
    if (focusedBranchNode) closeBranchDetail()
    else if (sceneState.focusedSector) resetScene()
    else if (viewState.value === 'scene') flyOutToLanding()
  }

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
    // 已聚焦时，只把当前聚焦的产业球加进 hover 命中区——其它球已 visible=false，
    // 但 raycaster 不看 visible，必须显式过滤掉，否则鼠标扫过隐形位置还会冒 tooltip
    const visibleSectorHits = sceneState.focusedSector
      ? sectorHitAreas.filter(h => h.userData?.owner === sceneState.focusedSector)
      : sectorHitAreas
    const areas = [...visibleSectorHits, ...branchHitAreas]
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

  // 鼠标悬浮时附加的信息：GICS 编号 / 段数 / 子项数，让用户对深度有预期
  function getQueryableChainName(owner) {
    const title = String(getOwnerTitle(owner) || '').trim()
    return queryableChainNames.has(title) ? title : ''
  }

  function openOrgDrawerForOwner(owner) {
    const chain = getQueryableChainName(owner)
    if (!chain) return
    loadOrgDrawer(chain, getOwnerLevel(owner), 1)
  }

  function getOwnerMeta(owner) {
    if (!owner) return ''
    const ud = owner.userData

    // 主产业球（sector）：从 sectorList + industryChainGraphData 取 GICS 码 + 总段/子项
    if (ud?.data?.dataKey) {
      const sec = sectorList.find((s) => s.dataKey === ud.data.dataKey)
      if (!sec) return ''
      const graph = industryChainGraphData[sec.dataKey] || {}
      let segCount = 0
      let subCount = 0
      for (const ax of ['upstream', 'midstream', 'downstream']) {
        const children = graph[ax]?.root?.children || []
        segCount += children.length
        for (const ch of children) subCount += (ch.children?.length || 0)
      }
      return `GICS ${sec.gicsCode} · ${segCount} 段 · ${subCount} 项`
    }

    // L1 分支 / L2 / L3 ：用 nodeData 计 immediate + 子代数
    if (ud?.nodeData) {
      const children = ud.nodeData.children || []
      if (!children.length) return ''
      let leaf = 0
      for (const ch of children) leaf += (ch.children?.length || 0)
      return leaf > 0 ? `${children.length} 段 · ${leaf} 子项` : `${children.length} 项`
    }

    return ''
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
    labelTooltip.meta = getOwnerMeta(owner)
    labelTooltip.accent = color?.isColor ? colorToCss(color, 1) : '#86e4ff'
  }

  function hideLabelTooltip() {
    labelTooltip.visible = false
  }

  function canNavigateScene() {
    return !!sceneState.focusedSector && !sceneState.busy
  }

  function isStagePointerEvent(event) {
    return event.composedPath?.().includes(stage) || event.target === renderer.domElement
  }

  function stopCameraMotion() {
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookTarget)
  }

  function clampLookTarget(nextTarget) {
    nextTarget.x = THREE.MathUtils.clamp(nextTarget.x, -7.5, 9.5)
    nextTarget.y = THREE.MathUtils.clamp(nextTarget.y, -3.2, 4.6)
    nextTarget.z = THREE.MathUtils.clamp(nextTarget.z, -7.2, 3.2)
    return nextTarget
  }

  function panCameraByPixels(dx, dy) {
    if (!canNavigateScene()) return
    stopCameraMotion()
    camera.updateMatrixWorld()

    const rect = stage.getBoundingClientRect()
    const distance = camera.position.distanceTo(lookTarget)
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance
    const viewWidth = viewHeight * camera.aspect
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize()
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize()
    const pan = right
      .multiplyScalar((-dx / Math.max(1, rect.width)) * viewWidth)
      .add(up.multiplyScalar((dy / Math.max(1, rect.height)) * viewHeight))
    const nextTarget = clampLookTarget(lookTarget.clone().add(pan))
    const actualPan = nextTarget.sub(lookTarget)

    camera.position.add(actualPan)
    lookTarget.add(actualPan)
    lookTargetProxy.add(actualPan)
  }

  function zoomCameraByWheel(deltaY) {
    if (!canNavigateScene()) return
    stopCameraMotion()

    const viewDir = new THREE.Vector3().subVectors(camera.position, lookTarget).normalize()
    const currentDistance = camera.position.distanceTo(lookTarget)
    const nextDistance = THREE.MathUtils.clamp(currentDistance * Math.exp(deltaY * 0.001), 4.2, 18)
    camera.position.copy(lookTarget).add(viewDir.multiplyScalar(nextDistance))
  }

  function updatePointerCursor(hit) {
    if (navState.dragging) {
      stage.style.cursor = 'grabbing'
      return
    }
    const canClickBranch = sceneState.focusedSector && !sceneState.busy && hit?.object?.userData?.branchOwner
    const canClickSector = !sceneState.focusedSector && hit?.object?.userData?.owner
    if (canClickBranch || canClickSector) {
      stage.style.cursor = 'pointer'
    } else if (canNavigateScene()) {
      stage.style.cursor = 'grab'
    } else {
      stage.style.cursor = ''
    }
  }

  function onPointerMove(event) {
    if (navState.dragging && event.pointerId === navState.pointerId) {
      const dx = event.clientX - navState.lastX
      const dy = event.clientY - navState.lastY
      if (Math.abs(event.clientX - navState.startX) + Math.abs(event.clientY - navState.startY) > 5) {
        navState.moved = true
      }
      navState.lastX = event.clientX
      navState.lastY = event.clientY
      panCameraByPixels(dx, dy)
      hideLabelTooltip()
      updatePointerCursor()
      return
    }

    if (!isStagePointerEvent(event)) {
      hideLabelTooltip()
      return
    }

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

    updatePointerCursor(hit)
  }

  function handleSceneClick(event) {
    if (!isStagePointerEvent(event)) return
    hideLabelTooltip()
    const p = pointerToNDC(event)
    pointer.x = p.x
    pointer.y = p.y
    raycaster.setFromCamera(pointer, camera)
    const primaryHit = raycaster.intersectObjects(getLabelHitAreas(), false)[0]
    const primaryOwner = getLabelOwner(primaryHit)
    if (primaryOwner) openOrgDrawerForOwner(primaryOwner)
    // 已聚焦 L1 → 先检测 L2 子节点点击（聚焦该路径，其它兄弟 L2 + 它们的 L3 变透明）
    if (sceneState.focusedSector && !sceneState.busy && focusedBranchNode) {
      const l2Areas = getSubtreeHitAreas()
      if (l2Areas.length) {
        const l2Hit = raycaster.intersectObjects(l2Areas, false)[0]
        const l2Owner = l2Hit?.object?.userData?.labelOwner
        if (l2Owner?.userData?.subtreeLevel === 2) {
          openL2Detail(l2Owner)
          return
        }
      }
    }
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

  function onPointerDown(event) {
    if (event.button !== 0) return
    if (!isStagePointerEvent(event)) return
    navState.dragging = canNavigateScene()
    navState.pointerId = event.pointerId
    navState.startX = event.clientX
    navState.startY = event.clientY
    navState.lastX = event.clientX
    navState.lastY = event.clientY
    navState.moved = false
    hideLabelTooltip()
    if (navState.dragging && stage.setPointerCapture) {
      stage.setPointerCapture(event.pointerId)
      updatePointerCursor()
    }
  }

  function onPointerUp(event) {
    const wasDragging = navState.dragging && event.pointerId === navState.pointerId
    const wasMoved = navState.moved
    if (wasDragging && stage.releasePointerCapture) {
      stage.releasePointerCapture(event.pointerId)
    }
    navState.dragging = false
    navState.pointerId = null
    navState.moved = false
    updatePointerCursor()
    if (!wasMoved) handleSceneClick(event)
  }

  function onPointerCancel(event) {
    if (navState.dragging && event.pointerId === navState.pointerId && stage.releasePointerCapture) {
      stage.releasePointerCapture(event.pointerId)
    }
    navState.dragging = false
    navState.pointerId = null
    navState.moved = false
    updatePointerCursor()
  }

  function onWheel(event) {
    if (!canNavigateScene() || !isStagePointerEvent(event)) return
    event.preventDefault()
    zoomCameraByWheel(event.deltaY)
    hideLabelTooltip()
  }

  function onResize() {
    const { width, height } = getStageSize()
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    composer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5))
    labelRenderer.setSize(width, height)
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      if (viewState.value === 'landing') return
      if (focusedBranchNode) closeBranchDetail()
      else if (sceneState.focusedSector) resetScene()
      else flyOutToLanding()
    }
  }

  function onDblClick() {
    if (viewState.value !== 'scene') return
    if (sceneState.focusedSector) resetScene()
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerCancel)
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('dblclick', onDblClick)

  // 不在挂载时调 resetScene —— 此时 viewState='landing'，50 球初始全部隐藏，
  // 让前端先呈现 8 张玻璃卡片。用户点选大类后 enterCategoryFn 才把球飞入场景。
  statusTitle.value = '总览'
  statusBody.value = '请选择产业大类'

  function render() {
    const elapsed = clock.getElapsedTime()
    const overviewMode = !sceneState.focusedSector
    sectors.forEach((sector, index) => {
      if (sceneState.focusedSector === sector) return
      // 未激活（landing 阶段 / 飞入动画中）的球：不参与 orbit 漂浮，避免 gsap 与 lerp 打架
      if (!sector.visible || !sector.userData.activated) return
      // 用 currentBase（filter 模式重排后的中心椭球坐标 / 全产业模式下的原始坐标）
      const base = sector.userData.currentBase
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
      // shell 上下漂浮 ±0.14；label 在 shell 上方固定 1.32 处，跟着一起浮，不再钉死
      const shellBobY = Math.sin(elapsed * 1.15 + index) * 0.14
      sector.userData.shell.position.y = shellBobY
      sector.userData.label.position.y = 1.32 + shellBobY
    })

    if (sceneState.focusedSector) {
      const focus = sceneState.focusedSector
      const focusBobY = Math.sin(elapsed * 2.2) * 0.08
      focus.userData.shell.position.y = focusBobY
      focus.userData.label.position.y = 1.32 + focusBobY
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
      activeChain.nodes.concat(activeChain.branchNodes).forEach((node, index) => {
        // 主链/分支节点只漂浮，不旋转
        if (node === focusedBranchNode) return
        node.userData.core.position.y = Math.sin(elapsed * 1.8 + index * 0.55) * 0.018
      })
      // 当前展开的子树节点：每帧轻微上下漂浮（不旋转），相位各异避免同步
      if (focusedBranchNode?.userData?.subtreeNodes) {
        focusedBranchNode.userData.subtreeNodes.forEach((sub) => {
          if (sub.userData.baseY === undefined) {
            sub.userData.baseY = sub.position.y
            sub.userData.floatPhase = Math.random() * Math.PI * 2
          }
          sub.userData.core.position.y = Math.sin(elapsed * 1.4 + sub.userData.floatPhase) * 0.018
        })
      }
    }

    stars.rotation.y += 0.0005
    tunnel.position.z = -Math.sin(elapsed * 0.18) * 0.4
    composer.render()
    labelRenderer.render(scene, camera)
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
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerCancel)
    window.removeEventListener('wheel', onWheel)
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
    if (labelRenderer.domElement.parentNode === stage) stage.removeChild(labelRenderer.domElement)
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
  --org-drawer-width: 460px;
}

.blueprint-stage {
  position: absolute;
  inset: 0;
  touch-action: none;
  transition: transform 0.28s ease;
  transform-origin: center center;
}

.blueprint-root.is-org-drawer-open .blueprint-stage {
  transform: translateX(calc(var(--org-drawer-width) * -0.42));
}

.blueprint-stage :deep(canvas) {
  display: block;
}

.blueprint-stage :deep(.blueprint-label-layer) {
  z-index: 2;
}

.blueprint-stage :deep(.blueprint-label) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 13px 6px;
  border: 1px solid color-mix(in srgb, var(--accent) 44%, transparent);
  border-radius: 8px;
  background: rgba(7, 17, 31, 0.78);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 6px 16px rgba(0,0,0,0.24), 0 0 14px var(--accent-soft);
  color: #dcecff;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-weight: 700;
  line-height: 1.15;
  white-space: nowrap;
  letter-spacing: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.62);
  pointer-events: none;
  user-select: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, opacity;
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

.blueprint-node-tooltip em {
  display: block;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(134, 228, 255, 0.16);
  font-size: 11px;
  font-style: normal;
  letter-spacing: 0.06em;
  color: rgba(170, 220, 250, 0.78);
}

.blueprint-org-drawer {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 16;
  width: min(var(--org-drawer-width), calc(100vw - 20px));
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(111, 187, 255, 0.28);
  border-right: 0;
  border-radius: 20px 0 0 20px;
  background: linear-gradient(180deg, rgba(9, 23, 42, 0.94), rgba(4, 13, 25, 0.88));
  box-shadow: 0 22px 52px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  overflow: hidden;
}

.blueprint-org-drawer-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid rgba(129, 190, 255, 0.16);
}

.blueprint-org-drawer-head span,
.blueprint-org-drawer-head em {
  display: block;
  font-size: 12px;
  color: rgba(171, 213, 245, 0.75);
  font-style: normal;
}

.blueprint-org-drawer-head strong {
  display: block;
  margin: 6px 0;
  font-size: 20px;
  line-height: 1.25;
  color: rgba(242, 249, 255, 0.98);
}

.blueprint-org-drawer-head button {
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  border-radius: 999px;
  border: 1px solid rgba(138, 200, 255, 0.32);
  background: rgba(5, 17, 31, 0.78);
  color: rgba(226, 242, 255, 0.9);
  font-size: 21px;
  cursor: pointer;
}

.blueprint-org-search-line,
.blueprint-org-pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid rgba(129, 190, 255, 0.1);
  color: rgba(228, 244, 255, 0.9);
  font-size: 13px;
}

.blueprint-org-search-line small {
  color: rgba(162, 202, 234, 0.62);
}

.blueprint-org-filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  padding: 10px 18px 12px;
  border-bottom: 1px solid rgba(129, 190, 255, 0.1);
  background: rgba(6, 18, 34, 0.22);
}

.blueprint-org-filter-row select,
.blueprint-org-filter-row button {
  height: 32px;
  min-width: 0;
  border: 1px solid rgba(127, 193, 255, 0.24);
  border-radius: 10px;
  color: rgba(232, 245, 255, 0.9);
  font: inherit;
  font-size: 12px;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.blueprint-org-filter-row select {
  appearance: none;
  padding: 0 30px 0 10px;
  background-color: rgba(9, 25, 45, 0.78);
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(158, 211, 255, 0.92) 50%),
    linear-gradient(135deg, rgba(158, 211, 255, 0.92) 50%, transparent 50%);
  background-position:
    calc(100% - 15px) 13px,
    calc(100% - 10px) 13px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  cursor: pointer;
}

.blueprint-org-filter-row option {
  background: #081729;
  color: #e8f5ff;
}

.blueprint-org-filter-row button {
  padding: 0 12px;
  background: rgba(14, 43, 77, 0.68);
  cursor: pointer;
}

.blueprint-org-filter-row select:hover,
.blueprint-org-filter-row button:hover:not(:disabled),
.blueprint-org-filter-row select:focus-visible,
.blueprint-org-filter-row button:focus-visible {
  border-color: rgba(127, 210, 255, 0.52);
  background-color: rgba(13, 39, 68, 0.92);
  box-shadow: 0 0 0 2px rgba(72, 186, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.blueprint-org-filter-row select:disabled,
.blueprint-org-filter-row button:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.blueprint-org-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 14px;
  scrollbar-width: thin;
  scrollbar-color: rgba(118, 188, 255, 0.62) rgba(8, 22, 40, 0.36);
}

.blueprint-org-list::-webkit-scrollbar {
  width: 7px;
}

.blueprint-org-list::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgba(8, 22, 40, 0.36);
}

.blueprint-org-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(91, 178, 255, 0.88), rgba(82, 215, 255, 0.5));
  border: 2px solid rgba(8, 22, 40, 0.36);
}

.blueprint-org-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(129, 207, 255, 0.96), rgba(88, 228, 255, 0.68));
}

.blueprint-org-card {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 12px;
  padding: 13px;
  border: 1px solid rgba(115, 184, 255, 0.16);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(13, 32, 56, 0.72), rgba(7, 18, 34, 0.6));
}

.blueprint-org-card + .blueprint-org-card {
  margin-top: 10px;
}

.blueprint-org-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #2f86ff, #52d7ff);
  color: white;
  font-weight: 800;
  box-shadow: 0 0 22px rgba(72, 186, 255, 0.32);
}

.blueprint-org-title {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.blueprint-org-title strong {
  font-size: 14px;
  line-height: 1.35;
  color: rgba(241, 248, 255, 0.97);
}

.blueprint-org-title span {
  flex: 0 0 auto;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(51, 213, 158, 0.14);
  color: #84f2c6;
  font-size: 11px;
}

.blueprint-org-main p {
  margin: 7px 0 0;
  color: rgba(182, 211, 232, 0.74);
  font-size: 12px;
  line-height: 1.35;
}

.blueprint-org-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.blueprint-org-tags span {
  padding: 3px 7px;
  border-radius: 7px;
  background: rgba(46, 129, 255, 0.14);
  color: rgba(158, 211, 255, 0.92);
  font-size: 11px;
}

.blueprint-org-meta {
  display: flex;
  gap: 12px;
  margin-top: 9px;
  color: rgba(200, 225, 241, 0.7);
  font-size: 12px;
}

.blueprint-org-empty {
  margin: 18px;
  padding: 28px 16px;
  border: 1px dashed rgba(134, 198, 255, 0.25);
  border-radius: 14px;
  text-align: center;
  color: rgba(191, 220, 241, 0.72);
}

.blueprint-org-pager {
  padding: 12px 16px 14px;
  border-top: 1px solid rgba(129, 190, 255, 0.12);
  border-bottom: 0;
  color: rgba(198, 225, 244, 0.75);
}

.blueprint-org-pager button {
  min-width: 76px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid rgba(127, 193, 255, 0.28);
  background: rgba(14, 43, 77, 0.68);
  color: rgba(232, 245, 255, 0.88);
  cursor: pointer;
}

.blueprint-org-pager button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.blueprint-hud {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.blueprint-root.is-org-drawer-open .blueprint-hud {
  top: auto;
  right: auto;
  left: 20px;
  bottom: 96px;
  flex-direction: column;
}

.blueprint-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 12px 0 8px;
  margin-top: 6px;
  border: 1px solid rgba(133, 205, 255, 0.32);
  border-radius: 999px;
  background: rgba(8, 14, 26, 0.72);
  color: rgba(220, 240, 255, 0.92);
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 0.04em;
  cursor: pointer;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
}

.blueprint-toall-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 14px;
  margin-top: 6px;
  border: 1px solid rgba(207, 216, 226, 0.45);
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(40, 60, 110, 0.85), rgba(20, 32, 64, 0.85));
  color: #f4f8ff;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 0.08em;
  cursor: pointer;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 16px rgba(120, 163, 255, 0.32);
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
}
.blueprint-toall-btn:hover {
  border-color: rgba(207, 216, 226, 0.8);
  box-shadow: 0 0 22px rgba(150, 190, 255, 0.55);
  transform: translateY(-1px);
}
.blueprint-toall-btn:active {
  transform: translateY(1px);
}
.blueprint-toall-icon {
  font-size: 14px;
  line-height: 1;
  color: rgba(180, 220, 255, 0.95);
}

/* ── Landing 选择页：8 张玻璃卡片矩阵 ─────────────────────── */
.blueprint-landing {
  position: absolute;
  inset: 0;
  z-index: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  background: radial-gradient(ellipse at 50% 38%, rgba(20, 36, 72, 0.42) 0%, rgba(4, 8, 16, 0.78) 70%);
  backdrop-filter: blur(2px);
  pointer-events: auto;
  font-family: "Segoe UI", "PingFang SC", sans-serif;
}
.blueprint-landing-head {
  text-align: center;
  margin-bottom: 36px;
  color: rgba(220, 240, 255, 0.92);
}
.blueprint-landing-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.5em;
  color: rgba(134, 228, 255, 0.78);
  text-transform: uppercase;
}
.blueprint-landing-title {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #f4f9ff;
  text-shadow: 0 0 18px rgba(120, 180, 255, 0.32);
}
.blueprint-landing-subtitle {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.18em;
  color: rgba(180, 210, 240, 0.7);
}
.blueprint-landing-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 220px));
  gap: 18px;
  width: 100%;
  max-width: 960px;
}
.blueprint-landing-card {
  --accent: #86e4ff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-height: 168px;
  padding: 20px 18px 18px;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, rgba(133, 205, 255, 0.18));
  border-radius: 18px;
  background: linear-gradient(155deg,
    color-mix(in srgb, var(--accent) 14%, rgba(10, 18, 36, 0.78)) 0%,
    rgba(8, 14, 28, 0.86) 55%,
    color-mix(in srgb, var(--accent) 8%, rgba(8, 14, 28, 0.92)) 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02) inset,
    0 14px 32px rgba(0, 0, 0, 0.45),
    0 0 22px color-mix(in srgb, var(--accent) 16%, transparent);
  color: rgba(232, 244, 255, 0.95);
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}
.blueprint-landing-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 88% 8%,
    color-mix(in srgb, var(--accent) 36%, transparent) 0%,
    transparent 52%);
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.22s ease;
}
.blueprint-landing-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 70%, rgba(255, 255, 255, 0.15));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 18px 38px rgba(0, 0, 0, 0.52),
    0 0 34px color-mix(in srgb, var(--accent) 28%, transparent);
}
.blueprint-landing-card:hover::before {
  opacity: 0.9;
}
.blueprint-landing-card.is-all {
  --accent: #cfd8e2;
}
.blueprint-landing-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent) 22%, rgba(8, 14, 28, 0.6));
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
  color: var(--accent);
  font-size: 16px;
  line-height: 1;
  text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 65%, transparent);
}
.blueprint-landing-card-name {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #ffffff;
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 38%, transparent);
}
.blueprint-landing-card-count {
  font-size: 11px;
  letter-spacing: 0.24em;
  color: color-mix(in srgb, var(--accent) 75%, rgba(220, 240, 255, 0.7));
}
.blueprint-landing-card-desc {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: 0.06em;
  color: rgba(200, 220, 240, 0.78);
}

/* landing -> scene 淡出过渡 */
.landing-fade-enter-active,
.landing-fade-leave-active {
  transition: opacity 0.5s ease;
}
.landing-fade-enter-from,
.landing-fade-leave-to {
  opacity: 0;
}
@media (max-width: 880px) {
  .blueprint-landing-grid {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    max-width: 520px;
  }
}
.blueprint-back-btn:hover {
  background: rgba(20, 38, 70, 0.85);
  border-color: rgba(133, 205, 255, 0.6);
  color: #ffffff;
}
.blueprint-back-btn:active {
  transform: translateY(1px);
}
.blueprint-back-arrow {
  font-size: 18px;
  line-height: 1;
  transform: translateY(-1px);
}

/* 左上角产业切换面板 */
.blueprint-sector-menu {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 6;
  width: 178px;
  max-height: calc(50vh - 40px);
  padding: 12px 12px 10px;
  border-radius: 16px;
  border: 1px solid rgba(133, 205, 255, 0.2);
  background: rgba(8, 14, 26, 0.62);
  backdrop-filter: blur(14px);
  box-shadow: 0 0 28px rgba(25, 96, 180, 0.16);
  font-family: "Segoe UI", "PingFang SC", sans-serif;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.blueprint-sector-menu-header {
  flex: 0 0 auto;
}
.blueprint-sector-menu-list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 2px;
  scrollbar-width: thin;
  scrollbar-color: rgba(133, 205, 255, 0.35) transparent;
}
.blueprint-sector-menu-list::-webkit-scrollbar {
  width: 6px;
}
.blueprint-sector-menu-list::-webkit-scrollbar-track {
  background: transparent;
}
.blueprint-sector-menu-list::-webkit-scrollbar-thumb {
  background: rgba(133, 205, 255, 0.32);
  border-radius: 3px;
}
.blueprint-sector-menu-list::-webkit-scrollbar-thumb:hover {
  background: rgba(133, 205, 255, 0.55);
}
.blueprint-sector-menu-title {
  margin: 0 0 6px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: rgba(150, 200, 240, 0.78);
}
.blueprint-sector-menu-jumps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin: 0 0 8px;
  padding: 0 0 8px;
  border-bottom: 1px solid rgba(133, 205, 255, 0.18);
}
.blueprint-jump-chip {
  min-width: 0;
  padding: 5px 4px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) 16%, rgba(8, 14, 26, 0.6));
  color: rgba(232, 246, 255, 0.92);
  font-family: inherit;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.12s ease;
}
.blueprint-jump-chip:hover {
  background: color-mix(in srgb, var(--accent) 36%, rgba(8, 14, 26, 0.6));
  transform: translateY(-1px);
}
.blueprint-jump-chip:active {
  transform: translateY(0);
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
  /* landing 蒙层 z-index 是 8，footer 要在它上面，"返回首页"才能点 */
  z-index: 12;
  pointer-events: none;
}

.blueprint-root.is-org-drawer-open .blueprint-footer {
  right: auto;
  left: 20px;
  bottom: 18px;
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
