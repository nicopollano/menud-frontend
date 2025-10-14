import { poppins } from '@/modules/shared/lib/fonts'
import { cn } from '@ristokit/ui/lib/utils'
import '@ristokit/ui/styles/globals.css'

interface RootLayoutParams {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutParams) {
  return (
    <html lang='es'>
      <body className={cn(poppins.variable, 'font-poppins antialiased')}>{children}</body>
    </html>
  )
}

export default RootLayout
