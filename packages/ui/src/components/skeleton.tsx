import { cn } from '@ristokit/ui/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='skeleton' className={cn('animate-pulse rounded-sm bg-gray-light', className)} {...props} />
}

export { Skeleton }
