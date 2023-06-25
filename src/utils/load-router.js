import { deepTree } from './util'
import { MENU_FOLDER } from './type'

export const loadRouter = (router, routerList = []) => {
  const module = import.meta.glob(('@/views/**/*.vue'))

  deepTree(routerList, (item) => {
    if (item !== MENU_FOLDER) {
      item.component = module[`/src/views/${item.component_path}.vue`]
      item.path = item.router_url
      // eslint-disable-next-line no-self-assign
      item.meta = item.meta
    }
  })

  deepTree(routerList, (r) => {
    if (r.path && r.type !== MENU_FOLDER)
      router.addRoute('layout', r)
  })
}
