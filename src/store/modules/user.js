import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { treeSort } from '../../utils/util'
import { getMatchedTitle, normaizeHiddenTree, normalizeTree } from '@/utils/util'

const cookies = useCookies(['locale'])
export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        name: 'sunshine',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      },
      isLogin: useLocalStorage('isLogin', false),
      isAdmin: useLocalStorage('isAdmin', true),
      roleRouter: [],
      accessToken: useLocalStorage('accessToken', ''),
      refreshToken: useLocalStorage('refreshToken', ''),
    }
  },
  actions: {
    changeIsLogin(bool) {
      this.isLogin = bool
    },
    setRoleRouter(list) {
      this.roleRouter = list
    },
    changeLoginOut() {
      this.isLogin = false
      cookies.remove('histories')
      cookies.remove('currentTab')
    },
    setAccessToken(val) {
      this.accessToken = val
    },
    setRefreshToken(val) {
      this.refreshToken = val
    },
  },
  getters: {
    roleTreeRouter: ({ roleRouter }) => {
      const roleTreeRouter = []
      normalizeTree(roleRouter, 0, roleTreeRouter)

      const list = []
      // 隐藏禁用status为 1 禁用的菜单 隐藏hidden为1的菜单
      normaizeHiddenTree(roleTreeRouter, list, item => item.status === 0 || item.hidden === 1)
      // 并且根据sort排序
      treeSort(list, (a, b) => a.sort - b.sort)
      return list
    },
    breadCrumbList() {
      return (name) => {
        const matched = getMatchedTitle(this.roleTreeRouter, name)
        let breadCrumbList = []
        if (matched && matched.length > 0) {
          breadCrumbList = matched.map((item) => {
            const obj = {}
            if (item.children && item.children.length > 0)
              obj.path = ''

            else
              obj.path = { path: item.path }

            obj.title = item.title
            return obj
          })
        }
        return breadCrumbList
      }
    },
  },
})
