<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">
        <span
          class="text-sm"
        >首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in breadCrumbList"
        :key="item.title"
        :to="item.path"
      >
        <span class="text-sm">{{ item.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { userStore } from '@/store/modules/user'

const breadCrumbList = ref([])
const store = userStore()
const route = useRoute()
watch(route, (val) => {
  breadCrumbList.value = store.breadCrumbList(val.name)
}, { deep: true })

</script>
