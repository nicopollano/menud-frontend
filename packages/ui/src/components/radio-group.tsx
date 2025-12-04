'use client'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'
import type * as React from 'react'

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot='radio-group' className={cn('grid gap-3', className)} {...props} />
}

export const radioGroupItemVariants = cva(
  [
    // Base styles - 2025 modern
    'aspect-square shrink-0 rounded-full',
    'border-2 bg-background outline-none',
    'transition-all duration-300 ease-out',
    'disabled:cursor-not-allowed disabled:opacity-60',
    // Focus state
    'focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary-500/30',
    // Unchecked state
    'border-neutral-300',
    // Checked state
    'data-[state=checked]:border-primary-500 data-[state=checked]:shadow-soft-sm',
    // Invalid state
    'aria-invalid:border-error-500 aria-invalid:ring-error-500/20',
    // Hover state
    'hover:border-primary-400 hover:shadow-soft-sm'
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

function RadioGroupItem({ className, size, ...props }: RadioGroupItemProps) {
  const indicatorSize = size === 'sm' ? 'size-2' : size === 'lg' ? 'size-3' : 'size-2.5'

  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(radioGroupItemVariants({ size, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        <CircleIcon
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2',
            'fill-primary-500 transition-transform duration-200',
            'data-[state=checked]:scale-100 scale-0',
            indicatorSize
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
