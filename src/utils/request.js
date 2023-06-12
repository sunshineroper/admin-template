import axios from 'axios'
import { ElNotification } from 'element-plus'
import { userStore } from '@/store/modules/user'

const peddingMap = new Map()
const requestPending = (config) => {
  const controller = new AbortController()
  config.signal = controller.signal

  const key = `${config.method || ''}${config.url || ''}`
  if (peddingMap.has(key)) {
    // 重复的取消上一次请求,并且从pedingMap中删除
    peddingMap.get(key).abort()
    peddingMap.delete(key)
  }

  else { peddingMap.set(key, controller) }
}
const store = userStore()
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
  config.headers.authorization = `Bearer ${store.accessToken}`
  config.headers['Content-Type'] = 'application/json'
  return config
})
service.interceptors.response.use((response) => {
  const { status, data } = response
  const key = `${response.config.method}${response.config.url}`
  peddingMap.delete(key)
  if (status.toString().charAt(0) === '2')
    return data
  ElNotification({
    title: 'Tips',
    message: data.message,
    type: 'error',
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

export const post = (url, body = {}, params = {}) => {
  return service({
    method: 'post',
    url,
    body,
    params,
  })
}
