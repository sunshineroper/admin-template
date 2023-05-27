import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
}, {
  name: 'layout',
  component: layout,
  path: '/layout',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
    },
  }, {
    path: 'test1',
    name: 'test1',
    component: () => import('@/views/test/test1.vue'),
    meta: {
      title: '测试页1',
    },
  }, {
    path: 'test2',
    name: 'test2',
    component: () => import('@/views/test/test2.vue'),
    meta: {
      title: '测试页2',
    },
  }],
},
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
