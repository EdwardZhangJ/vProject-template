import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('../views/home/index.vue'),
  //   name: 'home',
  // },
  {
    path: '/',
    component: () => import('../views/category/index.vue'),
    name: 'category',
  },
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})

export async function setupRouter(app: App) {
  app.use(router)
  // createRouterGuard(router)
  await router.isReady()
}
