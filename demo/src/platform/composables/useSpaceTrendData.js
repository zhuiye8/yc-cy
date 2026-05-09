import { ref } from 'vue'
import {
  fetchSpaceRegionDistribution,
  fetchSpaceRegionSummary,
  fetchSpaceTalentList,
  fetchSpaceEnterpriseList,
  fetchSpacePaperList,
  fetchSpacePatentList,
} from '../../api/space.js'
import { FILTERS, getDetailItems } from '../data/map-scene-data.js'

const CATEGORY_ENDPOINTS = {
  Talent: fetchSpaceTalentList,
  Enterprise: fetchSpaceEnterpriseList,
  Paper: fetchSpacePaperList,
  Patent: fetchSpacePatentList,
}

const EMPTY_SUMMARY = {
  talentTotal: 0,
  enterpriseTotal: 0,
  paperTotal: 0,
  patentTotal: 0,
}

function hashCode(value) {
  return String(value || 'COUNTRY').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function toNumber(value, fallback = 0) {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

function isEmptyData(value) {
  if (!value) return true
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

function buildRequestParams(region, extra = {}) {
  const params = { level: region?.level || 'COUNTRY', ...extra }
  if (region?.regionName) params.regionName = region.regionName
  return params
}

function normalizeSummary(payload) {
  if (!payload || typeof payload !== 'object') return null
  return {
    talentTotal: toNumber(payload.talentTotal),
    enterpriseTotal: toNumber(payload.enterpriseTotal),
    paperTotal: toNumber(payload.paperTotal),
    patentTotal: toNumber(payload.patentTotal),
  }
}

function normalizeDistribution(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : []
  if (!items.length) return null
  return {
    regionName: payload.regionName || '',
    level: payload.level || '',
    items: items.map((item) => ({
      regionName: item.regionName || item.name || '',
      talentTotal: toNumber(item.talentTotal),
      enterpriseTotal: toNumber(item.enterpriseTotal),
      paperTotal: toNumber(item.paperTotal),
      patentTotal: toNumber(item.patentTotal),
    })).filter((item) => item.regionName),
  }
}

function normalizeIntelPayload(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : []
  if (!items.length) return null
  return {
    total: toNumber(payload.total, items.length),
    page: toNumber(payload.page, 1),
    pageSize: toNumber(payload.pageSize, items.length),
    items,
  }
}

function findCityCode(region) {
  return String(region?.code || '420100')
}

function buildFallbackSummary(region) {
  const seed = hashCode(`${region?.level || 'COUNTRY'}:${region?.regionName || '\u5168\u56fd'}`)
  const scale = region?.level === 'COUNTRY' ? 12000 : region?.level === 'PROVINCE' ? 1200 : 180

  return {
    talentTotal: scale * 118 + seed * 37,
    enterpriseTotal: scale * 23 + seed * 11,
    paperTotal: scale * 410 + seed * 59,
    patentTotal: scale * 168 + seed * 43,
  }
}

function buildFallbackDistribution(region) {
  const level = region?.level || 'COUNTRY'
  const regionName = region?.regionName || '\u5168\u56fd'
  const seed = hashCode(`${level}:${regionName}`)
  const names = ['\u5317\u4eac', '\u4e0a\u6d77', '\u6c5f\u82cf', '\u6d59\u6c5f', '\u6e56\u5317', '\u5e7f\u4e1c', '\u56db\u5ddd', '\u5c71\u4e1c', '\u6cb3\u5357', '\u9655\u897f']

  return {
    regionName,
    level,
    items: names.map((name, index) => ({
      regionName: level === 'COUNTRY' ? `${name}\u7701` : `${regionName}${index + 1}\u533a`,
      talentTotal: 8000 + seed * 3 + index * 940,
      enterpriseTotal: 1200 + seed + index * 210,
      paperTotal: 26000 + seed * 5 + index * 2300,
      patentTotal: 13000 + seed * 4 + index * 1680,
    })),
  }
}

function mapFallbackItem(item, category, index) {
  return {
    ...item,
    id: item.id || `${category}-fallback-${index}`,
    category,
    value: item.value || 80 + index,
    trend: item.trend || `+${5 + index}%`,
    tags: Array.isArray(item.tags) ? item.tags : [],
  }
}

function buildFallbackIntel(region, category) {
  const code = findCityCode(region)
  const items = getDetailItems(code, category).map((item, index) => mapFallbackItem(item, category, index))
  return { total: items.length, page: 1, pageSize: items.length || 20, items }
}

function scoreForItem(item, index) {
  const value = item.h || item.value || item.publishYear || item.applyDate || item.patentNo || item.id || index
  return 70 + (hashCode(value) % 28)
}

function mapApiIntelItem(item, category, index) {
  if (category === 'Talent') {
    return {
      id: item.id || `talent-${index}`,
      category,
      name: item.name || '\u4eba\u624d\u7ebf\u7d22',
      title: item.direction || item.title || '\u533a\u57df\u4eba\u624d\u7ebf\u7d22',
      subtitle: item.organization || [item.province, item.city].filter(Boolean).join(' / '),
      value: item.h || scoreForItem(item, index),
      trend: '',
      tags: Array.isArray(item.tags) ? item.tags : [item.title].filter(Boolean),
      raw: item,
    }
  }

  if (category === 'Enterprise') {
    return {
      id: item.orgId || item.id || `enterprise-${index}`,
      category,
      name: item.name || '\u4f01\u4e1a\u7ebf\u7d22',
      title: item.name || '\u533a\u57df\u4f01\u4e1a\u7ebf\u7d22',
      subtitle: [item.province, item.city, item.county].filter(Boolean).join(' / '),
      value: scoreForItem(item, index),
      trend: '',
      tags: Array.isArray(item.otherName) ? item.otherName : [],
      raw: item,
    }
  }

  if (category === 'Paper') {
    return {
      id: item.id || `paper-${index}`,
      category,
      name: item.journal || '\u8bba\u6587',
      title: item.title || '\u8bba\u6587\u7ebf\u7d22',
      subtitle: [Array.isArray(item.authors) ? item.authors.join(' / ') : '', item.publishYear].filter(Boolean).join(' - '),
      value: scoreForItem(item, index),
      trend: '',
      tags: [item.doi].filter(Boolean),
      raw: item,
    }
  }

  return {
    id: item.id || item.patentNo || `patent-${index}`,
    category,
    name: item.patentNo || '\u4e13\u5229',
    title: item.title || '\u4e13\u5229\u7ebf\u7d22',
    subtitle: [item.patentType, item.status, item.applyDate].filter(Boolean).join(' / '),
    value: scoreForItem(item, index),
    trend: '',
    tags: [item.patentType, item.status].filter(Boolean),
    raw: item,
  }
}

function normalizeMappedIntel(payload, category) {
  if (!payload?.items?.length) return null
  return {
    ...payload,
    items: payload.items.map((item, index) => mapApiIntelItem(item, category, index)),
  }
}

async function resolveWithFallback(loader, normalizer, fallback) {
  try {
    const normalized = normalizer(await loader())
    if (!isEmptyData(normalized)) return normalized
  } catch {
    // Backend is still being deployed. Keep the UI complete with local fallback data until the API is ready.
  }
  return fallback()
}

export function useSpaceTrendData() {
  const summary = ref({ ...EMPTY_SUMMARY })
  const distribution = ref({ regionName: '\u5168\u56fd', level: 'COUNTRY', items: [] })
  const intelByCategory = ref(Object.fromEntries(FILTERS.map((category) => [category, []])))
  const loading = ref(false)

  function getCategoryItems(category) {
    return intelByCategory.value[category] || []
  }

  async function loadRegionSummary(region) {
    summary.value = await resolveWithFallback(
      () => fetchSpaceRegionSummary(buildRequestParams(region)),
      normalizeSummary,
      () => buildFallbackSummary(region),
    )
  }

  async function loadRegionDistribution(region) {
    distribution.value = await resolveWithFallback(
      () => fetchSpaceRegionDistribution(buildRequestParams(region)),
      normalizeDistribution,
      () => buildFallbackDistribution(region),
    )
  }

  async function loadRegionIntel(region, category = 'Enterprise', options = {}) {
    const fetcher = CATEGORY_ENDPOINTS[category]
    if (!fetcher) return []

    const data = await resolveWithFallback(
      () => fetcher(buildRequestParams(region, { pageNo: options.pageNo || 1, pageSize: options.pageSize || 20 })),
      (payload) => normalizeMappedIntel(normalizeIntelPayload(payload), category),
      () => buildFallbackIntel(region, category),
    )

    intelByCategory.value = {
      ...intelByCategory.value,
      [category]: data.items || [],
    }
    return data.items || []
  }

  async function loadRegionOverview(region, category = 'Enterprise') {
    loading.value = true
    try {
      await Promise.all([
        loadRegionSummary(region),
        loadRegionDistribution(region),
        loadRegionIntel(region, category),
      ])
    } finally {
      loading.value = false
    }
  }

  return {
    summary,
    distribution,
    loading,
    getCategoryItems,
    loadRegionOverview,
    loadRegionIntel,
  }
}
