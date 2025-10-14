import { FavoriteProductCard } from '@/modules/products/components/card/favorite-product-card'
import type { Product } from '@ristokit/shared/models/product.model'

interface FavoriteProductsListProps {
  products: Product[]
}

function FavoriteProductsList({ products }: FavoriteProductsListProps) {
  return (
    <ul className='grid gap-y-2.5 overflow-y-auto'>
      {products.map((product) => (
        <FavoriteProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}

export { FavoriteProductsList }
