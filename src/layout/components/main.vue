<template>
  <div class="flex flex-col">
    <div>
      <div class="flex shadow-sm">
        <div class="flex mx-2 py-4 items-center flex-1">
          <folder-silder class="mr-8" />
          <bread-crumb />
        </div>
        <div class="py-4 mr-2">
          <tools />
        </div>
      </div>
      <el-scrollbar
        :style="{ height: hasTagsTable ? '80px' : '0' }"
      >
        <tags-tab />
      </el-scrollbar>
    </div>
    <div class="flex-1 h-full w-full">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import folderSilder from './folder-slider.vue'
import breadCrumb from './bread-crumb.vue'
import tools from './tools.vue'
import tagsTab from '@/layout/tags-tab/index.vue'
import { appStore } from '@/store/modules/app'

const app = appStore()
const hasTagsTable = computed(() => app.hasTagsTable)
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s
}
.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}
</style>
