// Build industry-chain-graph.js from the GICS dataset.
//
// Input  : ../../../gics_local_site_v9/gics_local_site_v9/{data/registry/extensions.csv,extensions/<gics>/<chain>_对外版.md}
// Output : src/platform/data/industry-chain-graph.js
//
// Run    : node scripts/build_industry_chain_graph.mjs
//
// Tree shape per sector (consumed by BlueprintScene.vue):
//   industryChainGraphData[groupKey] = {
//     upstream:   { label, root: { id, name, children? } },
//     midstream?: { label, root: ... },
//     downstream?:{ label, root: ... },
//   }

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')                         // demo/
const GICS = resolve(ROOT, '../../gics_local_site_v9/gics_local_site_v9')
const REGISTRY = resolve(GICS, 'data/registry/extensions.csv')
const OUT = resolve(ROOT, 'src/platform/data/industry-chain-graph.js')

// ── Sector layout: GICS Industry Group (4-digit) → up/mid/down buckets of GICS sub-industries ──
// Each bucket lists the sub-industry codes (8-digit) that belong under that segment.
const SECTOR_LAYOUT = [
  {
    key: 'materials',
    name: '材料',
    code: '1510',
    segments: [
      { axis: 'upstream', label: '专用化学品', subs: ['15101050'] },
    ],
  },
  {
    key: 'capitalgoods',
    name: '资本货物',
    code: '2010',
    segments: [
      { axis: 'upstream',   label: '航空航天与国防',     subs: ['20101010'] },
      { axis: 'midstream',  label: '电气零部件与设备',   subs: ['20104010'] },
      { axis: 'downstream', label: '工程与工业机械',     subs: ['20106010', '20106020'] },
    ],
  },
  {
    key: 'auto',
    name: '汽车与零部件',
    code: '2510',
    segments: [
      { axis: 'upstream',  label: '汽车零部件与设备', subs: ['25101010'] },
      { axis: 'midstream', label: '汽车制造商',       subs: ['25102010'] },
    ],
  },
  {
    key: 'medequip',
    name: '医疗保健设备',
    code: '3510',
    segments: [
      { axis: 'upstream',  label: '医疗保健设备', subs: ['35101010'] },
      { axis: 'midstream', label: '医疗保健用品', subs: ['35101020'] },
    ],
  },
  {
    key: 'pharmabio',
    name: '制药与生物科技',
    code: '3520',
    segments: [
      { axis: 'upstream',  label: '生物技术', subs: ['35201010'] },
      { axis: 'midstream', label: '制药',     subs: ['35202010'] },
    ],
  },
  {
    key: 'techhw',
    name: '技术硬件与设备',
    code: '4520',
    segments: [
      { axis: 'upstream',   label: '通信设备',   subs: ['45201020'] },
      { axis: 'midstream',  label: '技术硬件',   subs: ['45202030'] },
      { axis: 'downstream', label: '电子元件',   subs: ['45203015'] },
    ],
  },
  {
    key: 'semis',
    name: '半导体',
    code: '4530',
    segments: [
      { axis: 'upstream',  label: '半导体材料与设备', subs: ['45301010'] },
      { axis: 'midstream', label: '半导体',           subs: ['45301020'] },
    ],
  },
]

// ── CSV parsing (RFC 4180-ish: handles quoted fields, commas inside quotes) ──
function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else { inQuotes = false }
      } else {
        field += c
      }
    } else {
      if (c === ',') { row.push(field); field = '' }
      else if (c === '\r') { /* skip */ }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c === '"' && field === '') { inQuotes = true }
      else { field += c }
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

// ── Markdown chain parser ──
// Reads a chain markdown and returns a tree of { id, name, children? } for the chain root and below.
// H1 is the root; H2/H3/H4/... are nested by level.
function parseChainMarkdown(text, idPrefix) {
  // Strip BOM
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const lines = text.split(/\r?\n/)
  const root = { id: `${idPrefix}-r`, name: '', children: [] }
  // Stack tracks open nodes by heading depth, index = depth (1=H1, 2=H2…)
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
      root.name = name.replace(/产业链$/, '').trim() || name
      continue
    }
    // find parent at depth-1, falling back upward
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
    // clear deeper levels
    for (let d = depth + 1; d < stack.length; d++) stack[d] = undefined
  }
  return root
}

// ── Main ──
const csvText = readFileSync(REGISTRY, 'utf8')
const rows = parseCSV(csvText)
const header = rows.shift()
const idx = Object.fromEntries(header.map((h, i) => [h.replace(/^﻿/, ''), i]))

const chainsBySub = {} // sub-industry code → [{name, file, sortOrder, ...}]
for (const r of rows) {
  if (!r.length || !r[idx.target_code]) continue
  if ((r[idx.status] || '').toLowerCase() !== 'active') continue
  const sub = String(r[idx.target_code])
  const entry = {
    extId: r[idx.ext_id],
    name: r[idx.display_name],
    filePath: r[idx.file_path_public],
    sortOrder: Number(r[idx.sort_order] || 0),
  }
  ;(chainsBySub[sub] ||= []).push(entry)
}
for (const sub of Object.keys(chainsBySub)) {
  chainsBySub[sub].sort((a, b) => a.sortOrder - b.sortOrder)
}

// Build per-sector tree
const out = {}
let chainIdCounter = 0

for (const sector of SECTOR_LAYOUT) {
  const sectorOut = {}
  for (const seg of sector.segments) {
    const segChains = []
    for (const sub of seg.subs) {
      const list = chainsBySub[sub] || []
      for (const entry of list) {
        chainIdCounter++
        const idPrefix = `${sector.key}-${chainIdCounter}`
        const mdPath = resolve(GICS, entry.filePath)
        let chainRoot
        try {
          const md = readFileSync(mdPath, 'utf8')
          chainRoot = parseChainMarkdown(md, idPrefix)
        } catch (e) {
          console.warn('SKIP missing chain:', mdPath, e.message)
          continue
        }
        // Use display_name from CSV as the chain root name
        chainRoot.name = entry.name
        chainRoot.id = idPrefix
        segChains.push(chainRoot)
      }
    }
    if (!segChains.length) continue
    const segRootId = `${sector.key}-${seg.axis}`
    sectorOut[seg.axis] = {
      label: ({ upstream: '上游', midstream: '中游', downstream: '下游' })[seg.axis],
      root: {
        id: segRootId,
        name: seg.label,
        children: segChains,
      },
    }
  }
  out[sector.key] = sectorOut
}

// ── Pretty-print to JS source ──
function emit(value, indent = 0) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)
  if (Array.isArray(value)) {
    if (!value.length) return '[]'
    return '[\n' + value.map((v) => pad1 + emit(v, indent + 1)).join(',\n') + '\n' + pad + ']'
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value)
    if (!keys.length) return '{}'
    return '{\n' + keys.map((k) => `${pad1}${k}: ${emit(value[k], indent + 1)}`).join(',\n') + '\n' + pad + '}'
  }
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  return String(value)
}

const banner =
`/**
 * 产业链图谱数据 — 由 scripts/build_industry_chain_graph.mjs 从 GICS 数据集自动生成。
 * 数据源：gics_local_site_v9/extensions/<gics>/<chain>_对外版.md
 * 不要手工编辑此文件，重新运行脚本即可刷新。
 *
 * 节点字段：{ id, name, children? }
 */

export const industryChainGraphData = ${emit(out, 0)}
`

writeFileSync(OUT, banner)
console.log('wrote', OUT, 'size:', readFileSync(OUT).length, 'bytes')

// Stats
let totalChains = 0
for (const sector of SECTOR_LAYOUT) {
  const sectorOut = out[sector.key] || {}
  let chains = 0
  for (const axis of ['upstream', 'midstream', 'downstream']) {
    chains += (sectorOut[axis]?.root?.children || []).length
  }
  totalChains += chains
  console.log(`  ${sector.code} ${sector.name.padEnd(8)} chains=${chains}`)
}
console.log('total chains:', totalChains)
