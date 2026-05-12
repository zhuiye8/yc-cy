import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 4173,
    proxy: {
      '/tg-api': {
        target: 'http://119.36.242.222:19020',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tg-api/, ''),
      },
    },
  },
  build: {
    // 把巨型 GeoJSON / 产业链数据单独分 chunk，避免 rollup 自动把它们和 tgAuth 之类的小模块
    // 抽到同一个共享 chunk 里造成 chunk 命名误导 + 几十 MB 体积
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/data/map/cities/')) return 'map-cities'
          if (id.includes('/data/map/provinces/')) return 'map-provinces'
          if (id.endsWith('/data/map/china.json')) return 'map-china'
          if (id.endsWith('/data/map/location.json')) return 'map-location'
          if (id.includes('/data/industry-chain-graph.js')) return 'industry-chain-graph'
          if (id.includes('/data/gics-hierarchy.js')) return 'gics-hierarchy'
        },
      },
    },
  },
})
