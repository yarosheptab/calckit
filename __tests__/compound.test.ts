import { describe, it, expect } from 'vitest'
import { calcCompound } from '@/lib/calculators/compound'

describe('calcCompound', () => {
  it('returns null for zero principal', () => {
    expect(calcCompound({ principal: 0, annualRate: 7, years: 10, freq: 'Monthly' })).toBeNull()
  })

  it('returns null for zero rate', () => {
    expect(calcCompound({ principal: 10000, annualRate: 0, years: 10, freq: 'Monthly' })).toBeNull()
  })

  it('returns null for zero years', () => {
    expect(calcCompound({ principal: 10000, annualRate: 7, years: 0, freq: 'Monthly' })).toBeNull()
  })

  it('$10k at 7% monthly for 10 years', () => {
    const result = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Monthly' })
    expect(result!.futureValue).toBeCloseTo(20097, 0)
    expect(result!.totalContributions).toBe(0)
    expect(result!.totalInterest).toBeCloseTo(10097, 0)
  })

  it('annual compounding produces less than monthly compounding', () => {
    const monthly = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Monthly' })
    const annual = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Annually' })
    expect(monthly!.futureValue).toBeGreaterThan(annual!.futureValue)
  })

  it('daily compounding produces more than monthly compounding', () => {
    const daily = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Daily' })
    const monthly = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Monthly' })
    expect(daily!.futureValue).toBeGreaterThan(monthly!.futureValue)
  })

  it('includes monthly contributions in future value', () => {
    const withContrib = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Monthly', monthlyContribution: 200 })
    const noContrib = calcCompound({ principal: 10000, annualRate: 7, years: 10, freq: 'Monthly' })
    expect(withContrib!.futureValue).toBeGreaterThan(noContrib!.futureValue)
    expect(withContrib!.totalContributions).toBe(200 * 12 * 10)
  })

  it('Rule of 72: $10k at 7.2% annually doubles in ~10 years', () => {
    const result = calcCompound({ principal: 10000, annualRate: 7.2, years: 10, freq: 'Annually' })
    expect(result!.futureValue).toBeCloseTo(20000, -2)
  })
})
