<template>
  <el-tooltip
    effect="dark"
    content="搜索"
  >
    <el-button
      v-throttle="1000"
      type="primary"
      :icon="Search"
      circle
      @click="onClickSearch"
    />
  </el-tooltip>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import mitt from '@/utils/event'

const onClickSearch = () => {
  mitt.emit('onClickSearch')
}
</script>
