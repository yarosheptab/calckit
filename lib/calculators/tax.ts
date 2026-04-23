export type FilingStatus = 'single' | 'married'

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 15000, married: 30000 }

export const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [
    [0.10, 11925], [0.12, 48475], [0.22, 103350],
    [0.24, 197300], [0.32, 250525], [0.35, 626350], [0.37, Infinity],
  ],
  married: [
    [0.10, 23850], [0.12, 96950], [0.22, 206700],
    [0.24, 394600], [0.32, 501050], [0.35, 751600], [0.37, Infinity],
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
