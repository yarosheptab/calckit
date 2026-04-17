'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcDateDiff, calcDateAdd, parseUTCDate } from '@/lib/calculators/date'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'How many days between two dates?',
    a: 'Subtract the earlier date from the later date. The difference in milliseconds divided by 86,400,000 (ms per day) gives you the exact number of days. For example, from January 1 to December 31 is 364 days in a non-leap year. This calculator handles all the math including leap years automatically.',
  },
  {
    q: 'How many days until [a future date]?',
    a: "Use the 'Days Between' mode: set Start Date to today and End Date to your target date. For example, days until December 25, 2026: enter today's date and December 25, 2026 — the calculator shows the exact count. It also shows weeks, months, and approximate workdays.",
  },
  {
    q: 'What date is 90 days from today?',
    a: "Use the 'Add / Subtract' mode: enter today's date and type 90 in the days field. For example, 90 days from April 18, 2026 is July 17, 2026. This is commonly used for contract deadlines, return windows, and project timelines.",
  },
  {
    q: 'How many workdays between two dates?',
    a: 'Divide the total days by 7 and multiply by 5 to get approximate business days. For exact results accounting for holidays, use a dedicated business day calculator. This calculator provides a close approximation: 30 days ≈ 21 workdays, 90 days ≈ 64 workdays.',
  },
  {
    q: 'What day of the week is a specific date?',
    a: "Use the 'Add / Subtract' mode: enter the date and add 0 days — the result shows the day of the week. Alternatively, use Zeller's congruence formula or rely on the JavaScript Date API. For example, July 4, 2026 falls on a Saturday.",
  },
]

const MODES = ['Days Between', 'Add / Subtract']
const RELATED = [TOOL.age, TOOL.percentage]

function todayStr(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function firstOfMonthStr(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}-01`
}

function fmtDateRange(start: string, end: string): string {
  const s = parseUTCDate(start)
  const e = parseUTCDate(end)
  if (!s || !e) return ''
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' }
  const optsWithYear: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
  const startStr = s.toLocaleDateString('en-US', opts)
  const endStr = e.toLocaleDateString('en-US', optsWithYear)
  return `${startStr} → ${endStr}`
}

const dateInputClass =
  'h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 cursor-pointer w-full'

export default function DateCalculator() {
  const [mode, setMode] = useState(MODES[0])

  // Mode A state
  const [startDate, setStartDate] = useState(firstOfMonthStr())
  const [endDate, setEndDate] = useState(todayStr())

  // Mode B state
  const [baseDate, setBaseDate] = useState(todayStr())
  const [daysToAdd, setDaysToAdd] = useState('30')

  const [diffResult, setDiffResult] = useState<ReturnType<typeof calcDateDiff>>(null)
  const [addResult, setAddResult] = useState<ReturnType<typeof calcDateAdd>>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === MODES[0]) {
        const s = parseUTCDate(startDate)
        const e = parseUTCDate(endDate)
        if (s && e) setDiffResult(calcDateDiff(s, e))
      } else {
        const b = parseUTCDate(baseDate)
        const days = parseInt(daysToAdd) || 0
        if (b) setAddResult(calcDateAdd(b, days))
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, startDate, endDate, baseDate, daysToAdd])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Date Calculator</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Mode</span>
            <SegmentedToggle options={MODES} value={mode} onChange={setMode} />
          </div>

          {mode === MODES[0] ? (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className={dateInputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className={dateInputClass}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={e => setBaseDate(e.target.value)}
                  className={dateInputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldInput
                  label="Days to Add"
                  value={daysToAdd}
                  onChange={setDaysToAdd}
                  suffix="days"
                  id="daysToAdd"
                  type="number"
                />
                <p className="text-xs text-gray-400 mt-0.5">Use negative number to subtract days</p>
              </div>
            </>
          )}
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = (() => {
    if (mode === MODES[0]) {
      if (!diffResult) {
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
            Enter valid dates to see the result.
          </div>
        )
      }
      return (
        <ResultPanel
          label="Days Between"
          value={diffResult.days.toLocaleString() + ' days'}
          subtitle={fmtDateRange(startDate, endDate)}
          rows={[
            { label: 'Weeks', value: diffResult.weeks.toLocaleString() },
            { label: 'Months (approx)', value: diffResult.months.toFixed(1) },
            { label: 'Years (approx)', value: diffResult.years.toFixed(2) },
            { label: 'Workdays (approx)', value: diffResult.workdays.toLocaleString() },
          ]}
        />
      )
    } else {
      if (!addResult) {
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
            Enter a valid date to see the result.
          </div>
        )
      }
      const formattedDate = new Date(addResult.resultDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
      return (
        <ResultPanel
          label="Result Date"
          value={formattedDate}
          subtitle={addResult.dayOfWeek}
          rows={[
            { label: 'Date (ISO)', value: addResult.resultDateStr },
            {
              label: 'Days Added',
              value: addResult.daysAdded > 0 ? '+' + addResult.daysAdded : String(addResult.daysAdded),
            },
          ]}
        />
      )
    }
  })()

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader
        title="Date Calculator"
        description="Calculate the number of days between two dates, or add and subtract days from a date."
      />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
