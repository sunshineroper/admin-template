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
    />
  </el-tooltip>
  <el-tooltip
    v-throttle="1000"
    effect="dark"
    content="刷新"
  >
    <el-button
      circle
      :icon="Refresh"
    />
  </el-tooltip>
</template>
<script setup>
import { Refresh, Search } from '@element-plus/icons-vue'
</script>
