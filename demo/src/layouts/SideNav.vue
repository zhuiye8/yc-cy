<script setup>
const items = [
  { key: 'org', label: '机构' },
  { key: 'talent', label: '人才' },
  { key: 'patent', label: '专利' },
  { key: 'journal', label: '期刊' },
]
</script>

<template>
  <nav aria-label="数据库查询分类">
    <a
      v-for="item in items"
      :key="item.key"
      :href="`/query/${item.key}`"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
