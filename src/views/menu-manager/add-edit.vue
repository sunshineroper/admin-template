<template>
  <el-dialog
    v-model="isVisible"
    :title="title"
    width="50%"
    :close="handleClose"
  >
    <el-form
      :model="form"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="form.pid"
          :data="treeData"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group
          v-model="form.type"
        >
          <el-radio
            :label="1"
          >
            目录
          </el-radio>
          <el-radio
            :label="2"
          >
            菜单
          </el-radio>
          <el-radio
            :label="3"
          >
            外链
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="菜单名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单图标">
            <el-input v-model="form.icon" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item label="路由地址">
            <el-input v-model="form.router_url" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径">
            <el-input v-model="form.component_path" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="路由名称"
          >
            <el-input v-model="form.router_name" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="菜单标题"
          >
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item label="显示状态">
            <el-radio-group
              v-model="form.hidden"
            >
              <el-radio
                :label="1"
              >
                隐藏
              </el-radio>
              <el-radio
                :label="0"
              >
                显示
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态">
            <el-radio-group
              v-model="form.status"
            >
              <el-radio
                :label="1"
              >
                启用
              </el-radio>
              <el-radio
                :label="0"
              >
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div>
        <el-button
          @click="handleClose"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="onConfirmClick"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { userStore } from '@/store/modules/user'

const store = userStore()
const props = defineProps({
  modelValue: {
    require: true,
    default: false,
  },
  selectVal: {
    type: Object,
    default: () => {
      return Object.assign({})
    },
  },
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const treeData = computed(() => {
  const defaultTree = [{
    id: 0,
    name: '主类目',
    children: [],
  }]
  defaultTree[0].children.push(...store.roleTreeRouter)
  return defaultTree
})
const form = ref({
  type: 1,
  status: 1,
  hidden: 0,
  pid: 0,
})

const reset = () => {
  form.value = {
    type: 1,
    status: 1,
    hidden: 0,
    pid: 0,
  }
}

const emits = defineEmits(['update:modelValue', 'onConfirm'])
const isVisible = useVModel(props, 'modelValue', emits)

const handleClose = () => {
  reset()
  isVisible.value = false
}
const onConfirmClick = () => {
  emits('onConfirm', form.value)
  handleClose()
}

const title = computed(() => {
  if (form.value.id && form.value.id !== 0)
    return '修改菜单'
  else
    return '新增菜单'
})

watch(() => props.selectVal, (obj) => {
  if (obj.id)
    form.value = obj
}, { deep: true, immediate: true })

</script>
