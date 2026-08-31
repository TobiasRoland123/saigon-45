export const SITE_NAME = 'Saigon 45'

export const DEFAULT_META_DESCRIPTION =
  'Bestil frisklavede wokretter, sprøde snacks og bubble tea hos os i Rødovre Centrum.'

export const DEFAULT_OG_IMAGE_PATH = '/473622995_565282999663129_5661000132917835598_n.webp'

export const getSiteTitle = (title?: null | string) =>
  title ? `${title} | ${SITE_NAME}` : SITE_NAME
