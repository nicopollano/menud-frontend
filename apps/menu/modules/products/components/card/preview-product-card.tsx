'use client'

import { useFavoriteProducts } from '@/modules/products/providers/favorite-products.provider'
import { formatPrice } from '@ristokit/shared/helpers/product.helper'
import { Currency, Locale } from '@ristokit/shared/models/general.model'
import type { Product } from '@ristokit/shared/models/product.model'
import { Badge } from '@ristokit/ui/components/badge'
import { Skeleton } from '@ristokit/ui/components/skeleton'
import { HeartIcon } from '@ristokit/ui/icons/heart.icon'
import { cn } from '@ristokit/ui/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

// Lazy load ProductDetailDrawer for better performance
const ProductDetailDrawer = dynamic(
  () => import('@/modules/products/components/drawer/product-detail-drawer').then((mod) => mod.ProductDetailDrawer),
  { ssr: false }
)

interface PreviewProductCardProps {
  product: Product
  /** Index for stagger animation delay */
  index?: number
}

function PreviewProductCard({ product, index = 0 }: PreviewProductCardProps) {
  const { isFavoriteProduct, toggleFavoriteProduct } = useFavoriteProducts()
  const [imageLoaded, setImageLoaded] = useState(false)

  const isFavorite = isFavoriteProduct(product.id)
  const discountedPrice = product.discountedPrice && product.discountedPrice > 0 ? product.discountedPrice : undefined
  const hasDiscount = !!discountedPrice
  const discountPercentage = hasDiscount ? Math.round(((product.price - discountedPrice) / product.price) * 100) : 0

  // Determinar si es un producto nuevo (por ejemplo, creado en los últimos 7 días)
  // Por ahora lo dejamos false ya que no tenemos el campo en el modelo
  const isNew = false

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavoriteProduct(product)
  }

  const priceText = discountedPrice
    ? `${formatPrice({ currency: Currency.ARS, price: discountedPrice, locale: Locale.ES_AR })} ${hasDiscount ? `antes ${formatPrice({ currency: Currency.ARS, price: product.price, locale: Locale.ES_AR })}` : ''}`
    : formatPrice({ currency: Currency.ARS, price: product.price, locale: Locale.ES_AR })

  return (
    <ProductDetailDrawer product={product}>
      <article
        className={cn(
          'group relative flex overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300',
          'hover:shadow-lg cursor-pointer',
          'animate-slide-fade-up',
          'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          // Mobile: vertical layout (flex-col)
          'flex-col',
          // Desktop: horizontal layout (flex-row) - imagen fija a la izquierda
          'md:flex-row md:hover:scale-[1.02]',
          // Stagger animation delay
          index < 10 && `delay-${index * 50}`
        )}
        aria-label={`${product.name}, ${priceText}${hasDiscount ? `, descuento del ${discountPercentage}%` : ''}`}
        role='button'
        tabIndex={0}
      >
        {/* Hero Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-neutral-100',
            // Mobile: aspect ratio 4:3 (70% del card)
            'aspect-product',
            // Desktop: ancho fijo 280px, altura completa
            'md:w-[280px] md:aspect-auto md:h-full md:shrink-0'
          )}
        >
          {/* Image with hover zoom effect */}
          <Image
            className={cn(
              'object-cover transition-all duration-500',
              'group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
            src={product.images[0] ?? '/assets/placeholder.jpeg'}
            alt={product.name}
            fill
            sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            onLoad={() => setImageLoaded(true)}
            priority={index < 4} // Priority for first 4 items
          />

          {/* Loading shimmer effect */}
          {!imageLoaded && (
            <div className='absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]' />
          )}

          {/* Gradient overlay for better text readability */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

          {/* Badges Container - Top Left */}
          <div className='absolute top-3 left-3 flex flex-col gap-2 z-10'>
            {isNew && (
              <Badge variant='info' size='sm' className='shadow-md'>
                Nuevo
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant='warning' size='sm' className='shadow-md'>
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Favorite Button - Top Right */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full shadow-md z-10',
              'bg-white/90 backdrop-blur-sm',
              'transition-all duration-300',
              'hover:scale-110 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
            )}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <HeartIcon
              className={cn(
                'size-5 transition-all duration-300',
                isFavorite
                  ? 'fill-primary-600 stroke-primary-600 scale-110 animate-heart-beat'
                  : 'stroke-neutral-700 hover:stroke-primary-600'
              )}
            />
          </button>

          {/* Price Badge - Bottom Left */}
          <div className='absolute bottom-3 left-3 flex items-baseline gap-2 z-10'>
            <span className='text-white text-2xl font-bold drop-shadow-lg'>
              {formatPrice({
                currency: Currency.ARS,
                currencyDisplay: 'symbol',
                price: discountedPrice || product.price,
                locale: Locale.ES_AR
              })}
            </span>
            {hasDiscount && (
              <span className='text-white/80 text-sm line-through drop-shadow-lg'>
                {formatPrice({
                  currency: Currency.ARS,
                  currencyDisplay: 'symbol',
                  price: product.price,
                  locale: Locale.ES_AR
                })}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div
          className={cn(
            'p-4 flex flex-col gap-2',
            // Desktop: flex-1 para ocupar el espacio restante
            'md:flex-1 md:p-6 md:justify-center'
          )}
        >
          {/* Product Name */}
          <h3 className={cn('font-semibold text-neutral-900 line-clamp-1', 'text-lg md:text-xl')}>{product.name}</h3>

          {/* Product Description */}
          <p className={cn('text-neutral-600 flex-1', 'text-sm line-clamp-2', 'md:text-base md:line-clamp-3')}>
            {product.description || 'Sin descripción'}
          </p>

          {/* Category/Subcategory Tags */}
          {(product.category || product.subcategory) && (
            <div className='flex gap-1 flex-wrap mt-auto'>
              {product.category && (
                <span className='px-2 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-md'>
                  {product.category.name}
                </span>
              )}
              {product.subcategory && (
                <span className='px-2 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-md'>
                  {product.subcategory.name}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </ProductDetailDrawer>
  )
}

/**
 * Skeleton Loader for Product Card
 * Matches the responsive design: vertical on mobile, horizontal on desktop
 */
function PreviewProductCardSkeleton() {
  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-xl bg-white shadow-sm',
        // Mobile: vertical layout
        'flex-col',
        // Desktop: horizontal layout
        'md:flex-row'
      )}
    >
      {/* Image skeleton */}
      <div
        className={cn(
          'relative overflow-hidden bg-neutral-200',
          // Mobile: aspect ratio
          'aspect-product',
          // Desktop: fixed width
          'md:w-[280px] md:aspect-auto md:h-full md:shrink-0 md:min-h-[200px]'
        )}
      >
        <div className='absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]' />
      </div>

      {/* Content skeleton */}
      <div className='p-4 md:p-6 md:flex-1 flex flex-col gap-3 md:gap-4 md:justify-center'>
        {/* Title skeleton */}
        <div className='h-5 md:h-6 bg-neutral-200 rounded-lg w-3/4 animate-pulse' />

        {/* Description skeleton */}
        <div className='space-y-2 md:space-y-3'>
          <div className='h-4 md:h-5 bg-neutral-200 rounded-lg w-full animate-pulse' />
          <div className='h-4 md:h-5 bg-neutral-200 rounded-lg w-5/6 animate-pulse' />
          <div className='h-4 md:h-5 bg-neutral-200 rounded-lg w-4/6 animate-pulse hidden md:block' />
        </div>

        {/* Tags skeleton */}
        <div className='flex gap-2 pt-2 mt-auto'>
          <div className='h-6 md:h-7 bg-neutral-200 rounded-md w-16 md:w-20 animate-pulse' />
          <div className='h-6 md:h-7 bg-neutral-200 rounded-md w-20 md:w-24 animate-pulse' />
        </div>
      </div>
    </div>
  )
}

export { PreviewProductCard, PreviewProductCardSkeleton }
