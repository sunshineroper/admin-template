<template>
  <div class="login-container bg-cover w-full h-full relative">
    <div class="absolute w-[30%] h-[240px] px-4 py-12 top-[28vh] left-[8vw] bg-white box-content rd-[12px]">
      <div class="flex justify-center items-center text-4xl mb-8">
        <div class="i-carbon-sun text-orange-400 mr-4" />
        <span>Sun-Vue-Admin</span>
      </div>
      <el-form
        label-position="left"
        label-width="0"
        :model="login"
      >
        <el-form-item class="relative">
          <el-input v-model="login.name" />
          <div class="absolute right-4">
            <el-icon><User /></el-icon>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="login.region"
            type="password"
            class="relative"
          />
          <div class="absolute right-4">
            <div class="i-mdi-eye-off-outline cursor-pointer" />
          </div>
        </el-form-item>
      </el-form>
      <div class="flex">
        <el-button
          class="flex-1"
          type="primary"
          size="large"
        >
          初始化
        </el-button>
        <el-button
          class="flex-1"
          type="primary"
          size="large"
          :loading="loading"
          @click="handleClickLogin"
        >
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'

// import { useRouter } from 'vue-router'
import { Public } from '@/api/public'
import { userStore } from '@/store/modules/user'

// const router = useRouter()
const store = userStore()
const login = ref({})
const loading = ref(false)

const handleClickLogin = async () => {
  // loading.value = true
  const { accessToken, refreshToken } = await Public.login()
  // loading.value = false
  store.changeIsLogin(true)
  store.setAccessToken(accessToken)
  store.setRefreshToken(refreshToken)
  // router.push({ path: '/' })
}
</script>

<style scoped>
.login-container {
  background-image: url('@/assets/img/login-bg.jpg');
}
</style>
