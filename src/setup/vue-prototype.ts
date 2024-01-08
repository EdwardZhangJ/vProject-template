import type { App } from 'vue'

/** 挂载到vue原型链上Prototype */
export default function setupVuePrototype(app: App) {
  app.config.globalProperties.$config = window.ApiDev
  window.app = app
}
