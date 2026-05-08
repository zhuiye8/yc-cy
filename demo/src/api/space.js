import { api } from './http.js'

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
