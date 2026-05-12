<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  viewId: {
    type: String,
    required: true,
  },
  hidePlaceholderSelector: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '#020914',
  },
})

const overlayTop = ref(108)
const isMounted = ref(false)
const overlayStyle = computed(() => ({
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0',
  top: `${overlayTop.value}px`,
  zIndex: '3',
  background: props.background,
  overflow: 'hidden',
}))

let targetView = null
let placeholders = []
let savedBodyOverflow = null
let savedHtmlOverflow = null
const placeholderOriginalDisplay = new WeakMap()

function syncOverlayBounds() {
  const topbar = targetView?.querySelector('.query-topbar')
  overlayTop.value = Math.round(topbar?.getBoundingClientRect().height || 108)
}

function hidePlaceholders() {
  placeholders.forEach((el) => {
    if (!placeholderOriginalDisplay.has(el)) {
      placeholderOriginalDisplay.set(el, el.style.display || '')
    }
    el.style.display = 'none'
  })
}

function showPlaceholders() {
  placeholders.forEach((el) => {
    el.style.display = placeholderOriginalDisplay.get(el) ?? ''
  })
}

function lockBodyScroll() {
  savedBodyOverflow = document.body.style.overflow
  savedHtmlOverflow = document.documentElement.style.overflow
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  document.body.style.overflow = savedBodyOverflow ?? ''
  document.documentElement.style.overflow = savedHtmlOverflow ?? ''
  savedBodyOverflow = null
  savedHtmlOverflow = null
}

onMounted(async () => {
  await nextTick()
  targetView = document.getElementById(props.viewId)
  placeholders = props.hidePlaceholderSelector && targetView
    ? Array.from(targetView.querySelectorAll(props.hidePlaceholderSelector))
    : []

  syncOverlayBounds()
  hidePlaceholders()
  lockBodyScroll()
  isMounted.value = true

  window.addEventListener('resize', syncOverlayBounds)
  requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncOverlayBounds)
  showPlaceholders()
  unlockBodyScroll()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isMounted" class="platform-overlay" :data-target="viewId" :style="overlayStyle">
      <slot />
    </div>
  </Teleport>
</template>
