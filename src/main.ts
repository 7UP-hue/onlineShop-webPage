/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 10:34:09
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-03 22:03:36
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).mount('#app')
