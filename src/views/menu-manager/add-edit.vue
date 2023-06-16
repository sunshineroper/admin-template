<template>
  <el-dialog
    v-model="isVisible"
    title="新增菜单"
    width="50%"
    :close="handleClose"
  >
    <el-form
      :model="form"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          :tree-data="treeData"
          @onClickSelectTree="onClickSelectTree"
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
      <el-form-item label="菜单标题">
        <el-input v-model="form.title" />
      </el-form-item>
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
        <el-button @click="isVisible = false">
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
import elTreeSelect from '@/components/el-tree-select/index.vue'
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
const treeData = computed(() => store.roleTreeRouter)
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

const onClickSelectTree = (val) => {
  form.value.pid = val.id
}

const emits = defineEmits(['update:modelValue', 'onConfirm'])
const isVisible = useVModel(props, 'modelValue', emits)

const handleClose = () => {
  isVisible.value = false
}
const onConfirmClick = () => {
  emits('onConfirm', form.value)
  reset()
  handleClose()
}

watch(() => props.selectVal, (obj) => {
  form.value = obj
}, { deep: true })

</script>
