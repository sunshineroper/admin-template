<template>
  <el-tooltip
    effect="dark"
    content="刷新"
  >
    <el-button
      v-throttle="1000"
      circle
      :icon="Refresh"
      @click="onClickRefresh"
    />
  </el-tooltip>
</template>
<script setup>
import { Refresh } from '@element-plus/icons-vue'
import mitt from '@/utils/event'

const onClickRefresh = () => {
  mitt.emit('onClickRefresh')
}
</script>
