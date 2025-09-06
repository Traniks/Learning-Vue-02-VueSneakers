<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/stores/products';
import ProductCard from './ProductCard.vue';

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts();
  productsStore.fetchFavorites()
});

onUnmounted(() => {
  productsStore.clearSearchTimeout();
});
</script>

<template>
  <section class="px-[60px]">
    <div class="flex justify-between items-center">
      <h2 class="text-[32px] font-bold">Все кроссовки</h2>

      <div class="flex justify-between items-center gap-[20px]">
        <select name="category" id="select-category" v-model="productsStore.filters.sortBy"
          class="px-3 py-2 rounded-md border border-gray-300 outline-none">
          <option value="">Все</option>
          <option value="price">Сначала дешевые</option>
          <option value="-price">Сначала дорогие</option>
        </select>

        <div class="relative">
          <img src="@/assets/icons/search.svg" alt="search" class="absolute left-4 top-3">
          <input type="text" placeholder="Поиск..." v-model="productsStore.filters.searchQuery"
            class="pl-11 py-2 pr-2 border border-gray-300 focus:border-gray-400 outline-none rounded-md" />
        </div>
      </div>
    </div>

    <div v-auto-animate>
      <template v-if="productsStore.loading">
        <div class="py-[200px] flex justify-center">
          <img src="@/assets/icons/loader.svg" alt="loader" width="100" height="100">
        </div>
      </template>

      <template v-else-if="productsStore.error">
        <div class="py-[200px] flex justify-center text-red-500">
          <p>{{ productsStore.error }}</p>
        </div>
      </template>

      <template v-else>
        <div class="grid grid-cols-4 gap-[40px] py-[40px]">
          <ProductCard v-for="product in productsStore.products" :key="product.id" :product="product" />
        </div>
      </template>
    </div>
  </section>
</template>
