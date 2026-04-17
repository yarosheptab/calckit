export type CompoundFrequency = 'Daily' | 'Monthly' | 'Annually'
export const FREQ_MAP: Record<CompoundFrequency, number> = { Daily: 365, Monthly: 12, Annually: 1 }

export interface CompoundInput {
  principal: number
  annualRate: number
  years: number
  freq: CompoundFrequency
  monthlyContribution?: number
}

export interface CompoundResult {
  futureValue: number
  totalInterest: number
  totalContributions: number
}

export function calcCompound({ principal: P, annualRate, years: t, freq, monthlyContribution = 0 }: CompoundInput): CompoundResult | null {
  const r = annualRate / 100
  const n = FREQ_MAP[freq]
  if (!P || !r || !t) return null
  const fvPrincipal = P * Math.pow(1 + r / n, n * t)
  const fvContrib = monthlyContribution > 0
    ? monthlyContribution * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    : 0
  const futureValue = fvPrincipal + fvContrib
  const totalContributions = monthlyContribution * 12 * t
  return { futureValue, totalInterest: futureValue - P - totalContributions, totalContributions }
}
