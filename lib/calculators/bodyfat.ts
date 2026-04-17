export type BodyFatSex = 'male' | 'female'

export interface BodyFatResult {
  bodyFatPercent: number
  category: string
  leanMass: number
  fatMass: number
}

function getCategory(sex: BodyFatSex, pct: number): string {
  if (sex === 'male') {
    if (pct < 6) return 'Essential Fat'
    if (pct < 14) return 'Athletes'
    if (pct < 18) return 'Fitness'
    if (pct < 25) return 'Acceptable'
    return 'Obese'
  } else {
    if (pct < 14) return 'Essential Fat'
    if (pct < 21) return 'Athletes'
    if (pct < 25) return 'Fitness'
    if (pct < 32) return 'Acceptable'
    return 'Obese'
  }
}

export function calcBodyFatMetric(
  sex: BodyFatSex,
  weightKg: number,
  heightCm: number,
  waistCm: number,
  neckCm: number,
  hipCm?: number,
): BodyFatResult | null {
  if (weightKg <= 0 || heightCm <= 0 || waistCm <= 0 || neckCm <= 0) return null
  if (sex === 'female' && (!hipCm || hipCm <= 0)) return null

  // US Navy formula uses inches internally
  const heightIn = heightCm / 2.54
  const waistIn = waistCm / 2.54
  const neckIn = neckCm / 2.54

  let bodyFatPercent: number
  if (sex === 'male') {
    const diff = waistIn - neckIn
    if (diff <= 0) return null
    bodyFatPercent =
      86.010 * Math.log10(diff) -
      70.041 * Math.log10(heightIn) +
      36.76
  } else {
    const hipIn = hipCm! / 2.54
    const sum = waistIn + hipIn - neckIn
    if (sum <= 0) return null
    bodyFatPercent =
      163.205 * Math.log10(sum) -
      97.684 * Math.log10(heightIn) -
      78.387
  }

  if (bodyFatPercent < 0 || bodyFatPercent > 100) return null

  const fatMass = weightKg * (bodyFatPercent / 100)
  const leanMass = weightKg - fatMass
  const category = getCategory(sex, bodyFatPercent)

  return { bodyFatPercent, category, leanMass, fatMass }
}

export function calcBodyFatImperial(
  sex: BodyFatSex,
  weightLbs: number,
  heightIn: number,
  waistIn: number,
  neckIn: number,
  hipIn?: number,
): BodyFatResult | null {
  // Convert to metric and delegate (metric fn converts cm → inches internally)
  const weightKg = weightLbs * 0.453592
  const heightCm = heightIn * 2.54
  const waistCm = waistIn * 2.54
  const neckCm = neckIn * 2.54
  const hipCm = hipIn !== undefined ? hipIn * 2.54 : undefined
  return calcBodyFatMetric(sex, weightKg, heightCm, waistCm, neckCm, hipCm)
}
