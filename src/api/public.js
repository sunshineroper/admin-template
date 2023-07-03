import { post } from '@/utils/request'

export class Public {
  static login(body) {
    return post('v1/public/login', body)
  }
}
