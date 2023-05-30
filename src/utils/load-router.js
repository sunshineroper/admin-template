export const deepTree = (list, func) => {
  if (Array.isArray(list)) {
    list.forEach(item => deepTree(item, func))
  }
  else if (list.children && list.children.length > 0) {
    deepTree(list.children, func)
    func(list)
  }

  else { func(list) }
}

export const loadRouter = (router, routerList = []) => {
  const module = import.meta.glob(('@/views/**/*.vue'))
  deepTree(routerList, (item) => {
    item.component = module[`/src/views/${item.componentPath}.vue`]
  })
  routerList.forEach((r) => {
    router.addRoute('layout', r)
  })
}

export const normalizeTree = (list, pid, tree) => {
  list.forEach((l) => {
    if (l.pid === pid) {
      const item = {
        ...l,
        children: [],
      }
      normalizeTree(list, l.id, item.children)
      if (item.children.length === 0)
        delete item.children
      tree.push(item)
    }
  })
}
