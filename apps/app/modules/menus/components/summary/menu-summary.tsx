'use client'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { useMenu } from '../../hooks/use-menu'

function MenuSummary() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading, error } = useMenu({
    businessId,
    branchId,
    menuId
  })

  return (
    <header className='grid gap-y-2.5'>
      <div className='grid gap-y-[0.3125rem]'>
        <h2 className='text-heading-mobile-3 text-text'>Menú {data?.name}</h2>
        {isLoading && <Skeleton className='min-h-4 max-w-3/5' />}
        {data && (
          <p className='flex items-center gap-x-2.5 text-body-mobile-4 text-gray-dark'>
            <span>
              ({data?.summary?.totalCategories}){' '}
              {pluralize({ count: data?.summary?.totalCategories || 0, singular: 'categoría', plural: 'categorías' })}
            </span>
            <span>
              ({data?.summary?.totalProducts}){' '}
              {pluralize({ count: data?.summary?.totalProducts || 0, singular: 'producto', plural: 'productos' })}
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

export { MenuSummary }
