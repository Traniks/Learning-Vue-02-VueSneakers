<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
</script>

<template>
  <div class="w-4/5 m-auto my-[85px] shadow-xl rounded-[20px] bg-white">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>

</template>
