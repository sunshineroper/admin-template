import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => {
    return {
      hasTagsTable: false,
      sideCollapse: false,
    }
  },
  actions: {
    changeTagsTable(bool) {
      this.hasTagsTable = bool
    },
    changeSideCollapse(bool) {
      this.sideCollapse = bool
    },

  },
})
