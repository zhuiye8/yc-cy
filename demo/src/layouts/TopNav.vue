<script setup>
import { PAGE_DEFINITIONS } from '../app/pageRegistry.js'

const primaryPages = PAGE_DEFINITIONS.filter((page) => !page.path.includes(':'))
</script>

<template>
  <nav aria-label="主导航">
    <a
      v-for="page in primaryPages"
      :key="page.id"
      :href="page.path"
    >
      {{ page.label }}
    </a>
  </nav>
</template>
