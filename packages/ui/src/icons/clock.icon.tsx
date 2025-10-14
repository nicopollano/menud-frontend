function ClockIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_411_1223)'>
        <path
          d='M8.00065 4.00016V8.00016L10.6673 9.3335M14.6673 8.00016C14.6673 11.6821 11.6826 14.6668 8.00065 14.6668C4.31875 14.6668 1.33398 11.6821 1.33398 8.00016C1.33398 4.31826 4.31875 1.3335 8.00065 1.3335C11.6826 1.3335 14.6673 4.31826 14.6673 8.00016Z'
          stroke='#808080'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_411_1223'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export { ClockIcon }
