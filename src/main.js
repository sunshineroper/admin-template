import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/normalize.css'
import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import App from './App.vue'
import useDirective from '@/directive'
import 'uno.css'
import router from '@/router'
import pinia from '@/store'
import '@/permissions'
import 'vxe-table/lib/style.css'

const app = createApp(App)
useDirective(app)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(VXETable)
app.mount('#app')
