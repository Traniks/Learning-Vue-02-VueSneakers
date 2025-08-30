<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products';
import ProductCard from './ProductCard.vue';

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts();
});
</script>

<template>
  <section class="px-[60px]">
    <div class="flex justify-between items-center">
      <h2 class="text-[32px] font-bold">Все кроссовки</h2>

      <div class="flex justify-between items-center gap-[20px]">
        <select name="category" id="select-category" class="px-3 py-2 rounded-md border border-gray-300 outline-none">
          <option value="all">Все</option>
          <option value="men">Мужские</option>
          <option value="women">Женские</option>
        </select>

        <div class="relative">
          <img src="@/assets/icons/search.svg" alt="search" class="absolute left-4 top-3">
          <input type="text" placeholder="Поиск..."
            class="pl-11 py-2 pr-2 border border-gray-300 focus:border-gray-400 outline-none rounded-md" />
        </div>
      </div>
    </div>

    <div v-if="productsStore.loading" class="text-center py-[40px]">
      <p>Загрузка товаров...</p>
    </div>

    <div v-else-if="productsStore.error" class="text-center py-[40px] text-red-500">
      <p>{{ productsStore.error }}</p>
    </div>

    <div class="grid grid-cols-4 gap-[40px] py-[40px]">
      <ProductCard v-for="product in productsStore.products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
