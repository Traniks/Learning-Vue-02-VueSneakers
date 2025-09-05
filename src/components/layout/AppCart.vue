<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import CartItem from '@/components/features/CartItem.vue'
import { useCartStore } from '@/stores/сartStore'

import EmptyImg from '@/assets/img/package-icon.png'
import OrderImg from '@/assets/img/order-success-icon.png'

const cartStore = useCartStore()
</script>

<template>
  <div v-if="cartStore.cartOpen">
    <div class="bg-black opacity-50 h-full w-full fixed top-0 left-0 right-0 flex items-end z-5"
      @click="cartStore.closeCart"></div>

    <div class="fixed top-0 right-0 z-6 bg-white h-full w-[385px] pt-[32px] pb-[30px] px-[30px]" v-auto-animate>
      <div class="flex items-center gap-[15px]">
        <svg class="rotate-180 stone-950 cursor-pointer opacity-50 hover:opacity-100 transition duration-300"
          @click="cartStore.closeCart" width="16" height="14" viewBox="0 0 16 14" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <h2 class="text-[28px] font-bold">Корзина</h2>
      </div>

      <template v-if="cartStore.cartState === 'empty'">
        <div class="py-[30px] flex flex-col items-center h-full justify-center">
          <img :src="EmptyImg" alt="package" width="120">
          <h3 class="mt-[20px] font-semibold text-[22px] text-center">Корзина пустая</h3>
          <p class="mt-[10px] text-[16px] opacity-40 text-center">Добавьте хотя бы одну пару кроссовок, чтобы сделать
            заказ.</p>
          <BaseButton class="w-full mt-[40px]" @click="cartStore.closeCart">Вернуться назад
            <template #icon>
              <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                class="absolute translate-y-[-50%] top-[50%] rotate-180 left-[60px]" />
            </template>
          </BaseButton>
        </div>
      </template>

      <template v-if="cartStore.cartState === 'filled'">
        <div class="py-[30px] flex flex-col h-full justify-between">

          <div class="flex flex-col items-center gap-[20px]" v-auto-animate>
            <CartItem v-for="item in cartStore.cart" :key="item.id" :product="item" />
          </div>

          <div>
            <div class="flex gap-2">
              <span class="text-[18px]">Итого:</span>
              <div class="flex-1 border-b border-dashed"></div>
              <b class="text-[16px] font-bold">{{ cartStore.totalPrice }} ₽</b>
            </div>

            <div class="flex gap-2 mt-20px">
              <span class="text-[18px]">Налог 5%:</span>
              <div class="flex-1 border-b border-dashed"></div>
              <b class="text-[16px] font-bold">{{ cartStore.totalTax }} ₽</b>
            </div>

            <BaseButton class="w-full mt-[24px]" @click="cartStore.addToOrder">Оформить заказ
              <template #icon>
                <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                  class="absolute translate-y-[-50%] top-[50%] right-[60px]" />
              </template>
            </BaseButton>
          </div>
        </div>
      </template>

      <template v-if="cartStore.cartState === 'ordered'">
        <div class="py-[30px] flex flex-col items-center h-full justify-center">
          <img :src="OrderImg" alt="order success" width="83">
          <h3 class="success mt-[30px] font-semibold text-[22px] text-center">Заказ оформлен!</h3>
          <p class="mt-[10px] text-[16px] opacity-40 text-center">Ваш заказ #{{ cartStore.currentOrderId }} скоро будет
            передан
            курьерской
            доставке</p>
          <BaseButton class="w-full mt-[40px]" @click="cartStore.closeCart">Вернуться назад
            <template #icon>
              <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                class="absolute translate-y-[-50%] top-[50%] rotate-180 left-[60px]" />
            </template>
          </BaseButton>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.success {
  color: #87c20a;
}
</style>
