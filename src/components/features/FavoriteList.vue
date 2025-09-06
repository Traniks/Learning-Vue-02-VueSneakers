<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products';
import ProductCard from './ProductCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts();
  productsStore.fetchFavorites();
});

</script>

<template>
  <section class="px-[60px] pt-[40px]">
    <div class="flex justify-start items-center gap-[20px]">
      <RouterLink to="/">
        <img src="@/assets/icons/back.svg" class="cursor-pointer" alt="back">
      </RouterLink>
      <h2 class="text-[32px] font-bold">Мои закладки</h2>
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

      <template v-else-if="!productsStore.favorites.length">
        <div class="flex flex-col items-center justify-center py-[200px]">
          <img src="@/assets/img/emoji-1.png" alt="emoji" width="70" height="70">
          <h3 class="mt-[30px] text-[24px] font-semibold">Закладок нет :(</h3>
          <p class="opacity-40">Вы ничего не добавляли в закладки</p>
          <RouterLink to="/" class="mt-[70px]">
            <BaseButton class="w-[245px]">Вернуться назад
              <template #icon>
                <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                  class="absolute translate-y-[-50%] top-[50%] rotate-180 left-[30px]" />
              </template>
            </BaseButton>
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <div class="grid grid-cols-4 gap-[40px] py-[40px]">
          <ProductCard v-for="favorite in productsStore.favorites" :key="favorite.id" :product="favorite" />
        </div>
      </template>
    </div>
  </section>
</template>
