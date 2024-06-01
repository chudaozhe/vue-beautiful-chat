import Launcher from './Launcher.vue'

const defaultComponentName = 'BeautifulChat'

const Plugin = {
  install(app, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    // this.event = new app.config.globalProperties.$eventBus // 使用全局事件总线
    this.dynamicContainer = null
    this.componentName = options.componentName || defaultComponentName
    /**
     * Plugin API
     */
    app.config.globalProperties.$chat = {
      _setDynamicContainer(dynamicContainer) {
        Plugin.dynamicContainer = dynamicContainer
      }
    }
    /**
     * Sets custom component name (if provided)
     */
    app.component(this.componentName, Launcher)
  }
}

export default Plugin
