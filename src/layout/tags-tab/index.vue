<template>
  <el-tabs
    v-model="currentTabName"
    type="card"
    closable
    @tab-click="onTagsTabClick"
    @tab-remove="onHandleCloseClick"
  >
    <el-tab-pane
      v-for="item in histories"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    />
  </el-tabs>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { appStore } from '@/store/modules/app.js'

const currentTabName = ref()
const store = appStore()
const route = useRoute()
const router = useRouter()
const histories = ref([])
const cookies = useCookies(['locale'])

const initHistories = () => {
  if (histories.value.length === 0 && cookies.get('histories'))
    histories.value = cookies.get('histories')
  const currentTab = cookies.get('currentTab')
  if (currentTab)
    currentTabName.value = currentTab.name
}

onMounted(() => {
  initHistories()
})

const changeRouter = (r) => {
  const { name, params, query } = r

  router.push({ name, params, query })
  currentTabName.value = name
  cookies.set('currentTab', r)
}

const onHandleCloseClick = (name) => {
  const idx = histories.value.findIndex(item => item.name === name)
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
  cookies.set('histories', histories.value)
}

function onTagsTabClick({ index }) {
  const currentTab = histories.value[index]
  if (currentTab)
    changeRouter(currentTab)
}

const setHistory = (router) => {
  const { path, params, name, query, meta } = router
  const flag = histories.value.some(item => item.path === path)
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
  currentTabName.value = name
  cookies.set('histories', histories.value)
}

watch(() => route, (to, from) => {
  if (!from)
    initHistories()

  setHistory(to)
}, { deep: true, immediate: true })

watch(() => histories, (val) => {
  if (val.value.length === 0)
    store.changeTagsTable(false)
  else
    store.changeTagsTable(true)
}, { deep: true, immediate: true })

</script>
