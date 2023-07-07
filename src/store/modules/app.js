import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => {
    return {
      hasTagsTable: false,
      sideCollapse: false,
      dictList: [],
    }
  },
  actions: {
    changeTagsTable(bool) {
      this.hasTagsTable = bool
    },
    changeSideCollapse(bool) {
      this.sideCollapse = bool
    },
    setDictList(val) {
      this.dictList = val
    },
  },
  getters: {
    dictMap: ({ dictList }) => {
      const dictMap = new Map()
      if (dictList.length > 0) {
        dictList.forEach((dict) => {
          if (!dictMap.has(dict.name_en))
            dictMap.set(dict.name_en, dict.dict_value)
          if (!dictMap.has(dict.name_cn))
            dictMap.set(dict.name_en, dict.dict_value)
        })
      }
      return dictMap
    },
  },
})
