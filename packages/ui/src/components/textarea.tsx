import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const textareaVariants = cva(
  [
    // Base styles - 2025 modern
    'w-full transition-all duration-300 ease-out',
    'resize-none field-sizing-content',
    'focus:outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    'placeholder:text-neutral-500 placeholder:transition-colors',
    // Modern typography
    'text-base md:text-lg font-medium text-text leading-relaxed',
    // Focus state
    'focus:placeholder:text-neutral-400'
  ],
  {
    variants: {
      variant: {
        // Modern default - Soft background with border
        default: [
          'min-h-[6.25rem] md:min-h-[7rem] p-4 md:p-5',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'hover:border-neutral-300 hover:bg-neutral-100/50',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Outline variant - Clean with border
        outline: [
          'min-h-[6.25rem] md:min-h-[7rem] p-4 md:p-5',
          'rounded-xl md:rounded-2xl',
          'bg-background border-2 border-neutral-300',
          'hover:border-primary-400 hover:shadow-soft-sm',
          'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-soft-md',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Ghost variant - Minimal until focus
        ghost: [
          'min-h-[6.25rem] md:min-h-[7rem] p-4 md:p-5',
          'rounded-xl md:rounded-2xl',
          'bg-transparent border-2 border-transparent',
          'hover:bg-neutral-50 hover:border-neutral-200',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ],

        // Field variant - For floating labels
        field: [
          'min-h-[7rem] md:min-h-[8rem] px-4 md:px-5 pt-6 md:pt-7 pb-2',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'peer placeholder-shown:pt-4 md:placeholder-shown:pt-5',
          'hover:border-neutral-300',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus:ring-error-500/10'
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface TextareaProps extends React.ComponentProps<'textarea'>, VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
  return <textarea data-slot='textarea' className={cn(textareaVariants({ variant, className }))} {...props} />
}

export { Textarea }
