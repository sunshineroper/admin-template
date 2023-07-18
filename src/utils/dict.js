import { computed } from 'vue'
import { appStore } from '@/store/modules/app'

export const getDict = (type) => {
  const store = appStore()
  if (!type)
    return []
  const dictMap = computed(() => store.dictMap)
  if (dictMap.value.has(type))
    return dictMap.value.get(type)
  return []
}

export const getDictLabel = (dict = [], code) => {
  if (!dict)
    return ''
  const dictMap = {}
  dict.forEach((item) => {
    dictMap[item.value] = item.label
  })
  return dictMap[code]
}

export const getDictValue = (dict = [], label) => {
  if (!dict)
    return ''
  const dictMap = {}
  dict.forEach((item) => {
    dictMap[item.label] = item.value
  })
  return dictMap[label]
}
