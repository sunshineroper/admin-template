<template>
  <el-drawer
    v-model="drawerVisible"
    title="权限分配"
    :with-header="false"
  >
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="分配菜单"
        name="first"
      >
        <el-text
          class="my-4"
          type="danger"
        >
          提示:红色显示的节点为禁用的菜单
        </el-text>
        <dispatch-menu
          ref="dispathMenuRef"
          :default-checked-keys="defaultCheckedMenuKeys"
        />
      </el-tab-pane>
      <el-tab-pane
        label="分配API权限"
        name="second"
      >
        <el-text
          class="my-4"
          type="danger"
        >
          提示:红色显示的节点为禁用的接口
        </el-text>
        <dispath-api
          ref="dispathApiRef"
          :default-checked-keys="defaultCheckedRouterKeys"
        />
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
import dispathApi from './dispatch-api.vue'
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
const defaultCheckedMenuKeys = ref([])
const defaultCheckedRouterKeys = ref([])

const drawerVisible = useVModel(props, 'modelValue', emits)
const activeName = ref('first')
const dispathMenuRef = ref()
const dispathApiRef = ref()
const menu_id = ref([])
const permission_router_id = ref([])
mitt.on('dispathTreeMenu', (val) => {
  menu_id.value = val
})

mitt.on('dispathTreeApi', (val) => {
  permission_router_id.value = val
})

const handleClickConfirm = async () => {
  dispathMenuRef.value && dispathMenuRef.value.onClickConfrim()
  dispathApiRef.value && dispathApiRef.value.onClickConfrim()
  const { code, message } = await AdminApi.dispatchPermissions(props.selectVal.id, { menu_id: menu_id.value, permission_router_id: permission_router_id.value })
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
  defaultCheckedMenuKeys.value = []
  defaultCheckedRouterKeys.value = []
}

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    defaultCheckedMenuKeys.value = cloned.value.role_menu.map(item => item.id)
    defaultCheckedRouterKeys.value = cloned.value.permission_router_list.map(item => item.id)
  }
}, { deep: true })
</script>
