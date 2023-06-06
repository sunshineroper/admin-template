<template>
  <div
    class="box-border shadow-md fixed top-0 left-[200px] right-0 backdrop-blur-sm bg-white/75 z-10 dark:bg-black/75"
  >
    <div class="mx-6 flex py-3">
      <div class="flex-1 flex items-center">
        <folder-slider />
        <bread-crumb class="py-0.5 ml-4" />
      </div>
      <tools />
      <avatar />
    </div>
    <tags-tab />
  </div>
</template>
<script setup>
import folderSlider from './folder-slider.vue'
import breadCrumb from './bread-crumb.vue'
import tools from './tools.vue'
import avatar from './avatar.vue'
import tagsTab from './tags-tab/index.vue'
</script>
