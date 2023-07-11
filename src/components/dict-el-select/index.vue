<template>
  <el-select
    v-model="status"
    :placeholder="placeholder"
    size="large"
    clearable
  >
    <el-option
      v-for="item in defaultStatusDict"
      :key="item.label"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { getDict } from '@/utils/dict'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请选择要查询的状态',
  },
  dictStatusType: {
    type: String,
  },
})

const emits = defineEmits(['update:modelValue'])
const status = useVModel(props, 'modelValue', emits)

const defaultStatusDict = ref([{
  label: '启用',
  value: 1,
}, {
  label: '禁用',
  value: 0,
}])

watch(() => props.status, (val) => {
  status.value = val
}, { immediate: true })

watch(() => props.dictStatusType, (val) => {
  const dict = getDict(val)
  if (dict.length > 0)
    defaultStatusDict.value = dict
}, { immediate: true })

</script>
