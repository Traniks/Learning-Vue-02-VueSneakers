import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

// Интерфейс для продукта
export interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/items')
      products.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
})
