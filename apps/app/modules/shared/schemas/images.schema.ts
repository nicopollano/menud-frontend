import {
  ACCEPTED_IMAGE_TYPES,
  LABEL_ACCEPTED_IMAGE_TYPES,
  LABEL_MAX_SIZE_IMAGE,
  MAX_SIZE_IMAGE
} from '@/modules/shared/constants/images.const'
import { z } from 'zod'

export const imageSchema = z.object({
  url: z.string({
    required_error: 'La URL es obligatoria',
    invalid_type_error: 'La URL debe ser de tipo texto'
  }),
  file: z
    .instanceof(File, {
      message: 'La imagen es obligatoria'
    })
    .refine((file) => file.size <= MAX_SIZE_IMAGE, {
      message: `La imagen debe ser menor a ${LABEL_MAX_SIZE_IMAGE}`
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: `La imagen debe ser de tipo ${LABEL_ACCEPTED_IMAGE_TYPES}`
    })
    .nullable()
})

export type ImageSchema = z.infer<typeof imageSchema>

export const imagesSchema = z.array(imageSchema)

export type ImagesSchema = z.infer<typeof imagesSchema>
