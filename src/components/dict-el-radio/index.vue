<template>
  <el-radio-group
    v-model="status"
    class="ml-4"
  >
    <el-radio
      v-for="dict of defaultStatusDict"
      :key="dict.value"
      :label="+dict.value"
      size="large"
    >
      {{ dict.label }}
    </el-radio>
  </el-radio-group>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { getDict } from '@/utils/dict'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
    default: 1,
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
}, { deep: true, immediate: true })

watch(() => props.dictStatusType, (val) => {
  const dict = getDict(val)
  if (dict.length > 0)
    defaultStatusDict.value = dict
}, { immediate: true })

</script>
