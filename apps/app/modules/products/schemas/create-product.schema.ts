import { MAX_PRODUCT_IMAGES } from '@/modules/products/constants/products.const'
import { imagesSchema } from '@/modules/shared/schemas/images.schema'
import { z } from 'zod'

export const createProductSchema = z.object({
  categoryId: z
    .string({
      required_error: 'La categoría es obligatoria',
      invalid_type_error: 'La categoría debe ser de tipo texto'
    })
    .min(1, { message: 'La categoría debe tener al menos 1 caracter' }),
  subcategoryId: z
    .string({
      required_error: 'La subcategoría es obligatoria',
      invalid_type_error: 'La subcategoría debe ser de tipo texto'
    })
    .optional(),
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser de tipo texto'
    })
    .min(1, { message: 'El nombre debe tener al menos 1 caracter' }),
  description: z
    .string({
      required_error: 'La descripción es obligatoria',
      invalid_type_error: 'La descripción debe ser de tipo texto'
    })
    .transform((value) => (value === '' ? null : value))
    .optional()
    .nullable(),
  images: imagesSchema.max(MAX_PRODUCT_IMAGES, { message: 'El producto no puede tener más de 3 imágenes' }),
  price: z
    .string({
      required_error: 'El precio es obligatorio',
      invalid_type_error: 'El precio debe ser de tipo texto'
    })
    .min(1, { message: 'El precio debe tener al menos 1 caracter' }),
  discountedPrice: z
    .string({
      required_error: 'El precio descuento es obligatorio',
      invalid_type_error: 'El precio descuento debe ser de tipo texto'
    })
    .transform((value) => (value === '' ? null : value))
    .optional()
    .nullable(),
  enabled: z
    .boolean({
      required_error: 'El estado del producto es obligatorio',
      invalid_type_error: 'El estado del producto debe ser de tipo visible u oculto'
    })
    .optional()
    .nullable()
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
