import { ProductsCategoriesCarousel } from '@/modules/products/components/carousel/products-categories-carousel'
import { ProductFilterBar } from '@/modules/products/components/search/product-filter-bar'
import { ProductsSection } from '@/modules/products/components/section/products-section'

function SlugPage() {
  return (
    <main id='main-content' className='flex flex-col' tabIndex={-1}>
      <ProductFilterBar />
      <ProductsCategoriesCarousel />
      <ProductsSection />
    </main>
  )
}

export default SlugPage
