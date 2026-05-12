<script setup>
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routeForQueryType } from '../shared/legacyDomRoutes.js'
import { useQueryStore } from '../stores/query.js'

const route = useRoute()
const router = useRouter()
const queryStore = useQueryStore()

let queryView = null
let activeQueryPanel = 'org'
let toastTimer = null
const disposers = []
const QUERY_TYPES = new Set(['org', 'talent', 'patent', 'journal'])

function showToast(message) {
  let toast = document.querySelector('.ui-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'ui-toast'
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800)
}

function syncQueryDetailHeight() {
  if (!queryView?.classList.contains('is-active')) return

  const queryReal = queryView.querySelector('.query-real')
  const content = queryView.querySelector('.query-detail-content')
  if (!queryReal || !content) return

  queryReal.style.removeProperty('min-height')
  queryReal.style.removeProperty('height')
}

function scrollQueryContentToTop() {
  const content = queryView?.querySelector('.query-detail-content')
  content?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

function syncQuerySearchBackground(queryType = activeQueryPanel) {
  const content = queryView?.querySelector('.query-detail-content')
  if (!content) return
  content.dataset.queryType = QUERY_TYPES.has(queryType) ? queryType : 'org'
}

function showQuerySearchMode() {
  const content = queryView?.querySelector('.query-detail-content')
  if (!content) return

  queryStore.showSearch()
  syncQuerySearchBackground()
  content.classList.add('is-search-mode')
  queryView.querySelectorAll('.query-detail-page').forEach((panel) => {
    panel.classList.remove('is-active')
  })
  scrollQueryContentToTop()
  requestAnimationFrame(syncQueryDetailHeight)
}

function showQueryDetailPanel(queryType) {
  const content = queryView?.querySelector('.query-detail-content')
  const targetPanel = queryType
    ? queryView?.querySelector(`.query-detail-page[data-query-panel="${queryType}"]`)
    : null

  if (!content || !targetPanel) return false

  queryStore.showDetail(queryType)
  content.classList.remove('is-search-mode')
  queryView.querySelectorAll('.query-detail-page').forEach((panel) => {
    panel.classList.toggle('is-active', panel === targetPanel)
  })
  scrollQueryContentToTop()
  requestAnimationFrame(syncQueryDetailHeight)
  return true
}

function getQueryTypeFromRoute(value) {
  const path = String(value || '').split('?')[0]
  const match = path.match(/^\/query\/([^/]+)$/)
  return match?.[1] || null
}

function setActiveQueryType(queryType) {
  if (!queryType) return
  activeQueryPanel = queryType
  queryStore.setActiveType(queryType)
  syncQuerySearchBackground(queryType)
  queryView?.querySelectorAll('.query-side-item').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.queryType === queryType)
  })
}

function showQueryRoute(value) {
  const queryType = getQueryTypeFromRoute(value)
  if (queryType) {
    setActiveQueryType(queryType)
    if (showQueryDetailPanel(queryType)) return
  }

  showQuerySearchMode()
}

function addListener(target, type, handler, options) {
  target?.addEventListener(type, handler, options)
  if (target) disposers.push(() => target.removeEventListener(type, handler, options))
}

function bindQueryEvents() {
  queryView.querySelectorAll('.query-side-item-legacy-disabled').forEach((button) => {
    addListener(button, 'click', () => {
      const queryType = button.dataset.queryType
      queryView.querySelectorAll('.query-side-item').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })

      queryView.querySelectorAll('.query-detail-page').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.queryPanel === activeQueryPanel)
      })
      showToast('该详情页暂未配置')
      if (queryType) activeQueryPanel = queryType
      requestAnimationFrame(syncQueryDetailHeight)
    })
  })

  queryView.querySelectorAll('.query-side-item').forEach((button) => {
    addListener(button, 'click', (event) => {
      event.preventDefault()
      event.stopImmediatePropagation()

      const queryType = button.dataset.queryType
      setActiveQueryType(queryType || activeQueryPanel)
      scrollQueryContentToTop()
      router.replace('/query')
    }, true)
  })

  const querySearchButton = queryView.querySelector('.query-keyword-row button')
  const querySearchInput = queryView.querySelector('.query-keyword-row input')

  addListener(querySearchButton, 'click', () => {
    const queryType = queryView.querySelector('.query-side-item.is-active')?.dataset.queryType || activeQueryPanel
    activeQueryPanel = queryType

    if (queryView.querySelector(`.query-detail-page[data-query-panel="${queryType}"]`)) {
      router.push(routeForQueryType(queryType))
    } else {
      showQuerySearchMode()
      showToast('该类型详情页暂未配置')
    }
  })

  addListener(querySearchInput, 'keydown', (event) => {
    if (event.key !== 'Enter') return
    querySearchButton?.click()
  })

  addListener(window, 'resize', syncQueryDetailHeight)
}

let stopRouteWatch = null

onMounted(async () => {
  await nextTick()
  queryView = document.getElementById('queryView')
  if (!queryView) return

  activeQueryPanel = queryView.querySelector('.query-side-item.is-active')?.dataset.queryType || 'org'
  bindQueryEvents()
  showQueryRoute(route.fullPath)
  stopRouteWatch = watch(
    () => route.fullPath,
    (value) => showQueryRoute(value),
  )
})

onBeforeUnmount(() => {
  stopRouteWatch?.()
  disposers.splice(0).forEach((dispose) => dispose())
  clearTimeout(toastTimer)
})
</script>

<template>
  <span hidden data-query-page-controller />
</template>
