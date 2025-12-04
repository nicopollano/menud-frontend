'use client'
import { useBranch } from '@/modules/branches/providers/branch.provider'
import { MIN_DELAY_SEARCH } from '@/modules/products/constants/product.const'
import { Input } from '@ristokit/ui/components/input'
import { MagnifyingGlassIcon } from '@ristokit/ui/icons/magnifying-glass.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

function ProductSearch() {
  const { filters, updateFilters } = useBranch()
  const [isFocused, setIsFocused] = useState(false)

  const debounced = useDebouncedCallback((value) => {
    updateFilters({ search: value })
  }, MIN_DELAY_SEARCH)

  return (
    <div className='relative grow md:max-w-md lg:max-w-lg' role='search'>
      {/* Search Icon */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 left-3 md:left-4 transition-all duration-300 pointer-events-none',
          isFocused ? 'scale-110 text-primary-600' : 'text-neutral-500'
        )}
        aria-hidden='true'
      >
        <MagnifyingGlassIcon className='size-5 md:size-6 stroke-current' />
      </div>

      {/* Search Input */}
      <Input
        type='search'
        placeholder='Buscar productos...'
        variant='search'
        defaultValue={filters.search}
        onChange={(e) => debounced(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label='Buscar productos en el menú'
        aria-describedby='search-description'
        autoComplete='off'
        className={cn(
          'w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3',
          'text-sm md:text-base',
          'rounded-full',
          'border-2 transition-all duration-300',
          'bg-white',
          isFocused
            ? 'border-primary-500 shadow-lg shadow-primary-500/20 ring-4 ring-primary-500/10'
            : 'border-neutral-200 shadow-sm hover:border-neutral-300 hover:shadow-md'
        )}
      />
      <span id='search-description' className='sr-only'>
        Escribí para buscar productos por nombre o descripción
      </span>
    </div>
  )
}

export { ProductSearch }
