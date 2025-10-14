function LocationIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M7.99935 8.66683C9.10392 8.66683 9.99935 7.7714 9.99935 6.66683C9.99935 5.56226 9.10392 4.66683 7.99935 4.66683C6.89478 4.66683 5.99935 5.56226 5.99935 6.66683C5.99935 7.7714 6.89478 8.66683 7.99935 8.66683Z'
        stroke='#808080'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.99935 14.6668C10.666 12.0002 13.3327 9.61235 13.3327 6.66683C13.3327 3.72131 10.9449 1.3335 7.99935 1.3335C5.05383 1.3335 2.66602 3.72131 2.66602 6.66683C2.66602 9.61235 5.33268 12.0002 7.99935 14.6668Z'
        stroke='#808080'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { LocationIcon }
