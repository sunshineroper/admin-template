import axios from 'axios'
import { ElNotification } from 'element-plus'
import qs from 'qs'
import { useLocalStorage } from '@vueuse/core'

import { userStore } from '@/store/modules/user'

const tokenErrorCode = [10040, 10042, 10052]
const excludeCode = [10041, 10051]

const peddingMap = new Map()
const requestPending = (config) => {
  const controller = new AbortController()
  config.signal = controller.signal

  const key = `${config.method || ''}${config.url || ''}?${qs.stringify(config.body)}`
  if (peddingMap.has(key)) {
    // 重复的取消上一次请求,并且从pedingMap中删除
    peddingMap.get(key).abort()
    peddingMap.delete(key)
  }

  else { peddingMap.set(key, controller) }
}
//
const config = {
  timeout: 1000 * 30,
  baseURL: import.meta.env.VITE_BASE_URL,
  validateStatus: status => status >= 200 && status <= 500,
  repeatRequest: false,
}
const service = axios.create(config)

service.interceptors.request.use((config) => {
  if (!config.repeatRequest)
    requestPending(config)
  config.headers.authorization = `Bearer ${useLocalStorage('accessToken', '').value}`
  config.headers['Content-Type'] = 'application/json'
  if (config.url === 'admin/user/refreshToken')
    config.headers.authorization = `Bearer ${useLocalStorage('refreshToken', '').value}`

  return config
})
service.interceptors.response.use((response) => {
  const { status, data } = response
  const { url } = response.config
  const key = `${response.config.method}${response.config.url}?${qs.stringify(config.body)}`
  peddingMap.delete(key)
  if (status.toString().charAt(0) === '2')
    return data
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let { code, message } = data
    const store = userStore()
    if (code === 10041 || code === 10051) {
      const cache = {}
      if (cache.url !== url)
        cache.url = url
      const { refreshToken, accessToken } = await service('user/refreshToken')
      store.setRefreshToken(refreshToken)
      store.setAccessToken(accessToken)
      const result = await service(response.config)
      resolve(result)
    }
    if (tokenErrorCode.includes(code)) {
      message = '登录过期请重新登录'
      store.changeLoginOut()
      const { origin } = window.location
      window.location.href = origin
      return resolve(null)
    }
    if (!excludeCode.includes(code)) {
      ElNotification({
        title: 'Tips',
        message,
        type: 'error',
      })
    }
    reject(data)
  })
}, (error) => {
  let message = error.message
  if (error.code === 'ERR_CANCELED')
    message = '请求速度太快!'

  ElNotification({
    title: 'Tips',
    message,
    type: 'error',
  })
  return Promise.reject(new Error(message))
})

export const get = (url, params = {}) => {
  return service({
    method: 'get',
    url,
    params,
  })
}

export const _delete = (url, params = {}) => {
  return service({
    method: 'delete',
    url,
    params,
  })
}

export const post = (url, data = {}, params = {}) => {
  return service({
    method: 'post',
    url,
    data,
    params,
  })
}

export const put = (url, data = {}, params = {}) => {
  return service({
    method: 'put',
    url,
    data,
    params,
  })
}
