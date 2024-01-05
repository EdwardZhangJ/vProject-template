import { createApp } from 'vue'
import { setupStore } from './store'

import './style.css'
import 'virtual:uno.css'
import App from './App.vue'

/**
 * main.ts entry files
 * mount dom element #app
 **/ 
function setupApp() {
  const app = createApp(App)

  // use pinia
  setupStore(app)

  // mount #app element
  app.mount('#app')
}

setupApp()
