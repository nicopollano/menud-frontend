import { Skeleton } from '@ristokit/ui/components/skeleton'

interface AccordionOptionsSkeletonProps {
  quantity?: number
}

function AccordionOptionsSkeleton({ quantity = 6 }: AccordionOptionsSkeletonProps) {
  return (
    <div className='flex flex-col gap-y-[1.875rem]'>
      {Array.from({ length: quantity }).map((_, i) => (
        <Skeleton key={i} className='min-h-9' />
      ))}
    </div>
  )
}

export { AccordionOptionsSkeleton }
