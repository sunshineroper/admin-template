import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => {
    return {
      hasTagsTable: false,
    }
  },
  actions: {
    changeTagsTable(bool) {
      this.hasTagsTable = bool
    },
  },
})
