import type { CreateProductSchema } from '@/modules/products/schemas/create-product.schema'
import type { Category } from '@ristokit/shared/models/category.model'
import { Locale } from '@ristokit/shared/models/general.model'
import type { PreviewProduct } from '@ristokit/shared/models/product.model'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'

export const countProductsInCategories = (categories: Category[]): number => {
  return categories.reduce(
    (acc, category) =>
      acc + (category.products?.length ?? 0) + countProductsInSubcategories(category.subcategories as Subcategory[]),
    0
  )
}

export const countProductsInSubcategories = (subcategories: Subcategory[]): number => {
  return subcategories.reduce((acc, subcategory) => acc + (subcategory.products?.length ?? 0), 0)
}

export const countProductsInMenu = (categories: Category[]): number => {
  return countProductsInCategories(categories)
}

export const countProductsInCategory = (category: Category): number => {
  return (category.products?.length ?? 0) + countProductsInSubcategories(category.subcategories as Subcategory[])
}

interface ParsePriceInputOptions {
  value: string
  locale?: Locale
}

export const parsePriceInput = ({ value, locale = Locale.ES_AR }: ParsePriceInputOptions): number => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89)

  const group = parts.find((p) => p.type === 'group')?.value ?? ','
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.'

  const sanitized = value
    .split(group)
    .join('')
    .replace(decimal, '.')
    .replace(/[^\d.]/g, '')

  const parsed = Number.parseFloat(sanitized)

  return Number.isNaN(parsed) ? 0 : parsed
}

export const generatePreviewProduct = (product: Partial<CreateProductSchema>): PreviewProduct => {
  const { name, description, price, discountedPrice, images } = product

  const parsedPrice = price ? parsePriceInput({ value: price, locale: Locale.ES_AR }) : 0
  const parsedDiscountedPrice = discountedPrice ? parsePriceInput({ value: discountedPrice, locale: Locale.ES_AR }) : 0

  return {
    name: name ?? '',
    description: description ?? '',
    price: parsedPrice,
    discountedPrice: parsedDiscountedPrice,
    images: images ? images.map((image) => image.url) : []
  }
}
