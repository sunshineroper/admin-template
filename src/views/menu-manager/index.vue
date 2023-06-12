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
        <div class="i-carbon-add text-2xl" />新增
      </el-button>
    </div>
    <el-table
      row-key="id"
      border
      default-expand-all
      :data="tableData"
      style="width: 100%"
      :loading="loading"
    >
      <el-table-column
        fixed
        prop="title"
        label="菜单名称"
      />
      <el-table-column
        fixed
        prop="title"
        label="图标"
      />
      <el-table-column
        fixed
        prop="status"
        label="状态"
      />
      <el-table-column
        fixed
        prop="router-name"
        label="路由名字"
      />
      <el-table-column
        fixed
        prop="sort"
        label="排序"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template #default>
          <el-tooltip
            effect="dark"
            content="修改"
          >
            <el-button
              link
              type="primary"
              size="small"
            >
              <div class="i-carbon-edit text-xl" />
            </el-button>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="删除"
          >
            <el-button
              link
              size="small"
              type="danger"
              @click="handleClick"
            >
              <div class="i-carbon-trash-can text-xl" />
            </el-button>
          </el-tooltip>
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

const tableData = ref([{
  id: 0,
  title: '系统管理',
  icon: '',
  children: [{
    id: 1,
    title: '菜单管理',
    icon: '',
  }],
}])
</script>
