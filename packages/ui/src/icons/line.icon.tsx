import { cn } from '@ristokit/ui/lib/utils'

function LineIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='400'
      height='2'
      viewBox='0 0 400 2'
      fill='none'
      {...props}
      className={cn('w-full bg-text', props.className)}
    >
      <path d='M1 1H399' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
}

export { LineIcon }
