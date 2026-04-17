export interface SavingsGoalResult {
  monthlyContribution: number
  totalContributions: number
  totalInterest: number
  finalBalance: number
}

export function calcMonthlySavings(
  goal: number,
  initialDeposit: number,
  annualRate: number,
  years: number,
): SavingsGoalResult | null {
  if (goal <= 0 || years <= 0 || annualRate < 0) return null

  const n = years * 12
  const r = annualRate / 100 / 12
  const fvInitial = initialDeposit * Math.pow(1 + r, n)
  const needed = goal - fvInitial

  let monthlyContribution: number
  if (needed <= 0) {
    monthlyContribution = 0
  } else if (r === 0) {
    monthlyContribution = needed / n
  } else {
    monthlyContribution = (needed * r) / (Math.pow(1 + r, n) - 1)
  }

  const totalContributions = monthlyContribution * n
  const totalInterest = goal - totalContributions - initialDeposit

  return {
    monthlyContribution,
    totalContributions,
    totalInterest,
    finalBalance: goal,
  }
}

export interface SavingsProjectionResult {
  finalBalance: number
  totalContributions: number
  totalInterest: number
  initialDeposit: number
}

export function calcSavingsProjection(
  initialDeposit: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
): SavingsProjectionResult | null {
  if (years <= 0 || annualRate < 0) return null

  const n = years * 12
  const r = annualRate / 100 / 12
  const fvInitial = initialDeposit * Math.pow(1 + r, n)

  let fvContributions: number
  if (r === 0) {
    fvContributions = monthlyContribution * n
  } else {
    fvContributions = (monthlyContribution * (Math.pow(1 + r, n) - 1)) / r
  }

  const finalBalance = fvInitial + fvContributions
  const totalContributions = monthlyContribution * n
  const totalInterest = finalBalance - totalContributions - initialDeposit

  return {
    finalBalance,
    totalContributions,
    totalInterest,
    initialDeposit,
  }
}
