import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/normalize.css'
import 'element-plus/dist/index.css'
import 'uno.css'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store'

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
