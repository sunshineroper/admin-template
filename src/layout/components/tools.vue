<template>
  <div class="flex items-center">
    <div
      class="i-logos-github-icon text-base cursor-pointer mr-6"
      @click="onClickToRouter('test1')"
    />
    <div
      class="i-ri-moon-line text-base cursor-pointer"
      @click="onClickToRouter('test2')"
    />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function onClickToRouter(name) {
  router.push({ name })
}
</script>
