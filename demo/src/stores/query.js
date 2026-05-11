import { defineStore } from 'pinia'

export const QUERY_TYPES = ['org', 'talent', 'patent', 'journal']

export const useQueryStore = defineStore('query', {
  state: () => ({
    activeType: 'org',
    mode: 'search',
  }),
  actions: {
    setActiveType(type) {
      if (!QUERY_TYPES.includes(type)) return
      this.activeType = type
    },
    showSearch() {
      this.mode = 'search'
    },
    showDetail(type) {
      this.setActiveType(type)
      this.mode = 'detail'
    },
  },
})
