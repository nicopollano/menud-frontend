import { Providers } from '@/app/providers'
import { variableFonts } from '@/modules/shared/lib/fonts'
import '@ristokit/ui/globals.css'
import { cn } from '@ristokit/ui/lib/utils'

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={cn(variableFonts, 'grid min-h-dvh font-poppins antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
