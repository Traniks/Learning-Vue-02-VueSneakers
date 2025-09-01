<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/stores/products'
import { useProductsStore } from '@/stores/products'

import like from '@/assets/icons/like-2.svg'
import unlike from '@/assets/icons/like-1.svg'

const props = defineProps<{
  product: Product
}>()

const productsStore = useProductsStore()

const getImageUrl = (imageName: string): string => {
  return new URL(`../../assets/img/sneakers/${imageName}`, import.meta.url).href
}

const imageUrl = computed(() => {
  const imageName = props.product.imageUrl?.split('/').pop() || 'sneakers-1.jpg'
  return getImageUrl(imageName)
})

</script>

<template>
  <div
    class="relative pt-[20px] pb-[35px] px-[30px] border border-gray-300 rounded-[40px] hover:translate-y-[-20px] hover:shadow-lg transition duration-300">
    <div class="flex flex-col justify-between h-[100%]">
      <img :src="false ? like : unlike" alt="like" width="32" height="32" class="absolute top-8 left-8 cursor-pointer">
      <img :src="imageUrl" alt="dislike">

      <h3 class="font-regular text-lg">{{ product.title }}</h3>

      <div class="mt-[14px] flex justify-between items-center">
        <div>
          <p class="text-gray-400 uppercase text-sm font-medium">Цена:</p>
          <span class="text-lg font-bold">{{ product.price }} руб.</span>
        </div>
        <img src="@/assets/icons/plus.svg" alt="plus" width="32" height="32" class="cursor-pointer">
      </div>
    </div>
  </div>
</template>
