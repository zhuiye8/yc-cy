<script setup>
import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { generateAiAnalysis, recognizeAiIntent } from '../api/ai.js'
import { AI_DATA_SOURCES, collectAiRetrieval } from './aiDataTools.js'
import aiLogoUrl from '../../assets/extracted/ai_logo.png'

let aiView = null
let toastTimer = null
const disposers = []
let industryChainOptionsCache = null

const roleMeta = {
  government: {
    label: '政府决策',
    instruction: '面向政府产业决策，强调区域对比、产业短板、招商补链和落地建议。',
  },
  finance: {
    label: '金融尽调',
    instruction: '面向投资与授信判断，强调企业科技能力、专利质量、合作网络和风险提示。',
  },
  research: {
    label: '科研学者',
    instruction: '面向科研分析，强调研究主题、技术路线、文献脉络和可引用数据来源。',
  },
}

const templateMeta = {
  chainGap: {
    label: '产业链短板诊断',
    prompt: '围绕指定产业链在指定区域的优势、短板、关键节点、代表企业和招商补链方向给出分析。',
  },
  companyDiligence: {
    label: '企业科技能力尽调',
    prompt: '围绕目标企业或候选企业的科技能力、专利质量、合作机构和技术方向给出分析。',
  },
  literatureReview: {
    label: '文献综述框架',
    prompt: '围绕指定技术方向给出文献/专利综述的研究脉络、代表方法和热点趋势分析。',
  },
  investmentList: {
    label: '招商补链清单',
    prompt: '围绕指定产业链、指定承接区域，给出招商补链方向、目标企业类型、筛选标准和落地建议。',
  },
}

const regionOptions = [
  '全国',
  '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
  '辽宁省', '吉林省', '黑龙江省',
  '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省',
  '重庆市', '四川省', '贵州省', '云南省', '西藏自治区',
  '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区',
  '武汉市', '南充市', '成都市', '深圳市', '广州市', '上海市浦东新区',
  '暂不限定',
]

const outputFormatOptions = [
  '结论 + 依据 + 建议',
  '领导汇报要点',
  '表格清单',
  '短板/优势/机会三段式',
  '风险与机会清单',
  '可执行任务清单',
  'PPT大纲',
]

const templateWizardSchemas = {
  chainGap: [
    { name: 'industry', label: '产业链', type: 'select', source: 'industryChains', options: ['低空经济产业链', '机器人产业链', '新能源汽车产业链', '电子湿化学材料', '硫酸产业链'] },
    { name: 'region', label: '区域范围', type: 'select', options: regionOptions },
    { name: 'focus', label: '分析重点', type: 'select', options: ['短板、优势地区、招商补链方向', '关键节点和代表企业', '区域竞争力对比', '补链招商机会', '链主企业与配套能力', '政策/园区/科研资源匹配', '上中下游结构完整性'] },
    { name: 'format', label: '输出格式', type: 'select', options: outputFormatOptions },
    { name: 'extra', label: '补充要求', type: 'textarea', placeholder: '可补充：希望重点看哪些节点、是否需要企业清单、是否限定数据来源等' },
  ],
  companyDiligence: [
    { name: 'company', label: '企业名称', type: 'input', placeholder: '输入目标企业名称' },
    { name: 'industry', label: '所属产业链', type: 'select', source: 'industryChainsOptional', options: ['暂不限定', '机器人产业链', '低空经济产业链', '新能源汽车产业链', '电子湿化学材料'] },
    { name: 'region', label: '关注区域', type: 'select', options: regionOptions },
    { name: 'focus', label: '尽调重点', type: 'select', options: ['专利质量、成果、合作机构、技术方向', '技术先进性与产业链位置', '竞争对手对比', '投资风险提示', '供应链位置与客户结构', '科研合作和人才团队', '可投性/可招引性判断'] },
    { name: 'extra', label: '补充要求', type: 'textarea', placeholder: '可补充：目标企业别名、竞品、关注时间范围、尽调深度等' },
  ],
  literatureReview: [
    { name: 'topic', label: '研究主题', type: 'input', placeholder: '例如：机器视觉缺陷检测' },
    { name: 'scope', label: '检索范围', type: 'select', options: ['近五年中文与英文文献', '近三年高被引论文', '专利 + 论文综合', '只看中文核心/期刊', '只看英文论文', '代表性机构/作者', '产业化文献与标准'] },
    { name: 'focus', label: '综述重点', type: 'select', options: ['技术路线、关键方法、代表成果', '研究热点与趋势', '应用场景与产业化', '待突破问题', '方法对比', '数据集/评价指标', '专利布局'] },
    { name: 'format', label: '输出格式', type: 'select', options: ['综述框架', '章节大纲', '表格对比', '可引用观点清单', '研究问题清单', '技术路线图'] },
    { name: 'extra', label: '补充要求', type: 'textarea', placeholder: '可补充：是否需要引用格式、是否排除某类文献、目标篇幅等' },
  ],
  investmentList: [
    { name: 'industry', label: '产业链', type: 'select', source: 'industryChains', options: ['低空经济产业链', '机器人产业链', '新能源汽车产业链', '电子湿化学材料', '硫酸产业链'] },
    { name: 'region', label: '承接区域', type: 'select', options: regionOptions },
    { name: 'target', label: '招商目标', type: 'select', options: ['补齐关键短板', '引入链主企业', '强化配套企业', '导入研发平台', '补齐上游核心材料', '补齐中游制造能力', '拓展下游应用场景', '引入检测认证/标准服务'] },
    { name: 'format', label: '输出格式', type: 'select', options: ['候选方向 + 筛选标准 + 落地建议', '招商清单', '优先级排序', '风险提示', '目标企业画像', '一页纸汇报'] },
    { name: 'extra', label: '补充要求', type: 'textarea', placeholder: '可补充：是否要企业名单、承接园区条件、招商优先级等' },
  ],
}

const fallbackSources = AI_DATA_SOURCES

const aiDomainAllowPatterns = [
  /产业链|产业图谱|链主|补链|强链|短板|招商|园区|空间态势|区域|省|市|区|县|全国/,
  /企业|机构|公司|人才|专家|团队|学者|论文|文献|期刊|专利|知识产权|成果|技术|趋势|尽调/,
  /数据库|研究院数据库|数据来源|引用数据|提示词|分析工作台|导出对话|检索|查询|报告/,
  /机器人|低空|新能源|电池|材料|电子|湿化学|硫酸|工业视觉|视觉检测|智能制造|航天|航空/,
  /电气|机械|汽车|医药|生物|传感|半导体|雷达|装备|化工|科研|创新|政策|基金|标准/,
]

const aiDomainDenyPatterns = [
  /天气|菜谱|做饭|笑话|段子|诗|小说|情书|旅游|酒店|电影|音乐|游戏|算命|星座|彩票/,
  /股票|基金收益|汇率|翻译|写代码|编程|考试答案|代写|闲聊|健身|减肥|穿搭|购物/,
]

function isDomainRelatedQuestion(question) {
  const text = String(question || '').trim()
  if (!text) return false
  const allowed = aiDomainAllowPatterns.some((pattern) => pattern.test(text))
  const denied = aiDomainDenyPatterns.some((pattern) => pattern.test(text))
  return allowed && !denied
}

function domainGuardReply() {
  return {
    title: '这个问题暂不在当前分析范围内',
    resultTitle: '当前可支持的问题类型',
    summary: '当前 AI 分析仅围绕研究院数据库中的产业链、企业、机构、人才、论文、专利、区域空间态势和招商补链等内容提供分析，暂不处理与业务无关的问题。',
    bullets: [
      '可以尝试：分析某个产业链在全国或某个省市区的优势、短板和补链方向。',
      '可以尝试：查询某个产业链相关企业、人才、专利、论文或机构线索。',
      '可以尝试：生成招商补链建议、技术趋势研判、企业科技能力尽调或产业链短板诊断。',
    ],
    caveat: '请把问题限定在产业情报、空间态势或研究院数据库相关范围内。',
    hidePrompt: true,
    hideSources: true,
  }
}

function showToast(message) {
  let toast = document.querySelector('.ui-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'ui-toast'
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800)
}

function addListener(target, type, handler) {
  target?.addEventListener(type, handler)
  if (target) disposers.push(() => target.removeEventListener(type, handler))
}

function chatContainer() {
  return aiView?.querySelector('.ai-chat-real')
}

function composer() {
  return aiView?.querySelector('.ai-composer-real')
}

function activeRoleKey() {
  return aiView.querySelector('[data-ai-role].is-active')?.dataset.aiRole || 'government'
}

function activeTemplateKey() {
  return aiView.querySelector('[data-ai-template].is-active')?.dataset.aiTemplate || 'chainGap'
}

function activeRole() {
  return roleMeta[activeRoleKey()] || roleMeta.government
}

function activeTemplate() {
  return templateMeta[activeTemplateKey()] || templateMeta.chainGap
}

function setInput(value) {
  const input = aiView.querySelector('[data-ai-input]')
  if (!input) return
  input.value = value
  resizeComposerInput(input)
  input.focus()
}

function getInput() {
  return aiView.querySelector('[data-ai-input]')?.value.trim() || ''
}

function clearInput() {
  const input = aiView.querySelector('[data-ai-input]')
  if (input) input.value = ''
  resizeComposerInput(input)
}

function resizeComposerInput(input = aiView?.querySelector('[data-ai-input]')) {
  if (!input || input.tagName !== 'TEXTAREA') return
  input.style.height = 'auto'
  input.style.height = `${Math.min(input.scrollHeight, 180)}px`
}

function enhancedPrompt(question, intent = null) {
  const roleInfo = activeRole()
  const templateInfo = activeTemplate()
  const entities = intent?.entities || {}

  return [
    `角色：${roleInfo.label}`,
    `任务：${templateInfo.label}`,
    `原始问题：${question}`,
    entities.industryRaw ? `识别产业链：${entities.industryRaw}` : '',
    entities.regionRaw ? `识别区域：${entities.regionRaw}` : '',
    entities.companyRaw ? `识别企业：${entities.companyRaw}` : '',
  ].filter(Boolean).join('\n')
}

function createSourceTags(sources = fallbackSources) {
  const sourceWrap = document.createElement('div')
  sourceWrap.className = 'ai-source-inline'
  const caption = document.createElement('strong')
  caption.textContent = '\u5f15\u7528\u6570\u636e'
  sourceWrap.appendChild(caption)
  const items = Array.isArray(sources) && sources.length ? sources : fallbackSources
  items.forEach((source, index) => {
    const span = document.createElement('span')
    const label = source?.label || source?.name || '数据来源'
    span.textContent = `[${index + 1}] ${label}`
    if (source?.description) span.title = source.description
    sourceWrap.appendChild(span)
  })
  return sourceWrap
}

function normalizeCitationText(text) {
  let s = String(text || '')

  // 1) 括号内 "来源" / "source" 引导词去掉，只保留 S 编号待下一阶段处理
  s = s.replace(/([\[（(])\s*(?:来源|source)\b\s*/gi, '$1')

  // 2) 括号包裹的单个或多个 S 编号 → [N] 或 [N1][N2]
  s = s.replace(/[\[（(]\s*((?:[Ss]\s*\d+\s*[,，、\s]*)+)\s*[\])）]/g, (_, group) => (
    (group.match(/\d+/g) || []).map((n) => `[${n}]`).join('')
  ))

  // 3) 裸文本 "来源S1" / "source S1"
  s = s.replace(/(?:来源|source)\b\s*[Ss]\s*(\d+)/gi, '[$1]')

  // 4) 孤立的 "S1"（前后是非字母数字边界）
  s = s.replace(/(^|[^A-Za-z0-9\[（(])[Ss](\d+)(?=$|[^A-Za-z0-9])/g, '$1[$2]')

  return s
}

function insertBeforeComposer(node) {
  chatContainer()?.insertBefore(node, composer())
}

function appendAssistantResultShell() {
  const article = document.createElement('article')
  article.className = 'ai-answer ai-answer-result'
  insertBeforeComposer(article)
  return article
}

function scrollToArticle(article) {
  article.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

function appendUserMessage(question) {
  const article = document.createElement('article')
  article.className = 'ai-user-msg'

  const p = document.createElement('p')
  p.textContent = question

  const time = document.createElement('time')
  time.textContent = '刚刚'

  const mark = document.createElement('span')
  article.append(p, time, mark)
  insertBeforeComposer(article)
}

function appendAssistantLoading() {
  const article = document.createElement('article')
  article.className = 'ai-answer ai-answer-result is-loading'

  const logo = document.createElement('img')
  logo.src = aiLogoUrl
  logo.alt = 'AI'

  const body = document.createElement('div')
  const title = document.createElement('h2')
  title.textContent = '正在整理分析任务'
  const text = document.createElement('p')
  text.textContent = '正在从研究院数据库中筛选相关证据，并生成带引用依据的分析结论。'

  const loading = document.createElement('div')
  loading.className = 'ai-loading-flow'
  const orbit = document.createElement('div')
  orbit.className = 'ai-loading-orbit'
  const steps = document.createElement('div')
  steps.className = 'ai-loading-steps'
  ;['识别分析意图', '检索研究院数据库', '生成引用结论'].forEach((label, index) => {
    const step = document.createElement('span')
    step.style.setProperty('--i', index)
    step.textContent = label
    steps.appendChild(step)
  })
  loading.append(orbit, steps)

  body.append(title, text, loading)
  article.append(logo, body)
  insertBeforeComposer(article)
  scrollToArticle(article)
  return article
}

function buildFallbackBullets(intent = null) {
  const entities = intent?.entities || {}
  const industry = entities.industryRaw || '目标产业链'
  const region = entities.regionRaw || '目标区域'
  return [
    `分析对象初步识别为"${industry}"，可从产业链节点、企业分布、专利主题三条线索切入。`,
    `区域维度建议把"${region}"放在全国、省、市、区县的多层聚合下对比，避免单一指标判断。`,
    '提供更具体的产业链节点或企业关键词，可显著提升分析颗粒度。',
  ]
}

function sparseRetrievalReply(intent = null) {
  const entities = intent?.entities || {}
  const hints = []
  if (!entities.industryRaw) hints.push('补充具体的产业链名称，例如"低空经济产业链"、"半导体材料"。')
  if (!entities.regionRaw) hints.push('补充关注的地区，例如"全国"、"湖北省"、"武汉市"。')
  if (!entities.topicRaw && !entities.companyRaw) hints.push('补充研究主题或企业名称，例如"机器视觉缺陷检测"、"宁德时代"。')
  return {
    title: '请补充更多分析对象',
    summary: '当前问题里没有匹配到可用的检索线索，无法启动产业链、企业或人才数据查询。补充以下任一信息后重新提问，系统会基于研究院数据库给出带依据的分析。',
    bullets: hints.length ? hints : [
      '补充具体的产业链名称。',
      '补充关注的地区。',
      '补充研究主题或企业名称。',
    ],
    caveat: '补全后再发送，结果会优先引用真实检索数据。',
    hideSources: true,
    hidePrompt: true,
  }
}

function describeRetrievalTool(tool) {
  if (!tool) return ''
  if (!tool.ok) return ''

  const data = tool.data || {}
  if (tool.name === 'industry_chain_nodes') {
    return `研究院数据库 · 产业链图谱：已匹配“${data.chain || '目标产业链'}”，纳入 ${data.topNodeCount || 0} 个一级节点作为分析范围。`
  }
  if (tool.name === 'space_region_overview') {
    const count = data.distribution?.items?.length || 0
    return `研究院数据库 · 空间态势：已纳入 ${count} 个区域分布样本。`
  }
  if (tool.name === 'talent_region_aggregation' || tool.name === 'chain_org_region_distribution') {
    const count = Array.isArray(data.items) ? data.items.length : 0
    return `研究院数据库 · ${data.label || '区域分布'}：覆盖 ${formatDataCount(data.total)} 条记录，提取 ${count} 个重点区域用于对比。`
  }
  if (tool.name === 'talent_paper_list_by_talent' || tool.name === 'talent_patent_list_by_talent') {
    const count = Array.isArray(data.items) ? data.items.length : 0
    if (!count) return ''
    const talent = data.talent?.name ? `，基于人才 ${data.talent.name}` : ''
    const type = tool.name.includes('paper') ? '论文产出' : '专利产出'
    return `研究院数据库 · ${type}：已引用 ${count} 条可核验记录${talent}。`
  }
  if (typeof data.total === 'number') {
    const count = Array.isArray(data.items) ? data.items.length : 0
    const label = tool.name === 'chain_org_search'
      ? '企业库'
      : tool.name === 'talent_search'
        ? '人才库'
        : '检索结果'
    return `研究院数据库 · ${label}：覆盖 ${formatDataCount(data.total)} 条记录，抽取 ${count} 条代表性样本作为证据。`
  }
  return '研究院数据库：已返回可引用数据。'
}

function formatDataCount(value) {
  const num = Number(value || 0)
  if (!Number.isFinite(num) || num <= 0) return '0'
  if (num >= 100000000) return `${(num / 100000000).toFixed(num >= 1000000000 ? 1 : 2)}亿`
  if (num >= 10000) return `${(num / 10000).toFixed(num >= 100000 ? 1 : 2)}万`
  return String(Math.round(num))
}

function createRetrievalPanel(retrieval = null) {
  const tools = Array.isArray(retrieval?.tools) ? retrieval.tools : []
  if (!tools.length) return null

  const panel = document.createElement('section')
  panel.className = 'ai-retrieval-panel'
  panel.dataset.aiRetrieval = 'true'

  const title = document.createElement('h3')
  title.textContent = '引用数据'

  const meta = document.createElement('p')
  const detected = retrieval.detected || {}
  const parts = [
    detected.industry ? `产业链：${detected.industry}` : '',
    detected.company ? `企业：${detected.company}` : '',
    detected.region?.regionName ? `区域：${detected.region.regionName}` : '区域：全国',
    detected.keyword ? `检索词：${detected.keyword}` : '',
  ].filter(Boolean)
  meta.textContent = parts.length
    ? `本次回答基于研究院数据库检索结果，${parts.join(' / ')}`
    : '本次回答基于研究院数据库检索结果，并按问题自动筛选相关证据。'

  const list = document.createElement('ul')
  tools.forEach((tool) => {
    const description = describeRetrievalTool(tool)
    if (!description) return
    const item = document.createElement('li')
    item.className = tool.ok ? 'is-ok' : 'is-fail'
    item.textContent = description
    list.appendChild(item)
  })
  if (!list.children.length) return null

  panel.append(title, meta, list)
  return panel
}

function renderAssistantResult(article, data, prompt, intent, isFallback = false, retrieval = null) {
  article.classList.remove('is-loading')
  article.textContent = ''

  const logo = document.createElement('img')
  logo.src = aiLogoUrl
  logo.alt = 'AI'

  const body = document.createElement('div')
  const title = document.createElement('h2')
  title.textContent = data?.title || '分析结果'

  const resultTitle = document.createElement('h2')
  resultTitle.textContent = isFallback ? '本地兜底分析结果' : '分析结果'

  if (data?.resultTitle) resultTitle.textContent = data.resultTitle

  const summary = document.createElement('p')
  summary.textContent = normalizeCitationText(data?.summary || '')

  const list = document.createElement('ol')
  const bullets = Array.isArray(data?.bullets) && data.bullets.length ? data.bullets : buildFallbackBullets(intent)
  bullets.forEach((text) => {
    const item = document.createElement('li')
    item.textContent = normalizeCitationText(text)
    list.appendChild(item)
  })

  body.append(title, resultTitle, summary, list)
  if (data?.caveat) {
    const caveat = document.createElement('p')
    caveat.textContent = normalizeCitationText(data.caveat)
    body.appendChild(caveat)
  }
  const retrievalPanel = createRetrievalPanel(retrieval)
  if (retrievalPanel) body.appendChild(retrievalPanel)
  if (!data?.hideSources) body.appendChild(createSourceTags(data?.sources))
  article.append(logo, body)
  scrollToArticle(article)
}

function composeGuidedPrompt(templateKey, values) {
  const templateInfo = templateMeta[templateKey] || activeTemplate()
  const schema = templateWizardSchemas[templateKey] || []
  const labelByName = new Map(schema.map((field) => [field.name, field.label]))
  const fieldText = Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => `${labelByName.get(key) || key}：${value}`)
    .join('\n')

  return [
    templateInfo.prompt,
    fieldText ? `\n关键条件：\n${fieldText}` : '',
  ].filter(Boolean).join('\n')
}

function createWizardControl(field) {
  const label = document.createElement('label')
  label.className = 'ai-template-field'

  const text = document.createElement('span')
  text.textContent = field.label

  let control
  if (field.type === 'select') {
    control = document.createElement('select')
    if (field.source) control.dataset.templateSource = field.source
    field.options.forEach((option) => {
      const item = document.createElement('option')
      item.value = option
      item.textContent = option
      control.appendChild(item)
    })
  } else if (field.type === 'textarea') {
    control = document.createElement('textarea')
    control.rows = 2
    control.placeholder = field.placeholder || `请输入${field.label}`
  } else {
    control = document.createElement('input')
    control.type = 'text'
    control.placeholder = field.placeholder || `请输入${field.label}`
  }
  control.dataset.templateField = field.name

  label.append(text, control)
  return label
}

async function loadIndustryChainOptions() {
  if (industryChainOptionsCache) return industryChainOptionsCache
  try {
    const { sectorList = [] } = await import('../platform/data/industry-chain-graph.js')
    industryChainOptionsCache = [...new Set(sectorList.map((item) => item?.name).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    return industryChainOptionsCache
  } catch (error) {
    console.warn('[AI] Failed to load industry chain options.', error)
    industryChainOptionsCache = []
    return industryChainOptionsCache
  }
}

async function hydrateWizardOptions(article) {
  const controls = Array.from(article.querySelectorAll('select[data-template-source]'))
  if (!controls.length) return

  const industryOptions = await loadIndustryChainOptions()
  if (!industryOptions.length) return

  controls.forEach((control) => {
    const currentValue = control.value
    const includeUnspecified = control.dataset.templateSource === 'industryChainsOptional'
    control.textContent = ''
    const options = includeUnspecified ? ['暂不限定', ...industryOptions] : industryOptions
    options.forEach((option) => {
      const item = document.createElement('option')
      item.value = option
      item.textContent = option
      control.appendChild(item)
    })
    if (options.includes(currentValue)) control.value = currentValue
  })
}

function readWizardValues(article) {
  const values = {}
  article.querySelectorAll('[data-template-field]').forEach((control) => {
    values[control.dataset.templateField] = control.value.trim()
  })
  return values
}

function appendTemplateHint(templateInfo, templateKey = activeTemplateKey()) {
  const article = document.createElement('article')
  article.className = 'ai-answer ai-template-hint ai-template-wizard'

  const logo = document.createElement('img')
  logo.src = aiLogoUrl
  logo.alt = 'AI'

  const body = document.createElement('div')
  const title = document.createElement('h2')
  title.textContent = `已选择模板：${templateInfo.label}`

  const text = document.createElement('p')
  text.textContent = '先补全关键条件，系统再生成更规范的提示词。必要字段不确定时可以保留默认值，模型会优先追问缺失对象。'

  const fields = document.createElement('div')
  fields.className = 'ai-template-fields'
  const schema = templateWizardSchemas[templateKey] || templateWizardSchemas.chainGap
  schema.forEach((field) => fields.appendChild(createWizardControl(field)))

  const actions = document.createElement('div')
  actions.className = 'ai-template-actions'
  const fillButton = document.createElement('button')
  fillButton.type = 'button'
  fillButton.textContent = '生成提示词'
  const runButton = document.createElement('button')
  runButton.type = 'button'
  runButton.className = 'is-primary'
  runButton.textContent = '直接分析'
  actions.append(fillButton, runButton)

  body.append(title, text, fields, actions)
  article.append(logo, body)
  insertBeforeComposer(article)

  addListener(fillButton, 'click', () => {
    setInput(composeGuidedPrompt(templateKey, readWizardValues(article)))
    showToast('已根据表单生成提示词')
  })

  addListener(runButton, 'click', () => {
    submitPrompt(composeGuidedPrompt(templateKey, readWizardValues(article)))
  })

  hydrateWizardOptions(article)
  scrollToArticle(article)
}

function formatTimestamp(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0')
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    '-',
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('')
}

function cleanText(text) {
  return String(text || '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function extractAnswerMarkdown(article) {
  const div = article.querySelector(':scope > div')
  if (!div) return cleanText(article.textContent)

  const out = []
  Array.from(div.children).forEach((child) => {
    const tag = child.tagName
    const text = cleanText(child.textContent || '')
    if (!text) return

    if (tag === 'H2') {
      out.push(`### ${text}`, '')
    } else if (tag === 'P') {
      out.push(text, '')
    } else if (tag === 'OL') {
      Array.from(child.querySelectorAll(':scope > li')).forEach((li, i) => {
        out.push(`${i + 1}. ${cleanText(li.textContent)}`)
      })
      out.push('')
    } else if (tag === 'SECTION' && child.classList.contains('ai-retrieval-panel')) {
      const items = Array.from(child.querySelectorAll('li')).map((li) => cleanText(li.textContent))
      if (items.length) {
        out.push('**引用数据**')
        items.forEach((item) => out.push(`- ${item}`))
        out.push('')
      }
    } else if (tag === 'DIV' && child.classList.contains('ai-source-inline')) {
      const tags = Array.from(child.querySelectorAll('span')).map((s) => cleanText(s.textContent))
      if (tags.length) {
        out.push('**数据来源**')
        tags.forEach((t) => out.push(`- ${t}`))
        out.push('')
      }
    }
  })
  return out.join('\n').trim()
}

function collectConversationMarkdown() {
  const lines = [
    '# AI 分析对话导出',
    '',
    `- 导出时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`,
    `- 当前角色：${activeRole().label}`,
    `- 当前模板：${activeTemplate().label}`,
    `- 页面地址：${window.location.href}`,
    '',
  ]

  const messages = Array.from(aiView.querySelectorAll('.ai-user-msg, .ai-answer-result'))
  if (!messages.length) {
    lines.push('> 当前还没有新的对话消息。')
    return lines.join('\n')
  }

  messages.forEach((message, index) => {
    const isUser = message.classList.contains('ai-user-msg')
    const role = isUser ? '用户' : 'AI'
    lines.push(`## ${index + 1}. ${role}`)
    lines.push('')
    if (isUser) {
      const p = cleanText(message.querySelector('p')?.textContent || '')
      lines.push(p || '(空)')
    } else {
      lines.push(extractAnswerMarkdown(message) || '(空)')
    }
    lines.push('')
  })

  return lines.join('\n')
}

function exportConversation() {
  const markdown = collectConversationMarkdown()
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `ai-conversation-${formatTimestamp()}.md`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.URL.revokeObjectURL(url)
  showToast('已导出当前对话')
}

async function submitPrompt(questionOverride = '') {
  const question = typeof questionOverride === 'string' && questionOverride.trim()
    ? questionOverride.trim()
    : getInput()
  if (!question) {
    showToast('请先输入问题')
    return
  }

  appendUserMessage(question)
  clearInput()

  if (!isDomainRelatedQuestion(question)) {
    renderAssistantResult(appendAssistantResultShell(), domainGuardReply(), '', null, false, null)
    return
  }

  const loadingArticle = appendAssistantLoading()

  let intent = null
  let retrieval = null
  try {
    intent = await recognizeAiIntent({
      message: question,
      role: activeRoleKey(),
      template: activeTemplateKey(),
    })

    const prompt = enhancedPrompt(question, intent)
    retrieval = await collectAiRetrieval({
      question: prompt,
      intent,
      template: activeTemplateKey(),
    })

    const usefulTools = (retrieval?.tools || []).filter((tool) => tool.ok && tool.data)
    if (!usefulTools.length) {
      renderAssistantResult(loadingArticle, sparseRetrievalReply(intent), '', intent, false, retrieval)
      return
    }

    const data = await generateAiAnalysis({
      question,
      prompt,
      role: activeRoleKey(),
      template: activeTemplateKey(),
      intent,
      retrieval,
    })
    renderAssistantResult(loadingArticle, data, prompt, intent, false, retrieval)
  } catch (error) {
    const prompt = enhancedPrompt(question, intent)
    renderAssistantResult(loadingArticle, {
      title: '分析任务',
      summary: '真实模型暂时不可用，已基于已识别要点给出框架性分析。',
      bullets: buildFallbackBullets(intent),
      sources: fallbackSources,
      caveat: '稍后重试可获得更完整的分析结果。',
      hidePrompt: true,
    }, prompt, intent, true, retrieval)
    console.warn('[AI] DeepSeek request failed, fallback rendered.', error)
  }
}

function bindAiEvents() {
  aiView.querySelectorAll('[data-ai-role]').forEach((button) => {
    addListener(button, 'click', () => {
      aiView.querySelectorAll('[data-ai-role]').forEach((item) => item.classList.toggle('is-active', item === button))
      showToast(`已切换为${roleMeta[button.dataset.aiRole]?.label || '分析'}角色`)
    })
  })

  aiView.querySelectorAll('[data-ai-template]').forEach((button) => {
    addListener(button, 'click', () => {
      aiView.querySelectorAll('[data-ai-template]').forEach((item) => item.classList.toggle('is-active', item === button))
      const templateKey = button.dataset.aiTemplate || 'chainGap'
      const templateInfo = templateMeta[templateKey] || templateMeta.chainGap
      appendTemplateHint(templateInfo, templateKey)
    })
  })

  aiView.querySelectorAll('[data-ai-example]').forEach((button) => {
    addListener(button, 'click', () => setInput(button.dataset.aiExample || button.textContent.trim()))
  })

  aiView.querySelectorAll('[data-ai-action]').forEach((button) => {
    addListener(button, 'click', () => {
      const action = button.dataset.aiAction
      if (action === 'enhance') {
        const value = getInput() || activeTemplate().prompt
        setInput(enhancedPrompt(value))
      } else if (action === 'sources') {
        showToast('已固定展示数据来源标记')
      } else {
        showToast('将按结论、依据、建议的报告结构输出')
      }
    })
  })

  addListener(aiView.querySelector('[data-ai-input]'), 'input', (event) => resizeComposerInput(event.target))

  addListener(aiView.querySelector('.ai-new-real'), 'click', () => {
    aiView.querySelectorAll('.ai-user-msg, .ai-answer-result, .ai-template-hint').forEach((item) => item.remove())
    clearInput()
    showToast('已新建分析')
  })

  addListener(aiView.querySelector('.ai-export-real'), 'click', exportConversation)
  addListener(aiView.querySelector('.ai-send-real'), 'click', () => submitPrompt())
  addListener(aiView.querySelector('[data-ai-input]'), 'keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitPrompt()
    }
  })
}

onMounted(async () => {
  await nextTick()
  aiView = document.getElementById('aiView')
  if (!aiView) return
  bindAiEvents()
})

onBeforeUnmount(() => {
  disposers.splice(0).forEach((dispose) => dispose())
  clearTimeout(toastTimer)
})
</script>

<template>
  <span hidden data-ai-page-controller />
</template>
