'use client'

import { useBranch } from '@/modules/branches/providers/branch.provider'
import Script from 'next/script'

export function StructuredData() {
  const { business, branch, menu } = useBranch()

  // Restaurant structured data
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `${business.name}${branch.name ? ` - ${branch.name}` : ''}`,
    image: menu.cover || business.logo,
    description: menu.description || `Menú digital de ${business.name}`,
    address: branch.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: branch.address.street,
          addressLocality: branch.address.city,
          addressRegion: branch.address.state,
          postalCode: branch.address.zipCode,
          addressCountry: 'AR'
        }
      : undefined,
    telephone: branch.phone,
    servesCuisine: 'Restaurant',
    priceRange: '$$',
    url: typeof window !== 'undefined' ? window.location.href : undefined
  }

  // Menu structured data
  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Menú de ${business.name}${branch.name ? ` - ${branch.name}` : ''}`,
    description: menu.description,
    image: menu.cover,
    inLanguage: 'es-AR'
  }

  return (
    <>
      <Script
        id='restaurant-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantSchema)
        }}
      />
      <Script
        id='menu-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuSchema)
        }}
      />
    </>
  )
}
