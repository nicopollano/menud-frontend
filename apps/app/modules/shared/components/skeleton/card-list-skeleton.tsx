import { Skeleton } from '@ristokit/ui/components/skeleton'

interface ListCardSkeletonProps {
  quantity?: number
}

function CardListSkeleton({ quantity = 6 }: ListCardSkeletonProps) {
  return (
    <div className='grid gap-y-[1.875rem]'>
      {Array.from({ length: quantity }).map((_, i) => (
        <Skeleton key={i} className='min-h-[16.625rem]' />
      ))}
    </div>
  )
}

export { CardListSkeleton }
