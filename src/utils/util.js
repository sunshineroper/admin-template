import { MENU_FOLDER } from './type'

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

export const getMatchedTitle = (list, name) => {
  for (let i = 0; i < list.length; i++) {
    const now = list[i]
    if (now.name === name) {
      return [now]
    }

    else if (now.children && now.children.length > 0) {
      const router = getMatchedTitle(now.children, name)
      if (Array.isArray(router) && router.length > 0) {
        router.unshift(now)
        return router
      }
    }
  }
}

export function normaizeHiddenTree(treeList, list, func) {
  for (let i = 0; i < treeList.length; i++) {
    const tree = treeList[i]
    // eslint-disable-next-line max-statements-per-line
    if (func(tree)) { continue }
    else if (tree.children && tree.children.length > 0) {
      const newTree = {
        ...tree,
      }
      newTree.children = []
      normaizeHiddenTree(tree.children, newTree.children, func)
      if (newTree.children.length === 0)
        delete newTree.children
      list.push(newTree)
    }
    else {
      list.push(tree)
    }
  }
}

export const treeSort = (list, sortFunc) => {
  if (!sortFunc && typeof sortFunc !== 'function')
    sortFunc = (a, b) => a - b
  list.sort(sortFunc)
  deepTree(list, (item) => {
    if (item.type === MENU_FOLDER && item.children && item.children.length > 0)
      item.children.sort(sortFunc)
  })
}

export const normalizeUser = (user) => {
  if (!user)
    return {}
  let isAdmin = false
  const { role_list = [] } = user
  let role_menu = []
  if (role_list.length > 0) {
    for (const role of role_list) {
      if (role.level === 0)
        isAdmin = true
      role_menu = role_menu.concat(...role.role_menu)
    }
  }
  if (role_menu.length > 0 && !isAdmin) {
    role_menu = role_menu.filter((role, index) => {
      return role_menu.findIndex(item => item.id === role.id) === index
    })
  }
  return { user, role_menu }
}
