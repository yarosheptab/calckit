export interface DateDiffResult {
  days: number
  weeks: number
  months: number
  years: number
  workdays: number
}

export interface DateAddResult {
  resultDate: Date
  resultDateStr: string
  dayOfWeek: string
  daysAdded: number
}

export function parseUTCDate(str: string): Date | null {
  if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null
  const [y, m, d] = str.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  if (isNaN(date.getTime())) return null
  return date
}

export function calcDateDiff(startDate: Date, endDate: Date): DateDiffResult | null {
  if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null
  const days = Math.abs(Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
  return {
    days,
    weeks: Math.floor(days / 7),
    months: days / 30.4375,
    years: days / 365.25,
    workdays: Math.round(days * 5 / 7),
  }
}

export function calcDateAdd(baseDate: Date, days: number): DateAddResult | null {
  if (!baseDate || isNaN(baseDate.getTime())) return null
  const resultDate = new Date(baseDate.getTime() + days * 86400000)
  const y = resultDate.getUTCFullYear()
  const m = String(resultDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(resultDate.getUTCDate()).padStart(2, '0')
  const resultDateStr = `${y}-${m}-${day}`
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][resultDate.getUTCDay()]
  return { resultDate, resultDateStr, dayOfWeek, daysAdded: days }
}
