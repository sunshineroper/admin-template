import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { userStore } from '@/store/modules/user.js'

router.beforeEach((to, from, next) => {
  const store = userStore()
  NProgress.start()
  if (store.isLogin) {
    if (to.name === 'login') {
      next('/')
      NProgress.done()
    }
    const roleTreeRouter = store.roleTreeRouter
    if (roleTreeRouter.length > 0) {
      const module = import.meta.glob(('@/views/**/*.vue'))
      roleTreeRouter.forEach((r) => {
        router.addRoute('layout', {
          path: r.path,
          name: r.name,
          component: module[`/src/views/${r.componentPath}.vue`],
          meta: r.meta,
        })
      })
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
