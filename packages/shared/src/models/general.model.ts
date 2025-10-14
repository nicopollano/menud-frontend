export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum UserRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  WAITER = 'waiter',
  CASHIER = 'cashier'
}

export const USER_ROLES = Object.values(UserRole)

export const USER_ROLES_DICTIONARY: Record<UserRole, string> = {
  [UserRole.OWNER]: 'Propietario',
  [UserRole.MANAGER]: 'Gerente',
  [UserRole.WAITER]: 'Mesero',
  [UserRole.CASHIER]: 'Cajero'
}

export enum Typography {
  POPPINS = 'Poppins',
  ROBOTO = 'Roboto',
  MAVEN_PRO = 'Maven Pro',
  LATO = 'Lato',
  POMPIERE = 'Pompiere',
  SALSA = 'Salsa',
  NICONNE = 'Niconne',
  BALOO_TAMMUDU = 'Baloo Tammudu'
}

export const TYPOGRAPHIES = Object.values(Typography)

export enum Currency {
  USD = 'USD',
  ARS = 'ARS'
}

export const CURRENCIES = Object.values(Currency)

export enum Locale {
  ES_AR = 'es-AR',
  EN_US = 'en-US',
  PT_BR = 'pt-BR',
  FR_FR = 'fr-FR',
  DE_DE = 'de-DE',
  IT_IT = 'it-IT',
  ZH_CN = 'zh-CN',
  RU_RU = 'ru-RU',
  TR_TR = 'tr-TR',
  NL_NL = 'nl-NL'
}

export const LOCALES = Object.values(Locale)

export const LOCALES_DICTIONARY: Record<Locale, string> = {
  [Locale.ES_AR]: 'Español',
  [Locale.EN_US]: 'English',
  [Locale.PT_BR]: 'Português',
  [Locale.FR_FR]: 'Français',
  [Locale.DE_DE]: 'Deutsch',
  [Locale.IT_IT]: 'Italiano',
  [Locale.ZH_CN]: '中文',
  [Locale.RU_RU]: 'Русский',
  [Locale.TR_TR]: 'Türkçe',
  [Locale.NL_NL]: 'Nederlands'
}

export enum InvitationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export const INVITATION_STATUSES = Object.values(InvitationStatus)

export const INVITATION_STATUSES_DICTIONARY: Record<InvitationStatus, string> = {
  [InvitationStatus.PENDING]: 'Pendiente',
  [InvitationStatus.APPROVED]: 'Activo',
  [InvitationStatus.REJECTED]: 'Rechazada'
}

export enum Day {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7
}

export const DAYS = Object.values(Day).filter((day) => typeof day === 'number')

export const DAYS_DICTIONARY: Record<Day, string> = {
  [Day.MONDAY]: 'Lunes',
  [Day.TUESDAY]: 'Martes',
  [Day.WEDNESDAY]: 'Miércoles',
  [Day.THURSDAY]: 'Jueves',
  [Day.FRIDAY]: 'Viernes',
  [Day.SATURDAY]: 'Sábado',
  [Day.SUNDAY]: 'Domingo'
}

export const DAYS_SHORT_DICTIONARY: Record<Day, string> = {
  [Day.MONDAY]: 'Lun',
  [Day.TUESDAY]: 'Mar',
  [Day.WEDNESDAY]: 'Mié',
  [Day.THURSDAY]: 'Jue',
  [Day.FRIDAY]: 'Vie',
  [Day.SATURDAY]: 'Sáb',
  [Day.SUNDAY]: 'Dom'
}
