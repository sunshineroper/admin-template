<template>
  <el-sub-menu
    v-if="routerInfo.children && routerInfo.children.length > 0"
    :index="routerInfo.router_name"
  >
    <template #title>
      <div class="mr-1 i-carbon-menu" />
      <span>{{ routerInfo.name }}</span>
    </template>
    <aside-component
      v-for="router of routerInfo.children"
      :key="router.title"
      :router-info="router"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="routerInfo.router_name"
    @click="handleClick"
  >
    <div class="mr-1 i-carbon-menu" />
    <span>{{ routerInfo.name }}</span>
  </el-menu-item>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import asideComponent from './asideComponent.vue'

const router = useRouter()
const props = defineProps({
  routerInfo: {
    require: true,
  },
})

const currentRouter = {}
const handleClick = () => {
  const path = currentRouter.value.router_url
  path && router.push(path)
}
watch(() => props.routerInfo, (val) => {
  currentRouter.value = val
}, { deep: true, immediate: true })
</script>
