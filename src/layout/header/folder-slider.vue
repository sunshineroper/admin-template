<template>
  <div
    class="hover:text-red-400 cursor-pointer"
    @click="onHandleClick"
  >
    <el-icon :size="25">
      <Fold v-if="!sideCollapse" />
      <Expand v-else />
    </el-icon>
  </div>
</template>
<script setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { appStore } from '@/store/modules/app'

const appstore = appStore()
const sideCollapse = computed(() => appstore.sideCollapse)
const onHandleClick = () => {
  appstore.changeSideCollapse(!sideCollapse.value)
}
</script>
