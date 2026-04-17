export interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principal: number
}

export function calcLoan(
  principal: number,
  annualRate: number,
  termMonths: number
): LoanResult | null {
  if (principal <= 0 || termMonths <= 0 || annualRate < 0) return null

  const r = annualRate / 100 / 12
  let monthlyPayment: number

  if (r === 0) {
    monthlyPayment = principal / termMonths
  } else {
    const factor = Math.pow(1 + r, termMonths)
    monthlyPayment = (principal * r * factor) / (factor - 1)
  }

  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - principal

  return { monthlyPayment, totalPayment, totalInterest, principal }
}
