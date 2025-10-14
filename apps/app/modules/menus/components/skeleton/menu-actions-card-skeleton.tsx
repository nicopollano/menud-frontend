import { Skeleton } from '@ristokit/ui/components/skeleton'

interface ListCardSkeletonProps {
  quantity?: number
}

function MenuActionsCardSkeleton({ quantity = 5 }: ListCardSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-x-[1.875rem] gap-y-2.5 rounded-[0.5rem] border border-gray bg-background p-5'>
      {Array.from({ length: quantity }).map(() => (
        <Skeleton key={crypto.randomUUID()} className='min-h-[3.125rem] rounded-[0.5rem]' />
      ))}
    </div>
  )
}

export { MenuActionsCardSkeleton }
