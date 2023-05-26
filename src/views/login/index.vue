<template>
  <div class="w-screen h-screen">
    <div class="mx-auto w-[45%] px-4 py-6 bg-yellow-50 box-content rd">
      <h2 class="text-center">
        Sun-Vue-Admin
      </h2>
      <el-form
        label-position="left"
        label-width="0"
        :model="login"
      >
        <el-form-item class="relative">
          <el-input v-model="login.name" />
          <div class="absolute right-4">2</div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="login.region" class="relative" />
          <div class="absolute right-4">2</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const login = ref({})
</script>
