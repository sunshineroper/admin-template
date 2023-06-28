<template>
  <el-tree
    ref="treeRef"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  />
</template>
<script setup>
import { computed, ref } from 'vue'
import { userStore } from '@/store/modules/user'
import mitt from '@/utils/event'

const store = userStore()
const treeRef = ref()
const defaultProps = {
  children: 'children',
  label: 'name',
}
const treeData = computed(() => store.roleTreeRouter)

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
</script>
