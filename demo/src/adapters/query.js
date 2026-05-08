function toArray(value) {
  return Array.isArray(value) ? value : []
}

export function adaptQueryResults(payload = {}) {
  const items = payload.items || payload.records || payload.list || []
  return {
    total: payload.total ?? payload.count ?? toArray(items).length,
    page: payload.page ?? payload.current ?? 1,
    pageSize: payload.pageSize ?? payload.size ?? toArray(items).length,
    items: toArray(items),
  }
}
