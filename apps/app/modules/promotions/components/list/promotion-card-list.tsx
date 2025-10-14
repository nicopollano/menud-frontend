'use client'
import { PromotionCard } from '@/modules/promotions/components/card/promotion-card'
import { usePromotions } from '@/modules/promotions/hooks/use-promotions'
import { CardListSkeleton } from '@/modules/shared/components/skeleton/card-list-skeleton'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'

function PromotionCardList() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading, error } = usePromotions({
    businessId,
    branchId,
    menuId
  })

  if (isLoading) {
    return <CardListSkeleton />
  }

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar las promociones!'
        description='No se pudo cargar las promociones.'
        details={[error.message]}
      />
    )
  }

  if (!data) {
    return <p>No hay promociones disponibles.</p>
  }

  return (
    <ul className='grid gap-y-[1.875rem]'>
      {data?.map((promotion) => (
        <li key={promotion.id}>
          <PromotionCard promotion={promotion} />
        </li>
      ))}
    </ul>
  )
}

export { PromotionCardList }
