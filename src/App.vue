<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from './ui/layout/AppFooter.vue';
import AppHeader from './ui/layout/AppHeader.vue';
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
@import '@/assets/cel-shading.css';
@import '@/assets/themes.css';

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Transiciones entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
