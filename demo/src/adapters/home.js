function toArray(value) {
  return Array.isArray(value) ? value : []
}

export function adaptHomeOverview(payload = {}) {
  return {
    title: payload.title || '',
    subtitle: payload.subtitle || '',
    stats: toArray(payload.stats).map((item) => ({
      label: item.label || item.name || '',
      value: item.value ?? item.count ?? '',
      unit: item.unit || '',
    })),
    feature: payload.feature || null,
  }
}

export function adaptHomePartners(payload = {}) {
  return toArray(payload.items || payload).map((item) => ({
    id: item.id || item.name || item.logo || '',
    name: item.name || '',
    logo: item.logo || item.logoUrl || '',
    tone: item.tone || 'light',
  }))
}
