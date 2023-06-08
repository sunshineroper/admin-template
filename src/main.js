import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/normalize.css'
import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import useDirective from '@/directive'
import 'uno.css'
import router from '@/router'
import pinia from '@/store'
import '@/permissions'

const app = createApp(App)
useDirective(app)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
