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

  if (!data) {
    return <p>No hay restaurantes disponibles.</p>
  }

  return (
    <ul className='grid gap-y-[1.875rem]'>
      {data?.map((business) => (
        <li key={business.id}>
          <BusinessCard business={business} />
        </li>
      ))}
    </ul>
  )
}

export { BusinessCardList }
