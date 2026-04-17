import { describe, it, expect } from 'vitest'
import { calcDateDiff, calcDateAdd, parseUTCDate } from '@/lib/calculators/date'

function d(str: string) { return parseUTCDate(str)! }

describe('calcDateDiff', () => {
  it('calculates days between', () => {
    const r = calcDateDiff(d('2026-01-01'), d('2026-04-01'))
    expect(r!.days).toBe(90)
  })
  it('is symmetric (abs value)', () => {
    const r1 = calcDateDiff(d('2026-01-01'), d('2026-04-01'))
    const r2 = calcDateDiff(d('2026-04-01'), d('2026-01-01'))
    expect(r1!.days).toBe(r2!.days)
  })
  it('returns 0 for same date', () => {
    const r = calcDateDiff(d('2026-04-18'), d('2026-04-18'))
    expect(r!.days).toBe(0)
  })
  it('calculates weeks', () => {
    const r = calcDateDiff(d('2026-01-01'), d('2026-01-15'))
    expect(r!.days).toBe(14)
    expect(r!.weeks).toBe(2)
  })
  it('handles leap year', () => {
    // 2024 is a leap year: Jan 1 to Dec 31 = 365 days
    const r = calcDateDiff(d('2024-01-01'), d('2024-12-31'))
    expect(r!.days).toBe(365)
  })
})

describe('calcDateAdd', () => {
  it('adds days', () => {
    const r = calcDateAdd(d('2026-04-18'), 30)
    expect(r!.resultDateStr).toBe('2026-05-18')
  })
  it('subtracts days (negative)', () => {
    const r = calcDateAdd(d('2026-04-18'), -18)
    expect(r!.resultDateStr).toBe('2026-03-31')
  })
  it('adds 0 days returns same date', () => {
    const r = calcDateAdd(d('2026-04-18'), 0)
    expect(r!.resultDateStr).toBe('2026-04-18')
  })
  it('returns correct day of week', () => {
    // April 18, 2026 is a Saturday
    const r = calcDateAdd(d('2026-04-18'), 0)
    expect(r!.dayOfWeek).toBe('Saturday')
  })
  it('handles month boundary', () => {
    const r = calcDateAdd(d('2026-01-31'), 1)
    expect(r!.resultDateStr).toBe('2026-02-01')
  })
})

describe('parseUTCDate', () => {
  it('returns null for invalid', () => {
    expect(parseUTCDate('')).toBeNull()
    expect(parseUTCDate('not-a-date')).toBeNull()
  })
  it('parses valid date', () => {
    const d = parseUTCDate('2026-04-18')
    expect(d).not.toBeNull()
    expect(d!.getUTCFullYear()).toBe(2026)
  })
})
