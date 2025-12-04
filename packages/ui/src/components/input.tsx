import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const inputVariants = cva(
  [
    // Base styles - 2025 modern
    'w-full transition-all duration-300 ease-out',
    'focus:outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    'placeholder:text-neutral-500 placeholder:transition-colors',
    // Modern typography
    'text-base md:text-lg font-medium text-text',
    // Focus state
    'focus:placeholder:text-neutral-400'
  ],
  {
    variants: {
      variant: {
        // Modern default - Soft background with border
        default: [
          'h-12 md:h-14 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'hover:border-neutral-300 hover:bg-neutral-100/50',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Outline variant - Clean with border
        outline: [
          'h-12 md:h-14 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-background border-2 border-neutral-300',
          'hover:border-primary-400 hover:shadow-soft-sm',
          'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-soft-md',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Ghost variant - Minimal until focus
        ghost: [
          'h-12 md:h-14 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-transparent border-2 border-transparent',
          'hover:bg-neutral-50 hover:border-neutral-200',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Search variant - Modern search bar
        search: [
          'h-12 md:h-14 pl-12 md:pl-14 pr-4 md:pr-5',
          'rounded-full',
          'bg-neutral-50 border-2 border-neutral-200',
          'hover:border-neutral-300 hover:shadow-soft-sm',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-soft-md',
          'aria-[invalid=true]:border-error-500'
        ],

        // Field variant - For floating labels
        field: [
          'h-14 md:h-16 px-4 md:px-5 pt-6 md:pt-7 pb-2',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'peer placeholder-shown:pt-4 md:placeholder-shown:pt-5',
          'hover:border-neutral-300',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ]
      },

      size: {
        sm: 'h-10 px-3 text-sm rounded-lg',
        md: 'h-12 px-4 text-base rounded-xl',
        lg: 'h-14 px-5 text-lg rounded-xl md:rounded-2xl'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'>, VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, size, ...props }: InputProps) {
  return <input type={type} data-slot='input' className={cn(inputVariants({ variant, size }), className)} {...props} />
}

export { Input }
