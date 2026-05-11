import {
  PAGE_DEFINITIONS,
  findPageByRoute,
  findPageByViewId,
  isKnownViewId,
  normalizeRoute,
  routePath,
} from '../app/pageRegistry.js'

export const VIEW_IDS = Object.freeze({
  home: 'homeView',
  chain: 'chainView',
  space: 'spaceView',
  query: 'queryView',
  ai: 'aiView',
})

export const ROUTE_TO_VIEW = Object.fromEntries(
  PAGE_DEFINITIONS
    .filter((page) => !page.path.includes(':'))
    .map((page) => [page.path, page.viewId]),
)

ROUTE_TO_VIEW['/'] = VIEW_IDS.home

export const VIEW_TO_ROUTE = PAGE_DEFINITIONS.reduce((map, page) => {
  if (!map[page.viewId] && !page.path.includes(':')) map[page.viewId] = page.path
  return map
}, {})

VIEW_TO_ROUTE[VIEW_IDS.home] = '/home'

export function routeToViewId(route) {
  return findPageByRoute(route).viewId
}

export function viewIdToRoute(viewId) {
  return findPageByViewId(viewId).path || VIEW_TO_ROUTE[VIEW_IDS.home]
}

export { isKnownViewId, normalizeRoute, routePath }
