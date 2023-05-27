<script setup>
</script>
<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>
<style>
body {
  margin: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s
}
.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}
</style>
