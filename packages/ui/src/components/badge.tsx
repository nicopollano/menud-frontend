import { Slot } from '@radix-ui/react-slot'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 h-[1.875rem] items-center justify-center rounded-xs px-5 text-center text-body-mobile-3',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-primary',
        disabled: 'bg-gray text-gray-light'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
