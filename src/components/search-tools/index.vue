<template>
  <el-tooltip
    effect="dark"
    content="搜索"
  >
    <el-button
      type="primary"
      :icon="Search"
      circle
    />
  </el-tooltip>
  <el-tooltip
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
