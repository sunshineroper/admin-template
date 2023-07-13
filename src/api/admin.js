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

  static getDictList() {
    return get ('admin/dict/getDictList')
  }

  static addOrEditDict(data) {
    if (!data.id)
      return post('admin/dict/addDict', data)
    else
      return put(`admin/dict/editDict/${data.id}`, data)
  }

  static getDictDetailList(query) {
    return get (`admin/dict/getDictDetailList?${qs.stringify(query)}`)
  }

  static addOrEditDictDetail(data = {}) {
    if (!data.id)
      return post('admin/dict/addDictDetail', data)
    else
      return put(`admin/dict/editDictDetail/${data.id}`, data)
  }

  static deleteDictionary(id) {
    return _delete(`admin/dict/${id}`)
  }

  static deleteDictionaryDetail(id) {
    return _delete(`admin/dict-detail/${id}`)
  }

  static getDictMapList() {
    return get ('admin/dict/getDictMapList')
  }

  static getApiPageList(query) {
    return get (`admin/api/getApiPageList?${qs.stringify(query)}`)
  }

  static getApiList() {
    return get ('admin/api/getList')
  }

  static getPerissionRouterName() {
    return get ('admin/api/getPerissionRouterName')
  }

  static getLogList() {
    return get('admin/log/getList')
  }
}
