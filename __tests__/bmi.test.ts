import { describe, it, expect } from 'vitest'
import { calcBmiMetric, calcBmiImperial } from '@/lib/calculators/bmi'

describe('calcBmiMetric', () => {
  it('returns Normal weight for 70kg, 175cm', () => {
    const result = calcBmiMetric(70, 175)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(22.9, 1)
    expect(result!.category).toBe('Normal weight')
  })

  it('returns Underweight for 50kg, 175cm', () => {
    const result = calcBmiMetric(50, 175)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(16.3, 1)
    expect(result!.category).toBe('Underweight')
  })

  it('returns Overweight for 90kg, 175cm', () => {
    const result = calcBmiMetric(90, 175)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(29.4, 1)
    expect(result!.category).toBe('Overweight')
  })

  it('returns Obese for 120kg, 175cm', () => {
    const result = calcBmiMetric(120, 175)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(39.2, 1)
    expect(result!.category).toBe('Obese')
  })

  it('returns null for zero weight', () => {
    expect(calcBmiMetric(0, 175)).toBeNull()
  })

  it('returns null for zero height', () => {
    expect(calcBmiMetric(70, 0)).toBeNull()
  })

  it('returns correct healthy range for 70kg, 170cm', () => {
    const result = calcBmiMetric(70, 170)
    expect(result).not.toBeNull()
    expect(result!.healthyMin).toBeCloseTo(53.5, 1)
    expect(result!.healthyMax).toBeCloseTo(72.0, 0)
  })
})

describe('calcBmiImperial', () => {
  it('returns Normal weight for 154lbs, 69in', () => {
    const result = calcBmiImperial(154, 69)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(22.7, 1)
    expect(result!.category).toBe('Normal weight')
  })

  it('returns Overweight for 200lbs, 69in', () => {
    const result = calcBmiImperial(200, 69)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(29.5, 1)
    expect(result!.category).toBe('Overweight')
  })

  it('returns Obese for 250lbs, 69in', () => {
    const result = calcBmiImperial(250, 69)
    expect(result).not.toBeNull()
    expect(result!.bmi).toBeCloseTo(36.9, 1)
    expect(result!.category).toBe('Obese')
  })
})
