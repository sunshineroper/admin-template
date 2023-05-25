<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="text-sm">首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="text-sm">系统</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="text-sm">菜单</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>
