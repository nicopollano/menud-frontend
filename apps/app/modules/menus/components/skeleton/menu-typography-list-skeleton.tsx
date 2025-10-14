import { Skeleton } from '@ristokit/ui/components/skeleton'

interface ListCardSkeletonProps {
  quantity?: number
}

function MenuTypographyListSkeleton({ quantity = 8 }: ListCardSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: quantity }).map(() => (
        <Skeleton key={crypto.randomUUID()} className='min-h-[3.75rem] rounded-[0.5rem]' />
      ))}
    </div>
  )
}

export { MenuTypographyListSkeleton }
