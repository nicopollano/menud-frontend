import { poppins } from '@/modules/shared/lib/font.lib'
import { cn } from '@ristokit/ui/lib/utils'
import '@ristokit/ui/globals.css'
import { businessService } from '@/modules/businesses/services/business.service'

export async function generateStaticParams() {
  try {
    const businesses = await businessService.getBusinessesForSitemap()
    return businesses.map((business) => ({ id: business.id }))
  } catch (error) {
    console.error('Error fetching businesses for sitemap:', error)
    return []
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={cn(poppins.variable, 'font-poppins antialiased')}>{children}</body>
    </html>
  )
}

export default RootLayout
