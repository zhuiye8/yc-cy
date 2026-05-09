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
  }
})
