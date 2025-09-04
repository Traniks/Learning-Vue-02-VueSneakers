<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/stores/products'
import { useCartStore } from '@/stores/сartStore'

const cartStore = useCartStore()

const props = defineProps<{
  product: Product
}>()

const getImageUrl = (imageName: string): string => {
  return new URL(`../../assets/img/sneakers/${imageName}`, import.meta.url).href
}

const sneakersImageUrl = computed(() => {
  const imageName = props.product.imageUrl?.split('/').pop() || 'sneakers-1.jpg'
  return getImageUrl(imageName)
})
</script>

<template>
  <div
    class="w-full relative flex items-center gap-[20px] border-[1px] border-[#f3f3f3] rounded-[20px] pt-[20px] pr-[65px] pb-[30px] pl-[20px]">
    <img :src="sneakersImageUrl" alt="img" width="70" height="70">
    <img src="@/assets/icons/close.svg" alt="cross" width="32" height="32"
      class="absolute bottom-[20px] right-[20px] cursor-pointer" @click="cartStore.removeFromCart(product.id)">

    <div>
      <h4 class="text-[16px]">{{ product.title }}</h4>
      <p class="text-[16px] font-bold">{{ product.price }} ₽</p>
    </div>
  </div>
</template>
