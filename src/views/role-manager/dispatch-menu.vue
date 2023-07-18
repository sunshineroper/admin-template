<template>
  <el-tree
    ref="treeRef"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-checked-keys="checkedKeys"
    :props="defaultProps"
    :loading="loading"
  >
    <template #default="{ node, data }">
      <span :class="customNodeClass(data)">{{ node.label }}</span>
      <el-button
        link
        type="primary"
        size="small"
        @click="dispathBtn(data.id)"
      >
        <div
          v-if="isShowDispathBtn(data, node)"
          class="flex items-center ml-8"
        >
          <span>按钮分配</span>
        </div>
      </el-button>
    </template>
  </el-tree>
  <dispatch-btn
    v-model="dispatchisVisible"
    :menu_id="menu_id"
  />
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import dispatchBtn from './dispatch-btn/index.vue'
import { userStore } from '@/store/modules/user'
import mitt from '@/utils/event'

const store = userStore()
const loading = ref(false)
const treeRef = ref()
const dispatchisVisible = ref(false)
const menu_id = ref()
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

const treeData = computed(() => store.roleTreeRouter.map((item) => {
  if (item.status === 0)
    item.disbaled = true
  return item
}))

const props = defineProps({
  defaultCheckedKeys: {
    type: Array,
    default: () => [],
  },
})

const checkedKeys = ref([])

const onClickConfrim = () => {
  const checkedKey = []
  const allChecked = treeRef.value && treeRef.value.getCheckedNodes(false, true)
  if (allChecked) {
    allChecked.forEach((node) => {
      checkedKey.push(node.id)
    })
  }
  mitt.emit('dispathTreeMenu', checkedKey)
}

const dispathBtn = (id) => {
  menu_id.value = id
  dispatchisVisible.value = true
}

const isShowDispathBtn = computed(() => {
  return (row, node) => {
    return row.pid !== 0 && node.checked
  }
})

defineExpose({ onClickConfrim })

watch(() => props.defaultCheckedKeys, (val) => {
  nextTick(() => {
    treeRef.value && treeRef.value.setCheckedKeys(val)
  })
}, { deep: true, immediate: true })

</script>
