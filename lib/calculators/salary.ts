export interface SalaryResult {
  hourly: number
  daily: number
  weekly: number
  biweekly: number
  monthly: number
  annual: number
}

export function calcSalary(
  amount: number,
  period: 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual',
  hoursPerDay: number,
  daysPerWeek: number,
): SalaryResult | null {
  if (amount <= 0 || hoursPerDay <= 0 || daysPerWeek <= 0) return null

  let annual: number
  switch (period) {
    case 'hourly':
      annual = amount * hoursPerDay * daysPerWeek * 52
      break
    case 'daily':
      annual = amount * daysPerWeek * 52
      break
    case 'weekly':
      annual = amount * 52
      break
    case 'biweekly':
      annual = amount * 26
      break
    case 'monthly':
      annual = amount * 12
      break
    case 'annual':
      annual = amount
      break
  }

  const hourly = annual / (hoursPerDay * daysPerWeek * 52)
  const daily = hourly * hoursPerDay
  const weekly = hourly * hoursPerDay * daysPerWeek
  const biweekly = weekly * 2
  const monthly = annual / 12

  return { hourly, daily, weekly, biweekly, monthly, annual }
}
