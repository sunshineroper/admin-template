<template>
  <div>
    <component
      :is="tool"
      v-for="tool in toolsComponents"
      :key="tool"
    />
    <slot />
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { toolsComponents, toolsComponentsName } from './index.js'
import mitt from '@/utils/event'

const emits = defineEmits('onClickRefresh', 'onClickSearch')
mitt.on('onClickRefresh', () => {
  emits('onClickRefresh')
})
mitt.on('onClickSearch', () => {
  emits('onClickSearch')
})
const props = defineProps({
  tools: {
    typeof: Array,
    default: () => {
      return ['search', 'refresh']
    },
    validator: (val) => {
      // eslint-disable-next-line no-unreachable-loop
      for (const name of val)
        return ['search', 'refresh'].includes(name)
    },
  },
})

watch(() => props.tools, (val) => {
  toolsComponents.value = []
  for (const name of val)
    toolsComponents.value.push(toolsComponentsName.get(name))
}, { immediate: true, deep: true })
</script>
