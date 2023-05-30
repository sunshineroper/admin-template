import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { normalizeTree } from '@/utils/load-router'

export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {},
      isLogin: useLocalStorage(false),
      roleRouter: [{
        id: 1,
        pid: 0,
        hidden: false,
        path: 'test1',
        name: 'test1',
        componentPath: 'test/test1',
        // component: () => import('@/views/test/test1.vue'),
        meta: {
          icon: '',
          title: '测试页1',
        },
      }, {
        id: 2,
        pid: 0,
        hidden: false,
        path: '/usermanager',
        name: 'usermanager',
        componentPath: 'test/test1',
        meta: {
          title: '用户管理',
        },
        // component: () => import('@/views/test/test1.vue')
      },
      {
        id: 101,
        pid: 2,
        hidden: false,
        path: '/edit',
        name: 'userEdit',
        componentPath: 'test/test1',
        meta: {
          icon: '',
          title: '用户列表',
        },
      },
      {
        id: 102,
        pid: 2,
        hidden: false,
        path: '/group-list',
        name: 'groupList',
        componentPath: 'test/test2',
        meta: {
          icon: '',
          title: '分组列表',
        },
      }, {
        id: 3,
        pid: 0,
        hidden: false,
        path: '/test2',
        name: 'test2',
        componentPath: 'test/test2',
        // component: () => import('@/views/test/test2.vue'),
        meta: {
          title: '测试页2',
        },
      }],
    }
  },
  actions: {
    changeIsLogin(bool) {
      this.isLogin = bool
    },
  },
  getters: {
    roleTreeRouter: ({ roleRouter }) => {
      const tree = []
      normalizeTree(roleRouter, 0, tree)
      return tree
    },
  },
})
