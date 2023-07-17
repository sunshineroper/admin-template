<template>
  <div
    :class="[hasTagsTable ? 'pt-[104px]' : 'pt-[65px]', sideCollapseCls]"
    class="flex flex-col relative bottom-0 h-full ml-[200px] main-content"
  >
    <div class="flex-1 h-full bg-[#f0f2f5] py-6 px-8 ">
      <router-view v-slot="{ Component }">
        <!-- <transition
          name="move"
          mode="out-in"
        > -->
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
        <!-- </transition> -->
      </router-view>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { appStore } from '@/store/modules/app'

const app = appStore()
const hasTagsTable = computed(() => app.hasTagsTable)
const sideCollapseCls = computed(() => {
  if (!app.sideCollapse)
    return 'ml-[200px]'

  else
    return 'ml-[80px] '
})
</script>
<style scoped>
.main-content {
  -webkit-transition: left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}
.move-enter-active {
  animation: run-scale .1s ease-out 0s;
}
.move-leave-active {
  animation: run-scale .1s ease-in 0s reverse;
}
</style>
