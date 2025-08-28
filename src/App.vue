<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
</script>

<template>
  <main class="w-4/5 m-auto py-[85px]">
    <Header />
    <RouterView />
  </main>

</template>

<style scoped></style>
