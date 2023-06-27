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
        label="角色名称"
        prop="name"
        :rules="{
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
        :rules="{
          required: true,
          message: '状态不能为空',
          trigger: 'change',
        }"
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
      <el-form-item
        label="描述"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
        />
      </el-form-item>
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
          @click="handleConfrim"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useCloned, useVModel } from '@vueuse/core'

const form = ref({
  status: 1,
})
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
const emits = defineEmits(['update:modelValue', 'onConfirm'])
const formRef = ref()
const isVisible = useVModel(props, 'modelValue', emits)
const handleClose = () => {
  isVisible.value = false
  form.value = {}
  form.value.status = 1
}
const handleConfrim = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emits('onConfirm', form.value)
      handleClose()
    }
  })
}

const title = computed(() => {
  if (form.value.id)
    return '编辑角色'
  else return '新增角色'
})

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    form.value = cloned.value
  }
}, { deep: true })
</script>
