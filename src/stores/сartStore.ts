import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from './products'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', () => {
  const cartOpen = ref(false)
  const cartState = ref<'empty' | 'filled' | 'ordered'>('empty')
  const cart = ref<Product[]>([])

  const openCart = () => {
    cartOpen.value = true
  }

  const closeCart = () => {
    cartOpen.value = false
  }

  const addToCart = async (productId: number) => {
    const productsStore = useProductsStore()
    const product = productsStore.products.find((item) => item.id === productId)

    if (!product) return

    cart.value.push(product)
    cartState.value = 'filled'
  }

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.id !== productId)
    if (cart.value.length === 0) {
      cartState.value = 'empty'
    }
  }

  const toggleCart = (id: number) => {
    const isCurrentlyInCart = cart.value.some((item) => item.id === id)

    if (isCurrentlyInCart) {
      removeFromCart(id)
    } else {
      addToCart(id)
    }
  }

  const isAdded = (productId: number) => {
    return cart.value.some((item) => item.id === productId)
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price, 0)
  })

  const totalTax = computed(() => totalPrice.value * 0.05)

  return {
    cartOpen,
    cartState,
    cart,
    totalPrice,
    totalTax,
    isAdded,
    openCart,
    closeCart,
    addToCart,
    toggleCart,
    removeFromCart,
  }
})
