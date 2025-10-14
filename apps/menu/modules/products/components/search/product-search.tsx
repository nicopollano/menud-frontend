'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { MIN_DELAY_SEARCH } from '@/modules/products/constants/product.const'
import { Input } from '@ristokit/ui/components/input'
import { MagnifyingGlassIcon } from '@ristokit/ui/icons/magnifying-glass.icon'
import { useDebouncedCallback } from 'use-debounce'

function ProductSearch() {
  const { filters, updateFilters } = useBranch()

  const debounced = useDebouncedCallback((value) => {
    updateFilters({ search: value })
  }, MIN_DELAY_SEARCH)

  return (
    <div className='[&_svg]:-translate-y-1/2 relative grow xl:max-w-[21.125rem] [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:left-4'>
      <MagnifyingGlassIcon className='stroke-gray-dark' />
      <Input
        placeholder='Buscar'
        variant='search'
        defaultValue={filters.search}
        onChange={(e) => debounced(e.target.value)}
      />
    </div>
  )
}

export { ProductSearch }
