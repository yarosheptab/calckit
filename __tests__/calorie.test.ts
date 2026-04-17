import { describe, it, expect } from 'vitest'
import { calcCalories, calcCaloriesImperial } from '@/lib/calculators/calorie'

describe('calcCalories - Mifflin-St Jeor male', () => {
  it('calculates correct BMR and TDEE for sedentary male 70kg 175cm age 25', () => {
    const result = calcCalories(70, 175, 25, 'male', 'sedentary')
    expect(result).not.toBeNull()
    // Mifflin-St Jeor: 10*70 + 6.25*175 - 5*25 + 5 = 1673.75
    expect(result!.bmr).toBeGreaterThan(1650)
    expect(result!.bmr).toBeLessThan(1700)
    // tdee = bmr * 1.2 = 2008.5
    expect(result!.tdee).toBeGreaterThan(1980)
    expect(result!.tdee).toBeLessThan(2040)
  })
})

describe('calcCalories - Mifflin-St Jeor female', () => {
  it('calculates correct BMR and TDEE for sedentary female 60kg 165cm age 30', () => {
    const result = calcCalories(60, 165, 30, 'female', 'sedentary')
    expect(result).not.toBeNull()
    // Mifflin-St Jeor: 10*60 + 6.25*165 - 5*30 - 161 = 1320.25
    expect(result!.bmr).toBeGreaterThan(1300)
    expect(result!.bmr).toBeLessThan(1345)
    // tdee = bmr * 1.2 = 1584.3
    expect(result!.tdee).toBeGreaterThan(1560)
    expect(result!.tdee).toBeLessThan(1610)
  })
})

describe('calcCalories - activity multiplier', () => {
  it('calculates correct TDEE for moderate activity male 70kg 175cm age 25', () => {
    const result = calcCalories(70, 175, 25, 'male', 'moderate')
    expect(result).not.toBeNull()
    // tdee = 1673.75 * 1.55 = 2594.31
    expect(result!.tdee).toBeGreaterThan(2570)
    expect(result!.tdee).toBeLessThan(2620)
  })
})

describe('calcCalories - weightLoss', () => {
  it('weightLoss equals tdee - 500', () => {
    const result = calcCalories(70, 175, 25, 'male', 'sedentary')
    expect(result).not.toBeNull()
    // weightLoss = tdee - 500 = 2008.5 - 500 = 1508.5
    expect(result!.weightLoss).toBeGreaterThan(1480)
    expect(result!.weightLoss).toBeLessThan(1540)
    expect(result!.weightLoss).toBeCloseTo(result!.tdee - 500, 5)
  })
})

describe('calcCalories - weightGain', () => {
  it('weightGain equals tdee + 500', () => {
    const result = calcCalories(70, 175, 25, 'male', 'sedentary')
    expect(result).not.toBeNull()
    // weightGain = tdee + 500 = 2008.5 + 500 = 2508.5
    expect(result!.weightGain).toBeGreaterThan(2480)
    expect(result!.weightGain).toBeLessThan(2540)
    expect(result!.weightGain).toBeCloseTo(result!.tdee + 500, 5)
  })
})

describe('calcCalories - null cases', () => {
  it('returns null for zero weight', () => {
    expect(calcCalories(0, 175, 25, 'male', 'sedentary')).toBeNull()
  })

  it('returns null for zero height', () => {
    expect(calcCalories(70, 0, 25, 'male', 'sedentary')).toBeNull()
  })

  it('returns null for zero age', () => {
    expect(calcCalories(70, 175, 0, 'male', 'sedentary')).toBeNull()
  })
})

describe('calcCaloriesImperial', () => {
  it('returns BMR close to metric equivalent', () => {
    const imperial = calcCaloriesImperial(154, 69, 25, 'male', 'sedentary')
    const metric = calcCalories(69.85, 175.26, 25, 'male', 'sedentary')
    expect(imperial).not.toBeNull()
    expect(metric).not.toBeNull()
    expect(Math.abs(imperial!.bmr - metric!.bmr)).toBeLessThan(5)
  })
})
