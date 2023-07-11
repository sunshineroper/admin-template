<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex" />
    <search-tools
      :tools="['refresh']"
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

const getList = async () => {
  loading.value = true
  const { list, count } = await AdminApi.getApiPageList({ limit: pageSize.value, page: page.value })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}

onMounted(async () => {
  await getList()
})

const currentChange = async (val) => {
  page.value = val
  await getList()
}

</script>
