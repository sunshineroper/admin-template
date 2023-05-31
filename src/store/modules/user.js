import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getMatchedTitle, normalizeTree } from '@/utils/util'

const cookies = useCookies(['locale'])
export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        name: 'sunshine',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      },
      isLogin: useLocalStorage('isLogin', false),
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
        noCache: true,
        path: '/edit',
        name: 'userEdit',
        componentPath: 'user/edit',
        meta: {
          icon: '',
          title: '用户信息修改',
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
      roleTreeRouter: [],
    }
  },
  actions: {
    changeIsLogin(bool) {
      this.isLogin = bool
    },
    setRoleTreeRouter() {
      normalizeTree(this.roleRouter, 0, this.roleTreeRouter)
    },
    changeLoginOut() {
      this.isLogin = false
      cookies.remove('histories')
      cookies.remove('currentTab')
    },
  },
  getters: {
    breadCrumbList: ({ roleTreeRouter }) => {
      return (name) => {
        const matched = getMatchedTitle(roleTreeRouter, name)
        let breadCrumbList = []
        if (matched.length > 0) {
          breadCrumbList = matched.map((item) => {
            const obj = {}
            if (item.children && item.children.length > 0)
              obj.path = ''

            else
              obj.path = { path: item.path }

            obj.title = item.meta.title
            return obj
          })
        }
        return breadCrumbList
      }
    },
  },
})
