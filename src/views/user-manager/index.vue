<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex">
      <div class="flex items-center mr-4">
        <div class="text-gray-600 text-sm mr-2">
          手机号码
        </div>
        <div class="flex-1">
          <el-input
            placeholder="请输入手机号码"
          />
        </div>
      </div>
      <div class="flex items-center">
        <div class="text-gray-600 text-sm mr-2 ">
          姓名
        </div>
        <div class="flex-1">
          <el-input
            placeholder="请输入姓名"
          />
        </div>
      </div>
    </div>
    <search-tools />
  </div>
  <div class="bg-white rounded-md py-4 px-4">
    <div class="my-4">
      <el-button
        link
        type="primary"
        @click="onClickAdd"
      >
        新增
      </el-button>
      <el-button
        v-throttle
        link
        type="primary"
        @click="throttleTest"
      >
        重置密码
      </el-button>
      <el-button
        link
        type="primary"
      >
        账号启用/停用
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :loading="loading"
    >
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="usercode"
        label="账号"
      />
      <el-table-column
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        prop="deptname"
        label="部门"
      />
      <el-table-column
        prop="tel"
        label="电话"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template #default>
          <el-button
            link
            type="primary"
            size="small"
          >
            Edit
          </el-button>
          <el-button
            link
            size="small"
            type="danger"
            @click="handleClick"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end mt-4">
      <el-pagination
        v-model="currentPage1"
        :page-size="100"
        small="small"
        layout="total, prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import searchTools from '@/components/search-tools/index.vue'

const router = useRouter()

const onClickAdd = () => {
  router.push({ name: 'user-manager-add-user' })
}
const currentPage1 = ref(5)
const throttleTest = () => {
  console.log('300')
}
const tableData = ref([
  {
    name: '项目员119',
    usercode: '11900119119',
    mobile: '11900119119',
    deptname: '电子交易部',
    tel: '020-11911900',
  },
])
</script>
