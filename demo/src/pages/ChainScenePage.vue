<template>
  <ChainPageMarkup />
  <PlatformOverlay view-id="chainView" hide-placeholder-selector=".chain-scene">
    <ChainApp />
  </PlatformOverlay>
</template>

<script setup>
import PlatformOverlay from './PlatformOverlay.vue'
import ChainApp from '../platform/ChainApp.vue'
import ChainPageMarkup from './markup/ChainPageMarkup.vue'
</script>
