export interface MortgageInput {
  homePrice: number
  downPayment: number
  annualRate: number
  termMonths: number
}

export interface MortgageResult {
  monthly: number
  principal: number
  totalInterest: number
  totalCost: number
}

export function calcMortgage({ homePrice, downPayment, annualRate, termMonths }: MortgageInput): MortgageResult | null {
  const P = homePrice - downPayment
  const r = annualRate / 100 / 12
  if (P <= 0 || r <= 0 || termMonths <= 0) return null
  const monthly = (P * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)
  const totalCost = monthly * termMonths
  const totalInterest = totalCost - P
  return { monthly, principal: P, totalInterest, totalCost }
}

export function calcMortgageExtras(
  homePrice: number,
  principal: number,
  propTaxPct: number,
  hoaMonthly: number,
  insuranceAnnual: number,
  pmiPct: number,
): number {
  return (
    (homePrice * propTaxPct) / 100 / 12 +
    hoaMonthly +
    insuranceAnnual / 12 +
    (principal * pmiPct) / 100 / 12
  )
}
