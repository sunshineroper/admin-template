<template>
  <div class="bg-white rounded-sm mb-4 py-4 px-4 items-center flex">
    <div class="flex-1">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="flex items-center mr-4">
            <div class="text-gray-600 text-sm mr-2">
              公告标题
            </div>
            <div class="flex-1">
              <el-input
                v-model="q.title"
                placeholder="请输入公告标题"
              />
            </div>
          </div>
        </el-col>
        <el-row :span="14">
          <div class="flex items-center">
            <div class="text-gray-600 text-sm mr-2 ">
              招标编号
            </div>
            <div class="flex-1">
              <el-input
                v-model="q.project_code"
                placeholder="请输入招标编号"
              />
            </div>
          </div>
        </el-row>
      </el-row>

      <el-row class="mt-4">
        <el-col :span="12">
          <div class="flex items-center">
            <div class="text-gray-600 text-sm mr-2 ">
              日期范围
            </div>
            <el-date-picker
              v-model="q.date"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              :size="size"
              @change="handleDateChange"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <search-tools
      :tools="['refresh', 'search']"
      @onClickSearch="onHandleSearch"
      @onClickRefresh="onClickRefresh"
    />
  </div>
  <vxe-toolbar>
    <template #buttons>
      <el-button
        v-auth="authBtn.add"
        link
        type="primary"
        @click="onHandelAddClick"
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
      field="title"
      title="公告标题"
      width="250"
    />
    <vxe-column
      field="project_code"
      title="招标编号"
      width="190"
    />
    <vxe-column
      field="class_id"
      title="项目分类"
    />
    <vxe-column
      field="created_name"
      title="创建人"
      width="100"
    />
    <vxe-column
      field="status"
      title="是否启用"
    >
      <template #default="{ row }">
        <dict-el-tag
          :status="row.status"
          :dict-status-type="status"
        />
      </template>
    </vxe-column>
    <vxe-column
      field="createTime"
      title="发布日期"
    >
      <template #default="{ row }">
        {{ $filters.formatDate(row.createTime) }}
      </template>
    </vxe-column>
    <vxe-column
      title="操作"
      width="140"
    >
      <template #default="{ row }">
        <el-button
          v-auth="authBtn.edit"
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
          v-auth="authBtn.delete"
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
    v-model="isVisible"
    :select-val="selectVal"
    @onConfirm="onConfirm"
  />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import addEdit from './add-edit.vue'
import { TenderNotice as TenderNoticeApi } from '@/api/tender-notice'
import notification from '@/utils/dict-notification'
import useAuthBtn from '@/utils/useAuthBtn'

const authBtn = useAuthBtn()
const q = ref({
  date: [],
})
const selectVal = ref({})
const isVisible = ref(false)
const tableData = ref({})
const loading = ref(false)
const pageSize = ref(10)
const page = ref(1)
const totalCount = ref(0)

const getList = async () => {
  loading.value = true
  const { list, count } = await TenderNoticeApi.getPageList({ limit: pageSize.value, page: page.value, ...q.value })
  tableData.value = list
  totalCount.value = count
  loading.value = false
}

onMounted(async () => {
  await getList()
})

const handleEditClick = (val) => {
  isVisible.value = true
  selectVal.value = val
}

const currentChange = (val) => {
  page.value = val
}

const onHandelAddClick = () => {
  isVisible.value = true
}

const handleDeleteClick = async (v) => {
  const { code, message } = await TenderNoticeApi.delete(v.id)
  notification(code, message).then(async () => {
    await getList()
  })
}

const onConfirm = async (val) => {
  const { code, message } = await TenderNoticeApi.saveOrEdit(val)
  notification(code, message).then(async () => {
    await getList()
  })
}

const onHandleSearch = async () => {
  await getList()
}

const onClickRefresh = async () => {
  await getList()
}

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const handleDateChange = (val) => {
  const [beginDate, endDate] = val
  q.value.beginDate = beginDate
  q.value.endDate = endDate
}
watch(isVisible, (val) => {
  if (!val)
    selectVal.value = {}
})

</script>
