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
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
</script>
