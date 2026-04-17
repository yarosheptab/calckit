export type FilingStatus = 'single' | 'married'

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 14600, married: 29200 }

export const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [
    [0.10, 11600], [0.12, 47150], [0.22, 100525],
    [0.24, 191950], [0.32, 243725], [0.35, 609350], [0.37, Infinity],
  ],
  married: [
    [0.10, 23200], [0.12, 94300], [0.22, 201050],
    [0.24, 383900], [0.32, 487450], [0.35, 731200], [0.37, Infinity],
  ],
}

export function calcFederalTax(taxable: number, status: FilingStatus): number {
  let tax = 0
  let prev = 0
  for (const [rate, upTo] of BRACKETS[status]) {
    if (taxable <= prev) break
    const chunk = Math.min(taxable, upTo) - prev
    tax += chunk * rate
    prev = upTo
    if (upTo === Infinity) break
  }
  return Math.max(0, tax)
}

export interface TaxResult {
  federalTax: number
  effectiveRate: number
  takeHomeAnnual: number
  takeHomeMonthly: number
}

export function calcTax(gross: number, status: FilingStatus): TaxResult | null {
  if (!gross) return null
  const deduction = STANDARD_DEDUCTION[status]
  const taxable = Math.max(0, gross - deduction)
  const federalTax = calcFederalTax(taxable, status)
  const effectiveRate = (federalTax / gross) * 100
  const takeHomeAnnual = gross - federalTax
  return { federalTax, effectiveRate, takeHomeAnnual, takeHomeMonthly: takeHomeAnnual / 12 }
}
