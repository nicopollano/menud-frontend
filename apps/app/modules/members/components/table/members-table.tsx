'use client'
import { MemberCardTable } from '@/modules/members/components/table/member-card-table'
import { useMembers } from '@/modules/members/hooks/use-members'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { AlertError } from '@ristokit/ui/components/alert'
import { Skeleton } from '@ristokit/ui/components/skeleton'
// import { FiltersIcon } from '@ristokit/ui/icons/filters.icon'
// import { MagnifyingGlassIcon } from '@ristokit/ui/icons/magnifying-glass.icon'

function MembersTable() {
  const { businessId, branchId } = useNavigationParams()

  const { data, isLoading, error } = useMembers({
    businessId,
    branchId
  })

  if (isLoading) {
    return <MemberTableSkeleton />
  }

  if (error) {
    return (
      <AlertError
        title='¡Error al cargar la lista de miembros!'
        description='No se pudo cargar la lista de miembros.'
        details={[error.message]}
      />
    )
  }

  if (!data) {
    return <p>No se encontraron miembros</p>
  }

  return (
    <div className='grid gap-y-6'>
      <header className='flex items-center justify-between gap-x-2'>
        <p className='text-heading-mobile-4 text-text'>Nombre</p>
        {/* <div className='flex items-center gap-x-5'>
          <button type='button'>
            <MagnifyingGlassIcon className='stroke-text' />
          </button>
          <button type='button'>
            <FiltersIcon className='stroke-text' />
          </button>
        </div> */}
      </header>
      <ul className='grid gap-y-6'>
        {data.map((member) => (
          <li key={member.id}>
            <MemberCardTable member={member} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function MemberTableSkeleton() {
  return <Skeleton className='min-h-96' />
}

export { MembersTable, MemberTableSkeleton }
