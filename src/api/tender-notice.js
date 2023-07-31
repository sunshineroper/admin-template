import qs from 'qs'
import { _delete, get, post, put } from '@/utils/request'

export class TenderNotice {
  static saveOrEdit(body) {
    if (!body.id)
      return post('/v1/tender-notice/add', body)
    else
      return put(`/v1/tender-notice/${body.id}`, body)
  }

  static getPageList(query) {
    return get(`/v1/tender-notice/getPageList?${qs.stringify(query)}`)
  }

  static delete(id) {
    return _delete(`/v1/tender-notice/${id}`)
  }

  static getContentAndFile(id) {
    return get(`/v1/tender-notice/getContentAndFile/${id}`)
  }
}
