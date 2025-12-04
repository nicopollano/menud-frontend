export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-50 p-4'>
      <div className='text-center space-y-8'>
        {/* Animated logo/spinner */}
        <div className='relative w-32 h-32 md:w-40 md:h-40 mx-auto'>
          {/* Outer ring */}
          <div className='absolute inset-0 border-4 border-primary-200 rounded-full' />
          {/* Spinning ring */}
          <div className='absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full animate-spin' />
          {/* Inner pulse */}
          <div className='absolute inset-4 bg-primary-100 rounded-full animate-pulse' />
          {/* Center dot */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-8 h-8 bg-primary-600 rounded-full animate-pulse' />
          </div>
        </div>

        {/* Loading text */}
        <div className='space-y-3'>
          <h2 className='text-2xl md:text-3xl font-bold text-neutral-900 animate-pulse'>Cargando menú...</h2>
          <p className='text-base md:text-lg text-neutral-600'>Preparando los mejores platos para vos</p>
        </div>

        {/* Loading dots animation */}
        <div className='flex justify-center gap-2'>
          <div className='w-3 h-3 bg-primary-600 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
          <div className='w-3 h-3 bg-primary-600 rounded-full animate-bounce' style={{ animationDelay: '150ms' }} />
          <div className='w-3 h-3 bg-primary-600 rounded-full animate-bounce' style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Background decoration */}
      <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse' />
      </div>
    </div>
  )
}
