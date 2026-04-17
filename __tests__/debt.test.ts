import { describe, it, expect } from 'vitest'
import { calcDebtPayoff, calcRequiredPayment } from '@/lib/calculators/debt'

describe('calcDebtPayoff', () => {
  it('calculates months for $5000 at 19.99% APR with $150/mo', () => {
    const result = calcDebtPayoff(5000, 19.99, 150)
    expect(result).not.toBeNull()
    expect(result!.monthsToPayoff).toBeGreaterThanOrEqual(48)
    expect(result!.monthsToPayoff).toBeLessThanOrEqual(52)
  })

  it('calculates totalInterestPaid > 1000 for $5000 at 19.99% with $150/mo', () => {
    const result = calcDebtPayoff(5000, 19.99, 150)
    expect(result).not.toBeNull()
    expect(result!.totalInterestPaid).toBeGreaterThan(1000)
  })

  it('calculates correct months with 0% APR', () => {
    const result = calcDebtPayoff(5000, 0, 250)
    expect(result).not.toBeNull()
    expect(result!.monthsToPayoff).toBe(20)
  })

  it('returns null when payment is too low to cover interest', () => {
    // Monthly interest on $5000 at 19.99% ≈ $83
    const result = calcDebtPayoff(5000, 19.99, 70)
    expect(result).toBeNull()
  })

  it('returns null when balance is 0', () => {
    expect(calcDebtPayoff(0, 19.99, 150)).toBeNull()
  })

  it('returns null when monthly payment is 0', () => {
    expect(calcDebtPayoff(5000, 19.99, 0)).toBeNull()
  })
})

describe('calcRequiredPayment', () => {
  it('returns payment > simple division due to interest', () => {
    const result = calcRequiredPayment(5000, 19.99, 24)
    expect(result).not.toBeNull()
    expect(result!).toBeGreaterThan(5000 / 24)
  })

  it('returns balance/months when rate is 0%', () => {
    const result = calcRequiredPayment(5000, 0, 24)
    expect(result).not.toBeNull()
    expect(result!).toBeCloseTo(208.33, 0)
  })

  it('returns null when balance is 0', () => {
    expect(calcRequiredPayment(0, 19.99, 24)).toBeNull()
  })

  it('returns null when targetMonths is 0', () => {
    expect(calcRequiredPayment(5000, 19.99, 0)).toBeNull()
  })
})
