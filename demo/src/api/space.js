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

async function tgGet(path) {
  const response = await tgFetchWithAuth(`/api${path}`)
  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) throw new Error(`Space API failed: HTTP ${response.status}`)
  if (
    payload
    && typeof payload === 'object'
    && 'code' in payload
    && payload.code !== 0
    && payload.code !== '0'
    && payload.code !== 200
    && payload.code !== '200'
  ) {
    throw new Error(payload.message || payload.msg || 'Space API failed')
  }

  if (payload && typeof payload === 'object' && 'data' in payload) return payload.data
  return payload
}

export async function fetchLocationIndex() {
  return await tgGet('/space/locations')
}

export async function fetchRegionGeo(code) {
  return await tgGet(`/space/regions/${code}/geo`)
}

export async function fetchRegionIntel(code, category) {
  const suffix = category ? `?category=${encodeURIComponent(category)}` : ''
  return await tgGet(`/space/regions/${code}/intel${suffix}`)
}

export async function fetchSpaceRegionSummary(params = {}) {
  return await tgGet(`/space/regions/summary${buildQuery(params)}`)
}

export async function fetchSpaceRegionDistribution(params = {}) {
  return await tgGet(`/space/regions/distribution${buildQuery(params)}`)
}

export async function fetchSpaceTalentList(params = {}) {
  return await tgGet(`/space/regions/intel/talent${buildQuery(params)}`)
}

export async function fetchSpaceEnterpriseList(params = {}) {
  return await tgGet(`/space/regions/intel/enterprise${buildQuery(params)}`)
}

export async function fetchSpacePaperList(params = {}) {
  return await tgGet(`/space/regions/intel/paper${buildQuery(params)}`)
}

export async function fetchSpacePatentList(params = {}) {
  return await tgGet(`/space/regions/intel/patent${buildQuery(params)}`)
}
