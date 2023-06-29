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
        <el-text
          class="my-2"
          type="danger"
        >
          提示:红色显示的节点为禁用的菜单
        </el-text>
        <dispatch-menu
          ref="dispathMenuRef"
          :default-checked-keys="defaultCheckedKeys"
        />
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
import { useCloned, useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import dispatchMenu from './dispatch-menu.vue'
import mitt from '@/utils/event'
import { Admin as AdminApi } from '@/api/admin'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  selectVal: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['update:modelValue', 'onDispathPermissions'])
const defaultCheckedKeys = ref([])

const drawerVisible = useVModel(props, 'modelValue', emits)
const activeName = ref('first')
const dispathMenuRef = ref()
const menu_id = ref([])
mitt.on('dispathTreeMenu', (val) => {
  menu_id.value = val
})

const handleClickConfirm = async () => {
  dispathMenuRef.value && dispathMenuRef.value.onClickConfrim()
  const { code, message } = await AdminApi.dispatchPermissions(props.selectVal.id, { menu_id: menu_id.value })
  if (code < 100) {
    ElNotification({
      title: 'Tips',
      message,
      type: 'success',
    })
  }
  else {
    ElNotification({
      title: 'Tips',
      message,
      type: 'error',
    })
  }
  emits('onDispathPermissions')
  drawerVisible.value = false
  defaultCheckedKeys.value = []
}

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    defaultCheckedKeys.value = cloned.value.role_menu.map(item => item.id)
  }
}, { deep: true })
</script>
