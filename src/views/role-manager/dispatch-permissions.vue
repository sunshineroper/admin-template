<template>
  <el-drawer
    v-model="drawerVisible"
    title="权限分配"
    :with-header="false"
  >
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="分配菜单"
        name="first"
      >
        <dispatch-menu ref="dispathMenuRef" />
      </el-tab-pane>
      <el-tab-pane
        label="Config"
        name="second"
      >
        Config
      </el-tab-pane>
      <el-tab-pane
        label="Role"
        name="third"
      >
        Role
      </el-tab-pane>
      <el-tab-pane
        label="Task"
        name="fourth"
      >
        Task
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button
        type="primary"
        @click="handleClickConfirm"
      >
        确定
      </el-button>
    </template>
  </el-drawer>
</template>
<script setup>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
import dispatchMenu from './dispatch-menu.vue'
import mitt from '@/utils/event'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])

const drawerVisible = useVModel(props, 'modelValue', emits)
const activeName = ref('first')
const dispathMenuRef = ref()

mitt.on('dispathTreeMenu', (val) => {
})

const handleClickConfirm = () => {
  dispathMenuRef.value && dispathMenuRef.value.onClickConfrim()
}
</script>
