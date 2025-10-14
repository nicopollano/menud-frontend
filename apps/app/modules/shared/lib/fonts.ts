import { cn } from '@ristokit/ui/lib/utils'
import { Baloo_Tammudu_2, Lato, Maven_Pro, Niconne, Pompiere, Poppins, Roboto, Salsa } from 'next/font/google'

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const mavenPro = Maven_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maven-pro'
})

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato'
})

export const pompiere = Pompiere({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pompiere'
})

export const salsa = Salsa({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-salsa'
})

export const niconne = Niconne({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-niconne'
})

export const balooTammudu2 = Baloo_Tammudu_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-baloo-tammudu-2'
})

export const variableFonts = cn(
  poppins.variable,
  roboto.variable,
  mavenPro.variable,
  lato.variable,
  pompiere.variable,
  salsa.variable,
  niconne.variable,
  balooTammudu2.variable
)
