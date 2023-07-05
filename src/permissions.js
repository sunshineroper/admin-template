import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { userStore } from '@/store/modules/user.js'
import { Admin as AdminApi } from '@/api/admin'
import { loadRouter } from '@/utils/load-router'
import { normalizeUser } from '@/utils/util'

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  NProgress.start()
  if (store.isLogin) {
    if (to.name === 'login') {
      next({ name: 'dashboard' })
      NProgress.done()
    }

    const userInfo = store.userInfo
    if (Object.keys(userInfo).length === 0) {
      const user = await AdminApi.getUserInfo()
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
