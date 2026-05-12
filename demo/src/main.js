import { createNavigationController, installNavigationGlobals } from './shared/navigation.js'
import { installVueRuntime } from './app/runtime.js'
import { hydrateLegacyRouteAttributes, routeForLegacyTarget } from './shared/legacyDomRoutes.js'

installVueRuntime()
hydrateLegacyRouteAttributes()

function getViews() {
  return Array.from(document.querySelectorAll('.view'))
}

function getFloatingButtons() {
  return Array.from(document.querySelectorAll('.page-switcher button'))
}

function getActiveViewId() {
  return getViews().find((view) => view.classList.contains('is-active'))?.id || 'homeView'
}

function activate(targetId) {
  getViews().forEach((view) => {
    view.classList.toggle('is-active', view.id === targetId)
  })

  getFloatingButtons().forEach((button) => {
    button.classList.toggle('is-active', button.dataset.target === targetId)
  })

  document.querySelectorAll('.nav-tab, .top-tabs button').forEach((button) => {
    if (!button.dataset.target) return
    button.classList.toggle('is-active', button.dataset.target === targetId)
  })

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

const navigation = createNavigationController({
  activate,
  getActiveViewId,
  syncRouteOnNavigate: true,
})

installNavigationGlobals(navigation)

document.addEventListener('click', (event) => {
  const button = event.target.closest?.('[data-target]')
  if (!button) return

  const route = button.dataset.route || routeForLegacyTarget(button.dataset.target)
  if (route) {
    event.preventDefault()
    navigation.navigateToRoute(route)
  }
})
