<template>
  <div class="flex flex-col">
    <div class="flex shadow-sm">
      <div class="flex mx-2 py-4 items-center flex-1">
        <folder-silder class="mr-8" />
        <bread-crumb />
      </div>
      <div class="py-4 mr-2">
        <tools />
      </div>
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import folderSilder from './folder-slider.vue'
import breadCrumb from './bread-crumb.vue'
import tools from './tools.vue'
</script>
