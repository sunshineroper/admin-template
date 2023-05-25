import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/normalize.css'
import 'element-plus/dist/index.css'
import 'uno.css'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
