import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const cartOpen = ref(false)

  const openCart = () => {
    cartOpen.value = true
  }

  const closeCart = () => {
    cartOpen.value = false
  }

  return {
    cartOpen,
    openCart,
    closeCart,
  }
})
