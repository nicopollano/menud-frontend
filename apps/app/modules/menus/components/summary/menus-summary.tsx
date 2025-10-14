'use client'
import { useMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function MenusSummary() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading, error } = useMenusSummary({
    businessId,
    branchId
  })

  return (
    <header className='grid gap-y-2.5'>
      <div className='grid gap-y-[0.3125rem]'>
        <h2 className='text-heading-mobile-3 text-text'>Menús</h2>
        {isLoading && <Skeleton className='min-h-4 max-w-3/5' />}
        {data && (
          <p className='flex items-center gap-x-2.5 text-body-mobile-4 text-gray-dark'>
            <span>
              ({data.totalMenus}) {pluralize({ count: data.totalMenus, singular: 'menú', plural: 'menús' })}
            </span>
            <span>
              ({data.totalCategories}){' '}
              {pluralize({ count: data.totalCategories, singular: 'categoría', plural: 'categorías' })}
            </span>
            <span>
              ({data.totalProducts}){' '}
              {pluralize({ count: data.totalProducts, singular: 'producto', plural: 'productos' })}
            </span>
          </p>
        )}
        {error && (
          <AlertError
            title='¡Error al cargar el resumen de menús!'
            description='No se pudo cargar el resumen de menús.'
            details={[error.message]}
          />
        )}
      </div>
      <LineIcon className='h-px bg-text' />
    </header>
  )
}

export { MenusSummary }
