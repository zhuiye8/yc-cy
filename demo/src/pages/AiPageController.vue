<script setup>
import { nextTick, onBeforeUnmount, onMounted } from 'vue'

let aiView = null
let toastTimer = null
const disposers = []

function showToast(message) {
  let toast = document.querySelector('.ui-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'ui-toast'
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800)
}

function addListener(target, type, handler) {
  target?.addEventListener(type, handler)
  if (target) disposers.push(() => target.removeEventListener(type, handler))
}

function bindAiEvents() {
  aiView.querySelectorAll('.ai-menu-real button').forEach((button) => {
    addListener(button, 'click', () => {
      aiView.querySelectorAll('.ai-menu-real button').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })
      showToast(button.dataset.aiMenu === 'favorite' ? '已切换到收藏' : '已切换会话列表')
    })
  })

  aiView.querySelectorAll('.ai-recent button').forEach((button) => {
    addListener(button, 'click', () => {
      aiView.querySelectorAll('.ai-recent button').forEach((item) => {
        item.classList.toggle('is-active', item === button)
      })
    })
  })

  addListener(aiView.querySelector('.ai-new-real'), 'click', () => {
    aiView.querySelectorAll('.ai-recent button').forEach((item) => item.classList.remove('is-active'))
    const input = aiView.querySelector('.ai-composer-real input')
    if (input) {
      input.value = ''
      input.focus()
    }
    const button = aiView.querySelector('.ai-new-real')
    button?.classList.add('is-flashing')
    setTimeout(() => button?.classList.remove('is-flashing'), 500)
    showToast('已新建会话')
  })

  aiView.querySelectorAll('.ai-suggestions button').forEach((button) => {
    addListener(button, 'click', () => {
      const input = aiView.querySelector('.ai-composer-real input')
      if (input) {
        input.value = button.textContent.trim()
        input.focus()
      }
    })
  })

  addListener(aiView.querySelector('.ai-send-real'), 'click', () => {
    const input = aiView.querySelector('.ai-composer-real input')
    if (input && input.value.trim()) {
      showToast('已发送，等待接口接入')
      input.value = ''
    } else {
      showToast('请输入内容')
    }
  })
}

onMounted(async () => {
  await nextTick()
  aiView = document.getElementById('aiView')
  if (!aiView) return
  bindAiEvents()
})

onBeforeUnmount(() => {
  disposers.splice(0).forEach((dispose) => dispose())
  clearTimeout(toastTimer)
})
</script>

<template>
  <span hidden data-ai-page-controller />
</template>
