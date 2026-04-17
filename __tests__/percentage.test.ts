import { describe, it, expect } from 'vitest'
import { calcPercentOf, calcWhatPercent, calcPercentChange } from '@/lib/calculators/percentage'

describe('calcPercentOf', () => {
  it('calculates 15% of 200 = 30', () => {
    expect(calcPercentOf(15, 200)).toBe(30)
  })

  it('calculates 0% of anything = 0', () => {
    expect(calcPercentOf(0, 200)).toBe(0)
  })

  it('calculates 100% of 50 = 50', () => {
    expect(calcPercentOf(100, 50)).toBe(50)
  })

  it('returns null if value is 0', () => {
    expect(calcPercentOf(15, 0)).toBeNull()
  })
})

describe('calcWhatPercent', () => {
  it('calculates 30 is what % of 200 = 15', () => {
    expect(calcWhatPercent(30, 200)).toBe(15)
  })

  it('calculates 50 is what % of 200 = 25', () => {
    expect(calcWhatPercent(50, 200)).toBe(25)
  })

  it('calculates 200 is what % of 200 = 100', () => {
    expect(calcWhatPercent(200, 200)).toBe(100)
  })

  it('returns null if whole is 0', () => {
    expect(calcWhatPercent(30, 0)).toBeNull()
  })
})

describe('calcPercentChange', () => {
  it('calculates change from 100 to 125 = +25%', () => {
    expect(calcPercentChange(100, 125)).toBe(25)
  })

  it('calculates change from 100 to 80 = -20%', () => {
    expect(calcPercentChange(100, 80)).toBe(-20)
  })

  it('calculates change from 50 to 100 = +100%', () => {
    expect(calcPercentChange(50, 100)).toBe(100)
  })

  it('returns null if from is 0', () => {
    expect(calcPercentChange(0, 100)).toBeNull()
  })
})
