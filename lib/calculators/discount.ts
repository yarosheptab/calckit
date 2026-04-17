export interface DiscountResult {
  salePrice: number
  savings: number
  discountPercent: number
}

export function calcDiscount(originalPrice: number, discountPercent: number): DiscountResult | null {
  if (originalPrice <= 0 || discountPercent < 0 || discountPercent > 100) return null
  const salePrice = originalPrice * (1 - discountPercent / 100)
  const savings = originalPrice - salePrice
  return { salePrice, savings, discountPercent }
}

export function calcDiscountPercent(originalPrice: number, salePrice: number): number | null {
  if (originalPrice <= 0 || salePrice < 0 || salePrice > originalPrice) return null
  return ((originalPrice - salePrice) / originalPrice) * 100
}

export function calcOriginalPrice(salePrice: number, discountPercent: number): number | null {
  if (salePrice <= 0 || discountPercent <= 0 || discountPercent >= 100) return null
  return salePrice / (1 - discountPercent / 100)
}
