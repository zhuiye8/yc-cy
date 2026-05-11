<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  pageId: {
    type: String,
    default: '',
  },
  viewId: {
    type: String,
    default: '',
  },
})

const route = useRoute()
const pageId = computed(() => props.pageId || route.meta.pageId || '')
const viewId = computed(() => props.viewId || route.meta.viewId || '')
</script>

<template>
  <span data-legacy-page :data-page-id="pageId" :data-view-id="viewId" />
</template>
