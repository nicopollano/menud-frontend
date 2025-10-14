function WebIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12.5 2C15.0013 4.73835 16.4228 8.29203 16.5 12C16.4228 15.708 15.0013 19.2616 12.5 22M12.5 2C9.99872 4.73835 8.57725 8.29203 8.5 12C8.57725 15.708 9.99872 19.2616 12.5 22M12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22M12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22M3.00002 9L22 9M3 15L22 15'
        stroke='inherit'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { WebIcon }
