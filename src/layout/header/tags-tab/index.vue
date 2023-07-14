<template>
  <el-scrollbar :style="{ height: tagsTabHeight}">
    <el-tabs
      v-model="currentTabName"
      type="card"
      closable
      @tab-click="onTagsTabClick"
      @tab-remove="onHandleCloseClick"
    >
      <el-tab-pane
        v-for="item in histories"
        :key="formatString(item)"
        :label="fmtTile(item.meta.title, item)"
        :name="formatString(item)"
      />
    </el-tabs>
  </el-scrollbar>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { appStore } from '@/store/modules/app.js'

const currentTabName = ref()
const store = appStore()
const route = useRoute()
const router = useRouter()
const histories = useLocalStorage('histories', [])
const currentTab = useLocalStorage('currentTab')

const tagsTabHeight = ref('56px')

const formatString = (router) => {
  const { name, params, query } = router
  return `${name}${JSON.stringify(params)}${JSON.stringify(query)}`
}

const fmtTile = (title, router) => {
  const reg = /\$\{(.+?)\}/
  const reg_g = /\$\{(.+?)\}/g
  const result = title.match(reg_g)
  if (result) {
    result.forEach((item) => {
      const key = item.match(reg)[1]
      const value = router.params[key] || router.query[key]
      title = title.replace(item, value)
    })
  }
  return title
}

const initHistories = () => {
  if (currentTab.value)
    currentTabName.value = currentTab.value
}

onMounted(() => {
  initHistories()
})

const changeRouter = (r) => {
  const { name, params, query } = r

  router.push({ name, params, query })
  currentTabName.value = formatString(r)
  currentTab.value = formatString(r)
}

const onHandleCloseClick = (name) => {
  const idx = histories.value.findIndex(item => formatString(item) === name)
  let currentTab
  if (idx !== -1) {
    if (idx === 0 && histories.value.length === 2)
      currentTab = histories.value[idx + 1]
    else if (idx === 1 && histories.value.length === 2)
      currentTab = histories.value[idx - 1]
    else
      currentTab = histories.value[idx - 1]

    histories.value.splice(idx, 1)
  }
  if (currentTab)
    changeRouter(currentTab)
}

function onTagsTabClick({ index }) {
  const currentTab = histories.value[index]
  if (currentTab)
    changeRouter(currentTab)
}

const routerSome = (r1, r2) => {
  if (r1.name !== r2.name)
    return false
  if (Reflect.ownKeys(r1.query).length !== Reflect.ownKeys(r2.query).length)
    return false
  if (Reflect.ownKeys(r1.params).length !== Reflect.ownKeys(r2.params).length)
    return false
  for (const key in r1.query) {
    if (r1.query[key] !== r2.query[key])
      return false
  }
  for (const key in r1.params) {
    if (r1.params[key] !== r2.params[key])
      return false
  }
  return true
}
const setHistory = (router) => {
  const { path, params, name, query, meta } = router
  const flag = histories.value.some(item => routerSome(item, router))
  if (!flag) {
    histories.value.push({
      name,
      title: meta.title || '新的标签页',
      path,
      query,
      params,
      meta,
    })
  }
  currentTabName.value = formatString(router)
  currentTab.value = formatString(router)
}

watch(() => route, (to) => {
  setHistory(to)
}, { deep: true, immediate: true })

watch(() => histories, (val) => {
  if (val.value.length === 0) {
    tagsTabHeight.value = '0px'
    store.changeTagsTable(false)
  }
  else {
    store.changeTagsTable(true)
    tagsTabHeight.value = '56px'
  }
}, { deep: true, immediate: true })

</script>
