<template>
  <el-tree
    ref="treeRef"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-checked-keys="checkedKeys"
    :props="defaultProps"
  />
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { userStore } from '@/store/modules/user'
import mitt from '@/utils/event'

const store = userStore()
const treeRef = ref()
const customNodeClass = (data) => {
  if (data.status === 0)
    return 'text-red-600'
}
const defaultProps = {
  children: 'children',
  label: 'name',
  class: customNodeClass,
}
const treeData = computed(() => store.roleTreeRouter)

const props = defineProps({
  defaultCheckedKeys: {
    type: Array,
    default: () => [],
  },
})

const checkedKeys = ref([])

const onClickConfrim = () => {
  const checkedKey = []
  const allChecked = treeRef.value && treeRef.value.getCheckedNodes(true)
  if (allChecked) {
    allChecked.forEach((node) => {
      checkedKey.push(node.id)
    })
  }
  mitt.emit('dispathTreeMenu', checkedKey)
}

defineExpose({ onClickConfrim })

watch(() => props.defaultCheckedKeys, (val) => {
  nextTick(() => {
    treeRef.value && treeRef.value.setCheckedKeys(val)
  })
}, { deep: true, immediate: true })
</script>
