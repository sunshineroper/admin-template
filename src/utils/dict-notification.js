import { ElNotification } from 'element-plus'
import { getDict, getDictValue } from './dict'

const notification = (code = 0, message, maxCodeType = 'max-success-code') => {
  const maxCodeDict = getDict(maxCodeType)
  const maxCode = getDictValue(maxCodeDict, 'success')
  let type = 'success'
  if (+code > +maxCode)
    type = 'error'

  return new Promise((resolve, reject) => {
    ElNotification({
      title: 'Tips',
      message,
      type,
    })
    if (+code < +maxCode)
      resolve()
  })
}

export default notification
