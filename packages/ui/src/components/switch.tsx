'use client'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

export const switchVariants = cva(
  [
    // Base styles - 2025 modern
    'peer inline-flex shrink-0 items-center',
    'rounded-full outline-none',
    'transition-all duration-300 ease-out',
    'disabled:cursor-not-allowed disabled:opacity-60',
    // Focus state
    'focus-visible:ring-4 focus-visible:ring-offset-2',
    // Unchecked state
    'data-[state=unchecked]:bg-neutral-300',
    'data-[state=unchecked]:hover:bg-neutral-400',
    // Checked state
    'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary-600 data-[state=checked]:to-primary-500',
    'data-[state=checked]:shadow-soft-sm',
    'data-[state=checked]:hover:from-primary-700 data-[state=checked]:hover:to-primary-600',
    // Focus variations
    'focus-visible:data-[state=checked]:ring-primary-500/30',
    'focus-visible:data-[state=unchecked]:ring-neutral-400/30'
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[3.25rem]',
        // Legacy support
        small: 'h-5 w-9',
        normal: 'h-6 w-11'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export const switchThumbVariants = cva(
  ['pointer-events-none block rounded-full', 'bg-white shadow-soft-md', 'transition-transform duration-300 ease-out'],
  {
    variants: {
      size: {
        sm: 'size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5',
        md: 'size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5',
        lg: 'size-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5',
        // Legacy support
        small: 'size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5',
        normal: 'size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot='switch' className={cn(switchVariants({ size, className }))} {...props}>
      <SwitchPrimitive.Thumb data-slot='switch-thumb' className={cn(switchThumbVariants({ size, className }))} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
