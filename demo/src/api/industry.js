import { api } from './http.js'
import { adaptIndustryGraph } from '../adapters/industry.js'

export async function fetchIndustryGraph(params = {}) {
  return adaptIndustryGraph(await api.post('/industry/graph', params))
}

export async function fetchIndustrySector(sector) {
  return await api.get(`/industry/sectors/${sector}`)
}
