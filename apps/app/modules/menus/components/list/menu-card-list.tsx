'use client'
import { MenuCard } from '@/modules/menus/components/card/menu-card'
import { useMenus } from '@/modules/menus/hooks/use-menus'
import { CardListSkeleton } from '@/modules/shared/components/skeleton/card-list-skeleton'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'

function MenuCardList() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading, error } = useMenus({
    businessId,
    branchId
  })

  if (isLoading) {
    return <CardListSkeleton />
  }

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar los menús!'
        description='No se pudo cargar los menús.'
        details={[error.message]}
      />
    )
  }

  if (!data) {
    return <p>No hay menús disponibles.</p>
  }

  return (
    <ul className='grid gap-y-[1.875rem]'>
      {data?.map((menu) => (
        <li key={menu.id}>
          <MenuCard menu={menu} />
        </li>
      ))}
    </ul>
  )
}

export { MenuCardList }
