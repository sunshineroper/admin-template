<script setup>
</script>
<template>
  <div class="flex w-screen h-screen">
    <layout-aside
      class="w-[210px] bg-[#545c64]"
      style="box-shadow:2px 0 6px rgba(0,21,41,.3);"
      :style="sideCollapse ? 'width: 80px' : ''"
    />
    <Appmain class="flex-1 bg-light-50 overflow-y-auto" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import LayoutAside from './aside/index.vue'
import Appmain from './components/main.vue'
import { appStore } from '@/store/modules/app'

const appstore = appStore()
const sideCollapse = computed(() => appstore.sideCollapse)
</script>
