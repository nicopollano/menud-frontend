import { z } from 'zod'

export const updateLinkitSchema = z
  .object({
    website: z
      .string({
        invalid_type_error: 'El sitio web debe ser de tipo texto'
      })
      .url({
        message: 'El sitio web debe ser una URL válida, pj: https://acme.com'
      })
      .or(z.literal(''))
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    whatsapp: z
      .string({
        invalid_type_error: 'El número de WhatsApp debe ser de tipo texto'
      })
      .url({
        message: 'El número de WhatsApp debe ser una URL válida, pj: https://wa.me/+1234567890'
      })
      .startsWith('https://wa.me/', {
        message: 'El número de WhatsApp debe comenzar con https://wa.me/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    instagram: z
      .string({
        invalid_type_error: 'El Instagram debe ser de tipo texto'
      })
      .url({
        message: 'El Instagram debe ser una URL válida, pj: https://instagram.com/acme'
      })
      .startsWith('https://instagram.com/', {
        message: 'El Instagram debe comenzar con https://instagram.com/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    facebook: z
      .string({
        invalid_type_error: 'El Facebook debe ser de tipo texto'
      })
      .url({
        message: 'El Facebook debe ser una URL válida, pj: https://facebook.com/acme'
      })
      .startsWith('https://facebook.com/', {
        message: 'El Facebook debe comenzar con https://facebook.com/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    twitter: z
      .string({
        invalid_type_error: 'El X-Twitter debe ser de tipo texto'
      })
      .url({
        message: 'El X-Twitter debe ser una URL válida, pj: https://x.com/acme'
      })
      .startsWith('https://x.com/', {
        message: 'El X-Twitter debe comenzar con https://x.com/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    linkedin: z
      .string({
        invalid_type_error: 'El LinkedIn debe ser de tipo texto'
      })
      .url({
        message: 'El LinkedIn debe ser una URL válida, pj: https://linkedin.com/in/acme'
      })
      .startsWith('https://linkedin.com/in/', {
        message: 'El LinkedIn debe comenzar con https://linkedin.com/in/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    tiktok: z
      .string({
        invalid_type_error: 'El TikTok debe ser de tipo texto'
      })
      .url({
        message: 'El TikTok debe ser una URL válida, pj: https://tiktok.com/@acme'
      })
      .startsWith('https://tiktok.com/@', {
        message: 'El TikTok debe comenzar con https://tiktok.com/@'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable(),
    location: z
      .string({
        invalid_type_error: 'La ubicación debe ser de tipo texto'
      })
      .url({
        message: 'La ubicación debe ser una URL válida, pj: https://maps.google.com/?q=acme'
      })
      .startsWith('https://maps.google.com/', {
        message: 'La ubicación debe comenzar con https://maps.google.com/'
      })
      .or(z.literal(''))
      .transform((value) => (value === '' ? null : value))
      .optional()
      .nullable()
  })
  .strict()

export type UpdateLinkitSchema = z.infer<typeof updateLinkitSchema>
