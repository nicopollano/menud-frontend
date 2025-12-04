'use client'
import { useBusinessesSummary } from '@/modules/businesses/hooks/use-businesses-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { cn } from '@ristokit/ui/lib/utils'

function BusinessSummary() {
  const { data, isLoading, error } = useBusinessesSummary()

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar el resumen!'
        description='No se pudo cargar el resumen de restaurantes.'
        details={[error.message]}
      />
    )
  }

  return (
    <div className='space-y-6'>
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Skeleton className='h-40 rounded-[32px]' />
          <Skeleton className='h-40 rounded-[32px]' />
        </div>
      ) : data ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {/* Total Restaurants Card */}
          <div
            className={cn(
              'group relative overflow-hidden',
              'bg-white rounded-[32px]',
              'p-6 md:p-8',
              'shadow-xl shadow-neutral-200/50',
              'transition-all duration-300',
              'hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1'
            )}
          >
            <div className='relative flex items-center justify-between'>
              <div className='space-y-2'>
                <h2 className='text-lg font-bold text-neutral-500'>Restaurantes</h2>
                <p className='text-5xl md:text-6xl font-black text-neutral-900 tracking-tight'>
                  {data.totalBusinesses}
                </p>
                <p className='text-sm font-medium text-neutral-400'>
                  {pluralize({ count: data.totalBusinesses, singular: 'activo', plural: 'activos' })}
                </p>
              </div>
              <div className='p-5 rounded-[24px] bg-primary-50 text-primary-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <svg className='size-10' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Branches Card */}
          <div
            className={cn(
              'group relative overflow-hidden',
              'bg-white rounded-[32px]',
              'p-6 md:p-8',
              'shadow-xl shadow-neutral-200/50',
              'transition-all duration-300',
              'hover:shadow-2xl hover:shadow-success-500/10 hover:-translate-y-1'
            )}
          >
            <div className='relative flex items-center justify-between'>
              <div className='space-y-2'>
                <h2 className='text-lg font-bold text-neutral-500'>Sucursales</h2>
                <p className='text-5xl md:text-6xl font-black text-neutral-900 tracking-tight'>{data.totalBranches}</p>
                <p className='text-sm font-medium text-neutral-400'>
                  {pluralize({ count: data.totalBranches, singular: 'activa', plural: 'activas' })}
                </p>
              </div>
              <div className='p-5 rounded-[24px] bg-success-50 text-success-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <svg className='size-10' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { BusinessSummary }
