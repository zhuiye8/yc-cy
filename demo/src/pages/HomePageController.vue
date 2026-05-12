<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

// 用户在首页停留时，空闲后台预拉其他路由 chunk + 大数据模块。
// 关键收益：从首页点产业链/空间态势时，BlueprintScene + industry-chain-graph(2.45MB) 已经在内存，几乎无白屏
function prefetchOtherRoutes() {
  import('./IndustryChainPage.vue')
  import('./SpaceTrendPage.vue')
  import('./DatabaseQueryPage.vue')
  import('./AiPage.vue')
}

let homeSnapTimer = null
let isAutoSnappingHome = false
const HOME_SNAP_ENABLED = false
const HOME_FEATURE_LAYOUT = {
  top: 690,
  width: 1475,
  height: 933,
  minLayoutWidth: 1366,
  maxLayoutWidth: 3840,
  designWidth: 1920,
  gapAfter: 25,
  statsHeight: 710,
}

const HOME_SNAP_POINTS = [
  { name: 'hero', y: 0 },
  { name: 'feature', y: 640 },
  { name: 'stats', y: 1415 },
  { name: 'partners', y: 2070 },
]

function isHomeActive() {
  return document.getElementById('homeView')?.classList.contains('is-active')
}

function clampScrollTop(value) {
  const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return Math.min(Math.max(0, value), maxScrollTop)
}

function getHomeLayoutScale() {
  const scale = Number(getComputedStyle(document.documentElement).getPropertyValue('--home-layout-scale'))
  return Number.isFinite(scale) && scale > 0 ? scale : 1
}

function getHomeSnapTargets() {
  const layoutScale = getHomeLayoutScale()
  return HOME_SNAP_POINTS.map((point) => ({
    ...point,
    top: clampScrollTop(point.y * layoutScale),
  }))
}

function snapHomeScroll() {
  if (!isHomeActive() || isAutoSnappingHome) return

  const targets = getHomeSnapTargets()
  if (!targets.length) return

  const currentTop = window.scrollY
  const nearest = targets.reduce((best, target) => (
    Math.abs(target.top - currentTop) < Math.abs(best.top - currentTop) ? target : best
  ), targets[0])

  if (Math.abs(nearest.top - currentTop) < 36) return

  isAutoSnappingHome = true
  window.scrollTo({ top: nearest.top, left: 0, behavior: 'smooth' })
  window.setTimeout(() => {
    isAutoSnappingHome = false
  }, 560)
}

function updateHomeCalibrationReadout() {
  const readout = document.getElementById('homeCalibrationReadout')
  if (!readout || !isHomeActive()) return
  const scale = getComputedStyle(document.documentElement).getPropertyValue('--home-feature-scale').trim() || '1'
  const layoutScale = getComputedStyle(document.documentElement).getPropertyValue('--home-layout-scale').trim() || '1'
  const targets = getHomeSnapTargets()
  const nearest = targets.reduce((best, target) => (
    Math.abs(target.top - window.scrollY) < Math.abs(best.top - window.scrollY) ? target : best
  ), targets[0])
  readout.textContent = `Y ${Math.round(window.scrollY)} / ${nearest.name} ${Math.round(nearest.top)} / CW ${document.documentElement.clientWidth} / VH ${window.innerHeight} / L ${Number(layoutScale).toFixed(2)} / S ${Number(scale).toFixed(2)}`
}

function scheduleHomeSnap() {
  updateHomeCalibrationReadout()
  if (!HOME_SNAP_ENABLED) return
  if (!isHomeActive() || isAutoSnappingHome) return
  window.clearTimeout(homeSnapTimer)
  homeSnapTimer = window.setTimeout(snapHomeScroll, 150)
}

function updateHomeFeatureLayout() {
  const root = document.documentElement
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth
  const layoutWidth = Math.min(
    HOME_FEATURE_LAYOUT.maxLayoutWidth,
    Math.max(HOME_FEATURE_LAYOUT.minLayoutWidth, viewportWidth),
  )
  const layoutScale = layoutWidth / HOME_FEATURE_LAYOUT.designWidth
  const scale = Math.min(1, (window.innerHeight * 0.9) / (HOME_FEATURE_LAYOUT.height * layoutScale))
  const featureHeight = HOME_FEATURE_LAYOUT.height * scale
  const statsY = HOME_FEATURE_LAYOUT.top + featureHeight + HOME_FEATURE_LAYOUT.gapAfter
  const partnersY = statsY + HOME_FEATURE_LAYOUT.statsHeight
  const realHeight = partnersY + 757

  root.style.setProperty('--home-feature-scale', scale.toFixed(4))
  root.style.setProperty('--home-feature-total-scale', (layoutScale * scale).toFixed(4))
  root.style.setProperty('--home-layout-w', `${Math.round(layoutWidth)}px`)
  root.style.setProperty('--home-layout-scale', layoutScale.toFixed(4))
  root.style.setProperty('--home-feature-visual-h', `${Math.round(featureHeight)}px`)
  root.style.setProperty('--home-stats-y', `${Math.round(statsY)}px`)
  root.style.setProperty('--home-partners-y', `${Math.round(partnersY)}px`)
  root.style.setProperty('--home-hero-h-scaled', `${Math.round(1010 * layoutScale)}px`)
  root.style.setProperty('--home-partners-y-scaled', `${Math.round(partnersY * layoutScale)}px`)
  root.style.setProperty('--home-real-h', `${Math.round(realHeight * layoutScale)}px`)
  updateHomeCalibrationReadout()
}

onMounted(() => {
  window.addEventListener('scroll', scheduleHomeSnap, { passive: true })
  window.addEventListener('resize', updateHomeFeatureLayout)
  updateHomeFeatureLayout()

  // 空闲时预加载其它路由 chunk；不阻塞首屏首页交互
  const schedule = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 500))
  schedule(prefetchOtherRoutes)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleHomeSnap)
  window.removeEventListener('resize', updateHomeFeatureLayout)
  window.clearTimeout(homeSnapTimer)
})
</script>

<template>
  <span hidden data-home-page-controller />
</template>
