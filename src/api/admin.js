import { get, post } from '@/utils/request'

export class Admin {
  static addMenu(data) {
    return post('admin/menu/addMenu', data)
  }

  static getMenuList() {
    return get('admin/menu/getMenuList')
  }
}
