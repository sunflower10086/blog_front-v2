import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/style/main.scss";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { themeConfig } from './assets/themeConfig.mjs'

// 动态加载CDN资源
const injectResources = () => {
  const headerConfig = themeConfig.inject.header || []
  headerConfig.forEach(([tag, attrs]) => {
    if (tag === 'link') {
      const link = document.createElement('link')
      Object.entries(attrs).forEach(([key, value]) => {
        link.setAttribute(key, value)
      })
      document.head.appendChild(link)
    }
  })
}

// 初始化应用
const app = createApp(App)

// 使用Element-UI的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

setupRouter(app)
setupStore(app)

app.use(ElementPlus)

// 在挂载应用之前加载资源
injectResources()

app.mount('#app')