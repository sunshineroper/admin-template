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
      field="name_cn"
      title="字典名称(中文)"
    />
    <vxe-column
      field="name_en"
      title="字典名称(英文)"
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
      field="description"
      title="字典描述"
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
          @click="handleDetailClick(row)"
        >
          <div class="flex items-center">
            <span>详情(添加字典值)</span>
          </div>
        </el-button>
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
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import addEdit from './add-edit-dictionary.vue'
import searchTools from '@/components/search-tools/index.vue'
import { Admin as AdminApi } from '@/api/admin'

const router = useRouter()
const loading = ref(false)
const pageSize = ref(10)
const totalCount = ref(0)
const tableData = ref([])
const dialogVisible = ref(false)
const selectVal = ref({})

const getList = async () => {
  loading.value = true
  const { list, count } = await AdminApi.getDictList()
  tableData.value = list
  totalCount.value = count
  loading.value = false
}
onMounted(async () => {
  await getList()
})
const currentChange = () => {}
const onConfirm = async (val) => {
  loading.value = true
  let type = 'success'
  const { code, message } = await AdminApi.addOrEditDict(val)

  if (code > 100)
    type = 'error'

  ElNotification({
    title: 'Tips',
    message,
    type,
  })

  await getList()
}
const handleAddClick = () => {
  dialogVisible.value = true
}
const handleEditClick = (row) => {
  selectVal.value = row
  dialogVisible.value = true
}

const handleDetailClick = (row) => {
  router.push(`/sys/dict-detail/${row.id}`)
}
const handleDeleteClick = (row) => {
  ElMessageBox.confirm('是否确定删除该字典,删除后不可恢复', {
    title: '提醒',
  }).then(async () => {
    let type = 'success'
    loading.value = true
    const { code, message } = await AdminApi.deleteDictionary(row.id)
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

watch(dialogVisible, (val) => {
  if (!val)
    selectVal.value = {}
})
</script>
