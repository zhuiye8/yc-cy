import { viewIdToRoute } from './routes.js'

export const QUERY_TYPE_ROUTES = {
  org: '/query/org',
  talent: '/query/talent',
  patent: '/query/patent',
  journal: '/query/journal',
}

export function routeForLegacyTarget(target) {
  if (!target) return ''
  return viewIdToRoute(target)
}

export function routeForQueryType(queryType) {
  return QUERY_TYPE_ROUTES[queryType] || '/query'
}

export function hydrateLegacyRouteAttributes(root = document) {
  root.querySelectorAll('[data-target]').forEach((element) => {
    const route = routeForLegacyTarget(element.dataset.target)
    if (route) element.dataset.route = route
  })

  root.querySelectorAll('[data-query-type]').forEach((element) => {
    const route = routeForQueryType(element.dataset.queryType)
    if (route) element.dataset.route = route
  })
}
