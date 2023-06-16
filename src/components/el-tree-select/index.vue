<template>
  <el-select
    ref="selectRef"
    v-model="selectVal"
    placeholder="Select"
    class="el-tree-select"
    @visible-change="visibleChange"
  >
    <el-option
      v-for="item in allOptions"
      :key="item.value"
      :label="item.name"
      :value="item.id"
    >
      <el-tree
        ref="treeRef"
        :data="treeDataList"
        :props="defaultProps"
        node-key="id"
        @node-click="nodeClick"
      />
    </el-option>
  </el-select>
</template>
<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits('onClickSelectTree')
const props = defineProps({
  treeData: {
    type: Array,
    default: () => {
      return [
        {
          id: 0,
          name: '主类目',
          children: [
            {
              id: 1,
              name: '系统管理',
            },
            {
              id: 2,
              name: '网站管理',
            },
            {
              id: 3,
              name: '项目管理',
              children: [
                {
                  id: 4,
                  name: '我的项目',
                },
                {
                  id: 5,
                  name: '协议管理',
                },
              ],
            },
          ],
        },
      ]
    },
  },
})

const selectVal = ref('主类目')
const selectRef = ref()
const treeRef = ref()

const treeCurrentKey = (key) => {
  if (treeRef.value) {
    const [ref] = treeRef.value
    ref && ref.setCurrentKey(key)
  }
}

const nodeClick = (val) => {
  const { id, name } = val
  selectVal.value = name
  emits('onClickSelectTree', { id, name })
  treeCurrentKey()
  selectRef.value.blur()
}

const visibleChange = (val) => {
  if (val)
    treeCurrentKey(0)
}

const allOptions = ref([{
  id: 0,
  name: '主类目',
},
])

const treeDataList = ref([{
  id: 0,
  name: '主类目',
  children: [],
}])

const defaultProps = {
  children: 'children',
  label: 'name',
}

watch(() => props.treeData, (val) => {
  treeDataList.value[0].children.push(...val)
}, { deep: true, immediate: true })
</script>
<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }

</style>
