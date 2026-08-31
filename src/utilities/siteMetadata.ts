export const SITE_NAME = 'Saigon 45'

export const DEFAULT_META_DESCRIPTION =
  'Bestil frisklavede wokretter, sprøde snacks og bubble tea hos os i Rødovre Centrum.'

export const DEFAULT_OG_IMAGE_PATH = '/saigon-45-og.webp'
export const DEFAULT_OG_IMAGE_WIDTH = 1200
export const DEFAULT_OG_IMAGE_HEIGHT = 630
export const DEFAULT_OG_IMAGE_ALT = 'Et bord dækket med wokretter, salat, forårsruller og ris'

export const getSiteTitle = (title?: null | string) =>
  title ? `${title} | ${SITE_NAME}` : SITE_NAME
