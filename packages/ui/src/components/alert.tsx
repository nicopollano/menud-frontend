import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react'
import type * as React from 'react'

const alertVariants = cva(
  'relative w-full rounded-[0.5rem] border border-primary px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-1 [&>svg]:text-current dark:border-neutral-800 font-poppins',
  {
    variants: {
      variant: {
        default: 'bg-background text-text',
        destructive: 'bg-background text-error [&>svg]:text-current '
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div data-slot='alert' role='alert' className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn('col-start-2 line-clamp-1 text-heading-mobile-4', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn('col-start-2 grid justify-items-start gap-1 text-body-mobile-3', className)}
      {...props}
    />
  )
}

function AlertSuccess({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <Alert>
      <CheckCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

function AlertError({
  title,
  description,
  details
}: {
  title: string
  description: string
  details?: string[]
}) {
  return (
    <Alert variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
        {details && details.length > 0 && (
          <ul className='list-inside list-disc text-body-mobile-4'>
            {details?.map((detail) => (
              <li key={crypto.randomUUID()}>{detail}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertSuccess, AlertError }
