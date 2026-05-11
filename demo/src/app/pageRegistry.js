export const PAGE_IDS = {
  home: 'home',
  chain: 'chain',
  chainDetail: 'chainDetail',
  space: 'space',
  query: 'query',
  queryDetail: 'queryDetail',
  ai: 'ai',
}

export const PAGE_DEFINITIONS = [
  {
    id: PAGE_IDS.home,
    name: 'home',
    path: '/home',
    viewId: 'homeView',
    label: '产业链全景',
    section: 'home',
  },
  {
    id: PAGE_IDS.chain,
    name: 'chain',
    path: '/chain',
    viewId: 'chainView',
    label: '产业链全景',
    section: 'chain',
  },
  {
    id: PAGE_IDS.chainDetail,
    name: 'chainDetail',
    path: '/chain/detail',
    match: (path) => path.startsWith('/chain/'),
    viewId: 'chainView',
    label: '产业链详情',
    section: 'chain',
  },
  {
    id: PAGE_IDS.space,
    name: 'space',
    path: '/space',
    viewId: 'spaceView',
    label: '空间态势',
    section: 'space',
  },
  {
    id: PAGE_IDS.query,
    name: 'query',
    path: '/query',
    viewId: 'queryView',
    label: '数据库查询',
    section: 'query',
  },
  {
    id: PAGE_IDS.queryDetail,
    name: 'queryDetail',
    path: '/query/:type',
    match: (path) => path.startsWith('/query/'),
    viewId: 'queryView',
    label: '数据库详情',
    section: 'query',
  },
  {
    id: PAGE_IDS.ai,
    name: 'ai',
    path: '/ai',
    viewId: 'aiView',
    label: 'AI分析',
    section: 'ai',
  },
]

export function normalizeRoute(route) {
  const value = String(route || '').trim()
  if (!value || value === '#') return '/'
  const withoutHash = value.startsWith('#') ? value.slice(1) : value
  return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`
}

export function routePath(route) {
  return normalizeRoute(route).split('?')[0]
}

export function findPageByRoute(route) {
  const path = routePath(route)
  return PAGE_DEFINITIONS.find((page) => page.path === path)
    || PAGE_DEFINITIONS.find((page) => page.match?.(path))
    || PAGE_DEFINITIONS[0]
}

export function findPageByViewId(viewId) {
  return PAGE_DEFINITIONS.find((page) => page.viewId === viewId) || PAGE_DEFINITIONS[0]
}

export function pageRoute(pageId) {
  return PAGE_DEFINITIONS.find((page) => page.id === pageId)?.path || PAGE_DEFINITIONS[0].path
}

export function pageViewId(pageId) {
  return PAGE_DEFINITIONS.find((page) => page.id === pageId)?.viewId || PAGE_DEFINITIONS[0].viewId
}

export function isKnownViewId(viewId) {
  return PAGE_DEFINITIONS.some((page) => page.viewId === viewId)
}
