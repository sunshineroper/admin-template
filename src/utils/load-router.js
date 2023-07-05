import { deepTree, normaizeHiddenTree, normalizeTree } from './util'
import { MENU_FOLDER } from './type'

export const loadRouter = (router, routerList = []) => {
  const treeList = []
  const list = []
  normalizeTree(routerList, 0, treeList)
  normaizeHiddenTree(treeList, list, item => item.status === 0)
  const module = import.meta.glob(('@/views/**/*.vue'))
  deepTree(list, (item) => {
    if (item !== MENU_FOLDER) {
      item.component = module[`/src/views/${item.component_path}.vue`]
      item.path = item.router_url

      item.meta = {
        title: item.title,
        icon: item.icon,
      }
    }
  })
  deepTree(list, (r) => {
    if (r.path && r.type !== MENU_FOLDER)
      router.addRoute('layout', r)
  })
}
