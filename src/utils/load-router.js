import { deepTree } from './util'

export const loadRouter = (router, routerList = []) => {
  const module = import.meta.glob(('@/views/**/*.vue'))
  deepTree(routerList, (item) => {
    item.component = module[`/src/views/${item.componentPath}.vue`]
  })
  routerList.forEach((r) => {
    router.addRoute('layout', r)
  })
}
