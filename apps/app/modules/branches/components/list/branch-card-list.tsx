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

  if (!data) {
    return <p>No hay sucursales disponibles.</p>
  }

  return (
    <ul className='grid gap-y-[1.875rem]'>
      {data?.map((branch) => (
        <li key={branch.id}>
          <BranchCard branch={branch} />
        </li>
      ))}
    </ul>
  )
}

export { BranchCardList }
