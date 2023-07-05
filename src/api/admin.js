import qs from 'qs'
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

  static getUserList(query) {
    return get(`admin/user/getUserList?${qs.stringify(query)}`)
  }

  static addUser(data) {
    return post('admin/user/addUser', data)
  }

  static editUser(id, data) {
    return post(`admin/user/editUser/${id}`, data)
  }

  static deleteUser(id) {
    return _delete (`admin/user/deleteUser/${id}`)
  }

  static getUserInfo() {
    return get ('admin/user/getUserInfo')
  }

  static getDictList() {
    return get ('admin/dict/getDictList')
  }

  static addDict(data) {
    return post('admin/dict/addDict', data)
  }

  static editDict(id, data) {
    return put(`admin/dict/editDict/${id}`, data)
  }

  static getDictDetailList(query) {
    return get (`admin/dict/getDictDetailList?${qs.stringify(query)}`)
  }

  static addDictDetail(data = {}) {
    if (!data.id)
      return post('admin/dict/addDictDetail', data)
    else
      return put(`admin/dict/editDictDetail/${data.id}`, data)
  }
}
