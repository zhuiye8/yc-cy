<template>
  <BlueprintScene @exit="goHome" />
</template>

<script setup>
import BlueprintScene from './components/BlueprintScene.vue'

function goHome() {
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('is-active', view.id === 'homeView')
  })
  document.querySelectorAll('.page-switcher button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.target === 'homeView')
  })
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
</script>
