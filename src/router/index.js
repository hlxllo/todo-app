import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/menu',
      component: Menu
    }
  ],
  // 定制路由滚动行为
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router