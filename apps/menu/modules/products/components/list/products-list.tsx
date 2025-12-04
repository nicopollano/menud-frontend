import { PreviewProductCardSkeleton } from '@/modules/products/components/card/preview-product-card'
import type { Product } from '@ristokit/shared/models/product.model'
import { cn } from '@ristokit/ui/lib/utils'
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
    <ul
      className={cn(
        'grid gap-4',
        // Mobile: 1 columna (cards verticales)
        'grid-cols-1',
        // Desktop: 1 columna (cards horizontales tipo lista)
        // Para pantallas muy grandes, máximo 2 columnas
        'xl:grid-cols-1 2xl:grid-cols-1'
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <LazyPreviewProductCard product={product} index={index} />
        </li>
      ))}
    </ul>
  )
}

export { ProductsList }
