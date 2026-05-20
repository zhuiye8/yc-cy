import { tgFetchWithAuth } from './tgAuth.js'

function buildQuery(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })
  const text = query.toString()
  return text ? `?${text}` : ''
}

function normalizeRegionAggregation(payload = {}) {
  const items = Array.isArray(payload.items) ? payload.items : []
  return {
    total: Number(payload.total || 0),
    items: items.map((item) => ({
      regionName: item.name || item.regionName || item.province || item.city || '',
      value: Number(item.value || item.total || 0),
      raw: item,
    })).filter((item) => item.regionName),
  }
}

export async function fetchTalentRegionAggregation(params = {}) {
  const response = await tgFetchWithAuth(`/api/stats/region-aggregation${buildQuery(params)}`)
  if (!response.ok) throw new Error(`Region aggregation failed: HTTP ${response.status}`)

  const payload = await response.json()
  if (payload?.code !== '0' && payload?.code !== 0) {
    throw new Error(payload?.message || 'Region aggregation failed')
  }
  return normalizeRegionAggregation(payload?.data || {})
}
