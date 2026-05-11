<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LegacyPage from './LegacyPage.vue'

const props = defineProps({
  viewId: {
    type: String,
    required: true,
  },
})

const host = ref(null)
let viewElement = null
let placeholder = null

onMounted(() => {
  viewElement = document.getElementById(props.viewId)
  if (!viewElement || !host.value) return

  placeholder = document.createComment(`legacy-view:${props.viewId}`)
  viewElement.parentNode?.insertBefore(placeholder, viewElement)
  host.value.appendChild(viewElement)
})

onBeforeUnmount(() => {
  if (!viewElement || !placeholder?.parentNode) return

  placeholder.parentNode.insertBefore(viewElement, placeholder)
  placeholder.remove()
})
</script>

<template>
  <LegacyPage />
  <div ref="host" class="legacy-dom-view-host" :data-host-view-id="viewId" />
</template>
