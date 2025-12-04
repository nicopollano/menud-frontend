import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon, XIcon } from 'lucide-react'
import type * as React from 'react'
import { toast } from 'sonner'

const alertVariants = cva(
  [
    // Base styles
    'relative w-full flex items-start gap-4',
    'rounded-[24px]', // Highly rounded
    'p-5',
    'shadow-lg shadow-neutral-200/20', // Soft shadow
    'border',
    'overflow-hidden',
    'transition-all duration-200'
  ],
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200',
        success: 'bg-[#F0FDF4] border-[#BBF7D0]', // Green-50 / Green-200
        warning: 'bg-[#FEFCE8] border-[#FEF08A]', // Yellow-50 / Yellow-200
        destructive: 'bg-[#FEF2F2] border-[#FECACA]', // Red-50 / Red-200
        info: 'bg-[#EFF6FF] border-[#BFDBFE]' // Blue-50 / Blue-200
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div data-slot='alert' role='alert' className={cn(alertVariants({ variant }), className)} {...props}>
      {props.children}
      {/* Close Button */}
      <button
        onClick={() => toast.dismiss()}
        className={cn(
          'absolute top-4 right-4 p-1 rounded-full transition-colors',
          'hover:bg-black/5 active:bg-black/10',
          'text-neutral-400 hover:text-neutral-600'
        )}
      >
        <XIcon className='size-5' />
      </button>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn('text-base font-bold leading-tight tracking-tight text-neutral-900', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn('text-sm text-neutral-600 font-medium leading-relaxed mt-1 pr-6', className)}
      {...props}
    />
  )
}

// Helper for the colorful icon container
function AlertIconContainer({
  children,
  variant
}: {
  children: React.ReactNode
  variant: VariantProps<typeof alertVariants>['variant']
}) {
  const variants = {
    default: 'bg-neutral-900 text-white',
    success: 'bg-[#22C55E] text-white', // Green-500
    warning: 'bg-[#EAB308] text-white', // Yellow-500
    destructive: 'bg-[#EF4444] text-white', // Red-500
    info: 'bg-[#3B82F6] text-white' // Blue-500
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center size-10 rounded-full shadow-sm',
        variants[variant || 'default']
      )}
    >
      {children}
    </div>
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
    <Alert variant='success'>
      <AlertIconContainer variant='success'>
        <CheckCircleIcon className='size-6' strokeWidth={2.5} />
      </AlertIconContainer>
      <div className='flex-1 py-0.5'>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
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
      <AlertIconContainer variant='destructive'>
        <AlertCircleIcon className='size-6' strokeWidth={2.5} />
      </AlertIconContainer>
      <div className='flex-1 py-0.5'>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
          {details && details.length > 0 && (
            <div className='mt-3 p-3 bg-white/60 rounded-2xl border border-error-200/50'>
              <ul className='space-y-1.5 list-none'>
                {details?.map((detail) => (
                  <li key={crypto.randomUUID()} className='flex items-start gap-2 text-xs font-medium text-error-700'>
                    <span className='mt-1.5 block size-1.5 rounded-full bg-error-500 shrink-0' />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertSuccess, AlertError }
