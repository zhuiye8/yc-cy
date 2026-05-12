import { isKnownViewId, normalizeRoute, routeToViewId, viewIdToRoute } from './routes.js'
import { normalizeLegacyHashRoute, router } from '../app/router.js'
import { useNavigationStore } from '../stores/navigation.js'

const NAVIGATE_EVENT = 'yc:navigate'

function readRoute() {
  const current = router.currentRoute.value
  if (current?.fullPath && current.fullPath !== '/') return normalizeRoute(current.fullPath)
  return normalizeRoute(`${window.location.pathname}${window.location.search}`)
}

function writeRoute(route, mode) {
  const normalized = normalizeRoute(route)
  const method = mode === 'replace' ? 'replace' : 'push'
  if (router.currentRoute.value.fullPath === normalized) return Promise.resolve()
  return router[method](normalized).catch((error) => {
    if (error?.type) return
    throw error
  })
}

function navigationStore() {
  try {
    return useNavigationStore()
  } catch {
    return null
  }
}

export function createNavigationController({
  activate,
  getActiveViewId,
  syncRouteOnNavigate = false,
} = {}) {
  if (typeof activate !== 'function') {
    throw new TypeError('createNavigationController requires an activate function')
  }

  let suppressNextRouteSync = false

  function activateRoute(route, options = {}) {
    const normalizedRoute = normalizeRoute(route)
    const viewId = routeToViewId(normalizedRoute)
    navigationStore()?.setActiveRoute(normalizedRoute)
    activate(viewId, { ...options, route: normalizedRoute })
    return true
  }

  function navigateToView(viewId, options = {}) {
    if (!isKnownViewId(viewId)) return false

    const route = options.route || viewIdToRoute(viewId)
    const normalizedRoute = normalizeRoute(route)
    navigationStore()?.setActiveView(viewId, normalizedRoute)
    activate(viewId, { ...options, route: normalizedRoute })

    const shouldSyncRoute = options.syncRoute ?? options.syncHash ?? syncRouteOnNavigate
    if (shouldSyncRoute) {
      suppressNextRouteSync = true
      writeRoute(route, options.replace ? 'replace' : 'push').finally(() => {
        requestAnimationFrame(() => {
          suppressNextRouteSync = false
        })
      })
    }

    return true
  }

  function navigateToRoute(route, options = {}) {
    const normalizedRoute = normalizeRoute(route)
    const viewId = routeToViewId(normalizedRoute)
    if (!navigateToView(viewId, { ...options, route: normalizedRoute })) return false
    return true
  }

  function syncFromLocation(options = {}) {
    return activateRoute(readRoute(), { replace: true, syncRoute: false, ...options })
  }

  function getCurrentRoute() {
    const route = navigationStore()?.activeRoute
    if (route) return route

    const activeViewId = typeof getActiveViewId === 'function' ? getActiveViewId() : null
    return viewIdToRoute(activeViewId)
  }

  return {
    navigateToView,
    navigateToRoute,
    syncFromLocation,
    getCurrentRoute,
    onRouterAfterEach(to) {
      if (suppressNextRouteSync) return
      activateRoute(to.fullPath, { replace: true, syncRoute: false })
    },
  }
}

export function installNavigationGlobals(controller) {
  const legacyRoute = normalizeLegacyHashRoute()
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

  router.afterEach((to) => controller.onRouterAfterEach?.(to))

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash
    if (!hash.startsWith('#/')) return
    const route = normalizeLegacyHashRoute() || hash.slice(1)
    controller.navigateToRoute(route, { replace: true })
  })

  if (legacyRoute) {
    controller.navigateToRoute(legacyRoute, { replace: true })
  } else {
    controller.syncFromLocation({ replace: true })
  }
}

export function dispatchNavigation(target, options) {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, {
    detail: { target, options },
  }))
}
