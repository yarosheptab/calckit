import { describe, it, expect } from 'vitest'
import { calcInflation, calcImpliedInflation } from '@/lib/calculators/inflation'

describe('calcInflation', () => {
  it('calculates 1000 at 3% over 25 years', () => {
    const result = calcInflation(1000, 2000, 2025, 3.0)
    expect(result).not.toBeNull()
    expect(result!.adjustedAmount).toBeCloseTo(2094, -1)
  })

  it('calculates 1000 at 2% over 10 years', () => {
    const result = calcInflation(1000, 2000, 2010, 2.0)
    expect(result).not.toBeNull()
    expect(result!.adjustedAmount).toBeCloseTo(1219, -1)
  })

  it('returns adjustedAmount = 1000 and totalInflation = 0 at 0% rate', () => {
    const result = calcInflation(1000, 2000, 2025, 0)
    expect(result).not.toBeNull()
    expect(result!.adjustedAmount).toBe(1000)
    expect(result!.totalInflation).toBe(0)
  })

  it('returns null for amount <= 0', () => {
    expect(calcInflation(0, 2000, 2025, 3)).toBeNull()
  })

  it('returns null when fromYear >= toYear', () => {
    expect(calcInflation(1000, 2025, 2000, 3)).toBeNull()
  })

  it('calculates purchasingPowerLost ~52% for 1000 at 3% over 25 years', () => {
    const result = calcInflation(1000, 2000, 2025, 3)
    expect(result).not.toBeNull()
    expect(result!.purchasingPowerLost).toBeCloseTo(52, 0)
  })
})

describe('calcImpliedInflation', () => {
  it('calculates implied rate from 50 to 75 over 10 years', () => {
    const result = calcImpliedInflation(50, 75, 10)
    expect(result).not.toBeNull()
    expect(result!).toBeCloseTo(4.1, 1)
  })

  it('calculates implied rate when amount doubles in 24 years', () => {
    const result = calcImpliedInflation(100, 200, 24)
    expect(result).not.toBeNull()
    expect(result!).toBeCloseTo(2.9, 1)
  })

  it('returns null when startAmount <= 0', () => {
    expect(calcImpliedInflation(0, 75, 10)).toBeNull()
  })

  it('returns null when years <= 0', () => {
    expect(calcImpliedInflation(50, 75, 0)).toBeNull()
  })
})
