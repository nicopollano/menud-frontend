'use client'
import { useBusinessesSummary } from '@/modules/businesses/hooks/use-businesses-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function BusinessSummary() {
  const { data, isLoading, error } = useBusinessesSummary()

  return (
    <header className='grid gap-y-2.5'>
      <div className='grid gap-y-[0.3125rem]'>
        <h2 className='text-heading-mobile-3 text-text'>Restaurantes</h2>
        {isLoading && <Skeleton className='min-h-4 max-w-3/5' />}
        {data && (
          <p className='flex items-center gap-x-2.5 text-body-mobile-4 text-gray-dark'>
            <span>
              ({data.totalBusinesses}){' '}
              {pluralize({ count: data.totalBusinesses, singular: 'restaurante', plural: 'restaurantes' })}
            </span>
            <span>
              ({data.totalBranches}){' '}
              {pluralize({ count: data.totalBranches, singular: 'sucursal', plural: 'sucursales' })}
            </span>
          </p>
        )}
        {error && (
          <AlertError
            title='¡Error al cargar el resumen de restaurantes!'
            description='No se pudo cargar el resumen de restaurantes.'
            details={[error.message]}
          />
        )}
      </div>
      <LineIcon className='h-px bg-text' />
    </header>
  )
}

export { BusinessSummary }
