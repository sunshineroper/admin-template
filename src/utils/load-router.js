import { deepTree } from './util'
import { userStore } from '@/store/modules/user'
import adminRouter from '@/router/admin-router'

export const loadRouter = (router, routerList = []) => {
  const store = userStore()

  const module = import.meta.glob(('@/views/**/*.vue'))

  deepTree(routerList, (item) => {
    item.component = module[`/src/views/${item.componentPath}.vue`]
  })
  // 如果是admin用户的话加载adminRouter
  if (store.isAdmin)
    routerList = routerList.concat(...adminRouter)

  routerList.forEach((r) => {
    router.addRoute('layout', r)
  })
  // 生成侧边栏
  store.setRoleTreeRouter(adminRouter)
}
