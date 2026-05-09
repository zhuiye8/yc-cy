import { isKnownViewId, normalizeRoute, routeToViewId, viewIdToRoute } from './routes.js'

const NAVIGATE_EVENT = 'yc:navigate'

function readHashRoute() {
  return normalizeRoute(window.location.hash || '/')
}

function writeHashRoute(route, mode) {
  const nextHash = `#${normalizeRoute(route)}`
  if (window.location.hash === nextHash) return

  if (mode === 'replace') {
    window.history.replaceState(null, '', nextHash)
  } else {
    window.history.pushState(null, '', nextHash)
  }
}

export function createNavigationController({
  activate,
  getActiveViewId,
  syncHashOnNavigate = false,
} = {}) {
  if (typeof activate !== 'function') {
    throw new TypeError('createNavigationController requires an activate function')
  }

  function navigateToView(viewId, options = {}) {
    if (!isKnownViewId(viewId)) return false

    const route = options.route || viewIdToRoute(viewId)
    activate(viewId, { ...options, route })

    const shouldSyncHash = options.syncHash ?? syncHashOnNavigate
    if (shouldSyncHash) {
      writeHashRoute(route, options.replace ? 'replace' : 'push')
    }

    return true
  }

  function navigateToRoute(route, options = {}) {
    const normalizedRoute = normalizeRoute(route)
    return navigateToView(routeToViewId(normalizedRoute), {
      ...options,
      route: normalizedRoute,
    })
  }

  function syncFromLocation(options = {}) {
    if (!window.location.hash) return false
    return navigateToRoute(readHashRoute(), { replace: true, syncHash: false, ...options })
  }

  function getCurrentRoute() {
    const activeViewId = typeof getActiveViewId === 'function' ? getActiveViewId() : null
    return viewIdToRoute(activeViewId)
  }

  return {
    navigateToView,
    navigateToRoute,
    syncFromLocation,
    getCurrentRoute,
  }
}

export function installNavigationGlobals(controller) {
  window.ycNavigation = controller

  window.addEventListener(NAVIGATE_EVENT, (event) => {
    const target = event.detail?.target || event.detail?.viewId
    const route = event.detail?.route

    if (target) {
      controller.navigateToView(target, event.detail?.options)
    } else if (route) {
      controller.navigateToRoute(route, event.detail?.options)
    }
  })

  window.addEventListener('hashchange', () => {
    controller.syncFromLocation({ replace: true })
  })

  controller.syncFromLocation({ replace: true })
}

export function dispatchNavigation(target, options) {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, {
    detail: { target, options },
  }))
}
