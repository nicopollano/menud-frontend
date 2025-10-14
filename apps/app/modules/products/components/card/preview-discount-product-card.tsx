import type { PreviewProduct } from '@ristokit/shared/models/product.model'
import { PreviewProductCard } from './preview-product-card'

interface PreviewDiscountProductCardProps {
  product: PreviewProduct
}

function PreviewDiscountProductCard({ product }: PreviewDiscountProductCardProps) {
  return (
    <article className='grid gap-y-2.5'>
      <p className='text-body-mobile-4 text-gray-dark'>Previsualización del descuento</p>
      <PreviewProductCard product={product} />
    </article>
  )
}

export { PreviewDiscountProductCard }
