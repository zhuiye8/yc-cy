<template>
<section class="view view-chain is-active" id="chainView" aria-label="产业链全景">
        <div class="immersive-page chain-page">
          <header class="query-topbar">
            <button class="top-logo-button" data-target="homeView" aria-label="返回首页">
              <img class="query-top-logo" src="../../../assets/extracted/query_top_logo.png" alt="武汉数据智能研究院" />
            </button>
            <nav class="query-tabs" aria-label="主导航">
              <button class="is-active">产业链全景</button>
              <button data-target="spaceView">空间态势</button>
              <button data-target="aiView">AI分析</button>
              <button data-target="queryView">数据库查询</button>
              <button>产品展示</button>
            </nav>
            <button class="query-about" aria-label="关于我们">
              <i class="nav-mini-icon is-search" aria-hidden="true"></i>
              <i class="nav-mini-icon is-user" aria-hidden="true"></i>
              <strong>关于我们</strong>
            </button>
          </header>
          <div class="chain-scene">
            <div class="chain-node n1"></div>
            <div class="chain-node n2"></div>
            <div class="chain-node n3"></div>
            <div class="chain-node n4"></div>
            <div class="chain-node n5"></div>
          </div>
        </div>
      </section>
</template>
