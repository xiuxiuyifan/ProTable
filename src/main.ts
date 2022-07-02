import { Component, createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import store from './store'
import registerComponent from './utils/registerComponent'

import 'element-plus/dist/index.css'
import './assets/styles/common.less'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {
  size: 'default',
  zIndex: 3000,
  locale: zhCn
})
app.use(registerComponent)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as Component)
}
app.mount('#app')
