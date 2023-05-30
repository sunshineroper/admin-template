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
      next('/')
      NProgress.done()
    }
    const roleTreeRouter = store.roleTreeRouter
    if (roleTreeRouter.length > 0)
      loadRouter(router, roleTreeRouter)
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
