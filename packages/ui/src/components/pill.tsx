import { CheckIcon } from '@ristokit/ui/icons/check.icon'
import { cn } from '@ristokit/ui/lib/utils'

function Pill({ className, children, isSelected, ...props }: React.ComponentProps<'div'> & { isSelected?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-x-2.5 rounded-full border border-gray-dark p-2 text-body-mobile-3 text-gray-dark',
        isSelected && 'border-primary text-primary',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex size-6 items-center justify-center rounded-full border border-gray-dark',
          isSelected && 'border-primary bg-primary'
        )}
      >
        <CheckIcon className='stroke-background' />
      </div>
      {children}
    </div>
  )
}

export { Pill }
