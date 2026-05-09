import chinaGeo from './map/china.json'
import locationIndex from './map/location.json'
import { getPrimaryPolygonBBox } from '../utils/geoMath.js'

const provinceModules = import.meta.glob('./map/provinces/*.json', { eager: true, import: 'default' })
const cityModules = import.meta.glob('./map/cities/*.json', { eager: true, import: 'default' })

function buildAdcodeMap(modules) {
  const map = {}
  for (const [path, geo] of Object.entries(modules)) {
    const match = path.match(/(\d+)\.json$/)
    if (match) map[match[1]] = geo
  }
  return map
}

export const provinceGeoMap = buildAdcodeMap(provinceModules)
export const cityGeoMap = buildAdcodeMap(cityModules)

export function getProvinceGeo(code) {
  return provinceGeoMap[String(code)] || null
}

export function getCityGeo(code) {
  return cityGeoMap[String(code)] || null
}

// 思路 B：相机距离对所有省份统一为湖北的 3.66；每个省的几何按"目标尺寸 / 自身 span"做缩放，
// 让小省视觉放大、大省视觉缩小，最终在屏幕上接近一致大小。缩放围绕 bbox centroid 做。
const provinceFramingMap = (() => {
  const TARGET_SPAN = 6.64   // 湖北 span，作为虚拟参照尺寸
  const MIN_SCALE = 0.3      // 大省最多缩到 30%（让新疆/内蒙/西藏真正匹配湖北等大）
  const MAX_SCALE = 3        // 小省最多放大 3x（避免几何离球面过远）
  const map = {}
  for (const feature of chinaGeo.features) {
    const code = String(feature?.properties?.adcode ?? '')
    if (!code) continue
    const bbox = getPrimaryPolygonBBox(feature)
    if (!bbox) continue
    const midLat = (bbox[1] + bbox[3]) / 2
    const lonSpan = (bbox[2] - bbox[0]) * Math.cos(midLat * Math.PI / 180)
    const latSpan = bbox[3] - bbox[1]
    const span = Math.max(lonSpan, latSpan)
    const rawScale = span > 0.01 ? TARGET_SPAN / span : MAX_SCALE
    const displayScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale))
    // 个别北方大省（新疆 / 西藏 / 内蒙古）单独把相机往后拉一点
    const FAR_PROVINCES = { '650000': 4.6, '540000': 4.6, '150000': 4.6 }
    // 优先用 chinaGeo 自带的 properties.centroid（几何重心，对内蒙这种月牙状省更准），
    // 缺失时回退到主体 polygon 的 bbox 中心
    const propCentroid = feature.properties?.centroid
    const centroid = Array.isArray(propCentroid) && propCentroid.length === 2
      ? [propCentroid[0], propCentroid[1]]
      : [(bbox[0] + bbox[2]) / 2, midLat]
    map[code] = {
      centroid,
      distance: FAR_PROVINCES[code] ?? 3.66,
      displayScale,
      span,
    }
  }
  return map
})()

export function getProvinceFraming(code) {
  return provinceFramingMap[String(code)] || null
}

export { chinaGeo, locationIndex }

export const CATEGORY_STYLES = {
  Talent: { color: 0x58d5ff, glow: 0x9edfff, label: '\u4eba\u624d' },
  Enterprise: { color: 0xffa14a, glow: 0xffcf8e, label: '\u4f01\u4e1a' },
  Paper: { color: 0x57e38d, glow: 0x9af7bb, label: '\u8bba\u6587' },
  Patent: { color: 0x42f5b0, glow: 0x93ffd6, label: '\u4e13\u5229' },
}

export const FILTERS = Object.keys(CATEGORY_STYLES)

export function getLocationMeta(code) {
  return locationIndex[String(code)] || null
}

export function getProvinceChildren(provinceCode) {
  const entry = getLocationMeta(provinceCode)
  return entry?.children || []
}

function buildItems(prefix, category, values) {
  return values.map((item, index) => ({
    id: `${prefix}-${category}-${index + 1}`,
    category,
    name: item.name,
    title: item.title,
    subtitle: item.subtitle,
    value: item.value,
    trend: item.trend,
    tags: item.tags,
  }))
}


const wuhanDetails = {
  Talent: buildItems('420100', 'Talent', [
    { name: '沈明', title: '光电与智能感知带头人', subtitle: '华中科技大学光电团队', value: 96, trend: '+11%', tags: ['人才引领', '论文 22 篇'] },
    { name: '刘琪', title: '智能制造算法专家', subtitle: '武汉产业智能研究院', value: 91, trend: '+8%', tags: ['产学研', '专利 8 项'] },
    { name: '陈章', title: '高端装备系统架构师', subtitle: '武汉国家高端装备实验室', value: 84, trend: '+6%', tags: ['转化项目 6 个', '合作节点 17'] },
  ]),
  Enterprise: buildItems('420100', 'Enterprise', [
    { name: '武汉智造云谷', title: '工业互联网平台企业', subtitle: '节点关联强度持续增长', value: 93, trend: '+10%', tags: ['工业云', '合作机构 18 家'] },
    { name: '光谷医工科技', title: '医工融合装备企业', subtitle: '专利和产品线同步推进', value: 87, trend: '+7%', tags: ['医疗装备', '专利 16 项'] },
    { name: '汉江算力', title: '智算底座企业', subtitle: '支撑论文转化与企业协同', value: 80, trend: '+5%', tags: ['算力枢纽', '节点连接'] },
  ]),
  Paper: buildItems('420100', 'Paper', [
    { name: '论文集 A', title: '城市级人才与产业耦合网络建模', subtitle: '作者：沈明 / 刘琪', value: 88, trend: '+9%', tags: ['网络模型', '引文 148'] },
    { name: '论文集 B', title: '基于知识图谱的企业博弈与预警方法', subtitle: '作者：华科 / 武大联合团队', value: 82, trend: '+6%', tags: ['知识图谱', '预警'] },
    { name: '论文集 C', title: '光电产业与医工设备的协同创新路径', subtitle: '作者：武汉理工大学', value: 77, trend: '+4%', tags: ['产学研', '协同'] },
  ]),
  Patent: buildItems('420100', 'Patent', [
    { name: '专利簇 1', title: '基于视觉感知的装备状态检测系统', subtitle: '申请主体：武汉智造云谷', value: 90, trend: '+8%', tags: ['发明专利', '状态检测'] },
    { name: '专利簇 2', title: '医工设备运维调度与预警方法', subtitle: '申请主体：光谷医工科技', value: 83, trend: '+6%', tags: ['运维', '调度'] },
    { name: '专利簇 3', title: '智能型产业情报联动预警引擎', subtitle: '申请主体：武汉产业智能研究院', value: 79, trend: '+5%', tags: ['引擎', '情报联动'] },
  ]),
}

const yangzhouDetails = {
  Talent: buildItems('321000', 'Talent', [
    { name: '\u5218\u6cfd', title: '\u591a\u6a21\u6001\u667a\u80fd\u8bca\u7597\u4eba\u624d', subtitle: '\u626c\u5dde\u5927\u5b66\u533b\u5de5\u4ea4\u53c9\u56e2\u961f', value: 97, trend: '+12%', tags: ['\u9752\u5e74\u9886\u519b', '\u8bba\u6587 18 \u7bc7'] },
    { name: '\u5f20\u8574', title: '\u4ea7\u4e1a\u7b97\u6cd5\u8d1f\u8d23\u4eba', subtitle: '\u626c\u5dde\u6570\u667a\u4ea7\u4e1a\u7814\u7a76\u9662', value: 91, trend: '+9%', tags: ['\u5408\u4f5c\u8282\u70b9 23', '\u4e13\u5229 6 \u9879'] },
    { name: '\u5468\u5c9a', title: '\u533b\u7597\u88c5\u5907\u4e13\u5bb6', subtitle: '\u626c\u5dde\u9ad8\u7aef\u88c5\u5907\u521b\u65b0\u4e2d\u5fc3', value: 85, trend: '+6%', tags: ['\u8f6c\u5316\u9879\u76ee 4 \u4e2a', '\u8bba\u6587 9 \u7bc7'] },
  ]),
  Enterprise: buildItems('321000', 'Enterprise', [
    { name: '\u626c\u5dde\u667a\u8054\u79d1\u6280', title: '\u667a\u80fd\u5236\u9020\u94fe\u4e3b\u4f01\u4e1a', subtitle: '\u6838\u5fc3\u8282\u70b9\u6570 31', value: 94, trend: '+11%', tags: ['\u4ea7\u4e1a\u56fe\u8c31', '\u8ba2\u5355\u589e\u957f'] },
    { name: '\u626c\u5dde\u6570\u521b\u533b\u7597', title: '\u533b\u7597\u6570\u5b57\u5316\u5e73\u53f0', subtitle: '\u4e13\u5229\u6d3b\u8dc3\u5ea6\u6301\u7eed\u63d0\u5347', value: 88, trend: '+8%', tags: ['\u4e13\u5229 14 \u9879', '\u5408\u4f5c\u673a\u6784 9 \u5bb6'] },
    { name: '\u626c\u5dde\u5149\u8c31\u611f\u77e5', title: '\u591a\u4f20\u611f\u5668\u8bbe\u5907\u4f01\u4e1a', subtitle: '\u8bba\u6587\u8f6c\u5316\u6548\u7387\u8f83\u9ad8', value: 79, trend: '+5%', tags: ['\u4ea7\u5b66\u7814', '\u8bbe\u5907\u5347\u7ea7'] },
  ]),
  Paper: buildItems('321000', 'Paper', [
    { name: '\u8bba\u6587\u96c6 A', title: '\u626c\u5dde\u533a\u57df\u667a\u80fd\u88c5\u5907\u534f\u540c\u7f51\u7edc\u7814\u7a76', subtitle: '\u4f5c\u8005\uff1a\u5218\u6cfd / \u5468\u5c9a', value: 86, trend: '+7%', tags: ['\u534f\u540c\u7f51\u7edc', '\u5f15\u6587 126'] },
    { name: '\u8bba\u6587\u96c6 B', title: '\u533b\u7597\u88c5\u5907\u4f20\u611f\u878d\u5408\u5b9e\u65f6\u8bca\u65ad\u65b9\u6cd5', subtitle: '\u4f5c\u8005\uff1a\u5f20\u8574 / \u987e\u9752', value: 82, trend: '+5%', tags: ['\u9876\u520a', '\u70ed\u5ea6\u4e0a\u5347'] },
    { name: '\u8bba\u6587\u96c6 C', title: '\u4f01\u4e1a\u77e5\u8bc6\u56fe\u8c31\u4e0e\u4eba\u624d\u4f9b\u9700\u5339\u914d\u6a21\u578b', subtitle: '\u4f5c\u8005\uff1a\u626c\u5dde\u5927\u5b66\u56e2\u961f', value: 76, trend: '+4%', tags: ['\u77e5\u8bc6\u56fe\u8c31', '\u5339\u914d'] },
  ]),
  Patent: buildItems('321000', 'Patent', [
    { name: '\u4e13\u5229\u7c07 1', title: '\u57fa\u4e8e\u591a\u5149\u8c31\u611f\u77e5\u7684\u8bca\u7597\u8bbe\u5907\u5b9a\u4f4d\u7cfb\u7edf', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u626c\u5dde\u667a\u8054\u79d1\u6280', value: 92, trend: '+10%', tags: ['\u53d1\u660e\u4e13\u5229', '\u88c5\u5907\u5b9a\u4f4d'] },
    { name: '\u4e13\u5229\u7c07 2', title: '\u667a\u80fd\u533b\u7597\u88c5\u5907\u534f\u540c\u63a7\u5236\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u626c\u5dde\u6570\u521b\u533b\u7597', value: 84, trend: '+7%', tags: ['\u5b9e\u7528\u65b0\u578b', '\u63a7\u5236\u7cfb\u7edf'] },
    { name: '\u4e13\u5229\u7c07 3', title: '\u8bba\u6587\u77e5\u8bc6\u56fe\u8c31\u9a71\u52a8\u7684\u4e13\u5229\u9884\u8b66\u7cfb\u7edf', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u626c\u5dde\u5927\u5b66', value: 78, trend: '+5%', tags: ['\u7b97\u6cd5', '\u77e5\u8bc6\u56fe\u8c31'] },
  ]),
}

const SIMULATED_CATEGORY_TEMPLATES = {
  Talent: [
    { name: '\u6797\u4fee\u8fdc', title: '\u667a\u80fd\u611f\u77e5\u4e0e\u5de5\u4e1a\u89c6\u89c9\u4e13\u5bb6', subtitle: '\u9ad8\u6821\u8054\u5408\u5b9e\u9a8c\u5ba4\u6838\u5fc3\u6210\u5458', tags: ['\u89c6\u89c9\u68c0\u6d4b', '\u8bba\u6587 24 \u7bc7'] },
    { name: '\u5468\u96e8\u8fb0', title: '\u88c5\u5907\u667a\u80fd\u8fd0\u7ef4\u65b9\u5411\u5e26\u5934\u4eba', subtitle: '\u4ea7\u4e1a\u7814\u7a76\u9662\u6280\u672f\u8d1f\u8d23\u4eba', tags: ['\u88c5\u5907\u8fd0\u7ef4', '\u4e13\u5229 11 \u9879'] },
    { name: '\u8bb8\u5b50\u6602', title: '\u4ea7\u4e1a\u77e5\u8bc6\u56fe\u8c31\u7814\u7a76\u5458', subtitle: '\u533a\u57df\u6570\u636e\u667a\u80fd\u5e73\u53f0', tags: ['\u77e5\u8bc6\u56fe\u8c31', '\u9879\u76ee\u534f\u540c'] },
    { name: '\u9ad8\u6c81\u7136', title: '\u591a\u6e90\u6570\u636e\u878d\u5408\u7b97\u6cd5\u5de5\u7a0b\u5e08', subtitle: '\u9aa8\u5e72\u4f01\u4e1a\u8054\u5408\u521b\u65b0\u4e2d\u5fc3', tags: ['\u7b97\u6cd5\u7814\u53d1', '\u4f01\u4e1a\u5bfc\u5e08'] },
    { name: '\u9648\u5b9b\u6e05', title: '\u9ad8\u7aef\u88c5\u5907\u4ea7\u5b66\u7814\u8f6c\u5316\u4e13\u5bb6', subtitle: '\u91cd\u70b9\u5b9e\u9a8c\u5ba4\u4e0e\u4f01\u4e1a\u534f\u540c\u56e2\u961f', tags: ['\u6210\u679c\u8f6c\u5316', '\u5408\u4f5c\u8282\u70b9'] },
    { name: '\u90b5\u660e\u8f69', title: '\u667a\u80fd\u5236\u9020\u7cfb\u7edf\u67b6\u6784\u5e08', subtitle: '\u533a\u57df\u4ea7\u4e1a\u6280\u672f\u521b\u65b0\u5e73\u53f0', tags: ['\u7cfb\u7edf\u67b6\u6784', '\u4ea7\u4e1a\u534f\u540c'] },
  ],
  Enterprise: [
    { name: '\u667a\u89c1\u4e91\u5de5\u79d1\u6280\u6709\u9650\u516c\u53f8', title: '\u5de5\u4e1a\u89c6\u89c9\u68c0\u6d4b\u89e3\u51b3\u65b9\u6848\u5546', subtitle: '\u670d\u52a1\u88c5\u5907\u5236\u9020\u4e0e\u8d28\u68c0\u573a\u666f', tags: ['\u5de5\u4e1a\u89c6\u89c9', '\u9ad8\u65b0\u6280\u672f'] },
    { name: '\u84dd\u8c31\u667a\u9020\u79d1\u6280\u80a1\u4efd\u6709\u9650\u516c\u53f8', title: '\u667a\u80fd\u4f20\u611f\u4e0e\u8bbe\u5907\u6570\u636e\u91c7\u96c6\u4f01\u4e1a', subtitle: '\u805a\u5408\u4ea7\u7ebf\u72b6\u6001\u4e0e\u8fd0\u7ef4\u6570\u636e', tags: ['\u667a\u80fd\u4f20\u611f', '\u4e13\u5229\u6d3b\u8dc3'] },
    { name: '\u6c47\u5149\u673a\u5668\u4eba\u6280\u672f\u6709\u9650\u516c\u53f8', title: '\u673a\u5668\u4eba\u672c\u4f53\u4e0e\u63a7\u5236\u7cfb\u7edf\u4f9b\u5e94\u5546', subtitle: '\u5177\u5907\u4e0a\u4e0b\u6e38\u534f\u540c\u80fd\u529b', tags: ['\u673a\u5668\u4eba', '\u94fe\u4e3b\u534f\u540c'] },
    { name: '\u6e05\u667a\u6570\u8054\u4ea7\u4e1a\u7814\u7a76\u9662', title: '\u4ea7\u4e1a\u6570\u636e\u6cbb\u7406\u4e0e\u5e73\u53f0\u670d\u52a1\u673a\u6784', subtitle: '\u652f\u6491\u4ea7\u4e1a\u56fe\u8c31\u548c\u6001\u52bf\u5206\u6790', tags: ['\u6570\u636e\u5e73\u53f0', '\u4ea7\u4e1a\u56fe\u8c31'] },
    { name: '\u8054\u79d1\u533b\u5de5\u88c5\u5907\u6709\u9650\u516c\u53f8', title: '\u533b\u5de5\u878d\u5408\u88c5\u5907\u7814\u53d1\u4f01\u4e1a', subtitle: '\u8bba\u6587\u8f6c\u5316\u4e0e\u4e13\u5229\u5e03\u5c40\u540c\u6b65\u63a8\u8fdb', tags: ['\u533b\u5de5\u88c5\u5907', '\u6210\u679c\u8f6c\u5316'] },
    { name: '\u542f\u68ee\u667a\u63a7\u7cfb\u7edf\u6709\u9650\u516c\u53f8', title: '\u5de5\u4e1a\u63a7\u5236\u8f6f\u4ef6\u4e0e\u8fb9\u7f18\u8ba1\u7b97\u4f01\u4e1a', subtitle: '\u8fde\u63a5\u88c5\u5907\u3001\u7b97\u6cd5\u4e0e\u5e94\u7528\u573a\u666f', tags: ['\u8fb9\u7f18\u8ba1\u7b97', '\u5de5\u4e1a\u8f6f\u4ef6'] },
  ],
  Paper: [
    { name: '\u8bba\u6587\u96c6 A', title: '\u9762\u5411\u590d\u6742\u4ea7\u7ebf\u7684\u5de5\u4e1a\u89c6\u89c9\u7f3a\u9677\u68c0\u6d4b\u65b9\u6cd5', subtitle: '\u4f5c\u8005\uff1a\u6797\u4fee\u8fdc / \u9648\u5b9b\u6e05', tags: ['\u7f3a\u9677\u68c0\u6d4b', '\u5f15\u6587 132'] },
    { name: '\u8bba\u6587\u96c6 B', title: '\u57fa\u4e8e\u77e5\u8bc6\u56fe\u8c31\u7684\u4ea7\u4e1a\u94fe\u8282\u70b9\u8bc6\u522b\u7814\u7a76', subtitle: '\u4f5c\u8005\uff1a\u8bb8\u5b50\u6602 / \u5468\u96e8\u8fb0', tags: ['\u77e5\u8bc6\u56fe\u8c31', '\u70ed\u5ea6\u4e0a\u5347'] },
    { name: '\u8bba\u6587\u96c6 C', title: '\u591a\u6e90\u6570\u636e\u878d\u5408\u7684\u533a\u57df\u521b\u65b0\u6d3b\u8dc3\u5ea6\u8bc4\u4f30', subtitle: '\u4f5c\u8005\uff1a\u9ad8\u6c81\u7136 / \u90b5\u660e\u8f69', tags: ['\u591a\u6e90\u6570\u636e', '\u6001\u52bf\u5206\u6790'] },
    { name: '\u8bba\u6587\u96c6 D', title: '\u88c5\u5907\u667a\u80fd\u8fd0\u7ef4\u4e2d\u7684\u5f02\u5e38\u9884\u8b66\u6a21\u578b', subtitle: '\u4f5c\u8005\uff1a\u5468\u96e8\u8fb0 / \u6797\u4fee\u8fdc', tags: ['\u88c5\u5907\u8fd0\u7ef4', '\u9884\u8b66\u6a21\u578b'] },
    { name: '\u8bba\u6587\u96c6 E', title: '\u9762\u5411\u4e13\u5229\u4ef7\u503c\u8bc4\u4f30\u7684\u6280\u672f\u4e3b\u9898\u6316\u6398\u65b9\u6cd5', subtitle: '\u4f5c\u8005\uff1a\u9648\u5b9b\u6e05 / \u8bb8\u5b50\u6602', tags: ['\u4e13\u5229\u4ef7\u503c', '\u4e3b\u9898\u6316\u6398'] },
    { name: '\u8bba\u6587\u96c6 F', title: '\u57ce\u5e02\u4ea7\u4e1a\u521b\u65b0\u7f51\u7edc\u4e2d\u7684\u4eba\u624d\u534f\u540c\u5173\u7cfb\u5206\u6790', subtitle: '\u4f5c\u8005\uff1a\u90b5\u660e\u8f69 / \u9ad8\u6c81\u7136', tags: ['\u4eba\u624d\u534f\u540c', '\u521b\u65b0\u7f51\u7edc'] },
  ],
  Patent: [
    { name: '\u4e13\u5229\u7c07 A', title: '\u4e00\u79cd\u5de5\u4e1a\u89c6\u89c9\u7f3a\u9677\u56fe\u50cf\u7684\u81ea\u9002\u5e94\u8bc6\u522b\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u667a\u89c1\u4e91\u5de5\u79d1\u6280\u6709\u9650\u516c\u53f8', tags: ['\u53d1\u660e\u4e13\u5229', '\u89c6\u89c9\u68c0\u6d4b'] },
    { name: '\u4e13\u5229\u7c07 B', title: '\u57fa\u4e8e\u8bbe\u5907\u65f6\u5e8f\u6570\u636e\u7684\u5f02\u5e38\u9884\u8b66\u7cfb\u7edf', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u84dd\u8c31\u667a\u9020\u79d1\u6280\u80a1\u4efd\u6709\u9650\u516c\u53f8', tags: ['\u9884\u8b66\u7cfb\u7edf', '\u8bbe\u5907\u6570\u636e'] },
    { name: '\u4e13\u5229\u7c07 C', title: '\u4e00\u79cd\u9762\u5411\u4ea7\u4e1a\u56fe\u8c31\u7684\u8282\u70b9\u5173\u8054\u8bc4\u5206\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u6e05\u667a\u6570\u8054\u4ea7\u4e1a\u7814\u7a76\u9662', tags: ['\u4ea7\u4e1a\u56fe\u8c31', '\u5173\u8054\u8bc4\u5206'] },
    { name: '\u4e13\u5229\u7c07 D', title: '\u673a\u5668\u4eba\u672b\u7aef\u6267\u884c\u5668\u7684\u67d4\u6027\u63a7\u5236\u88c5\u7f6e', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u6c47\u5149\u673a\u5668\u4eba\u6280\u672f\u6709\u9650\u516c\u53f8', tags: ['\u673a\u5668\u4eba', '\u63a7\u5236\u88c5\u7f6e'] },
    { name: '\u4e13\u5229\u7c07 E', title: '\u5de5\u4e1a\u8fb9\u7f18\u8282\u70b9\u7684\u591a\u4efb\u52a1\u8c03\u5ea6\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u542f\u68ee\u667a\u63a7\u7cfb\u7edf\u6709\u9650\u516c\u53f8', tags: ['\u8fb9\u7f18\u8ba1\u7b97', '\u4efb\u52a1\u8c03\u5ea6'] },
    { name: '\u4e13\u5229\u7c07 F', title: '\u533b\u5de5\u878d\u5408\u88c5\u5907\u7684\u8fd0\u7ef4\u8ddf\u8e2a\u4e0e\u6545\u969c\u8bca\u65ad\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\uff1a\u8054\u79d1\u533b\u5de5\u88c5\u5907\u6709\u9650\u516c\u53f8', tags: ['\u533b\u5de5\u88c5\u5907', '\u6545\u969c\u8bca\u65ad'] },
  ],
}

const cleanWuhanDetails = {
  Talent: buildItems('420100', 'Talent', SIMULATED_CATEGORY_TEMPLATES.Talent.slice(0, 3).map((item, index) => ({
    ...item,
    subtitle: `\u6b66\u6c49 - ${item.subtitle}`,
    value: [96, 91, 84][index],
    trend: ['+11%', '+8%', '+6%'][index],
  }))),
  Enterprise: buildItems('420100', 'Enterprise', SIMULATED_CATEGORY_TEMPLATES.Enterprise.slice(0, 3).map((item, index) => ({
    ...item,
    subtitle: `\u6b66\u6c49 - ${item.subtitle}`,
    value: [93, 87, 80][index],
    trend: ['+10%', '+7%', '+5%'][index],
  }))),
  Paper: buildItems('420100', 'Paper', SIMULATED_CATEGORY_TEMPLATES.Paper.slice(0, 3).map((item, index) => ({
    ...item,
    subtitle: `\u6b66\u6c49 - ${item.subtitle}`,
    value: [88, 82, 77][index],
    trend: ['+9%', '+6%', '+4%'][index],
  }))),
  Patent: buildItems('420100', 'Patent', SIMULATED_CATEGORY_TEMPLATES.Patent.slice(0, 3).map((item, index) => ({
    ...item,
    subtitle: `\u6b66\u6c49 - ${item.subtitle}`,
    value: [90, 83, 79][index],
    trend: ['+8%', '+6%', '+5%'][index],
  }))),
}

const detailOverrides = {
  '420100': cleanWuhanDetails,
  '321000': yangzhouDetails,
}

const mockDetailCache = new Map()

function hashCode(value) {
  return String(value).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function metricFor(code, salt, min = 72, span = 25) {
  return min + ((hashCode(code) + salt * 17) % span)
}

function trendFor(code, salt) {
  return `+${4 + ((hashCode(code) + salt * 7) % 11)}%`
}

function buildMockCategory(cityCode, category, cityName) {
  const code = String(cityCode)
  const pool = SIMULATED_CATEGORY_TEMPLATES[category] || []
  if (pool.length) {
    const offset = hashCode(`${code}:${category}`) % pool.length
    return buildItems(code, category, pool.map((_, index) => {
      const item = pool[(offset + index) % pool.length]
      return {
        ...item,
        subtitle: `${cityName} - ${item.subtitle}`,
        value: metricFor(code, index + FILTERS.indexOf(category) * 3),
        trend: trendFor(code, index + FILTERS.indexOf(category) * 5),
      }
    }))
  }
  const templates = {
    Talent: [
      { name: '\u4eba\u624d\u8282\u70b9 A', title: '\u533a\u57df\u5173\u952e\u6280\u672f\u5e26\u5934\u4eba', subtitle: '\u9ad8\u6821\u4e0e\u4ea7\u4e1a\u7814\u53d1\u534f\u540c\u56e2\u961f', tags: ['\u4eba\u624d\u96c6\u805a', '\u9879\u76ee\u534f\u540c'] },
      { name: '\u4eba\u624d\u8282\u70b9 B', title: '\u4ea7\u4e1a\u7b97\u6cd5\u8f6c\u5316\u4e13\u5bb6', subtitle: '\u533a\u57df\u521b\u65b0\u5e73\u53f0\u6838\u5fc3\u6210\u5458', tags: ['\u7b97\u6cd5\u7814\u53d1', '\u6210\u679c\u8f6c\u5316'] },
      { name: '\u4eba\u624d\u8282\u70b9 C', title: '\u6570\u636e\u667a\u80fd\u5e94\u7528\u9aa8\u5e72', subtitle: '\u4f01\u4e1a\u8054\u5408\u5b9e\u9a8c\u5ba4\u8d1f\u8d23\u4eba', tags: ['\u4f01\u4e1a\u5bfc\u5e08', '\u4e13\u5229\u534f\u540c'] },
    ],
    Enterprise: [
      { name: '\u4f01\u4e1a\u8282\u70b9 A', title: '\u667a\u80fd\u5236\u9020\u94fe\u4e3b\u4f01\u4e1a', subtitle: '\u627f\u63a5\u533a\u57df\u4ea7\u4e1a\u534f\u540c\u4e0e\u8bbe\u5907\u5347\u7ea7', tags: ['\u94fe\u4e3b\u4f01\u4e1a', '\u4ea7\u4e1a\u534f\u540c'] },
      { name: '\u4f01\u4e1a\u8282\u70b9 B', title: '\u6570\u5b57\u5316\u5e73\u53f0\u670d\u52a1\u5546', subtitle: '\u805a\u5408\u672c\u5730\u6570\u636e\u3001\u4eba\u624d\u548c\u4e13\u5229\u8d44\u6e90', tags: ['\u6570\u5b57\u5e73\u53f0', '\u8d44\u6e90\u805a\u5408'] },
      { name: '\u4f01\u4e1a\u8282\u70b9 C', title: '\u4e13\u7cbe\u7279\u65b0\u6f5c\u529b\u4f01\u4e1a', subtitle: '\u4e13\u5229\u6d3b\u8dc3\u5ea6\u4e0e\u5408\u4f5c\u9891\u6b21\u6301\u7eed\u63d0\u5347', tags: ['\u4e13\u7cbe\u7279\u65b0', '\u5408\u4f5c\u7f51\u7edc'] },
    ],
    Paper: [
      { name: '\u8bba\u6587\u96c6 A', title: '\u533a\u57df\u667a\u80fd\u4ea7\u4e1a\u534f\u540c\u7f51\u7edc\u7814\u7a76', subtitle: '\u56f4\u7ed5\u4eba\u624d\u3001\u4f01\u4e1a\u4e0e\u6210\u679c\u8f6c\u5316\u5173\u7cfb\u5efa\u6a21', tags: ['\u534f\u540c\u7f51\u7edc', '\u77e5\u8bc6\u56fe\u8c31'] },
      { name: '\u8bba\u6587\u96c6 B', title: '\u6570\u636e\u9a71\u52a8\u7684\u4ea7\u4e1a\u521b\u65b0\u70ed\u70b9\u8bc6\u522b\u65b9\u6cd5', subtitle: '\u7ed3\u5408\u4e13\u5229\u3001\u8bba\u6587\u4e0e\u9879\u76ee\u7684\u591a\u6e90\u6570\u636e', tags: ['\u70ed\u70b9\u8bc6\u522b', '\u591a\u6e90\u6570\u636e'] },
      { name: '\u8bba\u6587\u96c6 C', title: '\u79d1\u6280\u6210\u679c\u8f6c\u5316\u6548\u7387\u8bc4\u4f30\u6a21\u578b', subtitle: '\u9762\u5411\u57ce\u5e02\u7ea7\u8282\u70b9\u7684\u6001\u52bf\u5206\u6790', tags: ['\u8f6c\u5316\u6548\u7387', '\u6001\u52bf\u5206\u6790'] },
    ],
    Patent: [
      { name: '\u4e13\u5229\u7c07 A', title: '\u9762\u5411\u667a\u80fd\u88c5\u5907\u7684\u5173\u952e\u90e8\u4ef6\u63a7\u5236\u65b9\u6cd5', subtitle: '\u7533\u8bf7\u4e3b\u4f53\u8986\u76d6\u9ad8\u6821\u4e0e\u9aa8\u5e72\u4f01\u4e1a', tags: ['\u53d1\u660e\u4e13\u5229', '\u667a\u80fd\u88c5\u5907'] },
      { name: '\u4e13\u5229\u7c07 B', title: '\u4ea7\u4e1a\u77e5\u8bc6\u56fe\u8c31\u9a71\u52a8\u7684\u9884\u8b66\u7cfb\u7edf', subtitle: '\u7528\u4e8e\u8bc6\u522b\u533a\u57df\u6280\u672f\u673a\u4f1a\u548c\u7ade\u4e89\u98ce\u9669', tags: ['\u9884\u8b66\u7cfb\u7edf', '\u77e5\u8bc6\u56fe\u8c31'] },
      { name: '\u4e13\u5229\u7c07 C', title: '\u591a\u7ef4\u6570\u636e\u878d\u5408\u7684\u4f01\u4e1a\u521b\u65b0\u8bc4\u4f30\u88c5\u7f6e', subtitle: '\u652f\u6491\u4ea7\u4e1a\u8282\u70b9\u6d3b\u8dc3\u5ea6\u91cf\u5316', tags: ['\u521b\u65b0\u8bc4\u4f30', '\u8282\u70b9\u6d3b\u8dc3'] },
    ],
  }

  return buildItems(code, category, templates[category].map((item, index) => ({
    ...item,
    name: `${cityName}${item.name}`,
    subtitle: `${cityName} - ${item.subtitle}`,
    value: metricFor(code, index + FILTERS.indexOf(category) * 3),
    trend: trendFor(code, index + FILTERS.indexOf(category) * 5),
  })))
}

function buildMockDetails(cityCode) {
  const code = String(cityCode)
  if (mockDetailCache.has(code)) return mockDetailCache.get(code)
  const meta = getLocationMeta(code)
  const cityName = meta?.name || `\u533a\u57df${code}`
  const details = Object.fromEntries(FILTERS.map((category) => [category, buildMockCategory(code, category, cityName)]))
  mockDetailCache.set(code, details)
  return details
}

export function getDetailItems(cityCode, category) {
  const key = String(cityCode)
  const cityItems = detailOverrides[key] || buildMockDetails(key)
  return cityItems?.[category] || []
}

export function getParticleSource(cityCode, category = null) {
  const city = String(cityCode)
  const buildParticles = (items, suffix) => {
    if (!items.length) return []
    const list = []
    const total = 5

    for (let i = 0; i < total; i += 1) {
      const item = items[i % items.length]
      list.push({
        ...item,
        id: `${item.id}-particle-${suffix}-${i}`,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 0.42 + Math.random() * 0.9,
        orbitTilt: (Math.random() - 0.5) * 0.7,
        radialOffset: 0.18 + Math.random() * 0.46,
        speed: 0.38 + Math.random() * 0.72,
        size: 0.014 + Math.random() * 0.01,
        band: i % 3,
      })
    }

    return list
  }

  if (category) {
    return buildParticles(getDetailItems(city, category), category)
  }

  return FILTERS.flatMap((itemCategory) => buildParticles(getDetailItems(city, itemCategory), itemCategory))
}

export function getProvinceHero(provinceCode) {
  const entry = getLocationMeta(provinceCode)
  if (!entry) return null

  return {
    title: entry.name,
    subtitle: entry.level === 'province' ? '\u7701\u57df\u667a\u80fd\u60c5\u62a5\u805a\u7126' : '\u533a\u57df\u60c5\u62a5\u805a\u7126',
    stats: [
      { label: '\u57ce\u5e02\u8282\u70b9', value: entry.childrenNum || 0 },
      { label: '\u4e2d\u5fc3\u5750\u6807', value: `${entry.center?.[0]?.toFixed?.(1) || '--'}, ${entry.center?.[1]?.toFixed?.(1) || '--'}` },
      { label: '\u884c\u653f\u7f16\u7801', value: String(provinceCode) },
    ],
  }
}
