export interface ROIResult {
  roi: number
  annualized: number
  netProfit: number
}

export function calcROI(initial: number, final: number, years: number): ROIResult | null {
  if (!initial || !final) return null
  const roi = ((final - initial) / initial) * 100
  const annualized = years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : roi
  return { roi, annualized, netProfit: final - initial }
}
