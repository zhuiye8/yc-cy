<template>
<section class="view view-ai is-active" id="aiView" aria-label="AI分析">
        <div class="ai-real" aria-label="AI分析页面">
          <header class="query-topbar ai-topbar">
            <button class="top-logo-button" data-target="homeView" aria-label="返回首页">
              <img class="query-top-logo" src="../../../assets/extracted/query_top_logo.png" alt="武汉数据智能研究院" />
            </button>
            <nav class="query-tabs ai-tabs" aria-label="主导航">
              <button data-target="chainView">产业链全景</button>
              <button data-target="spaceView">空间态势</button>
              <button class="is-active">AI分析</button>
              <button data-target="queryView">数据库查询</button>
              <button>产品展示</button>
            </nav>
            <button class="query-about" aria-label="关于我们">
              <i class="nav-mini-icon is-search" aria-hidden="true"></i>
              <i class="nav-mini-icon is-user" aria-hidden="true"></i>
              <strong>关于我们</strong>
            </button>
          </header>

          <aside class="ai-left-real">
            <div class="ai-brand-real">
              <img src="../../../assets/extracted/ai_logo.png" alt="" />
              <strong>武汉数据智能研究院</strong>
            </div>
            <button class="ai-new-real">+ <span>新建对话</span></button>
            <label class="ai-search-real">
              <span></span>
              <input placeholder="搜索对话" />
            </label>
            <nav class="ai-menu-real" aria-label="AI功能">
              <button class="is-active" data-ai-menu="chat">对话</button>
              <button data-ai-menu="favorite">收藏夹</button>
            </nav>
            <div class="ai-recent">
              <h3>最近对话</h3>
              <button class="is-active">设计一个蓝色系的网页 GPT...<small>14:30</small></button>
              <button>如何提升产品设计的用户体验<small>昨天 15:20</small></button>
              <button>帮我写一段产品介绍文案<small>昨天 11:08</small></button>
              <button>解释量子计算的原理<small>昨天 09:45</small></button>
              <button>制定一个健身计划<small>前天 21:30</small></button>
            </div>
            <button class="ai-all-chat">查看全部对话 <span>›</span></button>
          </aside>

          <main class="ai-content-real">
            <section class="ai-hero-real">
              <h1>上午好</h1>
              <p>有什么可以帮你的吗？</p>
            </section>
            <section class="ai-chat-real">
              <article class="ai-answer ai-answer-greeting">
                <img src="../../../assets/extracted/ai_logo.png" alt="AI助手" />
                <div>
                  <p>你好，我是武汉数据智能研究院的智能助手，可以帮你梳理产业情报、分析技术趋势、生成结构化报告。请问今天想了解什么？</p>
                </div>
              </article>
              <footer class="ai-composer-real">
                <input placeholder="发送消息..." />
                <div>
                  <button>＋</button>
                  <button>联网搜索</button>
                  <button>深度思考</button>
                  <button>上传文件</button>
                </div>
                <button class="ai-send-real">↑</button>
              </footer>
            </section>
          </main>
        </div>
      </section>
</template>
