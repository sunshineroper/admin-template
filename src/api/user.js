import qs from 'qs'
import { _delete, get, post, put } from '@/utils/request'

export class User {
  static getUserList(query) {
    return get(`/user/getUserList?${qs.stringify(query)}`)
  }

  static addOrEditUser(data) {
    if (!data.id)
      return post('/user/addUser', data)
    else
      return put(`/user/editUser/${data.id}`, data)
  }

  static deleteUser(id) {
    return _delete (`/user/deleteUser/${id}`)
  }

  static getUserInfo() {
    return get ('/user/getUserInfo')
  }
}
