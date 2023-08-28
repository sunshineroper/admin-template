import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { appStore } from './store/modules/app'
import router from '@/router'
import { userStore } from '@/store/modules/user.js'
import { User as UserApi } from '@/api/user'
import { Admin as AdminApi } from '@/api/admin'
import { loadRouter } from '@/utils/load-router'
import { normalizeUser } from '@/utils/util'

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  const appstore = appStore()
  NProgress.start()
  if (store.isLogin) {
    if (to.name === 'login') {
      next({ name: 'dashboard' })
      NProgress.done()
    }

    const userInfo = store.userInfo
    if (Object.keys(userInfo).length === 0) {
      const user = await UserApi.getUserInfo()
      const dict_list = await AdminApi.getDictMapList()
      appstore.setDictList(dict_list)
      const { role_menu } = normalizeUser(user)
      store.setRoleRouter(role_menu)
      store.setUserInfo(user)
      loadRouter(router, store.roleRouter)
      next({ path: to.path })
    }
    next()
    NProgress.done()
  }
  else {
    if (to.name === 'login') {
      next()
      NProgress.done()
    }
    next('/login')
    NProgress.done()
  }
})
