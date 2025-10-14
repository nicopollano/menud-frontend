import { z } from 'zod'

export const productsFiltersSchema = z.object({
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  price: z.number()
})

export type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>
