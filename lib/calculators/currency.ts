export interface CurrencyResult {
  converted: number
  rate: number
}

export function convertCurrency(amount: number, from: string, to: string, rates: Record<string, number>): CurrencyResult | null {
  if (!amount) return null
  const inUSD = amount / (rates[from] ?? 1)
  const converted = inUSD * (rates[to] ?? 1)
  const rate = (rates[to] ?? 1) / (rates[from] ?? 1)
  return { converted, rate }
}
