import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'

const HomePage = () => import('../pages/HomePage.vue')
// chain 和 chain/detail 共用同一个组件引用，切换时 vue-router 复用实例，
// 避免 BlueprintScene 卸载重建导致 3D 场景闪烁。
const IndustryChainPage = () => import('../pages/IndustryChainPage.vue')
const SpaceTrendPage = () => import('../pages/SpaceTrendPage.vue')
const DatabaseQueryPage = () => import('../pages/DatabaseQueryPage.vue')
const AiPage = () => import('../pages/AiPage.vue')

export function normalizeLegacyHashRoute() {
  const hash = window.location.hash
  if (!hash || !hash.startsWith('#/')) return null

  const route = hash.slice(1)
  const nextUrl = `${route}${window.location.search || ''}`
  window.history.replaceState(null, '', nextUrl)
  return route
}

normalizeLegacyHashRoute()

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: 'home', name: 'home', component: HomePage, meta: { pageId: 'home', viewId: 'homeView' } },
        { path: 'chain', name: 'chain', component: IndustryChainPage, meta: { pageId: 'chain', viewId: 'chainView' } },
        { path: 'chain/detail', name: 'chainDetail', component: IndustryChainPage, meta: { pageId: 'chainDetail', viewId: 'chainView' } },
        { path: 'space', name: 'space', component: SpaceTrendPage, meta: { pageId: 'space', viewId: 'spaceView' } },
        { path: 'query', name: 'query', component: DatabaseQueryPage, meta: { pageId: 'query', viewId: 'queryView' } },
        { path: 'query/:type', name: 'queryDetail', component: DatabaseQueryPage, meta: { pageId: 'queryDetail', viewId: 'queryView' } },
        { path: 'ai', name: 'ai', component: AiPage, meta: { pageId: 'ai', viewId: 'aiView' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
  scrollBehavior() {
    return false
  },
})
