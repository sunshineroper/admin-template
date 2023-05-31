import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { userStore } from '@/store/modules/user.js'
import { loadRouter } from '@/utils/load-router.js'

router.beforeEach((to, from, next) => {
  const store = userStore()
  NProgress.start()
  if (store.isLogin) {
    if (to.name === 'login') {
      next({ name: 'dashboard' })
      NProgress.done()
    }
    const roleRouter = store.roleRouter
    if (store.roleTreeRouter.length === 0) {
      store.setRoleTreeRouter()
      loadRouter(router, roleRouter)
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