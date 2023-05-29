<template>
  <div class="flex flex-col">
    <logo />
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      style="border-right: none;"
      :default-active="activeIndex"
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

const store = userStore()
const route = useRoute()

const routerInfo = computed(() => store.roleTreeRouter)
const activeIndex = ref('')

watch(() => route, (val) => {
  const { name } = val
  activeIndex.value = name
}, { deep: true, immediate: true })
// const isCollapse = ref(true)
</script>
