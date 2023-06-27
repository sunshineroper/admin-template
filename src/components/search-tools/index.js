import { shallowRef } from 'vue'
import search from './search.vue'
import refresh from './refersh.vue'

export const toolsComponentsName = new Map()
toolsComponentsName.set('search', search)
toolsComponentsName.set('refresh', refresh)

export const toolsComponents = shallowRef([search, refresh])
