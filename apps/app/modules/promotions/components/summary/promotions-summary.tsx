'use client'
import { usePromotionsSummary } from '@/modules/promotions/hooks/use-promotions-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function PromotionsSummary() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading, error } = usePromotionsSummary({
    businessId,
    branchId,
    menuId
  })

  return (
    <header className='grid gap-y-2.5'>
      <div className='grid gap-y-[0.3125rem]'>
        <h2 className='text-heading-mobile-3 text-text'>Promociones</h2>
        {isLoading && <Skeleton className='min-h-4 max-w-3/5' />}
        {data && (
          <p className='flex items-center gap-x-2.5 text-body-mobile-4 text-gray-dark'>
            <span>
              ({data.totalPromotions}){' '}
              {pluralize({ count: data.totalPromotions, singular: 'promoción', plural: 'promociones' })}
            </span>
          </p>
        )}
        {error && (
          <AlertError
            title='¡Error al cargar el resumen de promociones!'
            description='No se pudo cargar el resumen de promociones.'
            details={[error.message]}
          />
        )}
      </div>
      <LineIcon className='h-px bg-text' />
    </header>
  )
}

export { PromotionsSummary }
