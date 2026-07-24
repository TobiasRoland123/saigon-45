// Formats a price in whole kroner using the Danish menu convention,
// e.g. 46 -> "46,-". Decimals are kept with a comma separator, 45.5 -> "45,50".
export function formatPrice(amount: number): string {
  if (!Number.isInteger(amount)) {
    return amount.toFixed(2).replace('.', ',')
  }

  return `${amount},-`
}
