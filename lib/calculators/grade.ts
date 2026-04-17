// Mode 1: Final grade needed
export function calcRequiredGrade(
  currentGrade: number,
  currentWeight: number,
  desiredGrade: number,
  finalWeight: number
): number | null {
  if (finalWeight <= 0 || currentWeight < 0) return null
  if (currentGrade < 0 || currentGrade > 100) return null
  if (desiredGrade < 0 || desiredGrade > 100) return null
  // required = (desired - current * currentWeight/100) / (finalWeight/100)
  return (desiredGrade - currentGrade * (currentWeight / 100)) / (finalWeight / 100)
}

// Mode 2: Weighted average
export interface GradeEntry {
  grade: number
  weight: number
}

export function calcWeightedGrade(entries: GradeEntry[]): number | null {
  if (!entries.length) return null
  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0)
  if (totalWeight === 0) return null
  const weighted = entries.reduce((sum, e) => sum + e.grade * e.weight, 0)
  return weighted / totalWeight
}

// Mode 3: GPA calculation
export interface GpaEntry {
  grade: number
  credits: number
}

export function gradeToGPA(grade: number): number {
  if (grade >= 93) return 4.0
  if (grade >= 90) return 3.7
  if (grade >= 87) return 3.3
  if (grade >= 83) return 3.0
  if (grade >= 80) return 2.7
  if (grade >= 77) return 2.3
  if (grade >= 73) return 2.0
  if (grade >= 70) return 1.7
  if (grade >= 67) return 1.3
  if (grade >= 63) return 1.0
  if (grade >= 60) return 0.7
  return 0.0
}

export function calcGPA(entries: GpaEntry[]): number | null {
  if (!entries.length) return null
  const totalCredits = entries.reduce((sum, e) => sum + e.credits, 0)
  if (totalCredits === 0) return null
  const totalPoints = entries.reduce((sum, e) => sum + gradeToGPA(e.grade) * e.credits, 0)
  return totalPoints / totalCredits
}
