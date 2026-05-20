import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { aiDevProxyPlugin } from './scripts/ai-dev-proxy.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), aiDevProxyPlugin(env)],
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
  }
})
