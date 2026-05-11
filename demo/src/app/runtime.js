import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { RouterView } from 'vue-router'
import { router } from './router.js'

const RuntimeRoot = { render: () => h(RouterView) }

export const pinia = createPinia()

export function installVueRuntime() {
  let mountPoint = document.getElementById('vueRuntimeRoot')
  if (!mountPoint) {
    mountPoint = document.createElement('div')
    mountPoint.id = 'vueRuntimeRoot'
    const shell = document.querySelector('.site-shell')
    ;(shell || document.body).appendChild(mountPoint)
  }
  mountPoint.hidden = false
  mountPoint.style.display = 'contents'

  const app = createApp(RuntimeRoot)
  app.use(pinia)
  app.use(router)
  app.mount(mountPoint)

  return { app, router, pinia }
}
