<template>
  <el-dialog
    v-model="isVisible"
    title="按钮分配"
    width="50%"
    :close="handleClose"
  >
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
      ref="xTable"
      border
      show-overflow
      keep-source
      max-height="400"
      :data="tableData"
      :edit-rules="rules"
      :loading="loading"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    >
      >
      <vxe-column
        field="name"
        title="按钮名称"
        :edit-render="{autofocus: '.vxe-input--inner'}"
      >
        <template #edit="scope">
          <vxe-input
            v-model="scope.row.name"
            type="text"
            @blur="changeCellEvent(scope)"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="identity"
        title="按钮权限标识"
        :edit-render="{autofocus: '.vxe-input--inner'}"
      >
        <template #edit="scope">
          <vxe-input
            v-model="scope.row.identity"
            type="text"
            @blur="changeCellEvent(scope)"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="status"
        title="是否启用"
        :edit-render="{autofocus: '.vxe-input--inner'}"
      >
        <template #edit="{ row }">
          <dict-el-select
            v-model="row.status"
            placeholder="请选择按钮状态"
            dict-status-type="status"
            @change="changeCellEvent(scope)"
          />
        </template>
        <template #default="{ row }">
          <dict-el-tag
            :status="row.status"
            dict-status-type="status"
          />
        </template>
      </vxe-column>
      <vxe-column
        title="操作"
      >
        <template #default="{row}">
          <el-button
            v-if="isVisibleSave(row)"
            v-throttle="2000"
            link
            type="primary"
            size="small"
            @click="handleSaveClick(row)"
          >
            <div class="flex items-center">
              <div class="i-carbon-edit text-xl mr-1" />
              <span>保存</span>
            </div>
          </el-button>
          <el-button
            v-throttle="2000"
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
  </el-dialog>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import notification from '@/utils/dict-notification'
import { Admin as AdminApi } from '@/api/admin'

const xTable = ref([])
const totalCount = ref([0])
const pageSize = ref(5)
const page = ref(1)
const tableData = ref([])
const loading = ref(false)
const props = defineProps({
  modelValue: {
    require: true,
    default: false,
  },
  menu_id: {
    require: true,
  },
})
const rules = {
  name: [
    { required: true, message: '请输入按钮名称' },
  ],
  identity: [
    { required: true, message: '请输入按钮标识' },
    {
      validator({ row, cellValue }) {
        return new Promise((resolve, reject) => {
          if (cellValue.length === 0)
            reject(new Error('请输入按钮标识'))
          AdminApi.validatorUniqueIdentity({ id: row.id, identity: cellValue, menu_id: props.menu_id }).then(({ code }) => {
            if (!code)
              reject(new Error('按钮标识不可以重复'))
            else
              resolve()
          })
        })
      },
    },
  ],
}

const emits = defineEmits(['update:modelValue'])
const isVisible = useVModel(props, 'modelValue', emits)
const changeCellEvent = (params) => {
  const $table = xTable.value
  if ($table)
    $table.updateStatus(params)
}

const getList = async () => {
  loading.value = true
  const { list, count } = await AdminApi.getBtnPageList({ limit: pageSize.value, page: page.value, menu_id: props.menu_id })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}

const handleSaveClick = async (row) => {
  const $table = xTable.value
  const errMap = await $table.validate(row)
  if (errMap)
    return
  const { code, message } = await AdminApi.addOrEditBtn({ ...row, menu_id: props.menu_id })
  notification(code, message).then(async () => {
    await getList()
  })
}

const handleDeleteClick = async (row) => {
  const $table = xTable.value
  if ($table.isInsertByRow(row)) {
    $table.remove(row)
    return
  }

  const { code, message } = await AdminApi.deleteBtn(row.id)
  notification(code, message).then(async () => {
    await getList()
  })
}
const handleAddClick = async (row) => {
  const $table = xTable.value
  if ($table) {
    await $table.insert({
      status: 1,
    })
  }
}

const currentChange = async (val) => {
  page.value = val
  await getList()
}

const isUpdateOrInser = (row) => {
  const $table = xTable.value
  return $table.isUpdateByRow(row) || $table.isInsertByRow(row)
}

const isVisibleSave = computed(() => {
  return (row) => {
    return isUpdateOrInser(row)
  }
})

watch(() => props.menu_id, async () => {
  await getList()
})

</script>
