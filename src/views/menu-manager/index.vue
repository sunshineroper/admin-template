<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1 flex">
      <el-button
        type="primary"
        @click="expandAllEvent"
      >
        展开所有
      </el-button>
      <el-button
        type="primary"
        @click="closeExpandEvent"
      >
        关闭所有
      </el-button>
      <div class="flex items-center mr-4" />
    </div>
    <search-tools
      :tools="['refresh']"
      @onClickRefresh="onClickRefresh"
    />
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
        width="160"
      />
      <vxe-column
        field="icon"
        title="图标"
        width="80"
      />
      <vxe-column
        field="hidden"
        title="显示状态"
        width="80"
      >
        <template #default="{ row }">
          <dict-el-tag
            :status="row.hidden"
            dict-status-type="hidden"
            dict-type="hidden-type"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="status"
        title="是否启用"
        width="80"
      >
        <template #default="{ row }">
          <dict-el-tag
            :status="row.status"
            dict-status-type="status"
          />
          <!-- <el-tag
            :type="row.status ? 'success' : 'error'"
          >
            {{ row.status ? '启用' : '禁用' }}
          </el-tag> -->
        </template>
      </vxe-column>
      <vxe-column
        field="router_name"
        title="路由名称"
      />
      <vxe-column
        field="sort"
        title="排序"
        width="80"
        sortable
      />
      <vxe-column
        field="date"
        title="创建时间"
      >
        <template #default="{ row }">
          {{ $filters.formatDate(row.createTime) }}
        </template>
      </vxe-column>
      <vxe-column
        title="操作"
        width="180"
      >
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(row)"
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
import addEdit from './add-edit.vue'
import searchTools from '@/components/search-tools/index.vue'
import { Admin as AdminApi } from '@/api/admin'
import dictElTag from '@/components/dict-el-tag/index.vue'

const loading = ref(true)
const dialogVisible = ref(false)
const selectVal = ref({})
const tableData = ref([])
const xTreeRef = ref()

const getMenuList = async () => {
  loading.value = true
  const list = await AdminApi.getMenuList()
  tableData.value = list
  loading.value = false
}

const onClickRefresh = async () => {
  await getMenuList()
}
onMounted(async () => {
  await getMenuList()
})
const handleClick = (row) => {
  if (row && row.id)
    selectVal.value = row

  dialogVisible.value = true
}

const handleDeleteClick = (row) => {
  if (row.id) {
    loading.value = true
    let message = '请确定是否删除,删除后不可恢复'
    if (row.children.length > 0)
      message = '当前被删除的菜单包含子菜单,如果删除当前菜单,将会一同删除子菜单'

    ElMessageBox.confirm(message, {
      title: '提醒',
    })
      .then(async () => {
        const { code, message } = await AdminApi.deleteMenu(row.id)
        if (code < 100) {
          ElNotification({
            title: 'Tips',
            message,
            type: 'success',
          })
        }
        loading.value = false
        await getMenuList()
      })
      .catch(() => {
        // catch error
        loading.value = false
      })
  }
}

const expandAllEvent = () => {
  const $table = xTreeRef.value
  if ($table)
    $table.setAllTreeExpand(true)
}

const closeExpandEvent = () => {
  const $table = xTreeRef.value
  if ($table)
    $table.clearTreeExpand()
}

const onConfirm = async (val) => {
  // 修改的时候如果选择的类目和之前的类目不一致,并且该菜单下有子菜单的情况,需要提示
  if (val.children > 0 && selectVal.value.pid !== val.pid) {
    ElMessageBox.confirm('当前菜单包含子菜单,如果移动当前菜单目录的话,当前的菜单的子菜单会被一并移动', {
      title: '提醒',
    })
  }
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

watch(() => dialogVisible.value, (val) => {
  if (!val)
    selectVal.value = {}
})

</script>
