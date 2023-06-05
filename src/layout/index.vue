<template>
  <div class="w-screen h-screen">
    <layout-aside />
    <layout-header />
    <layout-main>
      <ul>
        <li v-for="i in 1000">
          {{ i }}
        </li>
      </ul>
    </layout-main>
  </div>
</template>
<script setup>
import layoutAside from './aside/index.vue'
import layoutHeader from './header/index.vue'
import layoutMain from './main/index.vue'
</script>
