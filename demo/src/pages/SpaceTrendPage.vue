<template>
  <SpacePageMarkup />
  <PlatformOverlay view-id="spaceView" hide-placeholder-selector=".space-panel">
    <SpaceApp />
  </PlatformOverlay>
</template>

<script setup>
import PlatformOverlay from './PlatformOverlay.vue'
import SpaceApp from '../platform/SpaceApp.vue'
import SpacePageMarkup from './markup/SpacePageMarkup.vue'
</script>
