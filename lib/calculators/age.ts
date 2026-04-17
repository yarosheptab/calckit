export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  nextBirthdayDays: number
}

export function calcAge(birthDate: Date, asOf: Date): AgeResult | null {
  if (!birthDate || !asOf) return null
  if (isNaN(birthDate.getTime()) || isNaN(asOf.getTime())) return null
  if (birthDate >= asOf) return null

  const by = birthDate.getUTCFullYear()
  const bm = birthDate.getUTCMonth()
  const bd = birthDate.getUTCDate()

  const ay = asOf.getUTCFullYear()
  const am = asOf.getUTCMonth()
  const ad = asOf.getUTCDate()

  // Full years
  let years = ay - by
  if (am < bm || (am === bm && ad < bd)) years -= 1

  // Remaining months after full years
  const afterYears = new Date(Date.UTC(by + years, bm, bd))
  let months = am - afterYears.getUTCMonth()
  let tempYear = afterYears.getUTCFullYear()
  if (months < 0) {
    months += 12
    tempYear -= 1
  }
  // If month offset overshoots (shouldn't happen but guard anyway)
  const afterYearsAndMonths = new Date(Date.UTC(tempYear, afterYears.getUTCMonth() + months, bd))

  // Remaining days
  let days = ad - afterYearsAndMonths.getUTCDate()
  if (days < 0) {
    // go back one month to count days in prior month
    const prevMonth = new Date(Date.UTC(afterYearsAndMonths.getUTCFullYear(), afterYearsAndMonths.getUTCMonth(), 0))
    days += prevMonth.getUTCDate()
    months -= 1
    if (months < 0) {
      months += 12
      years -= 1
    }
  }

  // Total days and weeks
  const totalDays = Math.floor((asOf.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)

  // Next birthday
  let nextBirthday = new Date(Date.UTC(ay, bm, bd))
  if (nextBirthday <= asOf) {
    nextBirthday = new Date(Date.UTC(ay + 1, bm, bd))
  }
  const diffMs = nextBirthday.getTime() - asOf.getTime()
  const nextBirthdayDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  const finalNextBirthdayDays = (nextBirthdayDays === 365 || nextBirthdayDays === 366) ? 0 : nextBirthdayDays

  return { years, months, days, totalDays, totalWeeks, nextBirthdayDays: finalNextBirthdayDays }
}
