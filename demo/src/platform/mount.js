import { createApp } from 'vue'
import ChainApp from './ChainApp.vue'
import SpaceApp from './SpaceApp.vue'

const TOPBAR_HEIGHT = 108
const SCROLL_LOCK_TARGET_IDS = ['chainView', 'spaceView']

// ── 全局 body 滚动锁：进入 chainView/spaceView 时阻止整页滚动，
//    防止 yc-cy 的 .immersive-page (1181px 高) 撑高 body，把顶栏滚走。
//    每次同步时直接读 DOM 当前状态，避开多个 observer 触发顺序导致的竞态。
let scrollLocked = false
let savedBodyOverflow = null
let savedHtmlOverflow = null

function syncBodyScrollLock() {
  const anyTargetActive = SCROLL_LOCK_TARGET_IDS.some((id) =>
    document.getElementById(id)?.classList.contains('is-active')
  )
  if (anyTargetActive && !scrollLocked) {
    scrollLocked = true
    savedBodyOverflow = document.body.style.overflow
    savedHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else if (!anyTargetActive && scrollLocked) {
    scrollLocked = false
    document.body.style.overflow = savedBodyOverflow ?? ''
    document.documentElement.style.overflow = savedHtmlOverflow ?? ''
    savedBodyOverflow = null
    savedHtmlOverflow = null
  }
}

function mountOverlay(targetViewId, AppComponent, hidePlaceholderSelector) {
  const targetView = document.getElementById(targetViewId)
  if (!targetView) {
    console.warn('[platform] 找不到目标 view：', targetViewId)
    return
  }

  const overlay = document.createElement('div')
  overlay.className = 'platform-overlay'
  overlay.dataset.target = targetViewId
  Object.assign(overlay.style, {
    position: 'fixed',
    top: `${TOPBAR_HEIGHT}px`,
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '3',
    display: 'none',
    background: '#020914',
    overflow: 'hidden'
  })
  document.body.appendChild(overlay)

  let app = null
  const placeholders = hidePlaceholderSelector
    ? Array.from(targetView.querySelectorAll(hidePlaceholderSelector))
    : []
  const placeholderOriginalDisplay = new WeakMap()

  const hidePlaceholders = () => {
    placeholders.forEach((el) => {
      if (!placeholderOriginalDisplay.has(el)) {
        placeholderOriginalDisplay.set(el, el.style.display || '')
      }
      el.style.display = 'none'
    })
  }

  const showPlaceholders = () => {
    placeholders.forEach((el) => {
      const original = placeholderOriginalDisplay.get(el)
      el.style.display = original ?? ''
    })
  }

  const activate = () => {
    overlay.style.display = 'block'
    hidePlaceholders()
    if (!app) {
      app = createApp(AppComponent)
      app.mount(overlay)
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
      })
    } else {
      window.dispatchEvent(new Event('resize'))
    }
  }

  const deactivate = () => {
    overlay.style.display = 'none'
    showPlaceholders()
    if (app) {
      app.unmount()
      app = null
    }
  }

  const sync = () => {
    if (targetView.classList.contains('is-active')) {
      activate()
    } else {
      deactivate()
    }
    syncBodyScrollLock()
  }
  sync()

  const observer = new MutationObserver(sync)
  observer.observe(targetView, { attributes: true, attributeFilter: ['class'] })
}

mountOverlay('chainView', ChainApp, '.chain-scene')
mountOverlay('spaceView', SpaceApp, '.space-panel')
