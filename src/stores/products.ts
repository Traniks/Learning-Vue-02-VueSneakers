import { ref, computed, watch, reactive } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
  productId?: number
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
      products.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  const fetchFavorites = async () => {
    loading.value = true
    try {
      const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/favorite')

      const serverFavorites = response.data
      favorites.value = serverFavorites.map((item: any) => ({
        id: item.productId || item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
      }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  const addToFavorites = async (productId: number) => {
    const product = products.value.find((item) => item.id === productId)
    if (!product) return

    loading.value = true
    try {
      const favoriteItem = {
        ...product,
        productId: productId,
      }

      await axios.post('https://f43c0ac419f057cf.mokky.dev/favorite', favoriteItem)

      if (!favorites.value.find((fav) => fav.id === productId)) {
        favorites.value.push({ ...product })
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  const removeFromFavorites = async (productId: number) => {
    loading.value = true
    try {
      const response = await axios.get('https://f43c0ac419f057cf.mokky.dev/favorite')
      const serverFavorites = response.data

      const serverFavorite = serverFavorites.find(
        (item: any) => item.productId === productId || item.id === productId,
      )

      if (serverFavorite) {
        await axios.delete(`https://f43c0ac419f057cf.mokky.dev/favorite/${serverFavorite.id}`)
      }

      const index = favorites.value.findIndex((item) => item.id === productId)
      if (index > -1) {
        favorites.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  const toggleFavorite = async (id: number) => {
    const isCurrentlyFavorite = favorites.value.some((fav) => fav.id === id)

    if (isCurrentlyFavorite) {
      await removeFromFavorites(id)
    } else {
      await addToFavorites(id)
    }
  }

  const isFavorite = computed(() => {
    return (productId: number) => {
      const result = favorites.value.some((fav) => fav.id === productId)
      return result
    }
  })

  let searchTimeout: number | null = null
  watch(
    () => filters.sortBy,
    () => {
      fetchProducts()
    },
  )
  watch(
    () => filters.searchQuery,
    () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }

      searchTimeout = setTimeout(() => {
        fetchProducts()
      }, 500)
    },
  )
  const clearSearchTimeout = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      searchTimeout = null
    }
  }

  return {
    products,
    favorites,
    loading,
    error,
    filters,

    fetchProducts,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearSearchTimeout,

    isFavorite,
  }
})
