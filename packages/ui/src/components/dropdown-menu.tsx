'use client'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@ristokit/ui/lib/utils'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import type * as React from 'react'

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(
          // Position & layout - 2025 modern
          'z-50 min-w-[12rem]',
          'max-h-[var(--radix-dropdown-menu-content-available-height)]',
          'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
          'overflow-y-auto overflow-x-hidden',
          // Modern styling
          'rounded-xl border-2 border-neutral-200',
          'bg-background p-1.5',
          'shadow-soft-lg',
          // Animations
          'data-[state=closed]:animate-out data-[state=open]:animate-in',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Base styles - 2025 modern
        'relative flex cursor-pointer select-none items-center gap-2',
        'rounded-lg px-3 py-2.5',
        'text-sm md:text-base font-medium',
        'outline-none transition-all duration-200',
        // Default variant
        'text-text',
        'hover:bg-neutral-50 focus:bg-neutral-50',
        // Disabled state
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
        // Inset (for items with checkbox/radio)
        'data-[inset]:pl-10',
        // Destructive variant
        'data-[variant=destructive]:text-error-600',
        'data-[variant=destructive]:hover:bg-error-50 data-[variant=destructive]:focus:bg-error-50',
        'data-[variant=destructive]:hover:text-error-700',
        // Icons
        '[&_svg]:size-4 [&_svg]:md:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        '[&_svg:not([class*="text-"])]:text-neutral-600',
        'data-[variant=destructive]:[&_svg]:text-error-600',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2',
        'rounded-lg py-2.5 pr-3 pl-10',
        'text-sm md:text-base font-medium text-text',
        'outline-none transition-all duration-200',
        'hover:bg-neutral-50 focus:bg-neutral-50',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
        '[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-3 flex size-4 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4 stroke-primary-600 stroke-[2.5]' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2',
        'rounded-lg py-2.5 pr-3 pl-10',
        'text-sm md:text-base font-medium text-text',
        'outline-none transition-all duration-200',
        'hover:bg-neutral-50 focus:bg-neutral-50',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
        '[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-3 flex size-4 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2.5 fill-primary-600' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={cn('px-3 py-2 text-xs md:text-sm font-semibold text-neutral-600', 'data-[inset]:pl-10', className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('my-1.5 h-px bg-neutral-200', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn('ml-auto text-xs text-neutral-500 tracking-wide', className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        'flex cursor-pointer select-none items-center gap-2',
        'rounded-lg px-3 py-2.5',
        'text-sm md:text-base font-medium text-text',
        'outline-none transition-all duration-200',
        'hover:bg-neutral-50 focus:bg-neutral-50',
        'data-[state=open]:bg-neutral-100',
        'data-[inset]:pl-10',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      className={cn(
        'z-50 min-w-[12rem]',
        'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
        'overflow-hidden',
        'rounded-xl border-2 border-neutral-200',
        'bg-background p-1.5',
        'shadow-soft-lg',
        'data-[state=closed]:animate-out data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}
