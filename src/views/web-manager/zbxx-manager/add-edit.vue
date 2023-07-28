<template>
  <el-dialog
    v-model="isVisible"
    :title="title"
    width="60%"
    :close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
    >
      <el-form-item
        label="公告标题"
        prop="title"
        :rules="{
          required: true,
          message: '公告标题不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item
        label="项目分类"
        prop="content"
        :rules="{
          required: true,
          message: '公告内容不能为空',
          trigger: 'blur',
        }"
      >
        <dict-el-select
          v-model="form.class_id"
          dict-status-type="zbxx_class"
          placeholder="请选择公告分类"
        />
      </el-form-item>
      <el-form-item
        label="公告状态"
        prop="content"
        :rules="{
          required: true,
          message: '公告状态不能为空',
          trigger: 'blur',
        }"
      >
        <dict-el-radio
          v-model="form.status"
          dict-status-type="status"
        />
      </el-form-item>
      <el-form-item
        label="公告内容"
        prop="content"
        :rules="{
          required: true,
          message: '公告内容不能为空',
          trigger: 'blur',
        }"
      >
        <editor v-model="form.content" />
      </el-form-item>
      <el-form-item
        label="附件"
        prop="content"
      >
        <el-upload
          v-model:file-list="form.notice_attachment"
          action="http://127.0.0.1:3000/upload"
          :on-error="handleFileError"
          :on-success="handleFileSuccess"
          :on-remove="handleFileRemove"
          multiple
        >
          <el-button type="primary">
            Click to upload
          </el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template>
        </el-upload>
      </el-form-item>
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
import { useCloned, useVModel } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import notification from '@/utils/dict-notification'
import { Upload as uploadApi } from '@/api/upload'

const form = ref({
  status: 1,
  content: '22',
  attachment_id: [],

})

const formRef = ref()
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
const emits = defineEmits(['update:modelValue', 'onConfirm'])
const isVisible = useVModel(props, 'modelValue', emits)
const editorRef = shallowRef()

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})
const title = computed(() => {
  if (form.value.id && form.value.id !== 0)
    return '修改公告'
  else
    return '新增公告'
})
const handleClose = () => {
  isVisible.value = false
  form.value = {
    status: 1,
    attachment_id: [],
  }
}

const handleConfrim = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      emits('onConfirm', form.value)
      handleClose()
    }
  })
}

const handleFileError = (error) => {
  const err = JSON.parse(error.message)
  notification(err.code, err.message)
}

const handleFileSuccess = (res) => {
  form.value.attachment_id.push(res[0].id)
}

const handleFileRemove = async (file, files) => {
  await uploadApi.deleteFile(file.id)

  form.value.attachment_id = files.map(f => f.response[0].id)
}

watch(() => props.selectVal, (obj) => {
  if (obj.id) {
    const { cloned } = useCloned(obj)
    form.value = cloned.value
    form.value.attachment_id = form.value.notice_attachment.map(item => item.id)
  }
}, { deep: true })
</script>
