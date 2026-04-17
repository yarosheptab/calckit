import { describe, it, expect } from 'vitest'
import { calcTax, calcFederalTax, STANDARD_DEDUCTION, BRACKETS } from '@/lib/calculators/tax'

describe('calcFederalTax', () => {
  it('returns 0 for zero taxable income', () => {
    expect(calcFederalTax(0, 'single')).toBe(0)
  })

  it('taxes only within the 10% bracket', () => {
    // $5,000 taxable → $500 tax
    expect(calcFederalTax(5000, 'single')).toBeCloseTo(500, 1)
  })

  it('correctly crosses the 10%/12% bracket boundary (single)', () => {
    // $11,600 taxable: all at 10% → $1,160
    expect(calcFederalTax(11600, 'single')).toBeCloseTo(1160, 1)
    // $11,601: $1,160 + 0.12×1 ≈ $1,160.12
    expect(calcFederalTax(11601, 'single')).toBeCloseTo(1160.12, 1)
  })

  it('calculates tax for $75,000 taxable income (single)', () => {
    // 10% × 11600 = 1160
    // 12% × (47150-11600) = 12% × 35550 = 4266
    // 22% × (75000-47150) = 22% × 27850 = 6127
    // total ≈ 11553
    expect(calcFederalTax(75000, 'single')).toBeCloseTo(11553, 0)
  })

  it('married brackets are approximately double single brackets', () => {
    const singleTax = calcFederalTax(50000, 'single')
    const marriedTax = calcFederalTax(100000, 'married')
    expect(marriedTax).toBeCloseTo(singleTax * 2, -1)
  })
})

describe('calcTax', () => {
  it('returns null for zero gross income', () => {
    expect(calcTax(0, 'single')).toBeNull()
  })

  it('subtracts standard deduction before calculating tax', () => {
    const result = calcTax(STANDARD_DEDUCTION.single, 'single')
    expect(result!.federalTax).toBe(0)
  })

  it('takeHomeAnnual = gross - federalTax', () => {
    const result = calcTax(75000, 'single')
    expect(result!.takeHomeAnnual).toBeCloseTo(75000 - result!.federalTax, 1)
  })

  it('takeHomeMonthly = takeHomeAnnual / 12', () => {
    const result = calcTax(75000, 'single')
    expect(result!.takeHomeMonthly).toBeCloseTo(result!.takeHomeAnnual / 12, 2)
  })

  it('effectiveRate is lower than top marginal rate', () => {
    const result = calcTax(100000, 'single')
    // Top bracket for $100k - $14,600 = $85,400 taxable: hits 22% bracket
    expect(result!.effectiveRate).toBeLessThan(22)
  })

  it('married filers have higher take-home than single on same income', () => {
    const single = calcTax(100000, 'single')
    const married = calcTax(100000, 'married')
    expect(married!.takeHomeAnnual).toBeGreaterThan(single!.takeHomeAnnual)
  })

  it('income below standard deduction results in zero federal tax', () => {
    const result = calcTax(10000, 'single')
    expect(result!.federalTax).toBe(0)
  })
})

describe('tax constants', () => {
  it('single standard deduction is $14,600', () => {
    expect(STANDARD_DEDUCTION.single).toBe(14600)
  })

  it('married standard deduction is $29,200', () => {
    expect(STANDARD_DEDUCTION.married).toBe(29200)
  })

  it('top bracket rate is 37%', () => {
    expect(BRACKETS.single[6][0]).toBe(0.37)
    expect(BRACKETS.married[6][0]).toBe(0.37)
  })
})
