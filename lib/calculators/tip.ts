export interface TipResult {
  tipAmount: number
  total: number
  perPerson: number
}

export function calcTip(bill: number, tipPct: number, people: number): TipResult | null {
  if (!bill || tipPct < 0) return null
  const tipAmount = bill * (tipPct / 100)
  const total = bill + tipAmount
  return { tipAmount, total, perPerson: total / Math.max(1, people) }
}
