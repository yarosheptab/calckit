import { describe, it, expect } from 'vitest'
import { calcSalary } from '@/lib/calculators/salary'

describe('calcSalary', () => {
  it('annual 75000 → hourly ≈ 36.06', () => {
    const r = calcSalary(75000, 'annual', 8, 5)
    expect(r).not.toBeNull()
    expect(r!.hourly).toBeCloseTo(36.06, 1)
  })

  it('annual 75000 → monthly ≈ 6250', () => {
    const r = calcSalary(75000, 'annual', 8, 5)
    expect(r!.monthly).toBeCloseTo(6250, 0)
  })

  it('annual 75000 → weekly ≈ 1442', () => {
    const r = calcSalary(75000, 'annual', 8, 5)
    expect(r!.weekly).toBeCloseTo(1442, 0)
  })

  it('hourly 36.06 → annual ≈ 75000', () => {
    const r = calcSalary(36.06, 'hourly', 8, 5)
    expect(r!.annual).toBeCloseTo(75000, -2)
  })

  it('monthly 6250 → annual = 75000', () => {
    const r = calcSalary(6250, 'monthly', 8, 5)
    expect(r!.annual).toBeCloseTo(75000, 0)
  })

  it('hourly 20 → annual = 41600', () => {
    const r = calcSalary(20, 'hourly', 8, 5)
    expect(r!.annual).toBeCloseTo(41600, 0)
  })

  it('annual 100000 → hourly ≈ 48.08', () => {
    const r = calcSalary(100000, 'annual', 8, 5)
    expect(r!.hourly).toBeCloseTo(48.08, 1)
  })

  it('amount 0 → null', () => {
    expect(calcSalary(0, 'annual', 8, 5)).toBeNull()
  })

  it('hoursPerDay 0 → null', () => {
    expect(calcSalary(75000, 'annual', 0, 5)).toBeNull()
  })

  it('biweekly = weekly * 2', () => {
    const r = calcSalary(75000, 'annual', 8, 5)
    expect(r!.biweekly).toBeCloseTo(2885, 0)
  })
})
