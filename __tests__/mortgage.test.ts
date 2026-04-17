import { describe, it, expect } from 'vitest'
import { calcMortgage, calcMortgageExtras } from '@/lib/calculators/mortgage'

describe('calcMortgage', () => {
  it('returns null for zero principal', () => {
    expect(calcMortgage({ homePrice: 0, downPayment: 0, annualRate: 6.5, termMonths: 360 })).toBeNull()
  })

  it('returns null for zero rate', () => {
    expect(calcMortgage({ homePrice: 300000, downPayment: 0, annualRate: 0, termMonths: 360 })).toBeNull()
  })

  it('returns null for zero term', () => {
    expect(calcMortgage({ homePrice: 300000, downPayment: 0, annualRate: 6.5, termMonths: 0 })).toBeNull()
  })

  it('calculates $300k loan at 6.5% over 30 years', () => {
    const result = calcMortgage({ homePrice: 300000, downPayment: 0, annualRate: 6.5, termMonths: 360 })
    expect(result).not.toBeNull()
    expect(result!.monthly).toBeCloseTo(1896.2, 0)
    expect(result!.principal).toBe(300000)
    expect(result!.totalCost).toBeCloseTo(682633, -1)
    expect(result!.totalInterest).toBeCloseTo(382633, -1)
  })

  it('subtracts down payment from principal', () => {
    const result = calcMortgage({ homePrice: 400000, downPayment: 80000, annualRate: 6.5, termMonths: 360 })
    expect(result!.principal).toBe(320000)
  })

  it('calculates 15-year term correctly (higher payment, less interest)', () => {
    const r30 = calcMortgage({ homePrice: 300000, downPayment: 0, annualRate: 6.5, termMonths: 360 })
    const r15 = calcMortgage({ homePrice: 300000, downPayment: 0, annualRate: 6.5, termMonths: 180 })
    expect(r15!.monthly).toBeGreaterThan(r30!.monthly)
    expect(r15!.totalInterest).toBeLessThan(r30!.totalInterest)
  })

  it('totalCost = monthly × termMonths', () => {
    const result = calcMortgage({ homePrice: 250000, downPayment: 50000, annualRate: 7, termMonths: 240 })
    expect(result!.totalCost).toBeCloseTo(result!.monthly * 240, 1)
  })
})

describe('calcMortgageExtras', () => {
  it('computes monthly extras correctly', () => {
    // homePrice=400000, principal=320000, propTax=1.2%, hoa=200, insurance=1200, pmi=0.5%
    const extras = calcMortgageExtras(400000, 320000, 1.2, 200, 1200, 0.5)
    const propTax = (400000 * 1.2) / 100 / 12   // 400
    const insurance = 1200 / 12                  // 100
    const pmi = (320000 * 0.5) / 100 / 12        // 133.33
    expect(extras).toBeCloseTo(propTax + 200 + insurance + pmi, 1)
  })

  it('returns just hoa when other extras are zero', () => {
    expect(calcMortgageExtras(400000, 320000, 0, 150, 0, 0)).toBeCloseTo(150, 1)
  })
})
