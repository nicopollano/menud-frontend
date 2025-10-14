import { PreviewProductCardSkeleton } from '@/modules/products/components/card/preview-product-card'
import { ProductDetailDrawer } from '@/modules/products/components/drawer/product-detail-drawer'
import type { Product } from '@ristokit/shared/models/product.model'
import dynamic from 'next/dynamic'

const LazyPreviewProductCard = dynamic(
  async () => {
    return (await import('@/modules/products/components/card/preview-product-card')).PreviewProductCard
  },
  {
    ssr: false,
    loading: () => <PreviewProductCardSkeleton />
  }
)

interface ProductsListProps {
  products: Product[]
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <ul className='grid gap-5 sm:grid-cols-2'>
      {products.map((product) => (
        <li key={product.id}>
          <ProductDetailDrawer product={product}>
            <div className='cursor-pointer'>
              <LazyPreviewProductCard product={product} />
            </div>
          </ProductDetailDrawer>
        </li>
      ))}
    </ul>
  )
}

export { ProductsList }
