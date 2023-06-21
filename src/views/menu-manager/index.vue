<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex">
      <div class="flex items-center mr-4" />
    </div>
    <search-tools />
  </div>
  <div class="bg-white rounded-md py-4 px-4">
    <div class="my-4">
      <el-button
        link
        type="primary"
        @click="handleClick"
      >
        <div
          class="i-carbon-add text-2xl"
        />新增
      </el-button>
    </div>
    <vxe-table
      ref="xTreeRef"
      :loading="loading"
      empty-text="没有更多数据了！"
      border="inner"
      :column-config="{resizable: true}"
      :tree-config="{transform: true, rowField: 'id', parentField: 'pid'}"
      :data="tableData"
    >
      <vxe-column
        field="name"
        title="菜单名称"
        tree-node
      />
      <vxe-column
        field="icon"
        title="图标"
      />
      <vxe-column
        field="hidden"
        title="显示状态"
      >
        <template #default="{ row }">
          <el-tag
            :type="row.hidden ? 'error' : 'success'"
          >
            {{ row.hidden ? '隐藏' : '显示' }}
          </el-tag>
        </template>
      </vxe-column>
      <vxe-column
        field="status"
        title="是否启用"
      >
        <template #default="{ row }">
          <el-tag
            :type="row.status ? 'success' : 'error'"
          >
            {{ row.status ? '显示' : '隐藏' }}
          </el-tag>
        </template>
      </vxe-column>
      <vxe-column
        field="router_name"
        title="路由名称"
      />
      <vxe-column
        field="sort"
        title="排序"
      />
      <vxe-column
        field="date"
        title="创建时间"
      />
      <vxe-column
        title="操作"
        width="120"
      >
        <template #default="{ row }">
          <el-tooltip
            effect="dark"
            content="修改"
          >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(row)"
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
      </vxe-column>
    </vxe-table>
  </div>
  <add-edit
    v-model="dialogVisible"
    :select-val="selectVal"
    @onConfirm="onConfirm"
  />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import addEdit from './add-edit.vue'
import searchTools from '@/components/search-tools/index.vue'
import { Admin as AdminApi } from '@/api/admin'
import { userStore } from '@/store/modules/user'

const store = userStore()
const loading = ref(true)
const dialogVisible = ref(false)
const selectVal = ref({})
const tableData = ref([])

const getMenuList = async () => {
  loading.value = true
  const list = await AdminApi.getMenuList()
  tableData.value = list
  loading.value = false
  store.setRoleRouter(list)
}

onMounted(async () => {
  await getMenuList()
})
const handleClick = (row) => {
  if (row && row.id)
    selectVal.value = row

  dialogVisible.value = true
}

const onConfirm = async (val) => {
  const { code, message } = await AdminApi.addMenu(val)
  if (code && code < 100) {
    ElNotification({
      title: 'Tips',
      message,
      type: 'success',
    })
  }
  else {
    ElNotification({
      title: 'Tips',
      message,
      type: 'error',
    })
  }
  await getMenuList()
}

</script>
