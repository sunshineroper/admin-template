import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
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
      roleTreeRouter: [],
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
      this.setRoleTreeRouter()
    },
    setRoleTreeRouter() {
      this.roleTreeRouter = []
      normalizeTree(this.roleRouter, 0, this.roleTreeRouter)
      const list = []
      // 隐藏hidden为true的菜单
      normaizeHiddenTree(this.roleTreeRouter, list, (item) => {
        if (item.hidden === 1)
          return true
        return false
      })
      this.roleTreeRouter = list
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
    breadCrumbList: ({ roleTreeRouter }) => {
      return (name) => {
        const matched = getMatchedTitle(roleTreeRouter, name)
        let breadCrumbList = []
        if (matched && matched.length > 0) {
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
