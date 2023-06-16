<template>
  <el-sub-menu
    v-if="routerInfo.children && routerInfo.children.length > 0"
    index="1"
  >
    <template #title>
      <div class="mr-1 i-carbon-menu" />
      <span>{{ routerInfo.meta && routerInfo.meta.title }}</span>
    </template>
    <aside-component
      v-for="router of routerInfo.children"
      :key="router.title"
      :router-info="router"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="routerInfo.name"
    @click="handleClick"
  >
    <div class="mr-1 i-carbon-menu" />
    <span>{{ routerInfo.meta && routerInfo.meta.title }}</span>
  </el-menu-item>
</template>
<script setup>
import { useRouter } from 'vue-router'
import asideComponent from './asideComponent.vue'

const router = useRouter()
const props = defineProps({
  routerInfo: {
    require: true,
  },
})

const handleClick = ({ index }) => {
  const path = props.routerInfo.router_url
  path && router.push(path)
}
</script>
