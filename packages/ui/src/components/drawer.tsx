'use client'
import { cn } from '@ristokit/ui/lib/utils'
import type * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root repositionInputs={false} data-slot='drawer' {...props} />
}

function DrawerTrigger(props: React.PropsWithChildren<React.ComponentProps<typeof DrawerPrimitive.Trigger>>) {
  const { children, ...rest } = props
  return (
    <DrawerPrimitive.Trigger
      data-slot='drawer-trigger'
      {...(rest as React.ComponentProps<typeof DrawerPrimitive.Trigger>)}
    >
      {children}
    </DrawerPrimitive.Trigger>
  )
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot='drawer-close' className='text-base font-medium text-text' {...props} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot='drawer-overlay'
      className={cn(
        'fixed inset-0 z-50',
        'bg-black/60 backdrop-blur-sm',
        'data-[state=closed]:animate-out data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot='drawer-portal'>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot='drawer-content'
        className={cn(
          'group/drawer-content fixed z-50 flex h-auto flex-col',
          'bg-background overflow-hidden',
          // Top drawer - 2025 modern
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0',
          'data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh]',
          'data-[vaul-drawer-direction=top]:rounded-b-2xl',
          'data-[vaul-drawer-direction=top]:border-b-2 data-[vaul-drawer-direction=top]:border-neutral-200',
          'data-[vaul-drawer-direction=top]:shadow-soft-lg',
          // Bottom drawer - 2025 modern
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0',
          'data-[vaul-drawer-direction=bottom]:max-h-dvh',
          'data-[vaul-drawer-direction=bottom]:rounded-t-2xl md:data-[vaul-drawer-direction=bottom]:rounded-t-3xl',
          'data-[vaul-drawer-direction=bottom]:border-t-2 data-[vaul-drawer-direction=bottom]:border-neutral-200',
          'data-[vaul-drawer-direction=bottom]:shadow-soft-lg',
          // Right drawer
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0',
          'data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-md',
          'data-[vaul-drawer-direction=right]:border-l-2 data-[vaul-drawer-direction=right]:border-neutral-200',
          'data-[vaul-drawer-direction=right]:shadow-soft-lg',
          // Left drawer
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0',
          'data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-md',
          'data-[vaul-drawer-direction=left]:border-r-2 data-[vaul-drawer-direction=left]:border-neutral-200',
          'data-[vaul-drawer-direction=left]:shadow-soft-lg',
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHandle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-handle'
      className={cn('mx-auto mt-4 mb-2', 'h-1.5 w-16 md:w-20 shrink-0', 'rounded-full bg-neutral-300', className)}
      {...props}
    />
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='drawer-header' className={cn('flex flex-col gap-2 md:gap-3 p-5 md:p-6', className)} {...props} />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='drawer-footer'
      className={cn('grid gap-3 p-5 md:p-6 border-t border-neutral-200', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot='drawer-title'
      className={cn('text-xl md:text-2xl font-bold text-text leading-tight', className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot='drawer-description'
      className={cn('text-sm md:text-base text-neutral-600 leading-relaxed', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerHandle
}
