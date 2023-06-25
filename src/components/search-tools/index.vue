<template>
  <div>
    <component
      :is="tool"
      v-for="tool in tools"
      :key="tool"
    />
    <slot />
  </div>
</template>
<script setup>
/* eslint-disable */
import search from './search.vue'
import refresh from './refersh.vue'
// const props = defineProps({
//   tools: {
//     typeof: Array,
//     default: () => {
//       return ['search', 'refersh']
//     },
//   },
// })

const tools = [search, refresh]
</script>
