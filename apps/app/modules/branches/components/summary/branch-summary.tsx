'use client'
import { useBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'

function BranchSummary() {
  const { businessId } = useNavigationParams()

  const { data, isLoading, error } = useBranchesSummary({
    businessId
  })

  return (
    <header className='grid gap-y-2.5'>
      <div className='grid gap-y-[0.3125rem]'>
        <h2 className='text-heading-mobile-3 text-text'>Sucursales</h2>
        {isLoading && <Skeleton className='min-h-4 max-w-3/5' />}
        {data && (
          <p className='flex items-center gap-x-2.5 text-body-mobile-4 text-gray-dark'>
            <span>
              ({data.totalBranches}){' '}
              {pluralize({ count: data.totalBranches, singular: 'sucursal', plural: 'sucursales' })}
            </span>
            <span>
              ({data.totalMenus}) {pluralize({ count: data.totalMenus, singular: 'menú', plural: 'menús' })}
            </span>
          </p>
        )}
        {error && (
          <AlertError
            title='¡Error al cargar el resumen de sucursales!'
            description='No se pudo cargar el resumen de sucursales.'
            details={[error.message]}
          />
        )}
      </div>
      <LineIcon className='h-px bg-text' />
    </header>
  )
}

export { BranchSummary }
