import { describe, it, expect } from 'vitest'
import { calcDiscount, calcDiscountPercent, calcOriginalPrice } from '../lib/calculators/discount'

describe('calcDiscount', () => {
  it('calcDiscount(80, 25) => salePrice=60, savings=20', () => {
    const r = calcDiscount(80, 25)
    expect(r).not.toBeNull()
    expect(r!.salePrice).toBeCloseTo(60, 5)
    expect(r!.savings).toBeCloseTo(20, 5)
  })

  it('calcDiscount(100, 20) => salePrice=80, savings=20', () => {
    const r = calcDiscount(100, 20)
    expect(r).not.toBeNull()
    expect(r!.salePrice).toBeCloseTo(80, 5)
    expect(r!.savings).toBeCloseTo(20, 5)
  })

  it('calcDiscount(50, 0) => salePrice=50, savings=0', () => {
    const r = calcDiscount(50, 0)
    expect(r).not.toBeNull()
    expect(r!.salePrice).toBeCloseTo(50, 5)
    expect(r!.savings).toBeCloseTo(0, 5)
  })

  it('calcDiscount(50, 100) => salePrice=0, savings=50', () => {
    const r = calcDiscount(50, 100)
    expect(r).not.toBeNull()
    expect(r!.salePrice).toBeCloseTo(0, 5)
    expect(r!.savings).toBeCloseTo(50, 5)
  })

  it('calcDiscount(0, 25) => null', () => {
    expect(calcDiscount(0, 25)).toBeNull()
  })

  it('calcDiscount(80, 110) => null (> 100%)', () => {
    expect(calcDiscount(80, 110)).toBeNull()
  })
})

describe('calcDiscountPercent', () => {
  it('calcDiscountPercent(80, 60) => 25', () => {
    const r = calcDiscountPercent(80, 60)
    expect(r).not.toBeNull()
    expect(r!).toBeCloseTo(25, 1)
  })

  it('calcDiscountPercent(100, 75) => 25', () => {
    const r = calcDiscountPercent(100, 75)
    expect(r).not.toBeNull()
    expect(r!).toBeCloseTo(25, 1)
  })

  it('calcDiscountPercent(80, 0) => 100 (100% off)', () => {
    const r = calcDiscountPercent(80, 0)
    expect(r).not.toBeNull()
    expect(r!).toBeCloseTo(100, 1)
  })

  it('calcDiscountPercent(80, 90) => null (sale > original)', () => {
    expect(calcDiscountPercent(80, 90)).toBeNull()
  })
})

describe('calcOriginalPrice', () => {
  it('calcOriginalPrice(60, 25) => 80', () => {
    const r = calcOriginalPrice(60, 25)
    expect(r).not.toBeNull()
    expect(r!).toBeCloseTo(80, 0)
  })

  it('calcOriginalPrice(75, 25) => 100', () => {
    const r = calcOriginalPrice(75, 25)
    expect(r).not.toBeNull()
    expect(r!).toBeCloseTo(100, 0)
  })

  it('calcOriginalPrice(0, 25) => null', () => {
    expect(calcOriginalPrice(0, 25)).toBeNull()
  })

  it('calcOriginalPrice(60, 0) => null', () => {
    expect(calcOriginalPrice(60, 0)).toBeNull()
  })
})
