import { describe, it, expect } from 'vitest'
import { calcAge } from '@/lib/calculators/age'

function d(str: string) {
  const [y, m, day] = str.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, day))
}

describe('calcAge', () => {
  it('calculates years correctly', () => {
    const result = calcAge(d('1990-04-18'), d('2025-04-18'))
    expect(result).not.toBeNull()
    expect(result!.years).toBe(35)
    expect(result!.months).toBe(0)
    expect(result!.days).toBe(0)
  })

  it('handles partial year', () => {
    const result = calcAge(d('1990-01-01'), d('2025-04-18'))
    expect(result!.years).toBe(35)
    expect(result!.months).toBe(3)
    expect(result!.days).toBe(17)
  })

  it('returns null for future birth date', () => {
    const result = calcAge(d('2030-01-01'), d('2025-04-18'))
    expect(result).toBeNull()
  })

  it('calculates total days', () => {
    const result = calcAge(d('2020-01-01'), d('2025-01-01'))
    // 5 years including leap years 2020, 2024 = 365+365+365+366+365 = 1827 days
    expect(result!.totalDays).toBe(1827)
  })

  it('calculates total weeks', () => {
    const result = calcAge(d('2020-01-01'), d('2025-01-01'))
    expect(result!.totalWeeks).toBe(Math.floor(1827 / 7)) // 261
  })

  it('detects birthday today', () => {
    const result = calcAge(d('1990-04-18'), d('2025-04-18'))
    expect(result!.nextBirthdayDays).toBe(0)
  })

  it('calculates days until next birthday', () => {
    // Born April 18, as of April 19 → next birthday is 364 days away (or 365 in non-leap)
    const result = calcAge(d('1990-04-18'), d('2025-04-19'))
    expect(result!.nextBirthdayDays).toBe(364) // 2026 is not a leap year
  })
})
