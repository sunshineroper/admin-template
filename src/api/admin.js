import { _delete, get, post } from '@/utils/request'

export class Admin {
  static addMenu(data) {
    return post('admin/menu/addMenu', data)
  }

  static getMenuList() {
    return get('admin/menu/getMenuList')
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
}
