import { post } from '@/utils/request'

export class Public {
  static login() {
    return post('v1/public/login')
  }
}
