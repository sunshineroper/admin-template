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
    >
      <el-form-item
        label="字典显示名称"
        prop="label"
        :rules="{
          required: true,
          message: '字典显示名称',
          trigger: 'blur',
        }"
      >
        <el-input v-model="form.label" />
      </el-form-item>
      <el-form-item
        label="字典值"
        prop="value"
        :rules="{
          required: true,
          message: '字典值不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="form.value" />
      </el-form-item>
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
            停用
          </el-radio>
        </el-radio-group>
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
import { useRoute } from 'vue-router'

const route = useRoute()
const form = ref({
  status: 1,
  sort: 0,
})
const formRef = ref()
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
const isVisible = useVModel(props, 'modelValue', emits)

const title = computed(() => {
  if (form.value.id && form.value.id !== 0)
    return '修改字典值'
  else
    return '新增字典值'
})
const handleClose = () => {
  isVisible.value = false
  form.value = {
    status: 1,
  }
}

const handleConfrim = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      form.value.dictionary_id = route.params.id
      emits('onConfirm', form.value)
      handleClose()
    }
  })
}

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    form.value = cloned.value
  }
})
</script>
