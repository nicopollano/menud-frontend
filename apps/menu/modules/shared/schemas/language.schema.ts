import { Locale } from '@ristokit/shared/models/general.model'
import { z } from 'zod'

export const selectLanguageSchema = z.object({
  language: z.nativeEnum(Locale, {
    required_error: 'El idioma es obligatorio',
    invalid_type_error: 'El idioma debe ser un idioma válido'
  })
})

export type SelectLanguageSchema = z.infer<typeof selectLanguageSchema>
