<template>
  <div
    :class="hasTagsTable ? 'pt-[104px]' : 'pt-[65px]'"
    class="flex flex-col relative bottom-0 h-full ml-[200px] "
  >
    <div class="flex-1 h-full bg-[#f0f2f5] py-6 px-8 overflow-y-auto">
      <router-view v-slot="{ Component }">
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
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
