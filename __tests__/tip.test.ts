import { describe, it, expect } from 'vitest'
import { calcTip } from '@/lib/calculators/tip'

describe('calcTip', () => {
  it('returns null for zero bill', () => {
    expect(calcTip(0, 18, 2)).toBeNull()
  })

  it('returns null for negative tip percentage', () => {
    expect(calcTip(50, -5, 1)).toBeNull()
  })

  it('calculates 18% tip on $50 bill', () => {
    const result = calcTip(50, 18, 1)
    expect(result!.tipAmount).toBeCloseTo(9, 2)
    expect(result!.total).toBeCloseTo(59, 2)
    expect(result!.perPerson).toBeCloseTo(59, 2)
  })

  it('splits total evenly between people', () => {
    const result = calcTip(100, 20, 4)
    expect(result!.total).toBeCloseTo(120, 2)
    expect(result!.perPerson).toBeCloseTo(30, 2)
  })

  it('handles 0% tip (no tip)', () => {
    const result = calcTip(60, 0, 1)
    expect(result!.tipAmount).toBe(0)
    expect(result!.total).toBe(60)
  })

  it('handles 1 person (perPerson = total)', () => {
    const result = calcTip(80, 20, 1)
    expect(result!.perPerson).toBeCloseTo(result!.total, 5)
  })

  it('defaults people to 1 for zero or negative input', () => {
    const result = calcTip(100, 20, 0)
    expect(result!.perPerson).toBeCloseTo(120, 2)
  })

  it('calculates 20% tip on $100: tip=$20, total=$120', () => {
    const result = calcTip(100, 20, 1)
    expect(result!.tipAmount).toBe(20)
    expect(result!.total).toBe(120)
  })
})
