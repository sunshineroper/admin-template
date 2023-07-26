<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      :style="`height: ${props.height}px; overflow-y: hidden`"
      :mode="mode"
      :default-config="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { ref, shallowRef } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    default: 300,
    defaultValue: 300,
  },
})
const emits = defineEmits(['update:modelValue'])
const valueHtml = useVModel(props, 'modelValue', emits)
const editorRef = shallowRef()
const mode = ref('default')
const toolbarConfig = {
  excludeKeys: ['group-video', 'undo', 'redo'],
}

const handleCreated = (editor) => {
  editorRef.value = editor
}

const editorConfig = ref({
  MENU_CONF: {
    uploadImage: {
      server: 'http://127.0.0.1:3000/upload',
      customInsert(res, insertFn) { // TS 语法
        const [file] = res
        insertFn(file.url, file.filename)
      },
    },
  },
})

</script>
