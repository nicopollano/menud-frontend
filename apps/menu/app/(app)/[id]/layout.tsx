import { getBranchById, getBranchSlugs } from '@/modules/branches/services/branches.service'
import { Header } from '@/modules/layout/header/header'
import { SkipLink } from '@/modules/layout/skip-link/skip-link'
import { StructuredData } from '@/modules/layout/structured-data/structured-data'
import { FavoriteProductsDrawer } from '@/modules/products/components/drawer/favorite-products-drawer'
import { generateRgba } from '@/modules/shared/helpers/preferences.helper'
import { variableFonts } from '@/modules/shared/lib/fonts'
import { Typography } from '@ristokit/shared/models/general.model'
import { cn } from '@ristokit/ui/lib/utils'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SlugProvider } from './provider'
import '@ristokit/ui/styles/globals.css'

export async function generateStaticParams() {
  const { data, error } = await getBranchSlugs()
  if (error) return []

  return data.map((branch) => ({ id: branch.id }))
}

export async function generateMetadata({ params }: { params: Promise<SlugPageParams> }): Promise<Metadata> {
  const { id } = await params

  // Get branch slugs to resolve slug to ID
  const { data: slugsData } = await getBranchSlugs()
  const branchSlug = slugsData?.find((branch) => branch.slug === id)

  if (!branchSlug) {
    return {
      title: 'Menú no encontrado',
      description: 'El menú que buscás no existe o fue movido.'
    }
  }

  // Get full branch data
  const { data, error } = await getBranchById({ id: branchSlug.id.toString() })

  if (error || !data) {
    return {
      title: 'Menú no encontrado',
      description: 'El menú que buscás no existe o fue movido.'
    }
  }

  const { menu, business } = data
  const menuName = `${business.name}${data.name ? ` - ${data.name}` : ''}`
  const description =
    menu.description || `Explorá el menú digital de ${menuName}. Descubrí nuestros productos, precios y categorías.`

  return {
    title: `${menuName} | Menú Digital`,
    description,
    keywords: [
      business.name,
      data.name,
      'menú digital',
      'restaurante',
      'comida',
      'delivery',
      'online',
      'carta digital'
    ].filter(Boolean),
    authors: [{ name: business.name }],
    creator: business.name,
    publisher: business.name,
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000'}/${id}`,
      title: `${menuName} | Menú Digital`,
      description,
      siteName: menuName,
      images: menu.cover
        ? [
            {
              url: menu.cover,
              width: 1200,
              height: 630,
              alt: `Portada de ${menuName}`
            }
          ]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title: `${menuName} | Menú Digital`,
      description,
      images: menu.cover ? [menu.cover] : []
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
  }
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  }
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

  // First, get all branch slugs to find the numeric ID for this slug
  const { data: slugsData, error: slugsError } = await getBranchSlugs()
  if (slugsError || !slugsData) return redirect('/')

  // Find the branch with matching slug
  const branchSlug = slugsData.find((branch) => branch.slug === id)
  if (!branchSlug) return redirect('/')

  // Now fetch the full branch data using the numeric ID
  const { data, error } = await getBranchById({ id: branchSlug.id.toString() })
  if (error) return redirect('/')

  return (
    <html lang='es' suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.webmanifest' />
        <meta name='theme-color' content={data.menu.palette?.color3 || '#C82020'} />
        <link rel='dns-prefetch' href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500'} />
        <link rel='preconnect' href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500'} />
      </head>
      <body
        className={cn(variableFonts, 'flex flex-col gap-y-5 md:gap-y-8 bg-background py-2.5 md:py-6 text-text', {
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
        <SkipLink />
        <SlugProvider branch={data}>
          <StructuredData />
          <Header />
          {children}
          <FavoriteProductsDrawer />
        </SlugProvider>
      </body>
    </html>
  )
}

export default SlugLayout
