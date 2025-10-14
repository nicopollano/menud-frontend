import { Currency, Locale } from '@ristokit/shared/models/general.model'

interface FormatPriceOptions {
  price: number
  currency: Currency
  currencyDisplay?: keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry
  locale?: Locale
}

export const formatPrice = ({
  price,
  currency = Currency.ARS,
  currencyDisplay = 'code',
  locale = Locale.ES_AR
}: FormatPriceOptions): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: currencyDisplay,
    maximumFractionDigits: 2
  }).format(price)
}
