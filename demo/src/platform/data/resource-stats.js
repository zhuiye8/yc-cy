// 科创资源统计面板的 mock 数据。
// - 全国级别使用静态基准数字（与同类指挥屏视觉参考一致）。
// - 省/市级别按 region code 派生稳定但不同的缩放比例，保证用户切换不同区域时数字会变化但每次进同一区域结果稳定。
// 后续接真接口时只需替换 buildResourceStats 的返回数据，定义结构保持不变。

const STAT_DEFINITIONS = [
  { key: 'talent',      label: '创新人才', unit: '位', base: 409039, color: '#58d5ff' },
  { key: 'orgs',        label: '创新机构', unit: '家', base: 46034,  color: '#57e38d' },
  { key: 'incubator',   label: '双创载体', unit: '个', base: 321,    color: '#ffa14a' },
  { key: 'park',        label: '产业园区', unit: '个', base: 1441,   color: '#b57bee' },
  { key: 'project',     label: '科研项目', unit: '项', base: 74684,  color: '#ff7e91' },
  { key: 'achievement', label: '科技成果', unit: '项', base: 22321,  color: '#ffd866' },
  { key: 'ipr',         label: '知识产权', unit: '件', base: 817521, color: '#7ad7ff' },
  { key: 'policy',      label: '产业政策', unit: '条', base: 1450,   color: '#9af3d8' },
]

function hashSeed(input) {
  const str = String(input || '')
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function scaleFor(level, code, key) {
  if (level !== 'PROVINCE' && level !== 'CITY') return 1
  const seed = hashSeed(`${code}-${key}`) % 1000 / 1000
  if (level === 'PROVINCE') {
    // 全国数字的 4% ~ 14%，留一定差异不至于看上去像复制全国
    return 0.04 + seed * 0.10
  }
  // CITY: 全国数字的 0.4% ~ 2.4%，体感上比省级小一个数量级
  return 0.004 + seed * 0.02
}

export function buildResourceStats(level, code) {
  return STAT_DEFINITIONS.map((def) => ({
    ...def,
    value: Math.max(1, Math.round(def.base * scaleFor(level, code, def.key))),
  }))
}

export function getResourceStatRegionLabel(level, regionName) {
  if (level === 'CITY' || level === 'PROVINCE') return regionName || '当前区域'
  return '全国'
}
