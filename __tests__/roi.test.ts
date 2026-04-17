import { describe, it, expect } from 'vitest'
import { calcROI } from '@/lib/calculators/roi'

describe('calcROI', () => {
  it('returns null for zero initial investment', () => {
    expect(calcROI(0, 15000, 3)).toBeNull()
  })

  it('returns null for zero final value', () => {
    expect(calcROI(10000, 0, 3)).toBeNull()
  })

  it('calculates basic ROI: $10k → $15k', () => {
    const result = calcROI(10000, 15000, 3)
    expect(result!.roi).toBeCloseTo(50, 5)
    expect(result!.netProfit).toBe(5000)
  })

  it('calculates annualized return over 3 years', () => {
    const result = calcROI(10000, 15000, 3)
    // (15000/10000)^(1/3) - 1 ≈ 14.47%
    expect(result!.annualized).toBeCloseTo(14.47, 1)
  })

  it('annualized equals ROI when years is 0', () => {
    const result = calcROI(10000, 12000, 0)
    expect(result!.annualized).toBeCloseTo(result!.roi, 5)
  })

  it('handles negative ROI (loss)', () => {
    const result = calcROI(10000, 7000, 2)
    expect(result!.roi).toBeCloseTo(-30, 5)
    expect(result!.netProfit).toBe(-3000)
  })

  it('100% ROI over 1 year = 100% annualized', () => {
    const result = calcROI(10000, 20000, 1)
    expect(result!.roi).toBeCloseTo(100, 5)
    expect(result!.annualized).toBeCloseTo(100, 5)
  })

  it('100% ROI over 2 years ≈ 41.4% annualized', () => {
    const result = calcROI(10000, 20000, 2)
    expect(result!.annualized).toBeCloseTo(41.42, 1)
  })
})
