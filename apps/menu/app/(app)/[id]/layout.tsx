import { getBranchById, getBranchSlugs } from '@/modules/branches/services/branches.service'
import { Header } from '@/modules/layout/header/header'
import { FavoriteProductsDrawer } from '@/modules/products/components/drawer/favorite-products-drawer'
import { generateRgba } from '@/modules/shared/helpers/preferences.helper'
import { variableFonts } from '@/modules/shared/lib/fonts'
import { Typography } from '@ristokit/shared/models/general.model'
import { cn } from '@ristokit/ui/lib/utils'
import { redirect } from 'next/navigation'
import { SlugProvider } from './provider'
import '@ristokit/ui/styles/globals.css'

export async function generateStaticParams() {
  const { data, error } = await getBranchSlugs()
  if (error) return []

  return data.map((branch) => ({ id: branch.id }))
}

export interface SlugPageParams {
  id: string
}

interface SlugLayoutProps {
  children: React.ReactNode
  params: Promise<SlugPageParams>
}

async function SlugLayout({ children, params }: SlugLayoutProps) {
  const { id } = await params

  const { data, error } = await getBranchById({ id })
  if (error) return redirect('/')

  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={cn(variableFonts, 'flex flex-col gap-y-5 bg-background py-2.5 text-text', {
          'font-poppins': data.menu.typography === Typography.POPPINS,
          'font-roboto': data.menu.typography === Typography.ROBOTO,
          'font-maven-pro': data.menu.typography === Typography.MAVEN_PRO,
          'font-lato': data.menu.typography === Typography.LATO,
          'font-pompiere': data.menu.typography === Typography.POMPIERE,
          'font-salsa': data.menu.typography === Typography.SALSA,
          'font-niconne': data.menu.typography === Typography.NICONNE,
          'font-baloo-tammudu': data.menu.typography === Typography.BALOO_TAMMUDU
        })}
        style={{
          ...(data.menu.palette
            ? ({
                '--color-background': data.menu.palette?.color1,
                '--color-text': data.menu.palette?.color2,
                '--color-primary': data.menu.palette?.color3,
                '--color-secondary': generateRgba(data.menu.palette?.color3, 0.2)
              } as React.CSSProperties)
            : {})
        }}
      >
        <SlugProvider branch={data}>
          <Header />
          {children}
          <FavoriteProductsDrawer />
        </SlugProvider>
      </body>
    </html>
  )
}

export default SlugLayout
