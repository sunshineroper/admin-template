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
        title="app.body.label.name"
        tree-node
      />
      <vxe-column
        field="title"
        title="标题"
      />
      <vxe-column
        field="icon"
        title="图标"
      />
      <vxe-column
        field="date"
        title="Date"
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
import addEdit from './add-edit.vue'
import searchTools from '@/components/search-tools/index.vue'

const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
const dialogVisible = ref(false)
const selectVal = ref({})
const handleClick = (row) => {
  if (row && row.id)
    selectVal.value = row

  dialogVisible.value = true
}

const onConfirm = (val) => {
}

const tableData = ref([{
  id: 1,
  title: '系统管理',
  icon: '',
},
{
  id: 2,
  pid: 1,
  title: '菜单管理',
  icon: '',
}])
</script>
