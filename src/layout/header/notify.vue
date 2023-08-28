<template>
  <el-badge
    :is-dot="isDot"
    class="flex justify-center items-center mx-2 cursor-pointer"
    @click="handleDotClick"
  >
    <el-icon :size="20">
      <Bell />
    </el-icon>
  </el-badge>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Bell } from '@element-plus/icons-vue'
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import ObServer from '@/utils/observer'
import mitt from '@/utils/event'

const router = useRouter()

const isDot = ref(false)
onMounted(() => {
  // eslint-disable-next-line no-new
  new ObServer(`ws://localhost:3000/ws/message?token=${useLocalStorage('accessToken', '').value}`)
})

mitt.on('emitMessage', () => {
  isDot.value = true
})

const handleDotClick = () => {
  router.push('/notify')
  isDot.value = false
}

</script>
