'use client'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useMenu } from '../../hooks/use-menu'

function MenuSummary() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading, error } = useMenu({
    businessId,
    branchId,
    menuId
  })

  return (
    <header className='flex flex-col gap-y-6'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold text-neutral-900'>Menú {data?.name}</h2>
        </div>

        {isLoading && (
          <div className='flex gap-3'>
            <Skeleton className='h-8 w-32 rounded-full' />
            <Skeleton className='h-8 w-32 rounded-full' />
          </div>
        )}

        {data && (
          <div className='flex items-center gap-3 flex-wrap'>
            {/* Categories badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2.5',
                'px-4 py-2 rounded-full',
                'bg-white border border-neutral-200 shadow-sm'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center',
                  'size-6 rounded-full',
                  'bg-warning-50 text-warning-600',
                  'text-xs font-bold'
                )}
              >
                {data?.summary?.totalCategories || 0}
              </div>
              <span className='text-sm font-semibold text-neutral-600'>
                {pluralize({ count: data?.summary?.totalCategories || 0, singular: 'categoría', plural: 'categorías' })}
              </span>
            </div>

            {/* Products badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2.5',
                'px-4 py-2 rounded-full',
                'bg-white border border-neutral-200 shadow-sm'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center',
                  'size-6 rounded-full',
                  'bg-primary-50 text-primary-600',
                  'text-xs font-bold'
                )}
              >
                {data?.summary?.totalProducts || 0}
              </div>
              <span className='text-sm font-semibold text-neutral-600'>
                {pluralize({ count: data?.summary?.totalProducts || 0, singular: 'producto', plural: 'productos' })}
              </span>
            </div>
          </div>
        )}

        {error && (
          <AlertError
            title='¡Error al cargar el resumen de menús!'
            description='No se pudo cargar el resumen de menús.'
            details={[error.message]}
          />
        )}
      </div>
      <div className='h-px w-full bg-neutral-200' />
    </header>
  )
}

export { MenuSummary }
