interface CategoryIconProps {
  className?: string
}

function CategoryIcon({ className }: CategoryIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      {/* Círculos organizados en patrón */}
      <circle
        cx='7'
        cy='7'
        r='2.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='17'
        cy='7'
        r='2.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='7'
        cy='17'
        r='2.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='17'
        cy='17'
        r='2.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export { CategoryIcon }
