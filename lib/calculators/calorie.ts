export type Sex = 'male' | 'female'
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export interface CalorieResult {
  bmr: number
  tdee: number
  weightLoss: number
  weightGain: number
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary:   1.2,
  light:       1.375,
  moderate:    1.55,
  active:      1.725,
  very_active: 1.9,
}

export function calcCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
  activity: ActivityLevel
): CalorieResult | null {
  if (weightKg <= 0 || heightCm <= 0 || age < 1 || age > 120) return null
  const bmr =
    sex === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity]
  return {
    bmr,
    tdee,
    weightLoss: tdee - 500,
    weightGain: tdee + 500,
  }
}

export function calcCaloriesImperial(
  weightLbs: number,
  heightIn: number,
  age: number,
  sex: Sex,
  activity: ActivityLevel
): CalorieResult | null {
  const weightKg = weightLbs * 0.453592
  const heightCm = heightIn * 2.54
  return calcCalories(weightKg, heightCm, age, sex, activity)
}
