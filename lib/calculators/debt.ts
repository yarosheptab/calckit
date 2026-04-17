export interface DebtPayoffResult {
  monthsToPayoff: number
  totalInterestPaid: number
  totalPaid: number
  monthlySavings?: number
}

// Calculate months to pay off a single debt with fixed monthly payment
export function calcDebtPayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): DebtPayoffResult | null {
  if (balance <= 0 || annualRate < 0 || monthlyPayment <= 0) return null

  const r = annualRate / 100 / 12

  if (r === 0) {
    const months = Math.ceil(balance / monthlyPayment)
    const totalPaid = monthlyPayment * months
    return { monthsToPayoff: months, totalInterestPaid: totalPaid - balance, totalPaid }
  }

  // If payment doesn't cover interest, debt never paid off
  if (monthlyPayment <= balance * r) return null

  const months = Math.ceil(-Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r))
  const totalPaid = monthlyPayment * months
  const totalInterestPaid = totalPaid - balance

  return { monthsToPayoff: months, totalInterestPaid, totalPaid }
}

// Calculate minimum payment to pay off within a target timeframe
export function calcRequiredPayment(
  balance: number,
  annualRate: number,
  targetMonths: number
): number | null {
  if (balance <= 0 || targetMonths <= 0 || annualRate < 0) return null

  const r = annualRate / 100 / 12

  if (r === 0) return balance / targetMonths

  const pow = Math.pow(1 + r, targetMonths)
  return (balance * r * pow) / (pow - 1)
}
