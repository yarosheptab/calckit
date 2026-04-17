export type BmiCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese'

export interface BmiResult {
  bmi: number
  category: BmiCategory
  healthyMin: number
  healthyMax: number
}

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export function calcBmiMetric(weightKg: number, heightCm: number): BmiResult | null {
  if (weightKg <= 0 || heightCm <= 0) return null
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  const category = getBmiCategory(bmi)
  const healthyMin = 18.5 * heightM * heightM
  const healthyMax = 24.9 * heightM * heightM
  return { bmi, category, healthyMin, healthyMax }
}

export function calcBmiImperial(weightLbs: number, heightIn: number): BmiResult | null {
  if (weightLbs <= 0 || heightIn <= 0) return null
  const bmi = (703 * weightLbs) / (heightIn * heightIn)
  const category = getBmiCategory(bmi)
  const healthyMin = (18.5 * heightIn * heightIn) / 703
  const healthyMax = (24.9 * heightIn * heightIn) / 703
  return { bmi, category, healthyMin, healthyMax }
}
