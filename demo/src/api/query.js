import { api } from './http.js'
import { adaptQueryResults } from '../adapters/query.js'

export async function searchDatabase(params = {}) {
  return adaptQueryResults(await api.post('/query/search', params))
}

export async function fetchQueryFilters() {
  return await api.get('/query/filters')
}
