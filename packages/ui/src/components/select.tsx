'use client'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ArrowDownIcon } from '@ristokit/ui/icons/arrow-down.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type * as React from 'react'

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

export const selectTriggerVariants = cva(
  [
    // Base styles - 2025 modern (matching Input)
    'group peer grid grid-cols-[1fr_auto] items-center gap-x-2.5',
    'w-full transition-all duration-300 ease-out',
    'outline-none',
    'disabled:cursor-not-allowed disabled:opacity-60',
    'text-base md:text-lg font-medium text-text',
    '[&>span[data-slot=select-value]]:truncate [&>span[data-slot=select-value]]:text-left'
  ],
  {
    variants: {
      variant: {
        // Default - Soft background with border
        default: [
          'h-12 md:h-14 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'hover:border-neutral-300 hover:bg-neutral-100/50',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'data-[state=open]:bg-background data-[state=open]:border-primary-500 data-[state=open]:ring-4 data-[state=open]:ring-primary-500/10',
          'aria-invalid:border-error-500 aria-invalid:focus:ring-error-500/10'
        ],

        // Outline variant
        outline: [
          'h-12 md:h-14 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-background border-2 border-neutral-300',
          'hover:border-primary-400 hover:shadow-soft-sm',
          'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'data-[state=open]:border-primary-500 data-[state=open]:ring-4 data-[state=open]:ring-primary-500/10',
          'aria-invalid:border-error-500'
        ],

        // Field variant - For floating labels
        field: [
          'h-14 md:h-16 px-4 md:px-5',
          'rounded-xl md:rounded-2xl',
          'bg-neutral-50 border-2 border-neutral-200',
          'hover:border-neutral-300',
          'focus:bg-background focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
          'data-[state=open]:bg-background data-[state=open]:border-primary-500',
          '[&>span[data-slot=select-value]]:pt-6 [&>span[data-slot=select-value]]:md:pt-7 [&>span[data-slot=select-value]]:pb-2'
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

function SelectTrigger({ className, variant, children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(selectTriggerVariants({ variant, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ArrowDownIcon className='size-5 md:size-6 shrink-0 stroke-text transition-transform duration-300 group-data-[state=open]:rotate-180' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        className={cn(
          // Base styles - 2025 modern
          'relative z-50 min-w-[8rem]',
          'max-h-[var(--radix-select-content-available-height)]',
          'origin-[var(--radix-select-content-transform-origin)]',
          'overflow-hidden rounded-[24px]', // Added rounded-[24px] and overflow-hidden
          'bg-background',
          // Animations
          'data-[state=closed]:animate-out data-[state=open]:animate-in',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          // Position adjustments
          position === 'popper' && [
            'data-[side=left]:-translate-x-1',
            'data-[side=top]:-translate-y-1',
            'data-[side=right]:translate-x-1',
            'data-[side=bottom]:translate-y-1'
          ],
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-2 rounded-[24px]', // Updated to rounded-[24px]
            'border-2 border-neutral-200 shadow-soft-lg',
            position === 'popper' && [
              'min-w-[var(--radix-select-trigger-width)]',
              'max-w-[var(--radix-select-trigger-width)]'
            ]
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      className={cn('px-3 py-2 text-xs md:text-sm font-semibold text-neutral-600', className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        'relative grid cursor-pointer select-none grid-cols-[1fr_auto] items-center gap-x-2',
        'px-3 py-2.5 rounded-lg',
        'text-base md:text-lg font-medium text-text',
        'outline-none transition-all duration-200',
        'hover:bg-neutral-50 hover:text-primary-600',
        'focus:bg-primary-50 focus:text-primary-600',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary-600',
        '[&>span]:first:truncate',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='size-4 md:size-5 stroke-primary-600 stroke-[2.5]' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('my-2 h-px bg-neutral-200', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn(
        'flex cursor-default items-center justify-center py-2',
        'text-neutral-600 hover:text-neutral-900',
        className
      )}
      {...props}
    >
      <ChevronUpIcon className='size-4 md:size-5' />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn(
        'flex cursor-default items-center justify-center py-2',
        'text-neutral-600 hover:text-neutral-900',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className='size-4 md:size-5' />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
