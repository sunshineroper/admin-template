<template>
  <div class="flex flex-col">
    <logo />
    <el-menu
      active-text-color="#fff"
      background-color="#041527"
      text-color="#fff"
      style="border-right: none;"
      :default-active="activeIndex"
      :collapse="sideCollapse"
      class="layout-menu"
    >
      <aside-component
        v-for="router of routerInfo"
        :key="router.title"
        :router-info="router"
      />
    </el-menu>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '../logo/index.vue'
import asideComponent from './components/asideComponent.vue'
import { userStore } from '@/store/modules/user'
import { appStore } from '@/store/modules/app'

const store = userStore()
const appstore = appStore()
const route = useRoute()

const routerInfo = computed(() => store.roleTreeRouter)
const activeIndex = ref('')
const sideCollapse = computed(() => appstore.sideCollapse)
watch(() => route, (val) => {
  const { name } = val
  activeIndex.value = name
}, { deep: true, immediate: true })
// const isCollapse = ref(true)
</script>
<style>
.layout-menu  .is-active {
  background: #579ef8 !important;
}
.layout-menu .is-opened .el-menu {
  background-color: #0d0303 !important;
}
.layout-menu .el-sub-menu .el-menu-item  {
  font-size: 12px !important;
}
</style>
