'use client'
import { FAVORITE_PRODUCTS_KEY } from '@/modules/products/constants/product.const'
import { useLocalStorage } from '@/modules/shared/hooks/use-local-storage'
import type { Product } from '@ristokit/shared/models/product.model'
import { createContext, useCallback, useContext } from 'react'

interface FavoriteProductsContextType {
  favoriteProducts: Product[]
  isFavoriteProduct: (productId: string) => boolean
  toggleFavoriteProduct: (product: Product) => void
  hasFavoriteProducts: () => boolean
  totalPrice: () => number
}

const FavoriteProductsContext = createContext<FavoriteProductsContextType | null>(null)

interface FavoriteProductsProviderProps {
  children: React.ReactNode
  branchId: string
}

function FavoriteProductsProvider({ children, branchId }: FavoriteProductsProviderProps) {
  const [favoriteProductsByBranch, setFavoriteProductsByBranch] = useLocalStorage<Record<string, Product[]>>(
    FAVORITE_PRODUCTS_KEY,
    {}
  )

  const favoriteProducts = favoriteProductsByBranch[branchId] || []

  const isFavoriteProduct = useCallback(
    (productId: string) => {
      const currentFavorites = favoriteProductsByBranch[branchId] || []
      return currentFavorites.some((p) => p.id === productId)
    },
    [favoriteProductsByBranch, branchId]
  )

  const toggleFavoriteProduct = useCallback(
    (product: Product) => {
      const currentFavorites = favoriteProductsByBranch[branchId] || []

      if (isFavoriteProduct(product.id)) {
        setFavoriteProductsByBranch({
          ...favoriteProductsByBranch,
          [branchId]: currentFavorites.filter((p) => p.id !== product.id)
        })
      } else {
        setFavoriteProductsByBranch({
          ...favoriteProductsByBranch,
          [branchId]: [...currentFavorites, product]
        })
      }
    },
    [favoriteProductsByBranch, branchId, isFavoriteProduct, setFavoriteProductsByBranch]
  )

  const hasFavoriteProducts = useCallback(() => {
    const currentFavorites = favoriteProductsByBranch[branchId] || []
    return currentFavorites.length > 0
  }, [favoriteProductsByBranch, branchId])

  const totalPrice = useCallback(() => {
    const currentFavorites = favoriteProductsByBranch[branchId] || []
    return currentFavorites.reduce((total, product) => total + (product.discountedPrice || product.price || 0), 0)
  }, [favoriteProductsByBranch, branchId])

  return (
    <FavoriteProductsContext.Provider
      value={{
        favoriteProducts,
        isFavoriteProduct,
        toggleFavoriteProduct,
        hasFavoriteProducts,
        totalPrice
      }}
    >
      {children}
    </FavoriteProductsContext.Provider>
  )
}

function useFavoriteProducts() {
  const context = useContext(FavoriteProductsContext)
  if (!context) {
    throw new Error('useFavoriteProducts must be used within a FavoriteProductsProvider')
  }
  return context
}

export { FavoriteProductsProvider, useFavoriteProducts }
