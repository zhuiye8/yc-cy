<template>
  <BlueprintScene @exit="goHome" />
</template>

<script setup>
import BlueprintScene from './components/BlueprintScene.vue'
import { dispatchNavigation } from '../shared/navigation.js'

function goHome() {
  dispatchNavigation('homeView')
}
</script>
