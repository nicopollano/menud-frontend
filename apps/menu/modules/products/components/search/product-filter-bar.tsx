import { ProductsFiltersDrawer } from '@/modules/products/components/drawer/products-filters-drawer'
import { ProductSearch } from '@/modules/products/components/search/product-search'

function ProductFilterBar() {
  return (
    <div className='mx-auto flex w-full max-w-5xl md:max-w-6xl lg:max-w-7xl items-center gap-x-3 md:gap-x-4 px-4 md:px-6 lg:px-8 py-2 md:py-3'>
      <ProductSearch />
      <ProductsFiltersDrawer />
    </div>
  )
}

export { ProductFilterBar }
