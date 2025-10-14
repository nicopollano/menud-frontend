'use client'
import { cn } from '@ristokit/ui/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type * as React from 'react'
import { DayPicker } from 'react-day-picker'

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('rounded-[0.5rem] border border-text bg-background p-2.5', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        caption: 'p-0 flex items-center gap-x-2.5',
        caption_end: 'grid gap-y-5',
        caption_label: 'text-heading-mobile-3 text-text',
        nav: 'flex items-center gap-1',
        nav_button: '[&>svg]:size-6 flex items-center justify-center',
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell: 'uppercase text-body-mobile-3 text-text font-normal size-8 flex items-center justify-center',
        row: 'flex',
        cell: 'relative focus-within:z-20',
        // cell: cn(
        //   'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 dark:[&:has([aria-selected])]:bg-neutral-800 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        //   props.mode === 'range'
        //     ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        //     : '[&:has([aria-selected])]:rounded-md'
        // ),
        day: 'size-8 text-body-mobile-3',
        // day: cn(buttonVariants({ variant: 'primary' }), 'size-8 p-0 font-normal aria-selected:opacity-100'),
        day_range_start:
          'day-range-start aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_range_end:
          'day-range-end aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_selected: 'bg-primary text-background rounded-full',
        day_today: 'border border-primary text-text rounded-full',
        day_outside: 'text-gray-dark aria-selected:text-gray-dark',
        day_disabled: 'text-gray-dark',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn('size-4', className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn('size-4', className)} {...props} />
      }}
      {...props}
    />
  )
}

export { Calendar }
