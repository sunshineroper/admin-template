<template>
  <div class="flex items-center">
    <div
      class="i-logos-github-icon text-xl cursor-pointer mr-4"
      @click="onClickToRouter('test1')"
    />
    <div
      class="i-ri-moon-line text-xl cursor-pointer"
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
