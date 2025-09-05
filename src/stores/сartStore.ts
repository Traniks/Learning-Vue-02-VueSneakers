import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

import type { Product } from './products'
import { useProductsStore } from './products'

export interface OrderItem {
  id: number
  title: string
  price: number
  imageUrl: string
}

export interface Order {
  id: number
  items: OrderItem[]
  totalPrice: number
  totalTax: number
  totalAmount: number
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

export const useCartStore = defineStore('cart', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const cart = ref<Product[]>([])
  const cartOpen = ref(false)
  const cartState = ref<'empty' | 'filled' | 'ordered'>('empty')

  const currentOrderId = ref<number | null>(null)
  const orders = ref<Order[]>([])

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
  const isAddedToCart = (productId: number) => {
    return cart.value.some((item) => item.id === productId)
  }

  const getOrders = async () => {
    loading.value = true
    try {
      const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/orders')
      orders.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }
  const addToOrder = async () => {
    loading.value = true
    if (cart.value.length === 0) return

    try {
      cartState.value = 'ordered'

      const orderData = {
        items: cart.value.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalPrice: totalPrice.value,
        totalTax: totalTax.value,
        totalAmount: totalPrice.value + totalTax.value,
        orderDate: new Date().toISOString(),
        status: 'pending',
      }

      const response = await axios.post('https://f43c0ac419f057cf.mokky.dev/orders', orderData)

      currentOrderId.value = response.data.id
      cart.value = []
      cartState.value = 'ordered'

      orders.value.push(response.data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      cartState.value = 'filled'
      throw err
    } finally {
      loading.value = false
    }
  }
  const removeFromOrder = async (orderId: number) => {
    loading.value = true
    try {
      await axios.delete(`https://f43c0ac419f057cf.mokky.dev/orders/${orderId}`)

      orders.value = orders.value.filter((order) => order.id !== orderId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const totalPrice = computed(() => {
    const sum = cart.value.reduce((total, item) => total + item.price, 0)
    return Math.round(sum * 100) / 100
  })
  const totalTax = computed(() => {
    const tax = totalPrice.value * 0.05
    return Math.round(tax * 100) / 100
  })

  return {
    cartOpen,
    cartState,
    cart,
    currentOrderId,
    totalPrice,
    totalTax,
    orders,
    error,
    loading,
    isAddedToCart,
    openCart,
    closeCart,
    addToCart,
    toggleCart,
    removeFromCart,
    addToOrder,
    getOrders,
    removeFromOrder,
  }
})
