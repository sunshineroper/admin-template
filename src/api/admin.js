import { _delete, get, post, put } from '@/utils/request'

export class Admin {
  static addMenu(data) {
    return post('admin/menu/addMenu', data)
  }

  static getMenuList() {
    return get('admin/menu/getMenuList')
  }

  static getMenuByRouterName(query) {
    return get('admin/menu/getMenuByRouterName', query)
  }

  static deleteMenu(id) {
    return _delete (`admin/menu/deleteMenu/${id}`)
  }

  static addRole(data) {
    return post('admin/role/addRole', data)
  }

  static getRoleList() {
    return get('admin/role/getRoleList')
  }

  static deleteRole(id) {
    return _delete (`admin/role/deleteRole/${id}`)
  }

  static dispatchPermissions(id, data) {
    return put (`admin/role/dispatchPermissions/${id}`, data)
  }
}
