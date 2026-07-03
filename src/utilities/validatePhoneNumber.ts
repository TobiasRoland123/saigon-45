type PhoneValidationResult = {
  valid: boolean
  normalized: string | null // E.164 format, e.g. "+4512345678"
  error?: string
}

export function validatePhoneNumber(input: string): PhoneValidationResult {
  const stripped = input.replace(/[\s\-().]/g, '')

  // Detect/strip country code — defaults to Denmark (+45)
  let digits: string
  if (stripped.startsWith('+45')) {
    digits = stripped.slice(3)
  } else if (stripped.startsWith('0045')) {
    digits = stripped.slice(4)
  } else {
    digits = stripped
  }

  if (!/^\d+$/.test(digits)) {
    return { valid: false, normalized: null, error: 'Phone number contains invalid characters' }
  }

  if (digits.length !== 8) {
    return { valid: false, normalized: null, error: 'Danish phone numbers must be 8 digits' }
  }

  return { valid: true, normalized: `+45${digits}` }
}
