function toArray(value) {
  return Array.isArray(value) ? value : []
}

export function adaptIndustryGraph(payload = {}) {
  return {
    nodes: toArray(payload.nodes),
    links: toArray(payload.links || payload.edges),
    meta: payload.meta || {},
  }
}
