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
              d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
            />
          </svg>
        </div>
        <h3 className='text-xl font-bold text-text mb-2'>No hay menús</h3>
        <p className='text-neutral-600 text-center max-w-md'>
          Crea tu primer menú para comenzar a agregar categorías y productos
        </p>
      </div>
    )
  }

  return (
    <ul className='grid gap-5 md:gap-6'>
      {data.map((menu, index) => (
        <li key={menu.id}>
          <MenuCard menu={menu} index={index} />
        </li>
      ))}
    </ul>
  )
}

export { MenuCardList }
