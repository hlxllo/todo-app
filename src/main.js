// import './assets/main.css'

import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

// 安装路由器
app.use(router)
// 挂载应用
app.mount('#app')