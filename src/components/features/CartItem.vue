<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: number
  title: string
  price: number
}>()
</script>

<template>
  <div
    class="w-full relative flex items-end gap-[20px] border-[1px] border-[#f3f3f3] rounded-[20px] pt-[20px] pr-[65px] pb-[30px] pl-[20px]">
    <img src="@/assets/img/sneakers/sneakers-1.jpg" alt="img" width="70" height="70">
    <img src="@/assets/icons/close.svg" alt="cross" width="32" height="32"
      class="absolute bottom-[20px] right-[20px] cursor-pointer">

    <div>
      <h4 class="text-[16px]">1</h4>
      <p class="text-[16px] font-bold">1 ₽</p>
    </div>
  </div>
</template>
