<template>
  <el-dropdown
    size="large"
    @command="handleCommand"
  >
    <div class="flex items-center">
      <el-avatar
        :src="userInfo.avatar"
      />
      <span class="text-base">
        {{ userInfo.name }}
      </span>
      <div class="i-ic-outline-arrow-drop-down text-sm" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="User">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item
          :icon="SwitchButton"
          command="loginOut"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed } from 'vue'
import { SwitchButton, User } from '@element-plus/icons-vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/modules/user'

const store = userStore()
const router = useRouter()
const userInfo = computed(() => store.userInfo)
const loginOut = () => {
  ElMessageBox.confirm(
    '是否确定退出登录',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      store.changeLoginOut()
      ElNotification({
        title: '通知',
        message: '退出登录成功',
        type: 'success',
      })
      setTimeout(() => {
        router.replace('/login')
      }, 300)
    })
    .catch(() => {
    })
}
const handleCommand = (val) => {
  if (val === 'loginOut')
    loginOut()
}

</script>
