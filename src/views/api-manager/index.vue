<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex">
      <div class="flex items-center mr-6">
        <div class="text-gray-600 text-sm mr-2">
          模块
        </div>
        <div class="flex-1">
          <el-select
            v-model="q.module_name"
            class="m-2"
            placeholder="请选择要查询的模块"
            size="large"
            clearable
          >
            <el-option
              v-for="item in moduleNameList"
              :key="item.module_name"
              :label="item.module_name"
              :value="item.module_name"
            />
          </el-select>
        </div>
        <div class="text-gray-600 text-sm mr-2">
          状态
        </div>
        <div class="flex-1">
          <dict-el-select
            v-model="q.status"
            dict-status-type="status"
          />
        </div>
      </div>
    </div>
    <search-tools
      :tools="['refresh', 'search']"
      @onClickRefresh="onClickRefresh"
      @onClickSearch="onClickSearch"
    />
  </div>
  <vxe-table
    :loading="loading"
    empty-text="没有更多数据了！"
    border="inner"
    :column-config="{resizable: true}"
    :data="tableData"
  >
    <vxe-column
      field="permission_name"
      title="权限名称"
    />
    <vxe-column
      field="endpoint"
      title="端点"
    />
    <vxe-column
      field="module_name"
      title="模块"
    />
    <vxe-column
      field="status"
      title="状态"
    >
      <template #default="{ row }">
        <dict-el-tag
          :status="row.status"
          dict-status-type="status"
        />
      </template>
    </vxe-column>
    <vxe-column
      filed="description"
      title="描述"
    />
  </vxe-table>
  <div class="flex justify-end mt-4">
    <el-pagination
      :page-size="pageSize"
      small="small"
      layout="total, prev, pager, next"
      :total="totalCount"
      @current-change="currentChange"
    />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Admin as AdminApi } from '@/api/admin'

const loading = ref(false)
const tableData = ref(false)
const pageSize = ref(10)
const page = ref(1)
const totalCount = ref(0)
const moduleNameList = ref([])
const q = ref({
})

const getList = async (q = {}) => {
  loading.value = true
  const { list, count } = await AdminApi.getApiPageList({ limit: pageSize.value, page: page.value, ...q })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}

const getAllModuleName = async () => {
  const list = await AdminApi.getPerissionRouterName()
  moduleNameList.value = list
}

onMounted(async () => {
  await getList()
  await getAllModuleName()
})

const onClickRefresh = async () => {
  await getList()
}

const onClickSearch = async () => {
  await getList(q.value)
}
const currentChange = async (val) => {
  page.value = val
  await getList()
}

</script>
