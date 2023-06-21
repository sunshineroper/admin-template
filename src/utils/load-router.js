import { deepTree } from './util'

const MENU_FOLDER = 1
export const loadRouter = (router, routerList = []) => {
  const module = import.meta.glob(('@/views/**/*.vue'))

  deepTree(routerList, (item) => {
    item.component = module[`/src/views/${item.component_path}.vue`]
    item.path = item.router_url
    item.meta = {
      title: item.title,
      icon: item.icon,
    }
  })

  routerList.forEach((r) => {
    if (r.path && r.type !== MENU_FOLDER)
      router.addRoute('layout', r)
  })
}
