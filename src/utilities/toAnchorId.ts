/**
 * Turns a block heading into a slug that is safe to use as an HTML `id`, so
 * headings can be linked to with `#anchor` fragments.
 *
 * Danish characters are transliterated (æ/ø/å → ae/oe/aa) before the string is
 * normalized, so they do not collapse into bare a/o the way NFD would leave them.
 */
export const toAnchorId = (string: null | string | undefined): string =>
  (string ?? '')
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'oe')
    .replace(/å/gi, 'aa')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
