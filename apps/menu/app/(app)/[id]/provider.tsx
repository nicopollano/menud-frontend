'use client'
import { BranchProvider } from '@/modules/branches/providers/branch.provider'
import { FavoriteProductsProvider } from '@/modules/products/providers/favorite-products.provider'
import type { BranchById } from '@ristokit/shared/models/branch.model'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface SlugProviderProps {
  children: React.ReactNode
  branch: BranchById
}

function SlugProvider({ children, branch }: SlugProviderProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      enableColorScheme={false}
    >
      <BranchProvider branch={branch}>
        <FavoriteProductsProvider branchId={branch.slug}>{children}</FavoriteProductsProvider>
      </BranchProvider>
    </NextThemesProvider>
  )
}

export { SlugProvider }
