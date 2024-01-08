import { createApp } from 'vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupVuePrototype } from './setup'

import './style.css'
import 'virtual:uno.css'
import App from './App.vue'

/**
 * main.ts entry files
 * mount dom element #app
 **/ 
async function setupApp() {
  const app = createApp(App)

  // use pinia
  setupStore(app)
  
  setupVuePrototype(app)

  // 挂载路由
  await setupRouter(app)

  // mount #app element
  app.mount('#app')
}

setupApp()
