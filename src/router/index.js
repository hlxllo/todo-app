import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Overview from '@/views/Overview/index.vue'
import Today from '@/views/Today/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'overview',
          component: Overview
        },
        {
          path: 'today',
          component: Today
        }
      ]
    }
  ],
  // 定制路由滚动行为
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router