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

function normalizeItem(item = {}) {
  return {
    id: item.ID || item.ORGID || item.doc_id || item.CREDITCODE || item.NAME,
    name: item.NAME || item.OTHERNAME?.[0] || '未命名企业',
    status: item.STATUS || '',
    province: item.PROV || item.SHENG || '',
    city: item.CITY || item.SHI || '',
    district: item.XIAN || '',
    address: item.ADDR || '',
    legalPerson: item.LEGALPERSON || '',
    companyType: item.COMPANYTYPE || '',
    year: item.YEAR || '',
    fund: item.FUND || item.REGISTRATION || '',
    keywords: item.matched_keywords || item.KEYWORD || [],
    tags: item.TAGS || item.TAGLARG || [],
    industries: item.INDUSTRY || item.TRADE || [],
    abstract: item.ABSTRACT || item.INTRO || '',
    patentCount: Number(item.ZHUANLI || 0),
    paperCount: Number(item.QIKAN || 0),
    achievementCount: Number(item.CHENGGUO || 0),
    raw: item,
  }
}

export async function searchChainOrgs(params = {}) {
  const page = params.page || 1
  const pageSize = params.pageSize || 20
  const response = await tgFetchWithAuth(`/api/chain-orgs/search${buildQuery({ ...params, page, pageSize })}`)

  if (!response.ok) throw new Error(`ChainOrg search failed: HTTP ${response.status}`)

  const payload = await response.json()
  if (payload?.code !== '0' && payload?.code !== 0) {
    throw new Error(payload?.message || 'ChainOrg search failed')
  }

  const data = payload?.data || {}
  const items = Array.isArray(data.items) ? data.items.map(normalizeItem) : []
  return {
    total: Number(data.total || 0),
    page: Number(data.page || page),
    pageSize: Number(data.pageSize || pageSize),
    items,
  }
}

function normalizeProvinceDistribution(payload = {}) {
  const items = Array.isArray(payload.items) ? payload.items : []
  return {
    total: Number(payload.total || 0),
    items: items.map((item) => ({
      regionName: item.province || item.regionName || item.name || '',
      value: Number(item.total || item.value || 0),
      raw: item,
    })).filter((item) => item.regionName),
  }
}

function normalizeCityDistribution(payload = {}) {
  const items = Array.isArray(payload.items) ? payload.items : []
  return {
    total: Number(payload.total || 0),
    items: items.map((item) => ({
      regionName: item.city || item.regionName || item.name || '',
      value: Number(item.total || item.value || 0),
      raw: item,
    })).filter((item) => item.regionName),
  }
}

async function tgJson(path) {
  const response = await tgFetchWithAuth(path)
  if (!response.ok) throw new Error(`ChainOrg API failed: HTTP ${response.status}`)

  const payload = await response.json()
  if (payload?.code !== '0' && payload?.code !== 0) {
    throw new Error(payload?.message || 'ChainOrg API failed')
  }
  return payload?.data || {}
}

export async function fetchChainOrgProvinceDistribution(params = {}) {
  const data = await tgJson(`/api/chain-orgs/province-distribution${buildQuery(params)}`)
  return normalizeProvinceDistribution(data)
}

export async function fetchChainOrgCityDistribution(params = {}) {
  const data = await tgJson(`/api/chain-orgs/city-distribution${buildQuery(params)}`)
  return normalizeCityDistribution(data)
}
