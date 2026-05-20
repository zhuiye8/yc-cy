<template>
  <section class="view view-ai is-active" id="aiView" aria-label="AI分析">
    <div class="ai-real" aria-label="AI分析工作台">
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
        <button class="ai-new-real" type="button">+ <span>新建分析</span></button>
        <button class="ai-export-real" type="button">导出对话</button>

        <section class="ai-guide-block" aria-label="分析角色">
          <h3>分析角色</h3>
          <div class="ai-role-grid">
            <button class="is-active" type="button" data-ai-role="government">政府决策</button>
            <button type="button" data-ai-role="finance">金融尽调</button>
            <button type="button" data-ai-role="research">科研学者</button>
          </div>
        </section>

        <section class="ai-guide-block ai-template-block" aria-label="提示词引导">
          <h3>提示词引导</h3>
          <button class="is-active" type="button" data-ai-template="chainGap">产业链短板诊断</button>
          <button type="button" data-ai-template="companyDiligence">企业科技能力尽调</button>
          <button type="button" data-ai-template="literatureReview">文献综述框架</button>
          <button type="button" data-ai-template="investmentList">招商补链清单</button>
        </section>
      </aside>

      <main class="ai-content-real">
        <section class="ai-hero-real">
          <h1>AI 分析工作台</h1>
          <p>输入自然语言，系统会帮你补全分析角色、对象、范围和输出格式，再生成带数据来源的结论。</p>
        </section>

        <section class="ai-chat-real">
          <article class="ai-answer ai-answer-greeting">
            <img src="../../../assets/extracted/ai_logo.png" alt="AI" />
            <div>
              <h2>你可以直接提问，也可以选择左侧模板</h2>
              <p>我会把问题整理成适合检索和分析的提示词，再基于产业链节点、企业、空间态势、专利和文献等来源生成回答。数据来源会跟随每次回复展示，方便后续校验。</p>
            </div>
          </article>

          <div class="ai-suggestions">
            <button type="button" data-ai-example="帮我分析低空经济产业链在全国范围内的短板、优势地区和招商补链方向。">产业链短板诊断</button>
            <button type="button" data-ai-example="请评估一家企业的科技能力，重点看专利质量、合作机构和技术方向。">企业科技尽调</button>
            <button type="button" data-ai-example="围绕机器视觉缺陷检测方向生成一份文献综述框架，并列出需要引用的数据来源。">文献综述框架</button>
          </div>

          <div class="ai-composer-real">
            <textarea data-ai-input rows="1" placeholder="输入你的问题，例如：分析武汉机器人产业链短板，并给出可验证的数据来源"></textarea>
            <div class="ai-tool-row">
              <button type="button" data-ai-action="enhance">优化提示词</button>
              <button type="button" data-ai-action="sources">锁定来源</button>
              <button type="button" data-ai-action="format">报告格式</button>
            </div>
            <button class="ai-send-real" type="button" aria-label="发送">↑</button>
          </div>
        </section>
      </main>
    </div>
  </section>
</template>
