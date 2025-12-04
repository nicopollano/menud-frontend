'use client'
import { useMenusSummary } from '@/modules/menus/hooks/use-menus-summary'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { cn } from '@ristokit/ui/lib/utils'

function MenusSummary() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading, error } = useMenusSummary({ businessId, branchId })

  return (
    <div className='w-full'>
      {isLoading ? (
        <Skeleton className='h-32 w-full rounded-[32px]' />
      ) : data ? (
        <div
          className={cn(
            'relative overflow-hidden',
            'bg-white rounded-[32px]',
            'p-6 md:px-8 md:py-6',
            'shadow-xl shadow-neutral-200/50',
            'flex flex-col md:flex-row items-center justify-between gap-6'
          )}
        >
          {/* Title Section */}
          <div className='flex items-center gap-4 w-full md:w-auto'>
            <div className='p-3 rounded-2xl bg-primary-50 text-primary-600'>
              <svg className='size-8' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
            </div>
            <div>
              <h2 className='text-2xl font-bold text-neutral-900'>Menús</h2>
              <p className='text-sm text-neutral-500 font-medium'>Gestiona tu oferta</p>
            </div>
          </div>

          {/* Stats Row - Clean Typography */}
          <div className='flex items-center gap-8 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar'>
            {/* Menus Stat */}
            <div className='flex flex-col items-center md:items-end'>
              <span className='text-3xl font-black text-neutral-900 leading-none'>{data.totalMenus}</span>
              <span className='text-xs font-bold text-neutral-400 uppercase tracking-wider mt-1'>Menús</span>
            </div>

            {/* Separator */}
            <div className='w-px h-10 bg-neutral-100 hidden md:block' />

            {/* Categories Stat */}
            <div className='flex flex-col items-center md:items-end'>
              <span className='text-3xl font-black text-neutral-900 leading-none'>{data.totalCategories}</span>
              <span className='text-xs font-bold text-neutral-400 uppercase tracking-wider mt-1'>Categorías</span>
            </div>

            {/* Separator */}
            <div className='w-px h-10 bg-neutral-100 hidden md:block' />

            {/* Products Stat */}
            <div className='flex flex-col items-center md:items-end'>
              <span className='text-3xl font-black text-neutral-900 leading-none'>{data.totalProducts}</span>
              <span className='text-xs font-bold text-neutral-400 uppercase tracking-wider mt-1'>Productos</span>
            </div>
          </div>
        </div>
      ) : null}
      {error && (
        <AlertError
          title='¡Error al cargar el resumen!'
          description='No se pudo cargar el resumen de menús.'
          details={[error.message]}
        />
      )}
    </div>
  )
}

export { MenusSummary }
