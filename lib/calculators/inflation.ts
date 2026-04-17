export interface InflationResult {
  adjustedAmount: number
  totalInflation: number
  annualRate: number
  purchasingPowerLost: number
}

export function calcInflation(
  amount: number,
  fromYear: number,
  toYear: number,
  annualInflationRate: number,
): InflationResult | null {
  if (amount <= 0 || fromYear >= toYear || annualInflationRate < 0) return null
  const years = toYear - fromYear
  const adjustedAmount = amount * Math.pow(1 + annualInflationRate / 100, years)
  const totalInflation = ((adjustedAmount - amount) / amount) * 100
  const purchasingPowerLost = 100 - (amount / adjustedAmount) * 100
  return {
    adjustedAmount,
    totalInflation,
    annualRate: annualInflationRate,
    purchasingPowerLost,
  }
}

export function calcImpliedInflation(
  startAmount: number,
  endAmount: number,
  years: number,
): number | null {
  if (startAmount <= 0 || endAmount <= 0 || years <= 0) return null
  return (Math.pow(endAmount / startAmount, 1 / years) - 1) * 100
}
