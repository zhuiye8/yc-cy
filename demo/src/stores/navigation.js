import { defineStore } from 'pinia'
import { findPageByRoute, findPageByViewId } from '../app/pageRegistry.js'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    activePageId: 'home',
    activeRoute: '/home',
    activeViewId: 'homeView',
  }),
  actions: {
    setActiveRoute(route) {
      const page = findPageByRoute(route)
      this.activePageId = page.id
      this.activeRoute = route
      this.activeViewId = page.viewId
    },
    setActiveView(viewId, route) {
      const page = findPageByViewId(viewId)
      this.activePageId = page.id
      this.activeRoute = route || page.path
      this.activeViewId = viewId
    },
  },
})
