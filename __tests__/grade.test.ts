import { describe, it, expect } from 'vitest'
import {
  calcRequiredGrade,
  calcWeightedGrade,
  calcGPA,
  gradeToGPA,
} from '@/lib/calculators/grade'

describe('calcRequiredGrade', () => {
  it('calculates required grade when target is high', () => {
    // (90 - 85*0.70) / 0.30 = (90 - 59.5) / 0.30 = 101.67
    expect(calcRequiredGrade(85, 70, 90, 30)).toBeCloseTo(101.7, 0)
  })

  it('calculates required grade equal to current', () => {
    // (85 - 85*0.70) / 0.30 = (85 - 59.5) / 0.30 = 85
    expect(calcRequiredGrade(85, 70, 85, 30)).toBeCloseTo(85, 0)
  })

  it('calculates required grade when target is lower', () => {
    // (80 - 85*0.70) / 0.30 = (80 - 59.5) / 0.30 = 68.33
    expect(calcRequiredGrade(85, 70, 80, 30)).toBeCloseTo(68.3, 0)
  })

  it('returns null when finalWeight is 0', () => {
    expect(calcRequiredGrade(85, 70, 90, 0)).toBeNull()
  })
})

describe('calcWeightedGrade', () => {
  it('calculates weighted average of multiple assignments', () => {
    const entries = [
      { grade: 90, weight: 30 },
      { grade: 80, weight: 30 },
      { grade: 95, weight: 40 },
    ]
    // (90*30 + 80*30 + 95*40) / 100 = (2700 + 2400 + 3800) / 100 = 89
    expect(calcWeightedGrade(entries)).toBeCloseTo(89, 0)
  })

  it('returns grade for single entry with full weight', () => {
    expect(calcWeightedGrade([{ grade: 100, weight: 100 }])).toBe(100)
  })

  it('returns null for empty entries', () => {
    expect(calcWeightedGrade([])).toBeNull()
  })
})

describe('gradeToGPA', () => {
  it('converts 95 to 4.0', () => {
    expect(gradeToGPA(95)).toBe(4.0)
  })

  it('converts 91 to 3.7', () => {
    expect(gradeToGPA(91)).toBe(3.7)
  })

  it('converts 55 to 0.0', () => {
    expect(gradeToGPA(55)).toBe(0.0)
  })
})

describe('calcGPA', () => {
  it('calculates GPA from multiple courses', () => {
    // grade 95 -> 4.0, grade 85 -> 3.0, each 3 credits
    // (4.0*3 + 3.0*3) / 6 = 21/6 = 3.5
    expect(calcGPA([{ grade: 95, credits: 3 }, { grade: 85, credits: 3 }])).toBeCloseTo(3.5, 1)
  })

  it('returns null for empty entries', () => {
    expect(calcGPA([])).toBeNull()
  })
})
