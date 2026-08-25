interface SubcategoryIconProps {
  className?: string
}

function SubcategoryIcon({ className }: SubcategoryIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      {/* Círculo principal */}
      <circle
        cx='7'
        cy='12'
        r='2.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      {/* Círculos secundarios */}
      <circle
        cx='17'
        cy='7'
        r='2'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='17'
        cy='17'
        r='2'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      {/* Líneas curvas conectoras */}
      <path
        d='M9.5 11C11 11 12 10 12.5 8.5C13 7 14 7 15 7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.5 13C11 13 12 14 12.5 15.5C13 17 14 17 15 17'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { SubcategoryIcon }
