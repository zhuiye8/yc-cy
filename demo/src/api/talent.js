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

function normalizeTalentItem(item = {}) {
  return {
    id: item.ID || item.id,
    name: item.CNAME || item.name || '',
    organization: item.AORG || item.organization || '',
    title: item.TITLE || item.title || '',
    province: item.PROVINCE || item.province || '',
    city: item.CITY || item.city || '',
    direction: item.DIRECTION || item.direction || '',
    tags: item.TAGLARG || item.tags || [],
    hIndex: Number(item.H || item.h || 0),
    paperCount: Number(item.QIKAN || item.paperCount || 0),
    patentCount: Number(item.ZHUANLI || item.patentCount || 0),
    achievementCount: Number(item.CHENGGUO || item.achievementCount || 0),
    raw: item,
  }
}

function normalizePublicationItem(item = {}) {
  return {
    id: item.id || item.ID || item.NID || item.DOI || item.title,
    title: item.title || item.TITLE || item.CNAME || item.name || '',
    journal: item.journal || item.JOURNAL || item.SOURCE || '',
    publishYear: item.publishYear || item.YEAR || item.year || '',
    authors: item.authors || item.AUTHORS || [],
    doi: item.doi || item.DOI || '',
    raw: item,
  }
}

function normalizePatentItem(item = {}) {
  return {
    id: item.id || item.ID || item.patentNo || item.PATENTNO || item.title,
    title: item.title || item.TITLE || item.name || '',
    patentNo: item.patentNo || item.PATENTNO || item.APPLYNO || '',
    patentType: item.patentType || item.TYPE || '',
    status: item.status || item.STATUS || '',
    applyDate: item.applyDate || item.APPLYDATE || item.DATE || '',
    raw: item,
  }
}

async function tgJson(path) {
  const response = await tgFetchWithAuth(path)
  if (!response.ok) throw new Error(`Talent API failed: HTTP ${response.status}`)

  const payload = await response.json()
  if (payload?.code !== '0' && payload?.code !== 0) {
    throw new Error(payload?.message || 'Talent API failed')
  }
  return payload?.data || {}
}

export async function searchTalents(params = {}) {
  const page = params.page || 1
  const pageSize = params.pageSize || 5
  const data = await tgJson(`/api/talents/search${buildQuery({ ...params, page, pageSize })}`)
  const items = Array.isArray(data.items) ? data.items.map(normalizeTalentItem) : []
  return {
    total: Number(data.total || 0),
    page: Number(data.page || page),
    pageSize: Number(data.pageSize || pageSize),
    items,
  }
}

export async function fetchTalentPapers(params = {}) {
  const page = params.page || 1
  const pageSize = params.pageSize || 5
  const data = await tgJson(`/api/papers/list${buildQuery({ ...params, page, pageSize })}`)
  const items = Array.isArray(data.items) ? data.items.map(normalizePublicationItem) : []
  return {
    total: Number(data.total || 0),
    page: Number(data.page || page),
    pageSize: Number(data.pageSize || pageSize),
    items,
  }
}

export async function fetchTalentPatents(params = {}) {
  const page = params.page || 1
  const pageSize = params.pageSize || 5
  const data = await tgJson(`/api/patents/list${buildQuery({ ...params, page, pageSize })}`)
  const items = Array.isArray(data.items) ? data.items.map(normalizePatentItem) : []
  return {
    total: Number(data.total || 0),
    page: Number(data.page || page),
    pageSize: Number(data.pageSize || pageSize),
    items,
  }
}
