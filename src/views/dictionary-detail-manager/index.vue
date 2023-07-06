<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex" />
    <search-tools
      :tools="['refresh']"
    />
  </div>
  <vxe-toolbar>
    <template #buttons>
      <el-button
        link
        type="primary"
        :loading="loading"
        @click="handleAddClick"
      >
        <div
          class="i-carbon-add text-2xl"
        />新增
      </el-button>
    </template>
  </vxe-toolbar>
  <vxe-table
    :loading="loading"
    empty-text="没有更多数据了！"
    border="inner"
    :column-config="{resizable: true}"
    :data="tableData"
  >
    <vxe-column
      field="label"
      title="字典显示名称"
    />
    <vxe-column
      field="value"
      title="字典值"
    />
    <vxe-column
      field="status"
      title="是否启用"
    >
      <template #default="{ row }">
        <el-tag
          :type="row.status ? 'success' : 'error'"
        >
          {{ row.status ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </vxe-column>
    <vxe-column
      field="sort"
      title="排序"
      sortable
    />
    <vxe-column
      title="操作"
      width="280"
    >
      <template #default="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEditClick(row)"
        >
          <div class="flex items-center">
            <div class="i-carbon-edit text-xl mr-1" />
            <span>修改</span>
          </div>
        </el-button>

        <el-button
          link
          size="small"
          type="danger"
          @click="handleDeleteClick(row)"
        >
          <div class="flex items-center">
            <div class="i-carbon-trash-can text-xl" />
            <span>删除</span>
          </div>
        </el-button>
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
  <add-edit
    v-model="dialogVisible"
    :select-val="selectVal"
    @onConfirm="onConfirm"
  />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import addEdit from './add-edit.vue'
import { Admin as AdminApi } from '@/api/admin'

const route = useRoute()
const loading = ref(false)
const selectVal = ref({})
const dialogVisible = ref(false)
const dictionary_id = route.params.id
const pageSize = ref(10)
const page = ref(1)
const totalCount = ref(0)
const tableData = ref([])

const getList = async () => {
  const { list, count } = await AdminApi.getDictDetailList({ page: page.value, limit: pageSize.value, dictionary_id })
  tableData.value = list
  totalCount.value = count
}

const handleAddClick = () => {
  dialogVisible.value = true
}

onMounted(async () => {
  await getList()
})

const handleEditClick = (row) => {
  dialogVisible.value = true
  selectVal.value = row
}

const handleDeleteClick = (row) => {
  ElMessageBox.confirm('是否确定删除该字典,删除后不可恢复', {
    title: '提醒',
  }).then(async () => {
    let type = 'success'
    loading.value = true
    const { code, message } = await AdminApi.deleteDictionaryDetail(row.id)
    if (code > 100)
      type = 'error'
    else await getList()
    ElNotification({
      title: 'Tips',
      message,
      type,
    })
    loading.value = false
  })
}

const onConfirm = async (val) => {
  loading.value = true
  const { code, message } = await AdminApi.addOrEditDictDetail(val)
  let type = 'success'
  if (code < 100)
    await getList()
  else type = 'error'

  ElNotification({
    title: 'Tips',
    message,
    type,
  })
  loading.value = false
}

watch(dialogVisible, (val) => {
  if (!val)
    selectVal.value = {}
})

</script>
