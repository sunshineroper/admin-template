<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex" />
    <search-tools
      :tools="['refresh']"
    />
  </div>
  <div class="bg-white rounded-md py-4 px-4">
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
      ref="xTreeRef"
      :loading="loading"
      empty-text="没有更多数据了！"
      border="inner"
      :column-config="{resizable: true}"
      :data="tableData"
    >
      <vxe-column
        field="name"
        title="权限组名称"
        tree-node
      />
      <vxe-column
        field="status"
        title="是否启用"
      >
        <template #default="{ row }">
          <dict-el-tag
            :status="row.status"
            dict-status-type="status"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="description"
        title="描述"
        tree-node
      />
      <vxe-column
        title="操作"
        width="240"
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
            type="primary"
            @click="handleDispatchPermissionsClick(row)"
          >
            <div class="flex items-center">
              <span>分配权限</span>
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
  </div>
  <add-edit
    v-model="dialogVisible"
    :select-val="selectVal"
    @onConfirm="onConfirm"
  />
  <dispatch-permissions
    v-model="dispatchPermissionsVisible"
    :select-val="selectVal"
    @onDispathPermissions="onDispathPermissions"
  />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import addEdit from './add-edit.vue'
import dispatchPermissions from './dispatch-permissions.vue'
import searchTools from '@/components/search-tools/index.vue'
import { Admin as AdminApi } from '@/api/admin'
import dictElTag from '@/components/dict-el-tag/index.vue'

const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const selectVal = ref({})
const dispatchPermissionsVisible = ref(false)
const getList = async () => {
  loading.value = true
  const list = await AdminApi.getRoleList()
  tableData.value = list
  loading.value = false
}
const onDispathPermissions = async () => {
  await getList()
}
const handleEditClick = (val) => {
  selectVal.value = val
  dialogVisible.value = true
}

const handleDeleteClick = async (val) => {
  loading.value = true
  const { code, message } = await AdminApi.deleteRole(val.id)
  if (code < 100) {
    ElNotification({
      title: 'Tips',
      message,
      type: 'success',
    })
    await getList()
  }
  else {
    ElNotification({
      title: 'Tips',
      message,
      type: 'error',
    })
    loading.value = false
  }
}

onMounted(async () => {
  await getList()
})

const handleAddClick = () => {
  dialogVisible.value = true
}
const onConfirm = async (val) => {
  const { code, message } = await AdminApi.addRole(val)
  if (code < 100) {
    ElNotification({
      title: 'Tips',
      message,
      type: 'success',
    })
    await getList()
  }
}

const handleDispatchPermissionsClick = (val) => {
  selectVal.value = val
  dispatchPermissionsVisible.value = true
}
watch(dialogVisible, (val) => {
  if (!val)
    selectVal.value = {}
})

watch(dispatchPermissionsVisible, (val) => {
  if (!val)
    selectVal.value = {}
})
</script>
