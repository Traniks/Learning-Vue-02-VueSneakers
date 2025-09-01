import { ref, computed, watch, reactive } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
}

interface Filters {
  sortBy: string
  searchQuery: string
}

interface ApiParams {
  sortBy?: string
  title?: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const favorites = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = reactive<Filters>({
    sortBy: '',
    searchQuery: '',
  })

  const fetchProducts = async () => {
    loading.value = true
    try {
      const params: ApiParams = {}

      if (filters.sortBy) {
        params.sortBy = filters.sortBy
      }

      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`
      }

      const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/items', {
        params,
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      products.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  // const fetchFavorites = async () => {
  //   loading.value = true
  //   try {
  //     const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/favorite')
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     favorites.value = response.data
  //   } catch (err) {
  //     error.value = err instanceof Error ? err.message : String(err)
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // const addToFavorites = async (id: number) => {
  //   const product = products.value.find((item) => item.id === id)
  //   if (!product) return

  //   loading.value = true
  //   try {
  //     await axios.post('https://f43c0ac419f057cf.mokky.dev/favorite', product)
  //     await new Promise((resolve) => setTimeout(resolve, 1000))

  //     // Добавляем товар в локальный массив избранного
  //     if (!favorites.value.find((fav) => fav.id === product.id)) {
  //       favorites.value.push(product)
  //     }
  //   } catch (err) {
  //     error.value = err instanceof Error ? err.message : String(err)
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // const removeFromFavorites = async (id: number) => {
  //   loading.value = true
  //   try {
  //     // Находим товар в избранном на сервере
  //     const favoriteItem = favorites.value.find((item) => item.id === id)
  //     if (favoriteItem) {
  //       await axios.delete(`https://f43c0ac419f057cf.mokky.dev/favorite/${favoriteItem.id}`)
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // Удаляем из локального массива
  //       const index = favorites.value.findIndex((item) => item.id === id)
  //       if (index > -1) {
  //         favorites.value.splice(index, 1)
  //       }
  //     }
  //   } catch (err) {
  //     error.value = err instanceof Error ? err.message : String(err)
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // const toggleFavorite = async (id: number) => {
  //   const isCurrentlyFavorite = favorites.value.some((fav) => fav.id === id)

  //   if (isCurrentlyFavorite) {
  //     await removeFromFavorites(id)
  //   } else {
  //     await addToFavorites(id)
  //   }
  // }

  // const isFavorite = computed(() => {
  //   return (productId: number) => favorites.value.some((fav) => fav.id === productId)
  // })

  // const favoritesCount = computed(() => favorites.value.length)

  watch(filters, fetchProducts)

  return {
    products,
    favorites,
    loading,
    error,
    filters,

    fetchProducts,
    // fetchFavorites,
    // addToFavorites,
    // removeFromFavorites,
    // toggleFavorite,

    // isFavorite,
    // favoritesCount,
  }
})
