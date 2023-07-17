<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex" />
    <search-tools
      :tools="['refresh']"
      @onClickRefresh="onClickRefresh"
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
      field="user_name"
      title="操作人"
    />
    <vxe-column
      field="path"
      title="请求路径"
    />
    <vxe-column
      field="method"
      title="请求方式"
    />
    <vxe-column
      field="status"
      title="请求状态"
    >
      <template #default="{ row }">
        <el-tag
          type="success"
        >
          {{ row.status }}
        </el-tag>
      </template>
    </vxe-column>
    <vxe-column
      field="ip"
      title="请求ip"
    />
    <vxe-column
      field="message"
      title="操作信息"
    />
    <vxe-column title="操作时间">
      <template #default="{ row }">
        {{ $filters.formatDate(row.createTime) }}
      </template>
    </vxe-column>
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
  const { list, count } = await AdminApi.getLogList({ limit: pageSize.value, page: page.value })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}
const onClickRefresh = async () => {
  await getList()
}

onMounted(async () => {
  await getList()
})

const currentChange = async (val) => {
  page.value = val
  await getList()
}
</script>
