'use client'
import { useBranchesSummary } from '@/modules/branches/hooks/use-branches-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { LineIcon } from '@ristokit/ui/icons/line.icon'
import { cn } from '@ristokit/ui/lib/utils'

function BranchSummary() {
  const { businessId } = useNavigationParams()

  const { data, isLoading, error } = useBranchesSummary({
    businessId
  })

  return (
    <div className='space-y-6'>
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Skeleton className='h-40 rounded-[32px]' />
          <Skeleton className='h-40 rounded-[32px]' />
        </div>
      ) : data ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {/* Total Branches Card */}
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
                <h2 className='text-lg font-bold text-neutral-500'>Sucursales</h2>
                <p className='text-5xl md:text-6xl font-black text-neutral-900 tracking-tight'>{data.totalBranches}</p>
                <p className='text-sm font-medium text-neutral-400'>
                  {pluralize({ count: data.totalBranches, singular: 'activa', plural: 'activas' })}
                </p>
              </div>
              <div className='p-5 rounded-[24px] bg-primary-50 text-primary-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
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

          {/* Total Menus Card */}
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
                <h2 className='text-lg font-bold text-neutral-500'>Menús</h2>
                <p className='text-5xl md:text-6xl font-black text-neutral-900 tracking-tight'>{data.totalMenus}</p>
                <p className='text-sm font-medium text-neutral-400'>
                  {pluralize({ count: data.totalMenus, singular: 'activo', plural: 'activos' })}
                </p>
              </div>
              <div className='p-5 rounded-[24px] bg-success-50 text-success-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <svg className='size-10' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {error && (
        <AlertError
          title='¡Error al cargar el resumen de sucursales!'
          description='No se pudo cargar el resumen de sucursales.'
          details={[error.message]}
        />
      )}
    </div>
  )
}

export { BranchSummary }
