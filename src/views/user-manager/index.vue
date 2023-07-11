<template>
  <div class="flex bg-white rounded-sm mb-4 py-4 px-4 items-center">
    <div class="flex-1 flex">
      <div class="flex items-center mr-4">
        <div class="text-gray-600 text-sm mr-2">
          手机号码
        </div>
        <div class="flex-1">
          <el-input
            v-model="q.mobile"
            placeholder="请输入手机号码"
          />
        </div>
      </div>
      <div class="flex items-center">
        <div class="text-gray-600 text-sm mr-2 ">
          姓名
        </div>
        <div class="flex-1">
          <el-input
            v-model="q.name"
            placeholder="请输入姓名"
          />
        </div>
      </div>
    </div>
    <search-tools
      @onClickRefresh="onClickRefresh"
      @onClickSearch="onClickSearch"
    />
  </div>

  <div class="bg-white rounded-md py-4 px-4">
    <div class="my-4">
      <el-button
        link
        type="primary"
        @click="handleClickAdd"
      >
        新增
      </el-button>
      <el-button
        link
        type="primary"
      >
        重置密码
      </el-button>
      <el-button
        link
        type="primary"
      >
        账号启用/停用
      </el-button>
    </div>
    <vxe-table
      ref="xTreeRef"
      :loading="loading"
      empty-text="没有更多数据了！"
      border="inner"
      :data="tableData"
    >
      <vxe-column
        field="name"
        title="姓名"
        width="120"
      />
      <vxe-column
        filfielded="usercode"
        title="账号"
      />
      <vxe-column
        field="mobile"
        title="手机号"
      />
      <vxe-column
        field="deptname"
        title="用户角色"
      >
        <template #default="{row}">
          <span
            v-for="role in row.role_list"
            :key="role.id"
          >{{ role.name }}</span>
        </template>
      </vxe-column>
      <vxe-column
        field="tel"
        title="电话"
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
        title="操作"
        width="200"
      >
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickEdit(row)"
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
  </div>
  <add-edit
    v-model="isVisible"
    :select-val="selectVal"
    @onConfirm="onConfirm"
  />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import addEdit from './add-edit.vue'
import { Admin as AdminApi } from '@/api/admin'

const isVisible = ref(false)
const selectVal = ref({})
const tableData = ref([])
const totalCount = ref(0)
const pageSize = ref(10)
const page = ref(1)
const loading = ref(false)
const q = ref({})
const getList = async () => {
  loading.value = true
  const { list, count } = await AdminApi.getUserList({ limit: pageSize.value, page: page.value })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}

onMounted(async () => {
  await getList()
})

const onClickRefresh = async () => {
  await getList()
}

const onConfirm = async (val) => {
  const { code, message } = await AdminApi.addOrEditUser(val)

  if (code < 100)

    await getList()

  ElNotification({
    title: 'Tips',
    message,
    type: code < 100 ? 'success' : 'error',
  })
}
const currentChange = (val) => {
  page.value = val
}
const handleClickAdd = () => {
  isVisible.value = true
}
const handleClickEdit = (row) => {
  selectVal.value = row
  isVisible.value = true
}

const handleDeleteClick = async (row) => {
  loading.value = true
  ElMessageBox.confirm('是否确定删除该用户,删除后不可恢复', {
    title: '提醒',
  }).then(async () => {
    const { code, message } = await AdminApi.deleteUser(row.id)
    if (code < 100)
      await getList()

    ElNotification({
      title: 'Tips',
      message,
      type: code < 100 ? 'success' : 'error',
    })
    loading.value = false
  })
}

const onClickSearch = () => {}
watch(isVisible, (val) => {
  if (!val)
    selectVal.value = {}
})

</script>
