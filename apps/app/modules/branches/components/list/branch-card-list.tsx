'use client'
import { BranchCard } from '@/modules/branches/components/card/branch-card'
import { useBranches } from '@/modules/branches/hooks/use-branches'
import { CardListSkeleton } from '@/modules/shared/components/skeleton/card-list-skeleton'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'

function BranchCardList() {
  const { businessId } = useNavigationParams()

  const { data, isLoading, error } = useBranches({
    businessId
  })

  if (isLoading) {
    return <CardListSkeleton />
  }

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar las sucursales!'
        description='No se pudo cargar las sucursales.'
        details={[error.message]}
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4'>
        <div className='w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6'>
          <svg
            className='size-12 text-neutral-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </div>
        <h3 className='text-xl font-bold text-text mb-2'>No hay sucursales</h3>
        <p className='text-neutral-600 text-center max-w-md'>
          Comienza agregando tu primera sucursal para gestionar tus menús
        </p>
      </div>
    )
  }

  return (
    <ul className='grid gap-5 md:gap-6'>
      {data.map((branch, index) => (
        <li key={branch.id}>
          <BranchCard branch={branch} index={index} />
        </li>
      ))}
    </ul>
  )
}

export { BranchCardList }
