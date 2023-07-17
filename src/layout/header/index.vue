<template>
  <div
    :class="sideCollapseCls"
    class="headerbox-border shadow-md fixed top-0 right-0 backdrop-blur-sm bg-white/75 z-10 header"
  >
    <div class="mx-6 flex py-3">
      <div class="flex-1 flex items-center">
        <folder-slider />
        <bread-crumb class="py-0.5 ml-4" />
      </div>
      <tools />
      <avatar />
    </div>
    <tags-tab />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import folderSlider from './folder-slider.vue'
import breadCrumb from './bread-crumb.vue'
import tools from './tools.vue'
import avatar from './avatar.vue'
import tagsTab from './tags-tab/index.vue'
import { appStore } from '@/store/modules/app'

const appstore = appStore()

const sideCollapseCls = computed(() => {
  if (!appstore.sideCollapse)
    return 'left-[200px]'

  else
    return 'left-[80px] '
})
</script>
<style scoped>
.header {
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
</style>
