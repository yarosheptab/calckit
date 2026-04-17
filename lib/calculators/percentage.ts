// Mode 1: What is X% of Y?
export function calcPercentOf(percent: number, value: number): number | null {
  if (value <= 0) return null
  return (value * percent) / 100
}

// Mode 2: X is what percent of Y?
export function calcWhatPercent(part: number, whole: number): number | null {
  if (whole === 0) return null
  return (part / whole) * 100
}

// Mode 3: Percentage change from A to B
export function calcPercentChange(from: number, to: number): number | null {
  if (from === 0) return null
  return ((to - from) / Math.abs(from)) * 100
}
