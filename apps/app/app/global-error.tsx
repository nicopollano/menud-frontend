'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang='es'>
      <body>
        <h2>Ocurrio un error</h2>
        <button onClick={() => reset()} type='button'>
          Intentar de nuevo
        </button>
      </body>
    </html>
  )
}

export default GlobalError
