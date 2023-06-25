<template>
  <el-dialog
    v-model="isVisible"
    :title="title"
    width="50%"
    :close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="上级菜单"
        prop="pid"
      >
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
          prop="type"
          @change="handleTypeChange"
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
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单图标">
            <el-input v-model="form.icon" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="排序"
        prop="sort"
      >
        <el-input-number
          v-model="form.sort"
          :min="0"
          :max="99"
        />
      </el-form-item>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="路由地址"
            prop="router_url"
          >
            <el-input v-model="form.router_url" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组件路径"
            prop="component_path"
          >
            <el-input v-model="form.component_path" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="路由名称"
            prop="router_name"
          >
            <el-input v-model="form.router_name" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="菜单标题"
            prop="title"
          >
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="显示状态"
            prop="hidden"
          >
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
          <el-form-item
            label="菜单状态"
            prop="status"
          >
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
import { useCloned, useVModel } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { commonRules, menuFolderRules } from './rules'
import { userStore } from '@/store/modules/user'

const MENU_FOLDER = 1
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
const formRef = ref()
const rules = ref(menuFolderRules)
const handleTypeChange = (val) => {
  if (val === MENU_FOLDER)
    rules.value = menuFolderRules
  else
    rules.value = commonRules
  formRef.value.resetFields()
}
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
  formRef.value && formRef.value.resetFields()
}

const emits = defineEmits(['update:modelValue', 'onConfirm'])
const isVisible = useVModel(props, 'modelValue', emits)

const handleClose = () => {
  reset()
  isVisible.value = false
}
const onConfirmClick = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      emits('onConfirm', form.value)
      handleClose()
    }
  })
}

const title = computed(() => {
  if (form.value.id && form.value.id !== 0)
    return '修改菜单'
  else
    return '新增菜单'
})

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    form.value = cloned.value
  }
}, { deep: true, immediate: true })

</script>
