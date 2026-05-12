<template>
<section class="view view-space is-active" id="spaceView" aria-label="空间态势">
        <div class="immersive-page space-page">
          <header class="query-topbar">
            <button class="top-logo-button" data-target="homeView" aria-label="返回首页">
              <img class="query-top-logo" src="../../../assets/extracted/query_top_logo.png" alt="武汉数据智能研究院" />
            </button>
            <nav class="query-tabs" aria-label="主导航">
              <button data-target="chainView">产业链全景</button>
              <button class="is-active">空间态势</button>
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
          <section class="space-panel">
            <p>INDUSTRIAL INTELLIGENCE / IMMERSIVE MAP</p>
            <h1>产业智能情报 3D 指挥屏</h1>
            <h2>中国智能情报全域底图</h2>
            <div class="space-filter">
              <button class="is-active">人才</button>
              <button>企业</button>
              <button>论文</button>
              <button>专利</button>
            </div>
          </section>
        </div>
      </section>
</template>
