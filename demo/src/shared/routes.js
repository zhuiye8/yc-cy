export const VIEW_IDS = {
  home: 'homeView',
  chain: 'chainView',
  space: 'spaceView',
  query: 'queryView',
  ai: 'aiView',
}

export const ROUTE_TO_VIEW = {
  '/': VIEW_IDS.home,
  '/home': VIEW_IDS.home,
  '/chain': VIEW_IDS.chain,
  '/space': VIEW_IDS.space,
  '/query': VIEW_IDS.query,
  '/ai': VIEW_IDS.ai,
}

export const VIEW_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_VIEW).map(([route, viewId]) => [viewId, route]),
)

VIEW_TO_ROUTE[VIEW_IDS.home] = '/home'

export function normalizeRoute(route) {
  const value = String(route || '').trim()
  if (!value || value === '#') return '/'
  const withoutHash = value.startsWith('#') ? value.slice(1) : value
  return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`
}

export function routePath(route) {
  return normalizeRoute(route).split('?')[0]
}

export function routeToViewId(route) {
  const path = routePath(route)
  if (path.startsWith('/query/')) return VIEW_IDS.query
  return ROUTE_TO_VIEW[path] || VIEW_IDS.home
}

export function viewIdToRoute(viewId) {
  return VIEW_TO_ROUTE[viewId] || VIEW_TO_ROUTE[VIEW_IDS.home]
}

export function isKnownViewId(viewId) {
  return Object.values(VIEW_IDS).includes(viewId)
}
