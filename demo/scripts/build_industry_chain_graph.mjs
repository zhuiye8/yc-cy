// Build industry-chain-graph.js from gics_local_site_v9/extensions/*/*_对外版.md
//
// 1 个 *_对外版.md = 1 个主产业球
//   - 主产业名 = markdown # 标题（去掉"产业链"后缀）
//   - 子树   = ## / ### / #### 嵌套层级
//   - 颜色   = 按 GICS Industry Group（前 4 位代码）大类分色
//   - 位置   = 在椭球面上做 Fibonacci spiral 分布
//
// 输出两个 export：
//   - industryChainGraphData[dataKey] = { upstream: { label, root: { id, name, children } } }
//   - sectorList = [{ dataKey, name, gicsCode, gicsName, colorHex, position: {x,y,z} }, ...]

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GICS = resolve(ROOT, '../../gics_local_site_v9/gics_local_site_v9')
const EXT_DIR = resolve(GICS, 'extensions')
const OUT = resolve(ROOT, 'src/platform/data/industry-chain-graph.js')

// 主产业分组：返回 { key, name, color }
// - 资本货物（20xx）按 6 位 GICS 行业代码再拆 3 子类
// - 其它走前 2 位
function classifyGicsGroup(gicsCode) {
  if (gicsCode.startsWith('201010')) return { key: 'aerospace',  name: '航空航天与国防', color: '#ffb066', shortName: '航天' }
  if (gicsCode.startsWith('201040')) return { key: 'electrical', name: '电气零部件与设备', color: '#ffd980', shortName: '电气' }
  if (gicsCode.startsWith('201060')) return { key: 'machinery',  name: '机械（工程 + 工业）', color: '#e89060', shortName: '机械' }
  const p2 = gicsCode.slice(0, 2)
  if (p2 === '15') return { key: 'materials', name: '材料',           color: '#b8aaff', shortName: '材料' }
  if (p2 === '25') return { key: 'auto',      name: '汽车与零部件',     color: '#ff9bd1', shortName: '汽车' }
  if (p2 === '35') return { key: 'health',    name: '医疗与制药',       color: '#86e4ff', shortName: '医药' }
  if (p2 === '45') return { key: 'tech',      name: '技术硬件 / 半导体', color: '#6bffcf', shortName: '技术' }
  return { key: 'other', name: '其它', color: '#86e4ff', shortName: '其它' }
}

// GICS 子行业（8 位） → 中文名（用于 sectorList 元数据，不直接显示）
const GICS_NAMES = {
  '15101050': '专用化学品',
  '20101010': '航空航天与国防',
  '20104010': '电气零部件与设备',
  '20106010': '工程机械与重型运输设备',
  '20106020': '工业机械、用品与零部件',
  '25101010': '汽车零部件与设备',
  '25102010': '汽车制造商',
  '35101010': '医疗保健设备',
  '35101020': '医疗保健用品',
  '35201010': '生物技术',
  '35202010': '制药',
  '45201020': '通信设备',
  '45202030': '技术硬件、存储与外设',
  '45203015': '电子元件',
  '45301010': '半导体材料与设备',
  '45301020': '半导体',
}

// ── markdown 解析 ─────────────────────────────────────────────────────────
// # 是根（产业链名），## ### #### ... 按层级嵌套
function parseChainMarkdown(text, idPrefix) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const lines = text.split(/\r?\n/)
  const root = { id: `${idPrefix}-r`, name: '', children: [] }
  const stack = []
  stack[1] = root
  let counter = 0

  for (const raw of lines) {
    const line = raw.trim()
    if (!line.startsWith('#')) continue
    const m = line.match(/^(#+)\s*(.+?)\s*$/)
    if (!m) continue
    const depth = m[1].length
    const name = m[2]
    if (depth === 1) {
      // 不同对外版的 H1 后缀有：产业链 / 产业链全景图 / 无后缀，统一去掉常见后缀
      root.name = name.replace(/(产业链全景图|产业链全景|产业链)$/, '').trim() || name
      continue
    }
    let parent = null
    for (let d = depth - 1; d >= 1; d--) {
      if (stack[d]) { parent = stack[d]; break }
    }
    if (!parent) parent = root
    counter++
    const node = { id: `${idPrefix}-${counter}`, name }
    parent.children = parent.children || []
    parent.children.push(node)
    stack[depth] = node
    for (let d = depth + 1; d < stack.length; d++) stack[d] = undefined
  }
  return root
}

// ── Fibonacci spiral on a ellipsoid surface ─────────────────────────────
// 50+ 球均匀散布；y 从 1 到 -1 扫描，theta 用 golden angle
function spreadOnEllipsoid(n, scale, center) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const positions = []
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2  // -1 to 1
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * golden
    const ux = r * Math.cos(theta)
    const uz = r * Math.sin(theta)
    positions.push({
      x: +(center.x + ux * scale.x).toFixed(3),
      y: +(center.y + y * scale.y).toFixed(3),
      z: +(center.z + uz * scale.z).toFixed(3),
    })
  }
  return positions
}

// ── 扫描 extensions ────────────────────────────────────────────────────
const sectorEntries = []
const gicsDirs = readdirSync(EXT_DIR).filter(d => /^\d{8}$/.test(d)).sort()
for (const gicsCode of gicsDirs) {
  const sub = resolve(EXT_DIR, gicsCode)
  const files = readdirSync(sub).filter(f => f.endsWith('_对外版.md')).sort()
  files.forEach((file, i) => {
    const chainName = file.replace(/_对外版\.md$/, '')
    const filePath = resolve(sub, file)
    const md = readFileSync(filePath, 'utf8')
    const idPrefix = `c_${gicsCode}_${i}`
    const parsedRoot = parseChainMarkdown(md, idPrefix)
    const displayName = parsedRoot.name || chainName

    const group = classifyGicsGroup(gicsCode)
    const gicsName = GICS_NAMES[gicsCode] || gicsCode

    sectorEntries.push({
      dataKey: idPrefix,
      groupKey: group.key,
      groupName: group.name,
      groupShort: group.shortName,
      colorHex: group.color,
      name: displayName,
      gicsCode,
      gicsName,
      tree: parsedRoot,
    })
  })
}

// ── 给所有主产业打位置（在椭球面 Fibonacci 分布）─────────────────────
const N = sectorEntries.length
const positions = spreadOnEllipsoid(
  N,
  { x: 8.4, y: 4.0, z: 4.2 },     // 椭球半径（x 比 yz 长，相机看横向更宽）
  { x: 0, y: 0.4, z: -1.6 },      // 椭球中心
)
sectorEntries.forEach((s, i) => { s.position = positions[i] })

// ── 构造 industryChainGraphData ────────────────────────────────────────
// 把链下的 ## 段平均分到上/中/下游三段（保留 BlueprintScene 现有视觉契约）
function splitInThirds(arr) {
  const n = arr.length
  if (!n) return [[], [], []]
  const a = Math.ceil(n / 3)
  const remain = n - a
  const b = Math.ceil(remain / 2)
  return [arr.slice(0, a), arr.slice(a, a + b), arr.slice(a + b)]
}
const graph = {}
for (const s of sectorEntries) {
  const sections = s.tree.children || []
  const [up, mid, down] = splitInThirds(sections)
  const segs = {}
  if (up.length) segs.upstream = {
    label: '上游',
    root: { id: `${s.dataKey}-up`, name: s.name, children: up },
  }
  if (mid.length) segs.midstream = {
    label: '中游',
    root: { id: `${s.dataKey}-mid`, name: s.name, children: mid },
  }
  if (down.length) segs.downstream = {
    label: '下游',
    root: { id: `${s.dataKey}-down`, name: s.name, children: down },
  }
  graph[s.dataKey] = segs
}

// ── 构造 sectorList（不带几何 tree，给 BlueprintScene 用作菜单+视觉配置）
const sectorList = sectorEntries.map(s => ({
  dataKey: s.dataKey,
  name: s.name,
  gicsCode: s.gicsCode,
  gicsName: s.gicsName,
  groupKey: s.groupKey,
  groupName: s.groupName,
  groupShort: s.groupShort,
  colorHex: s.colorHex,
  position: s.position,
}))

// ── 输出 ───────────────────────────────────────────────────────────────
function emit(value, indent = 0) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)
  if (Array.isArray(value)) {
    if (!value.length) return '[]'
    return '[\n' + value.map(v => pad1 + emit(v, indent + 1)).join(',\n') + '\n' + pad + ']'
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value)
    if (!keys.length) return '{}'
    return '{\n' + keys.map(k => `${pad1}${JSON.stringify(k)}: ${emit(value[k], indent + 1)}`).join(',\n') + '\n' + pad + '}'
  }
  if (typeof value === 'string') return JSON.stringify(value)
  return String(value)
}

const banner =
`/**
 * 产业链图谱数据 — 由 scripts/build_industry_chain_graph.mjs 从 GICS 数据集自动生成。
 *
 * 数据源：gics_local_site_v9/extensions/<gics>/<chain>_对外版.md
 * 一个对外版文件 = 一个主产业球，markdown # 是产业链名，## ### #### 是嵌套子节点。
 *
 * 不要手工编辑此文件，重新运行脚本即可刷新。
 */

export const industryChainGraphData = ${emit(graph, 0)}

export const sectorList = ${emit(sectorList, 0)}
`

writeFileSync(OUT, banner)
console.log('wrote', OUT, 'size:', readFileSync(OUT).length, 'bytes')
console.log('total sectors (chains):', sectorEntries.length)

// 按大类统计
const byGroup = {}
for (const s of sectorEntries) {
  const g = s.gicsCode.slice(0, 2)
  byGroup[g] = (byGroup[g] || 0) + 1
}
for (const g of Object.keys(byGroup).sort()) {
  console.log(`  ${g}xx: ${byGroup[g]} 球`)
}
