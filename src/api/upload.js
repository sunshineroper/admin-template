import { _delete } from '@/utils/request'

export class Upload {
  static deleteFile(id) {
    return _delete(`/upload/${id}`)
  }
}
