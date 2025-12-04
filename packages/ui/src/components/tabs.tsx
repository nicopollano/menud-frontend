'use client'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@ristokit/ui/lib/utils'
import type * as React from 'react'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot='tabs' className={cn('flex flex-col gap-3 md:gap-4', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'inline-flex h-11 md:h-12 w-fit items-center justify-center gap-1',
        'rounded-xl bg-neutral-100 p-1.5',
        'border border-neutral-200',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        // Base styles - 2025 modern
        'inline-flex flex-1 items-center justify-center gap-2',
        'whitespace-nowrap rounded-lg',
        'px-4 py-2 md:px-5 md:py-2.5',
        'text-sm md:text-base font-medium',
        'text-neutral-600 transition-all duration-200',
        // Focus state
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        // Disabled state
        'disabled:pointer-events-none disabled:opacity-60',
        // Inactive state
        'hover:text-neutral-900 hover:bg-neutral-50',
        // Active state
        'data-[state=active]:bg-background data-[state=active]:text-primary-600',
        'data-[state=active]:shadow-soft-sm',
        'data-[state=active]:border data-[state=active]:border-primary-200',
        // Icons
        '[&_svg]:size-4 [&_svg]:md:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn(
        'flex-1 outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:rounded-lg',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
