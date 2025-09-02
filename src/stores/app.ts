import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const cartOpen = ref(false)
  // const cartState = ref<'empty' | 'filled' | 'ordered'>('empty')
  const cartState = ref<'empty' | 'filled' | 'ordered'>('filled')

  const openCart = () => {
    cartOpen.value = true
  }

  const closeCart = () => {
    cartOpen.value = false
  }

  return {
    cartOpen,
    cartState,
    openCart,
    closeCart,
  }
})
