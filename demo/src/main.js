const views = Array.from(document.querySelectorAll(".view"));
const switchButtons = Array.from(document.querySelectorAll("[data-target]"));
const floatingButtons = Array.from(document.querySelectorAll(".page-switcher button"));
let toastTimer = null;

function activate(targetId) {
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

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    if (target) activate(target);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "1") activate("homeView");
  if (event.key === "2") activate("queryView");
  if (event.key === "3") activate("aiView");
});

document.querySelectorAll(".query-side-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".query-side-item").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
});

document.querySelectorAll(".ai-menu-real button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".ai-menu-real button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    showToast(button.dataset.aiMenu === "favorite" ? "已切换到收藏夹" : "已切换到对话");
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
  showToast("已新建空白对话");
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
    showToast("演示模式：消息已记录");
    input.value = "";
  } else {
    showToast("请输入消息");
  }
});
