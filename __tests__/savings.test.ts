import { describe, it, expect } from 'vitest'
import { calcSavingsProjection, calcMonthlySavings } from '@/lib/calculators/savings'

describe('calcSavingsProjection', () => {
  it('returns finalBalance > 25000 and interest > 0 for typical inputs', () => {
    const result = calcSavingsProjection(1000, 200, 5, 10)
    expect(result).not.toBeNull()
    expect(result!.finalBalance).toBeGreaterThan(1000 + 200 * 120)
    expect(result!.totalInterest).toBeGreaterThan(0)
  })

  it('handles 0% rate correctly', () => {
    // 1 year = 12 months; 100/month * 12 = 1200 total
    const result = calcSavingsProjection(0, 100, 0, 1)
    expect(result).not.toBeNull()
    expect(result!.totalContributions).toBe(1200)
    expect(result!.finalBalance).toBe(1200)
  })

  it('grows initial deposit with interest when no monthly contributions', () => {
    const result = calcSavingsProjection(10000, 0, 5, 1)
    expect(result).not.toBeNull()
    expect(result!.finalBalance).toBeCloseTo(10511, -1)
  })

  it('grows contributions over time', () => {
    const result = calcSavingsProjection(0, 200, 5, 10)
    expect(result).not.toBeNull()
    expect(result!.totalContributions).toBe(24000)
    expect(result!.finalBalance).toBeGreaterThan(24000)
  })

  it('returns null for years <= 0', () => {
    expect(calcSavingsProjection(1000, 200, 5, 0)).toBeNull()
  })

  it('returns null for negative rate', () => {
    expect(calcSavingsProjection(1000, 200, -1, 10)).toBeNull()
  })
})

describe('calcMonthlySavings', () => {
  it('returns positive monthlyContribution and finalBalance close to goal', () => {
    const result = calcMonthlySavings(10000, 0, 4.5, 3)
    expect(result).not.toBeNull()
    expect(result!.monthlyContribution).toBeGreaterThan(0)
    expect(result!.finalBalance).toBeCloseTo(10000, -1)
  })

  it('handles 0% rate correctly', () => {
    const result = calcMonthlySavings(10000, 0, 0, 2)
    expect(result).not.toBeNull()
    expect(result!.monthlyContribution).toBeCloseTo(417, 0)
  })

  it('returns null for goal <= 0', () => {
    expect(calcMonthlySavings(0, 0, 4.5, 3)).toBeNull()
  })

  it('returns null for years <= 0', () => {
    expect(calcMonthlySavings(10000, 0, 4.5, 0)).toBeNull()
  })
})
