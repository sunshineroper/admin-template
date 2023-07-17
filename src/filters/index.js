import dayjs from 'dayjs'

const formatDate = (val, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(val).format(format)
}
export default (app) => {
  app.config.globalProperties.$filters = {
    formatDate,
  }
}
