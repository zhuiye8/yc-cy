<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import logoUrl from '../../assets/extracted/query_top_logo.png'

// 常驻顶部导航：脱离 RouterView 在 AppLayout 层渲染，路由切换 chunk 加载期间不会被卸载，
// 避免出现"切到 chain/space 时整页连导航一起白屏"的现象。
// markup 里仍保留各自的 .query-topbar（PlatformOverlay 用它做尺寸参考），
// 但被本组件以 fixed + 更高 z-index 完全遮盖，视觉上是单一顶栏。
const route = useRoute()

const activeViewId = computed(() => route.meta?.viewId || 'homeView')

// 首页有自己的 home-feature-nav（嵌在 home-feature-card 卡片里），常驻顶栏不显示
const visible = computed(() => activeViewId.value !== 'homeView')

const tabs = [
  { label: '产业链全景', target: 'chainView' },
  { label: '空间态势', target: 'spaceView' },
  { label: 'AI分析', target: 'aiView' },
  { label: '数据库查询', target: 'queryView' },
  { label: '产品展示', target: null },
]
</script>

<template>
  <Teleport to="body">
    <header
      v-show="visible"
      class="query-topbar immersive-topbar-fixed"
      aria-label="主导航顶栏"
    >
      <button class="top-logo-button" data-target="homeView" aria-label="返回首页">
        <img class="query-top-logo" :src="logoUrl" alt="武汉数据智能研究院" />
      </button>
      <nav class="query-tabs" aria-label="主导航">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          :class="{ 'is-active': tab.target === activeViewId }"
          :data-target="tab.target || null"
        >{{ tab.label }}</button>
      </nav>
      <button class="query-about" aria-label="关于我们">
        <i class="nav-mini-icon is-search" aria-hidden="true"></i>
        <i class="nav-mini-icon is-user" aria-hidden="true"></i>
        <strong>关于我们</strong>
      </button>
    </header>
  </Teleport>
</template>

<style>
.immersive-topbar-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 8;
}
</style>
