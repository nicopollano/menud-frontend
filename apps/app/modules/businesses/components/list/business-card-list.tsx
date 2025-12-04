'use client'
import { BusinessCard } from '@/modules/businesses/components/card/business-card'
import { useBusinesses } from '@/modules/businesses/hooks/use-businesses'
import { CardListSkeleton } from '@/modules/shared/components/skeleton/card-list-skeleton'
import { AlertError } from '@ristokit/ui/components/alert'

function BusinessCardList() {
  const { data, isLoading, error } = useBusinesses()

  if (isLoading) {
    return <CardListSkeleton />
  }

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar los restaurantes!'
        description='No se pudo cargar los restaurantes.'
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
              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
            />
          </svg>
        </div>
        <h3 className='text-xl font-bold text-text mb-2'>No hay restaurantes</h3>
        <p className='text-neutral-600 text-center max-w-md'>
          Comienza agregando tu primer restaurante para gestionar tus sucursales y menús
        </p>
      </div>
    )
  }

  return (
    <ul className='grid gap-5 md:gap-6'>
      {data.map((business, index) => (
        <li key={business.id}>
          <BusinessCard business={business} index={index} />
        </li>
      ))}
    </ul>
  )
}

export { BusinessCardList }
