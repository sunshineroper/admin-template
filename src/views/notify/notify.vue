<template>
  <el-row
    v-for="i in 24"
    :key="i"
    class="bg-light-100 px-8 py-4 mb-2"
    :gutter="24"
  >
    <el-col :span="2">
      <div class="i-carbon-sun text-orange-400 text-4xl cursor-pointer" />
    </el-col>
    <el-col
      :span="22"
    >
      <div class="text-sm">
        CMS第一个版本就要发布了
      </div>
      <div class="text-xs mt-2 text-gray-500">
        一天前
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
</script>
