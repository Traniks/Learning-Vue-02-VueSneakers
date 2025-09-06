<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/layout/AppHeader.vue'
import Cart from './components/layout/AppCart.vue'
</script>

<template>
  <div class="w-4/5 m-auto my-[85px] shadow-xl rounded-[20px] bg-white">
    <Header />
    <Cart />
    <main>
      <RouterView />
    </main>
  </div>

</template>
