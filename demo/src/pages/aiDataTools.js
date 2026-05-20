import {
  fetchChainOrgCityDistribution,
  fetchChainOrgProvinceDistribution,
  searchChainOrgs,
} from '../api/chainOrg.js'
import { fetchTalentRegionAggregation } from '../api/stats.js'
import {
  fetchTalentPapers,
  fetchTalentPatents,
  searchTalents,
} from '../api/talent.js'

export const AI_DATA_SOURCES = [
  {
    id: 'S1',
    label: '产业链节点库',
    description: '可识别 50 条产业链及其父子节点关系，用于限定分析对象和链路范围。',
    available: true,
  },
  {
    id: 'S2',
    label: '企业检索接口',
    description: '可按产业链名称、地区筛选相关企业，返回企业列表、地区、标签、专利/论文/成果数量。',
    available: true,
  },
  {
    id: 'S3',
    label: '区域聚合接口',
    description: '可查询人才区域聚合、产业链企业省市分布，用于区域对比和空间态势证据。',
    available: true,
  },
  {
    id: 'S4',
    label: '人才与产出接口',
    description: '当前已发布接口可按关键词查询人才，并可基于人才 ID 查询论文、专利产出；暂无区域论文/专利全文检索。',
    available: true,
  },
]

export const AI_TOOL_REGISTRY = [
  {
    name: 'industry_chain_nodes',
    sourceId: 'S1',
    status: 'available',
    description: '本地 50 条产业链节点库。',
  },
  {
    name: 'chain_org_search',
    sourceId: 'S2',
    status: 'available',
    endpoint: 'GET /api/chain-orgs/search',
    description: '按产业链、地区和标签查询企业列表。',
  },
  {
    name: 'chain_org_region_distribution',
    sourceId: 'S3',
    status: 'available',
    endpoint: 'GET /api/chain-orgs/province-distribution | GET /api/chain-orgs/city-distribution',
    description: '按产业链查询企业省级/城市分布。',
  },
  {
    name: 'talent_region_aggregation',
    sourceId: 'S3',
    status: 'available',
    endpoint: 'GET /api/stats/region-aggregation',
    description: '按关键词、产业链关键词和地区查询人才区域聚合。',
  },
  {
    name: 'talent_search',
    sourceId: 'S4',
    status: 'available',
    endpoint: 'GET /api/talents/search',
    description: '按关键词和地区查询人才列表。',
  },
  {
    name: 'talent_publications_by_talent',
    sourceId: 'S4',
    status: 'limited',
    endpoint: 'GET /api/papers/list | GET /api/patents/list',
    description: '只能基于人才 ID 查询论文/专利产出，不是区域全文库检索。',
  },
]

const SOURCE_DESCRIPTIONS = Object.fromEntries(AI_DATA_SOURCES.map((source) => [source.id, source]))

const PROVINCE_SUFFIX = /(省|自治区|特别行政区)$/
const CITY_SUFFIX = /(市|地区|自治州|盟)$/
const COUNTY_SUFFIX = /(区|县|自治县|旗|市辖区)$/

function compactText(value) {
  return String(value || '').replace(/\s+/g, '')
}

function clip(value, length = 160) {
  const text = String(value || '').trim()
  return text.length > length ? `${text.slice(0, length)}...` : text
}

function readEntity(intent, key) {
  return intent?.entities?.[key] || ''
}

function extractField(text, labels = []) {
  const source = String(text || '')
  for (const label of labels) {
    const match = source.match(new RegExp(`${label}[：:]\\s*([^\\n]+)`))
    if (match?.[1]) return match[1].trim()
  }
  return ''
}

function normalizeRegionName(region) {
  const value = String(region || '').trim()
  if (!value || value === '全国' || value === '暂不限定') return ''
  return value
}

function resolveRegion(rawRegion) {
  const regionName = normalizeRegionName(rawRegion)
  if (!regionName) return { level: 'COUNTRY' }
  if (COUNTY_SUFFIX.test(regionName) && !PROVINCE_SUFFIX.test(regionName)) return { level: 'COUNTY', regionName }
  if (CITY_SUFFIX.test(regionName) && !PROVINCE_SUFFIX.test(regionName)) return { level: 'CITY', regionName }
  return { level: 'PROVINCE', regionName }
}

function locationParams(regionName) {
  if (!regionName) return {}
  if (PROVINCE_SUFFIX.test(regionName)) return { province: regionName.replace(PROVINCE_SUFFIX, '') }
  if (CITY_SUFFIX.test(regionName)) return { city: regionName }
  return { county: regionName }
}

function provinceName(regionName) {
  return String(regionName || '').replace(PROVINCE_SUFFIX, '')
}

function inferSearchKeyword(text, intent, industry, company) {
  const topic = readEntity(intent, 'topicRaw')
  const candidates = [
    industry?.name,
    company,
    topic,
    extractField(text, ['研究主题', '分析对象', '关键词', 'topic', 'keyword']),
  ].filter(Boolean)
  if (candidates.length) return candidates[0]

  const cleaned = String(text || '')
    .replace(/角色：.*\n?/g, '')
    .replace(/任务：.*\n?/g, '')
    .replace(/输出要求：[\s\S]*/g, '')
    .replace(/[，。；、：:\s]/g, '')
  return cleaned.slice(0, 16)
}

function regionFilterParams(region) {
  if (!region?.regionName) return {}
  if (region.level === 'PROVINCE') return { province: provinceName(region.regionName) }
  if (region.level === 'CITY') return { city: region.regionName.replace(CITY_SUFFIX, '') }
  return { province: provinceName(region.regionName) }
}

async function loadIndustryGraph() {
  const graph = await import('../platform/data/industry-chain-graph.js')
  return {
    sectorList: graph.sectorList || [],
    hierarchyDefs: graph.HIERARCHY_DEFS || [],
  }
}

function resolveIndustryFromText(text, intent, sectorList) {
  const candidates = [
    readEntity(intent, 'industryRaw'),
    extractField(text, ['产业链', '所属产业链', '目标产业链', 'industry']),
  ].filter(Boolean)

  const normalizedText = compactText([text, ...candidates].join(' '))
  const exact = sectorList.find((item) => candidates.some((candidate) => candidate === item.name))
  if (exact) return exact

  return sectorList.find((item) => normalizedText.includes(compactText(item.name))) || null
}

function summarizeIndustryNode(sector) {
  if (!sector) return null
  const children = Array.isArray(sector.children) ? sector.children : []
  return {
    sourceId: 'S1',
    chain: sector.name,
    group: sector.groupName || sector.groupKey || '',
    topNodeCount: children.length,
    topNodes: children.slice(0, 8).map((node) => node.name).filter(Boolean),
  }
}

function summarizeOrgResult(result) {
  if (!result) return null
  return {
    sourceId: 'S2',
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    items: (result.items || []).slice(0, 5).map((item) => ({
      name: item.name,
      region: [item.province, item.city, item.district].filter(Boolean).join(' / '),
      tags: (item.tags || item.keywords || []).slice(0, 4),
      patentCount: item.patentCount,
      paperCount: item.paperCount,
      achievementCount: item.achievementCount,
      abstract: clip(item.abstract, 100),
    })),
  }
}

function summarizeSpaceSummary(summary, distribution) {
  if (!summary && !distribution) return null
  return {
    sourceId: 'S3',
    summary,
    distribution: {
      level: distribution?.level,
      regionName: distribution?.regionName,
      items: (distribution?.items || []).slice(0, 8),
    },
  }
}

function summarizeDistributionResult(sourceId, result, label) {
  if (!result) return null
  return {
    sourceId,
    total: result.total,
    label,
    items: (result.items || []).slice(0, 8).map((item) => ({
      regionName: item.regionName,
      value: item.value,
    })),
  }
}

function summarizeTalentResult(result) {
  if (!result) return null
  return {
    sourceId: 'S4',
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    items: (result.items || []).slice(0, 5).map((item) => ({
      id: item.id,
      name: item.name,
      organization: item.organization,
      region: [item.province, item.city].filter(Boolean).join(' / '),
      direction: clip(item.direction, 120),
      tags: (item.tags || []).slice(0, 5),
      hIndex: item.hIndex,
      paperCount: item.paperCount,
      patentCount: item.patentCount,
      achievementCount: item.achievementCount,
    })),
  }
}

function summarizePublicationResult(sourceId, result, talent) {
  if (!result) return null
  return {
    sourceId,
    total: result.total,
    talent: talent ? {
      id: talent.id,
      name: talent.name,
      organization: talent.organization,
    } : null,
    items: (result.items || []).slice(0, 5).map((item) => ({
      title: item.title,
      subtitle: item.journal || item.patentNo || '',
      year: item.publishYear || '',
      date: item.applyDate || '',
      tags: [item.patentType, item.status, item.doi].filter(Boolean),
    })),
  }
}

function summarizeListResult(sourceId, result) {
  if (!result) return null
  const items = Array.isArray(result.items) ? result.items : []
  return {
    sourceId,
    total: result.total,
    items: items.slice(0, 5).map((item) => ({
      name: item.name || item.title || item.patentNo || item.journal || item.organization || '未命名线索',
      subtitle: item.subtitle || item.organization || item.province || item.city || item.applyDate || item.publishYear || '',
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 4) : [],
    })),
  }
}

async function callTool(name, sourceId, fn) {
  try {
    const data = await fn()
    return { name, sourceId, ok: true, data }
  } catch (error) {
    return { name, sourceId, ok: false, error: error?.message || '接口暂不可用' }
  }
}

export async function collectAiRetrieval({ question = '', intent = null, template = '' } = {}) {
  const { sectorList } = await loadIndustryGraph()
  const industry = resolveIndustryFromText(question, intent, sectorList)
  const company = readEntity(intent, 'companyRaw') || extractField(question, ['企业名称', '目标企业', '企业', 'company'])
  const rawRegion = readEntity(intent, 'regionRaw') || extractField(question, ['区域范围', '承接区域', '关注区域', '地区', '区域', 'region'])
  const region = resolveRegion(rawRegion)
  const searchText = String(question || '')
  const keyword = inferSearchKeyword(searchText, intent, industry, company)

  const tools = []
  const localIndustry = summarizeIndustryNode(industry)
  if (localIndustry) {
    tools.push({ name: 'industry_chain_nodes', sourceId: 'S1', ok: true, data: localIndustry })
  }

  if (industry?.name) {
    const orgParams = {
      chain: industry.name,
      tags: company || undefined,
      ...locationParams(region.regionName),
      page: 1,
      pageSize: 5,
    }
    tools.push(await callTool('chain_org_search', 'S2', async () => summarizeOrgResult(await searchChainOrgs(orgParams))))
  }

  const shouldUseSpace =
    ['chainGap', 'investmentList', 'companyDiligence'].includes(template)
    || /区域|地区|城市|省|市|区|县|空间|人才|论文|专利|企业/.test(searchText)

  if (shouldUseSpace && keyword) {
    const regionParams = {
      size: 8,
      keyword: industry?.name ? undefined : keyword,
      ckey: industry?.name || undefined,
      ...regionFilterParams(region),
    }
    tools.push(await callTool('talent_region_aggregation', 'S3', async () => (
      summarizeDistributionResult('S3', await fetchTalentRegionAggregation(regionParams), '人才区域聚合')
    )))
  }

  if (industry?.name) {
    const distributionParams = {
      chain: industry.name,
      tags: company || undefined,
    }
    const isProvinceDrill = region.level === 'PROVINCE' && region.regionName
    tools.push(await callTool('chain_org_region_distribution', 'S3', async () => {
      const result = isProvinceDrill
        ? await fetchChainOrgCityDistribution({ ...distributionParams, province: provinceName(region.regionName) })
        : await fetchChainOrgProvinceDistribution(distributionParams)
      return summarizeDistributionResult('S3', result, isProvinceDrill ? '产业链企业城市分布' : '产业链企业省份分布')
    }))
  }

  let talentResult = null
  const needsTalent =
    /人才|专家|团队|学者|论文|文献|期刊|综述|研究热点|专利|知识产权|权利要求|同族/.test(searchText)
    || ['literatureReview', 'companyDiligence'].includes(template)

  if (needsTalent && keyword) {
    const params = {
      keyword,
      ...regionFilterParams(region),
      page: 1,
      pageSize: 5,
    }
    const talentTool = await callTool('talent_search', 'S4', async () => {
      talentResult = await searchTalents(params)
      return summarizeTalentResult(talentResult)
    })
    tools.push(talentTool)
  }

  const firstTalent = talentResult?.items?.find((item) => item.id)
  if (/人才|专家|团队|学者/.test(searchText)) {
    // 人才列表已经由 talent_search 返回；保留此分支避免继续调用未部署的 SpaceTrend 明细接口。
  }
  if (/论文|文献|期刊|综述|研究热点/.test(searchText) && firstTalent?.id) {
    tools.push(await callTool('talent_paper_list_by_talent', 'S4', async () => (
      summarizePublicationResult('S4', await fetchTalentPapers({ id: firstTalent.id, page: 1, pageSize: 5 }), firstTalent)
    )))
  }
  if (/专利|知识产权|权利要求|侵权|同族/.test(searchText) && firstTalent?.id) {
    tools.push(await callTool('talent_patent_list_by_talent', 'S4', async () => (
      summarizePublicationResult('S4', await fetchTalentPatents({ id: firstTalent.id, page: 1, pageSize: 5 }), firstTalent)
    )))
  }

  const usedSourceIds = [...new Set(tools.map((tool) => tool.sourceId))]
  return {
    capabilities: AI_DATA_SOURCES,
    toolRegistry: AI_TOOL_REGISTRY,
    detected: {
      industry: industry?.name || '',
      company,
      region,
      keyword,
      template,
    },
    tools,
    sources: usedSourceIds.map((id) => SOURCE_DESCRIPTIONS[id]).filter(Boolean),
  }
}
