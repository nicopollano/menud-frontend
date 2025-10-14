import { ProductsFiltersDrawer } from '@/modules/products/components/drawer/products-filters-drawer'
import { ProductSearch } from '@/modules/products/components/search/product-search'

function ProductFilterBar() {
  return (
    <div className='mx-auto flex w-full max-w-5xl items-center gap-x-2.5 px-4'>
      <ProductSearch />
      <ProductsFiltersDrawer />
    </div>
  )
}

export { ProductFilterBar }
