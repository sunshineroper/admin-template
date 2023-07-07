<template>
  <el-tag
    :type="tagDictType"
  >
    {{ tagDictLabel }}
  </el-tag>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { getDict, getDictLabel } from '@/utils/dict'

const props = defineProps({
  status: {
    type: Number || String,
    default: 0,
    required: true,
  },
  dictStatusType: {
    type: String,
  },
  dictType: {
    type: String,
  },
})

const _status = ref(0)
const defaultStatusDict = ref([{
  label: '启用',
  value: 1,
}, {
  label: '禁用',
  value: 0,
}])

const defaultTypeDict = ref([{
  label: 'success',
  value: 1,
}, {
  label: 'error',
  value: 0,
}])

const tagDictLabel = computed(() => {
  return getDictLabel(defaultStatusDict.value, _status.value)
})

const tagDictType = computed(() => {
  return getDictLabel(defaultTypeDict.value, _status.value)
})

watch(() => props.status, (val) => {
  _status.value = val
}, { immediate: true })

watch(() => props.dictStatusType, (val) => {
  const dict = getDict(val)
  if (dict.length > 0)
    defaultStatusDict.value = dict
}, { immediate: true })

watch(() => props.dictType, (val) => {
  const dict = getDict(val)
  if (dict.length > 0)
    defaultTypeDict.value = dict
}, { immediate: true })

</script>
