'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@ristokit/ui/icons/check.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const checkboxVariants = cva(
  [
    // Base styles - 2025 modern
    'peer shrink-0 outline-none',
    'border-2 transition-all duration-300 ease-out',
    'disabled:cursor-not-allowed disabled:opacity-60',
    // Focus state
    'focus-visible:ring-4 focus-visible:ring-offset-2',
    // Unchecked state
    'border-neutral-300 bg-background',
    // Checked state
    'data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500',
    'data-[state=checked]:shadow-soft-sm',
    // Invalid state
    'aria-invalid:border-error-500 aria-invalid:ring-error-500/20',
    'aria-invalid:data-[state=checked]:bg-error-500',
    // Hover state
    'hover:border-primary-400 hover:shadow-soft-sm',
    'data-[state=checked]:hover:bg-primary-600',
    // Icon styling
    '[&>span>svg]:stroke-white [&>span>svg]:stroke-[3]'
  ],
  {
    variants: {
      size: {
        sm: 'size-4 rounded-md [&>span>svg]:size-3',
        md: 'size-5 rounded-lg [&>span>svg]:size-4',
        lg: 'size-6 rounded-lg [&>span>svg]:size-5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root data-slot='checkbox' className={cn(checkboxVariants({ size, className }))} {...props}>
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current'
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
