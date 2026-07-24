// Groups digits in pairs while keeping a leading '+' or '00' dial prefix intact,
// e.g. "+4512345678" -> "+45 12 34 56 78", "0045123 45678" -> "0045 12 34 56 78"
export function formatPhoneNumber(input: string): string {
  const stripped = input.replace(/\s+/g, '')

  let prefix = ''
  let rest = stripped

  if (stripped.startsWith('00')) {
    prefix = stripped.slice(0, 4)
    rest = stripped.slice(4)
  } else if (stripped.startsWith('+')) {
    prefix = stripped.slice(0, 3)
    rest = stripped.slice(3)
  }

  const groups = rest.match(/\d{1,2}/g) ?? []

  return [prefix, ...groups].filter(Boolean).join(' ')
}

export function formatPhoneHref(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s+/g, '')}`
}
