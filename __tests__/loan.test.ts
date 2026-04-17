import { describe, it, expect } from 'vitest'
import { calcLoan } from '../lib/calculators/loan'

describe('calcLoan', () => {
  it('calcLoan(10000, 7.5, 36) → monthlyPayment ≈ 311', () => {
    const result = calcLoan(10000, 7.5, 36)
    expect(result).not.toBeNull()
    expect(result!.monthlyPayment).toBeCloseTo(311, 0)
  })

  it('calcLoan(10000, 7.5, 36) → totalInterest ≈ 1193', () => {
    const result = calcLoan(10000, 7.5, 36)
    expect(result).not.toBeNull()
    expect(result!.totalInterest).toBeCloseTo(1198, -1)
  })

  it('calcLoan(20000, 5, 60) → monthlyPayment ≈ 377', () => {
    const result = calcLoan(20000, 5, 60)
    expect(result).not.toBeNull()
    expect(result!.monthlyPayment).toBeCloseTo(377, 0)
  })

  it('calcLoan(10000, 0, 12) → monthlyPayment = 833 (0% rate)', () => {
    const result = calcLoan(10000, 0, 12)
    expect(result).not.toBeNull()
    expect(result!.monthlyPayment).toBeCloseTo(833, 0)
  })

  it('calcLoan(0, 7.5, 36) → null', () => {
    expect(calcLoan(0, 7.5, 36)).toBeNull()
  })

  it('calcLoan(10000, 7.5, 0) → null', () => {
    expect(calcLoan(10000, 7.5, 0)).toBeNull()
  })

  it('calcLoan(10000, -1, 36) → null', () => {
    expect(calcLoan(10000, -1, 36)).toBeNull()
  })

  it('totalPayment = monthlyPayment * termMonths: calcLoan(10000, 7.5, 36) → totalPayment ≈ 11193', () => {
    const result = calcLoan(10000, 7.5, 36)
    expect(result).not.toBeNull()
    expect(result!.totalPayment).toBeCloseTo(11198, -1)
  })
})
