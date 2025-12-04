'use client'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const labelVariants = cva(
  [
    // Base styles - 2025 modern
    'select-none transition-all duration-200',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
    // Modern typography
    'font-medium text-text leading-tight'
  ],
  {
    variants: {
      variant: {
        // Default label - Modern with clear hierarchy
        default: ['flex items-center gap-2', 'text-sm md:text-base', 'mb-2'],

        // Inline label - For checkboxes and radios
        inline: ['inline-flex items-center gap-2.5', 'text-sm md:text-base', 'cursor-pointer'],

        // Field label - For floating labels
        field: [
          'absolute left-4 md:left-5 top-2',
          'text-xs md:text-sm text-neutral-500',
          'transition-all duration-200',
          'peer-placeholder-shown:top-4 md:peer-placeholder-shown:top-5',
          'peer-placeholder-shown:text-base md:peer-placeholder-shown:text-lg',
          'peer-focus:top-2 peer-focus:text-xs md:peer-focus:text-sm',
          'peer-focus:text-primary-600',
          'pointer-events-none'
        ],

        // Section label - For form sections
        section: ['flex items-center gap-2', 'text-base md:text-lg lg:text-xl', 'font-bold', 'mb-3 md:mb-4'],

        // Helper label - For additional info
        helper: ['flex items-center gap-1.5', 'text-xs md:text-sm text-neutral-600', 'mt-1.5']
      },

      required: {
        true: 'after:content-["*"] after:ml-1 after:text-error-500',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      required: false
    }
  }
)

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

function Label({ className, variant, required, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root data-slot='label' className={cn(labelVariants({ variant, required, className }))} {...props} />
  )
}

export { Label }
