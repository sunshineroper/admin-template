<template>
  <el-tree
    ref="treeRef"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-checked-keys="checkedKeys"
    :props="defaultProps"
    :loading="loading"
  />
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { Admin as AdminApi } from '@/api/admin'
import mitt from '@/utils/event'

const loading = ref(false)
const treeData = ref([])
const treeRef = ref()
const customNodeClass = (data) => {
  if (data.status === 0)
    return 'text-red-600'
}
const defaultProps = {
  children: 'children',
  label: 'name',
  disabled: 'disabled',
  class: customNodeClass,
}

const normaizeList = (list) => {
  const obj = {}
  const listTree = []
  if (list.length === 0)
    return listTree

  list.forEach((item) => {
    const module_name = item.module_name
    if (!obj[module_name]) {
      obj[module_name] = {
        id: 0,
        name: module_name,
        children: [],
      }
    }
    obj[module_name].children.push({
      name: `${item.permission_name} - ${item.endpoint}`,
      id: item.id,
      status: item.status,
    })
  })
  const keys = Reflect.ownKeys(obj)
  if (keys.length > 0)
    keys.forEach(key => listTree.push(obj[key]))
  return listTree
}

const getList = async () => {
  const list = await AdminApi.getApiList()
  treeData.value = normaizeList(list)
}

onMounted(async () => {
  await getList()
})
const props = defineProps({
  defaultCheckedKeys: {
    type: Array,
    default: () => [],
  },
})

const checkedKeys = ref([])

const onClickConfrim = () => {
  const checkedKey = []
  const allChecked = treeRef.value && treeRef.value.getCheckedNodes()
  if (allChecked) {
    allChecked.forEach((node) => {
      checkedKey.push(node.id)
    })
  }
  mitt.emit('dispathTreeApi', checkedKey)
}

defineExpose({ onClickConfrim })

watch(() => props.defaultCheckedKeys, (val) => {
  nextTick(() => {
    treeRef.value && treeRef.value.setCheckedKeys(val)
  })
}, { deep: true, immediate: true })

</script>
