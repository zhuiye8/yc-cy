import { api } from './http.js'
import { adaptHomeOverview, adaptHomePartners } from '../adapters/home.js'

export async function fetchHomeOverview() {
  return adaptHomeOverview(await api.get('/home/overview'))
}

export async function fetchHomeNews() {
  return await api.get('/home/news')
}

export async function fetchHomePartners() {
  return adaptHomePartners(await api.get('/home/partners'))
}
