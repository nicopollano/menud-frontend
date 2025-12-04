import { Slot } from '@radix-ui/react-slot'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

const badgeVariants = cva(
  [
    // Base styles - 2025 modern
    'inline-flex w-fit shrink-0 items-center justify-center gap-1',
    'text-center font-semibold',
    'transition-all duration-200 ease-out'
  ],
  {
    variants: {
      variant: {
        // Default - Primary soft
        default: ['bg-primary-50 text-primary-700', 'border border-primary-200', 'hover:bg-primary-100'],

        // Disabled - Neutral
        disabled: ['bg-neutral-100 text-neutral-500', 'border border-neutral-200'],

        // Semantic variants - Soft backgrounds
        info: ['bg-info-50 text-info-700', 'border border-info-200', 'hover:bg-info-100'],

        success: ['bg-success-50 text-success-700', 'border border-success-200', 'hover:bg-success-100'],

        warning: ['bg-warning-50 text-warning-700', 'border border-warning-200', 'hover:bg-warning-100'],

        error: ['bg-error-50 text-error-700', 'border border-error-200', 'hover:bg-error-100'],

        // Solid variants - Bold colors
        primary: [
          'bg-gradient-to-r from-primary-600 to-primary-500',
          'text-white shadow-soft-sm',
          'border border-transparent',
          'hover:from-primary-700 hover:to-primary-600'
        ],

        secondary: ['bg-neutral-700 text-white', 'border border-transparent shadow-soft-sm', 'hover:bg-neutral-800'],

        // Outline variant - Clean border
        outline: ['border-2 border-primary-600', 'text-primary-600 bg-transparent', 'hover:bg-primary-50'],

        // Ghost variant - Minimal
        ghost: ['bg-transparent text-neutral-700', 'border border-transparent', 'hover:bg-neutral-100']
      },

      size: {
        sm: 'h-5 px-2.5 text-xs rounded-full',
        md: 'h-6 px-3 text-sm rounded-full',
        lg: 'h-8 px-4 text-sm md:text-base rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot='badge' className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
