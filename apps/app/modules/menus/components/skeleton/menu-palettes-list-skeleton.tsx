import { Skeleton } from '@ristokit/ui/components/skeleton'

interface ListCardSkeletonProps {
  quantity?: number
}

function MenuPalettesListSkeleton({ quantity = 5 }: ListCardSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-x-4 gap-y-[0.9375rem]'>
      {Array.from({ length: quantity }).map(() => (
        <Skeleton key={crypto.randomUUID()} className='min-h-[2.875rem] rounded-[0.5rem]' />
      ))}
    </div>
  )
}

export { MenuPalettesListSkeleton }
