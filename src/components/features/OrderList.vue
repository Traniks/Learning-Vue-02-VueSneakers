<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/сartStore';
import ProductCard from './ProductCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const cartStore = useCartStore()

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface StatusInfo {
  text: string
  color: string
  icon: string
}

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

const getStatusInfo = (status: string): StatusInfo => {
  const statusMap: Record<OrderStatus, StatusInfo> = {
    pending: {
      text: 'Ожидает обработки',
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳'
    },
    processing: {
      text: 'В обработке',
      color: 'bg-blue-100 text-blue-800',
      icon: '📦'
    },
    shipped: {
      text: 'Отправлен',
      color: 'bg-purple-100 text-purple-800',
      icon: '🚚'
    },
    delivered: {
      text: 'Доставлен',
      color: 'bg-green-100 text-green-800',
      icon: '✅'
    },
    cancelled: {
      text: 'Отменен',
      color: 'bg-red-100 text-red-800',
      icon: '❌'
    }
  }

  return statusMap[status as OrderStatus] || { text: status, color: 'bg-gray-100 text-gray-800', icon: '❓' }
}

onMounted(() => {
  cartStore.getOrders();
});

</script>

<template>
  <section class="px-[60px] py-[40px]">
    <div class="flex justify-start items-center gap-[20px]">
      <RouterLink to="/">
        <img src="@/assets/icons/back.svg" class="cursor-pointer" alt="back">
      </RouterLink>
      <h2 class="text-[32px] font-bold">Мои заказы</h2>
    </div>

    <template v-if="cartStore.loading">
      <div class="pt-[40px]">
        <h3 class="text-[24px] font-bold">Заказ №# от ##.##.##</h3>
        <div class="grid grid-cols-4 gap-[40px] py-[40px]">
          <img v-for="index in 4" :key="`loading-${index}`" src="@/assets/icons/loading-card.svg" alt="loading card"
            class="w-full" />
        </div>
      </div>
    </template>

    <template v-else-if="cartStore.error">
      <div class="flex flex-col items-center justify-center py-[40px] text-red-500">
        <p>{{ cartStore.error }}</p>
      </div>
    </template>

    <template v-else-if="!cartStore.orders.length">
      <div class="flex flex-col items-center justify-center">
        <img src="@/assets/img/emoji-2.png" alt="emoji" width="70" height="70">
        <h3 class="mt-[30px] text-[24px] font-semibold">У вас нет заказов</h3>
        <p class="opacity-40">Оформите хотя бы один заказ.</p>
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
      <div v-for="order in cartStore.orders" :key="order.id"
        class="pt-[20px] pb-[20px] border-b-[1px] border-b-[#F3F3F3] relative">
        <img src="@/assets/icons/close.svg" alt="order icon" class="absolute top-[20px] right-[20px] cursor-pointer"
          @click="cartStore.removeFromOrder(order.id)" />

        <div class="flex items-center gap-[20px]">
          <h3 class="text-[24px] font-bold">Заказ №{{ order.id }} от {{ formatOrderDate(order.orderDate) }}</h3>

          <div class="flex items-center gap-2">
            <span>{{ getStatusInfo(order.status).icon }}</span>
            <span
              :class="`px-3 py-1 rounded-full text-sm font-medium text-[16px] ${getStatusInfo(order.status).color}`">
              {{ getStatusInfo(order.status).text }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-[40px] py-[40px]">
          <ProductCard v-for="product in order.items" :key="product.id" :product="product" :show-cart="false"
            :show-favorite="false" />
        </div>

        <div class="flex justify-end items-center gap-[20px]">
          <span class="text-lg opacity-50">Итого c комиссией 5%:</span>
          <span class="text-lg font-bold">{{ order.totalAmount }} руб.</span>
        </div>
      </div>
    </template>

  </section>
</template>
