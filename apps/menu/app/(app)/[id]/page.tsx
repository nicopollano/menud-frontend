import { ProductsCategoriesCarousel } from '@/modules/products/components/carousel/products-categories-carousel'
import { ProductFilterBar } from '@/modules/products/components/search/product-filter-bar'
import { ProductsSection } from '@/modules/products/components/section/products-section'

function SlugPage() {
  return (
    <main className='flex flex-col'>
      <ProductFilterBar />
      <ProductsCategoriesCarousel />
      <ProductsSection />
    </main>
  )
}

export default SlugPage
