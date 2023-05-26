import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/normalize.css'
import 'element-plus/dist/index.css'
import router from '@/router'
import 'uno.css'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
