'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange enableColorScheme>
      {children}
    </NextThemesProvider>
  )
}

export { Providers }
