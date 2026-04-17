import { describe, it, expect } from 'vitest'
import { convertCurrency } from '@/lib/calculators/currency'

const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154.5,
  CAD: 1.36,
}

describe('convertCurrency', () => {
  it('returns null for zero amount', () => {
    expect(convertCurrency(0, 'USD', 'EUR', RATES)).toBeNull()
  })

  it('converts USD to EUR correctly', () => {
    const result = convertCurrency(1000, 'USD', 'EUR', RATES)
    expect(result!.converted).toBeCloseTo(920, 1)
    expect(result!.rate).toBeCloseTo(0.92, 4)
  })

  it('converts EUR to USD correctly', () => {
    const result = convertCurrency(100, 'EUR', 'USD', RATES)
    // 100 EUR → 100/0.92 USD ≈ 108.70
    expect(result!.converted).toBeCloseTo(108.7, 0)
  })

  it('converts between two non-USD currencies via USD bridge', () => {
    const result = convertCurrency(1000, 'EUR', 'JPY', RATES)
    // 1000 EUR → 1000/0.92 USD → × 154.5 JPY ≈ 167,934 JPY
    const expected = (1000 / 0.92) * 154.5
    expect(result!.converted).toBeCloseTo(expected, 0)
  })

  it('same currency conversion returns original amount', () => {
    const result = convertCurrency(500, 'USD', 'USD', RATES)
    expect(result!.converted).toBeCloseTo(500, 5)
    expect(result!.rate).toBeCloseTo(1, 5)
  })

  it('exchange rate is reciprocal when currencies are swapped', () => {
    const fwd = convertCurrency(1, 'USD', 'EUR', RATES)
    const rev = convertCurrency(1, 'EUR', 'USD', RATES)
    expect(fwd!.rate * rev!.rate).toBeCloseTo(1, 5)
  })

  it('falls back to 1 for unknown currency', () => {
    const result = convertCurrency(100, 'USD', 'XYZ', RATES)
    // unknown 'XYZ' defaults to rate 1 → treated as USD
    expect(result!.converted).toBeCloseTo(100, 2)
  })
})
