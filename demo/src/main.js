import { createNavigationController, installNavigationGlobals } from "./shared/navigation.js";

const views = Array.from(document.querySelectorAll(".view"));
const switchButtons = Array.from(document.querySelectorAll("[data-target]"));
const floatingButtons = Array.from(document.querySelectorAll(".page-switcher button"));
let toastTimer = null;
let homeSnapTimer = null;
let isAutoSnappingHome = false;
const HOME_SNAP_ENABLED = false;
const HOME_FEATURE_LAYOUT = {
  top: 690,
  width: 1475,
  height: 933,
  minLayoutWidth: 1366,
  maxLayoutWidth: 3840,
  designWidth: 1920,
  gapAfter: 25,
  statsHeight: 710,
};

const HOME_SNAP_POINTS = [
  { name: "hero", y: 0 },
  { name: "feature", y: 640 },
  { name: "stats", y: 1415 },
  { name: "partners", y: 2070 },
];

let activeQueryPanel = document.querySelector(".query-side-item.is-active")?.dataset.queryType || "org";

function isHomeActive() {
  return document.getElementById("homeView")?.classList.contains("is-active");
}

function getActiveViewId() {
  return views.find((view) => view.classList.contains("is-active"))?.id || "homeView";
}

function clampScrollTop(value) {
  const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(0, value), maxScrollTop);
}

function getHomeLayoutScale() {
  const scale = Number(getComputedStyle(document.documentElement).getPropertyValue("--home-layout-scale"));
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

function getHomeSnapTargets() {
  const layoutScale = getHomeLayoutScale();
  return HOME_SNAP_POINTS.map((point) => ({
    ...point,
    top: clampScrollTop(point.y * layoutScale),
  }));
}

function snapHomeScroll() {
  if (!isHomeActive() || isAutoSnappingHome) return;

  const targets = getHomeSnapTargets();
  if (!targets.length) return;

  const currentTop = window.scrollY;
  const nearest = targets.reduce((best, target) => {
    return Math.abs(target.top - currentTop) < Math.abs(best.top - currentTop) ? target : best;
  }, targets[0]);

  if (Math.abs(nearest.top - currentTop) < 36) return;

  isAutoSnappingHome = true;
  window.scrollTo({ top: nearest.top, left: 0, behavior: "smooth" });
  window.setTimeout(() => {
    isAutoSnappingHome = false;
  }, 560);
}

function scheduleHomeSnap() {
  updateHomeCalibrationReadout();
  if (!HOME_SNAP_ENABLED) return;
  if (!isHomeActive() || isAutoSnappingHome) return;
  window.clearTimeout(homeSnapTimer);
  homeSnapTimer = window.setTimeout(snapHomeScroll, 150);
}

function updateHomeCalibrationReadout() {
  const readout = document.getElementById("homeCalibrationReadout");
  if (!readout || !isHomeActive()) return;
  const scale = getComputedStyle(document.documentElement).getPropertyValue("--home-feature-scale").trim() || "1";
  const layoutScale = getComputedStyle(document.documentElement).getPropertyValue("--home-layout-scale").trim() || "1";
  const targets = getHomeSnapTargets();
  const nearest = targets.reduce((best, target) => {
    return Math.abs(target.top - window.scrollY) < Math.abs(best.top - window.scrollY) ? target : best;
  }, targets[0]);
  readout.textContent = `Y ${Math.round(window.scrollY)} / ${nearest.name} ${Math.round(nearest.top)} / CW ${document.documentElement.clientWidth} / VH ${window.innerHeight} / L ${Number(layoutScale).toFixed(2)} / S ${Number(scale).toFixed(2)}`;
}

function updateHomeFeatureLayout() {
  const root = document.documentElement;
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const layoutWidth = Math.min(
    HOME_FEATURE_LAYOUT.maxLayoutWidth,
    Math.max(HOME_FEATURE_LAYOUT.minLayoutWidth, viewportWidth)
  );
  const layoutScale = layoutWidth / HOME_FEATURE_LAYOUT.designWidth;
  const scale = Math.min(
    1,
    (window.innerHeight * 0.9) / (HOME_FEATURE_LAYOUT.height * layoutScale)
  );
  const featureHeight = HOME_FEATURE_LAYOUT.height * scale;
  const statsY = HOME_FEATURE_LAYOUT.top + featureHeight + HOME_FEATURE_LAYOUT.gapAfter;
  const partnersY = statsY + HOME_FEATURE_LAYOUT.statsHeight;
  const realHeight = partnersY + 757;

  root.style.setProperty("--home-feature-scale", scale.toFixed(4));
  root.style.setProperty("--home-feature-total-scale", (layoutScale * scale).toFixed(4));
  root.style.setProperty("--home-layout-w", `${Math.round(layoutWidth)}px`);
  root.style.setProperty("--home-layout-scale", layoutScale.toFixed(4));
  root.style.setProperty("--home-feature-visual-h", `${Math.round(featureHeight)}px`);
  root.style.setProperty("--home-stats-y", `${Math.round(statsY)}px`);
  root.style.setProperty("--home-partners-y", `${Math.round(partnersY)}px`);
  root.style.setProperty("--home-hero-h-scaled", `${Math.round(1010 * layoutScale)}px`);
  root.style.setProperty("--home-partners-y-scaled", `${Math.round(partnersY * layoutScale)}px`);
  root.style.setProperty("--home-real-h", `${Math.round(realHeight * layoutScale)}px`);
  updateHomeCalibrationReadout();
}

function syncQueryDetailHeight() {
  const queryView = document.getElementById("queryView");
  if (!queryView?.classList.contains("is-active")) return;

  const queryReal = queryView.querySelector(".query-real");
  const content = queryView.querySelector(".query-detail-content");
  if (!queryReal || !content) return;

  if (content.classList.contains("is-search-mode")) {
    queryReal.style.minHeight = `${Math.max(window.innerHeight, 1363)}px`;
    return;
  }

  const activePanel = queryView.querySelector(".query-detail-page.is-active");
  if (!activePanel) return;

  const minHeight = Math.ceil(content.offsetTop + activePanel.scrollHeight + 120);
  queryReal.style.minHeight = `${Math.max(window.innerHeight, minHeight)}px`;
}

function showQuerySearchMode() {
  const queryView = document.getElementById("queryView");
  const content = queryView?.querySelector(".query-detail-content");
  if (!content) return;

  content.classList.add("is-search-mode");
  queryView.querySelectorAll(".query-detail-page").forEach((panel) => {
    panel.classList.remove("is-active");
  });
  requestAnimationFrame(syncQueryDetailHeight);
}

function showQueryDetailPanel(queryType) {
  const queryView = document.getElementById("queryView");
  const content = queryView?.querySelector(".query-detail-content");
  const targetPanel = queryType
    ? queryView?.querySelector(`.query-detail-page[data-query-panel="${queryType}"]`)
    : null;

  if (!content || !targetPanel) return false;

  content.classList.remove("is-search-mode");
  queryView.querySelectorAll(".query-detail-page").forEach((panel) => {
    panel.classList.toggle("is-active", panel === targetPanel);
  });
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  requestAnimationFrame(syncQueryDetailHeight);
  return true;
}

function getQueryTypeFromRoute(route) {
  const value = String(route || window.location.hash || "").trim();
  const withoutHash = value.startsWith("#") ? value.slice(1) : value;
  const normalized = withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;
  const path = normalized.split("?")[0];
  const match = path.match(/^\/query\/([^/]+)$/);
  return match?.[1] || null;
}

function setActiveQueryType(queryType) {
  if (!queryType) return;
  activeQueryPanel = queryType;
  document.querySelectorAll(".query-side-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.queryType === queryType);
  });
}

function showQueryRoute(route) {
  const queryType = getQueryTypeFromRoute(route);
  if (queryType) {
    setActiveQueryType(queryType);
    if (showQueryDetailPanel(queryType)) return;
  }

  showQuerySearchMode();
}

function activate(targetId, options = {}) {
  views.forEach((view) => {
    view.classList.toggle("is-active", view.id === targetId);
  });

  floatingButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === targetId);
  });

  document.querySelectorAll(".nav-tab, .top-tabs button").forEach((button) => {
    if (!button.dataset.target) return;
    button.classList.toggle("is-active", button.dataset.target === targetId);
  });

  isAutoSnappingHome = true;
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  window.setTimeout(() => {
    isAutoSnappingHome = false;
  }, 120);

  if (targetId === "queryView") {
    showQueryRoute(options.route);
  }
}

function showToast(message) {
  let toast = document.querySelector(".ui-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "ui-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

const navigation = createNavigationController({
  activate,
  getActiveViewId,
  syncHashOnNavigate: true,
});

installNavigationGlobals(navigation);

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    if (target) navigation.navigateToView(target);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "1") navigation.navigateToView("homeView");
  if (event.key === "2") navigation.navigateToView("queryView");
  if (event.key === "3") navigation.navigateToView("aiView");
});

window.addEventListener("scroll", scheduleHomeSnap, { passive: true });
window.addEventListener("resize", () => {
  updateHomeFeatureLayout();
  syncQueryDetailHeight();
});
updateHomeFeatureLayout();

document.querySelectorAll(".query-side-item-legacy-disabled").forEach((button) => {
  button.addEventListener("click", () => {
    const queryType = button.dataset.queryType;
    const targetPanel = null;
    document.querySelectorAll(".query-side-item").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    if (!targetPanel) {
      document.querySelectorAll(".query-detail-page").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.queryPanel === activeQueryPanel);
      });
      showToast("该类型详情页待接入");
      return;
    }

    activeQueryPanel = queryType;
    document.querySelectorAll(".query-detail-page").forEach((panel) => {
      panel.classList.toggle("is-active", panel === targetPanel);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    requestAnimationFrame(syncQueryDetailHeight);
  });
});

document.querySelectorAll(".query-side-item").forEach((button) => {
  button.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const queryType = button.dataset.queryType;
      setActiveQueryType(queryType || activeQueryPanel);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      navigation.navigateToRoute("/query", { replace: true });
    },
    true,
  );
});

const querySearchButton = document.querySelector(".query-keyword-row button");
const querySearchInput = document.querySelector(".query-keyword-row input");

querySearchButton?.addEventListener("click", () => {
  const queryType = document.querySelector(".query-side-item.is-active")?.dataset.queryType || activeQueryPanel;
  activeQueryPanel = queryType;

  if (document.querySelector(`.query-detail-page[data-query-panel="${queryType}"]`)) {
    navigation.navigateToRoute(`/query/${queryType}`);
  } else {
    showQuerySearchMode();
    showToast("期刊详情页暂未接入");
  }
});

querySearchInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  querySearchButton?.click();
});

document.querySelectorAll(".ai-menu-real button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".ai-menu-real button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    showToast(button.dataset.aiMenu === "favorite" ? "已切换到收藏" : "已切换到历史记录");
  });
});

document.querySelectorAll(".ai-recent button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".ai-recent button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
});

document.querySelector(".ai-new-real")?.addEventListener("click", () => {
  document.querySelectorAll(".ai-recent button").forEach((item) => item.classList.remove("is-active"));
  const input = document.querySelector(".ai-composer-real input");
  if (input) {
    input.value = "";
    input.focus();
  }
  const button = document.querySelector(".ai-new-real");
  button?.classList.add("is-flashing");
  setTimeout(() => button?.classList.remove("is-flashing"), 500);
  showToast("已新建对话");
});

document.querySelectorAll(".ai-suggestions button").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector(".ai-composer-real input");
    if (input) {
      input.value = button.textContent.trim();
      input.focus();
    }
  });
});

document.querySelector(".ai-send-real")?.addEventListener("click", () => {
  const input = document.querySelector(".ai-composer-real input");
  if (input && input.value.trim()) {
    showToast("消息已加入模拟对话");
    input.value = "";
  } else {
    showToast("请输入问题后发送");
  }
});
