import { api } from './http.js'

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

function getSpaceApiOptions() {
  return {
    baseUrl: import.meta.env.VITE_SPACE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '/api',
  }
}

export async function fetchLocationIndex() {
  return await api.get('/space/locations')
}

export async function fetchRegionGeo(code) {
  return await api.get(`/space/regions/${code}/geo`)
}

export async function fetchRegionIntel(code, category) {
  const suffix = category ? `?category=${encodeURIComponent(category)}` : ''
  return await api.get(`/space/regions/${code}/intel${suffix}`)
}

export async function fetchSpaceRegionSummary(params = {}) {
  return await api.get(`/space/regions/summary${buildQuery(params)}`, getSpaceApiOptions())
}

export async function fetchSpaceRegionDistribution(params = {}) {
  return await api.get(`/space/regions/distribution${buildQuery(params)}`, getSpaceApiOptions())
}

export async function fetchSpaceTalentList(params = {}) {
  return await api.get(`/space/regions/intel/talent${buildQuery(params)}`, getSpaceApiOptions())
}

export async function fetchSpaceEnterpriseList(params = {}) {
  return await api.get(`/space/regions/intel/enterprise${buildQuery(params)}`, getSpaceApiOptions())
}

export async function fetchSpacePaperList(params = {}) {
  return await api.get(`/space/regions/intel/paper${buildQuery(params)}`, getSpaceApiOptions())
}

export async function fetchSpacePatentList(params = {}) {
  return await api.get(`/space/regions/intel/patent${buildQuery(params)}`, getSpaceApiOptions())
}
