<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAppStore } from '@/stores/app'

import EmptyImg from '@/assets/img/package-icon.png'
import OrderImg from '@/assets/img/order-success-icon.png'

const appStore = useAppStore()
</script>

<template>
  <div v-if="appStore.cartOpen">
    <div class="bg-black opacity-50 h-full w-full fixed top-0 left-0 right-0 flex items-end z-5"
      @click="appStore.closeCart"></div>

    <div class="fixed top-0 right-0 z-6 bg-white h-full w-[385px] pt-[32px] pb-[30px] px-[30px]">
      <h2 class="text-[28px] font-bold">Корзина</h2>

      <div class="py-[30px] flex flex-col items-center justify-center h-full">

        <template v-if="true">
          <img :src="EmptyImg" alt="package" width="120">
          <h3 class="mt-[20px] font-semibold text-[22px] text-center">Корзина пустая</h3>
          <p class="mt-[10px] text-[16px] opacity-40 text-center">Добавьте хотя бы одну пару кроссовок, чтобы сделать
            заказ.</p>
          <BaseButton class="w-full mt-[40px]" @click="appStore.closeCart">Вернуться назад
            <template #icon>
              <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                class="absolute translate-y-[-50%] top-[50%] rotate-180 left-[60px]" />
            </template>
          </BaseButton>
        </template>

        <template>
          <div class="py-[30px] flex flex-col items-center justify-between">
            <p>Товары, которые вы добавили в корзину:</p>
            <div>
              <p></p>
              <p></p>
              <BaseButton class="w-full">Оформить заказ
                <template #icon>
                  <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                    class="absolute translate-y-[-50%] top-[50%] left-[60px]" />
                </template>
              </BaseButton>
            </div>
          </div>
        </template>

        <template>
          <img :src="OrderImg" alt="order success" width="83">
          <h3 class="success mt-[30px] font-semibold text-[22px] text-center">Заказ оформлен!</h3>
          <p class="mt-[10px] text-[16px] opacity-40 text-center">Ваш заказ #18 скоро будет передан курьерской
            доставке</p>
          <BaseButton class="w-full mt-[40px]" @click="appStore.closeCart">Вернуться назад
            <template #icon>
              <img src="@/assets/icons/arrow-next.svg" alt="arrow"
                class="absolute translate-y-[-50%] top-[50%] rotate-180 left-[60px]" />
            </template>
          </BaseButton>
        </template>

      </div>
    </div>
  </div>
</template>

<style scoped>
.success {
  color: #87c20a;
}
</style>
