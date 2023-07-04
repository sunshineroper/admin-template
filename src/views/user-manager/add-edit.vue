<template>
  <el-dialog
    v-model="isVisible"
    :title="title"
    width="50%"
    :close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
    >
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="{
              required: true,
              message: '手机号不能为空',
              trigger: 'change',
            }"
          >
            <el-input v-model="form.mobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="用户角色"
        prop="role_id"
      >
        <el-select
          v-model="form.role_id"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择用户角色"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="!item.status"
          />
        </el-select>
      </el-form-item>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item
            label="用户昵称"
            prop="nickname"
          >
            <el-input v-model="form.nickname" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item
            label="部门"
            prop="de"
          >
            <el-input v-model="form.d" />
          </el-form-item> -->
        </el-col>
        <el-form-item
          label="状态"
          prop="status"
          :rules="{
            required: true,
            message: '状态不能为空',
            trigger: 'change',
          }"
        >
          <el-radio-group
            v-model="form.status"
          >
            <el-radio
              :label="1"
            >
              启用
            </el-radio>
            <el-radio
              :label="0"
            >
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
    </el-form>
    <template #footer>
      <div>
        <el-button
          @click="handleClose"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleConfrim"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useCloned, useVModel } from '@vueuse/core'
import { Admin as AdminApi } from '@/api/admin'

const props = defineProps({
  modelValue: {
    require: true,
    default: false,
  },
  selectVal: {
    type: Object,
    default: () => {
      return Object.assign({})
    },
  },
})
const form = ref({
  status: 1,
})

const emits = defineEmits(['update:modelValue', 'onConfirm'])
const isVisible = useVModel(props, 'modelValue', emits)
const reset = () => {
  form.value = {
    status: 1,
    name: '',
    nickname: '',
  }
}
const roleList = ref([])
const getRoleList = async () => {
  const list = await AdminApi.getRoleList()
  roleList.value = list
}

onMounted(async () => {
  await getRoleList()
})
getRoleList()
const handleClose = () => {
  reset()
  isVisible.value = false
}
const handleConfrim = () => {
  emits('onConfirm', form.value)
  handleClose()
}
const title = computed(() => {
  if (form.value.id && form.value.id !== 0)
    return '修改菜单'
  else
    return '新增菜单'
})
watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    form.value = cloned.value
    form.value.role_id = form.value.role_list.map(item => item.id)
  }
})
</script>
