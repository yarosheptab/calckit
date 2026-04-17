import { describe, it, expect } from 'vitest'
import { calcBodyFatMetric, calcBodyFatImperial } from '@/lib/calculators/bodyfat'

describe('calcBodyFatMetric', () => {
  it('male: bodyFatPercent in range 15–22 for typical male inputs', () => {
    const result = calcBodyFatMetric('male', 80, 178, 85, 38)
    expect(result).not.toBeNull()
    expect(result!.bodyFatPercent).toBeGreaterThan(14)
    expect(result!.bodyFatPercent).toBeLessThan(25)
  })

  it('female: bodyFatPercent in range 22–32 for typical female inputs', () => {
    const result = calcBodyFatMetric('female', 65, 165, 75, 33, 95)
    expect(result).not.toBeNull()
    expect(result!.bodyFatPercent).toBeGreaterThan(21)
    expect(result!.bodyFatPercent).toBeLessThan(33)
  })

  it('male: leanMass + fatMass ≈ weight', () => {
    const result = calcBodyFatMetric('male', 80, 178, 85, 38)
    expect(result).not.toBeNull()
    expect(result!.leanMass + result!.fatMass).toBeCloseTo(80, 0)
  })

  it('female: category is defined', () => {
    const result = calcBodyFatMetric('female', 65, 165, 75, 33, 95)
    expect(result).not.toBeNull()
    expect(result!.category).toBeDefined()
  })

  it('returns null for zero weight', () => {
    expect(calcBodyFatMetric('male', 0, 178, 85, 38)).toBeNull()
  })

  it('returns null for female missing hip', () => {
    expect(calcBodyFatMetric('female', 65, 165, 75, 33, undefined)).toBeNull()
  })
})

describe('calcBodyFatImperial', () => {
  it('male: bodyFatPercent in range 14–22 for typical inputs', () => {
    const result = calcBodyFatImperial('male', 176, 70, 33.5, 15)
    expect(result).not.toBeNull()
    expect(result!.bodyFatPercent).toBeGreaterThan(13)
    expect(result!.bodyFatPercent).toBeLessThan(23)
  })
})
