function MoveIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M9 7L4 12L9 17M15 7L20 12L15 17'
        stroke='inherit'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { MoveIcon }
