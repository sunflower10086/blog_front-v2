import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/style/main.scss";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 使用Element-UI的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

setupRouter(app)
setupStore(app)

app.use(ElementPlus)

app.mount('#app')