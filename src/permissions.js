import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { userStore } from '@/store/modules/user.js'
import { Admin as AdminApi } from '@/api/admin'
import { loadRouter } from '@/utils/load-router'

router.beforeEach(async (to, from, next) => {
  const store = userStore()
  NProgress.start()
  if (store.isLogin) {
    if (to.name === 'login') {
      next({ name: 'dashboard' })
      NProgress.done()
    }

    const roleRouter = store.roleRouter
    if (roleRouter.length === 0) {
      const list = await AdminApi.getMenuList()
      store.setRoleRouter(list)
      loadRouter(router, list)
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
