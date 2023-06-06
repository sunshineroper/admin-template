<template>
  <div class="flex items-center">
    <el-switch
      v-model="darkVal"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      class="mr-4"
      style="--el-switch-on-color: #0960bd; --el-switch-off-color: #ff6600"
      @change="toggleDark()"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'

const darkVal = ref(false)
const isDark = useDark()
darkVal.value = isDark.value
const toggleDark = useToggle(isDark)

</script>
