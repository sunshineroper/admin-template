<script setup>
</script>
<template>
  <div class="flex w-screen h-screen">
    <slider
      class="w-[210px] bg-[#545c64]"
      style="box-shadow:2px 0 6px rgba(0,21,41,.3);"
    />
    <Appmain class="flex-1 bg-light-50" />
  </div>
</template>
<script setup>
import Appmain from './components/main.vue'
import slider from './components/slider.vue'
</script>
