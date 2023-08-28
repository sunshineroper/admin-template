import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
}, {
  name: 'layout',
  component: layout,
  path: '/',
  children: [{
    path: '',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
    },
  }, {
    path: '/404',
    name: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
    },
  }, {
    path: '/notify',
    name: 'notify',
    component: () => import('@/views/notify/notify.vue'),
    meta: {
      title: '系统通知',
    },
  }, {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/profile.vue'),
    meta: {
      title: '个人信息',
    },
  }],
},
// {
//   path: '/:catchAll(.*)',
//   redirect: '/404',
// },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
