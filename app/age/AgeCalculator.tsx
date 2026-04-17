'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcAge, type AgeResult } from '@/lib/calculators/age'

const FAQS = [
  {
    q: 'How do I calculate my exact age in years, months, and days?',
    a: "Subtract your birth date from today's date. First count full years (checking if the birthday has passed this year), then count remaining full months, then remaining days. For example, if you were born on March 15, 1990, and today is April 18, 2025, you are 35 years, 1 month, and 3 days old.",
  },
  {
    q: 'How many days old am I?',
    a: 'Multiply your age in years by 365, then add the days for partial years — or use this calculator for an exact count. For example, a 30-year-old is approximately 10,950 days old. Exact figures account for leap years (there\'s a leap year every 4 years, with some exceptions).',
  },
  {
    q: 'When is the next leap year?',
    a: 'The next leap year occurs every 4 years. Years divisible by 4 are leap years, except for century years (1700, 1800, 1900) — unless divisible by 400 (2000 was a leap year). The next leap years are 2028, 2032, and 2036. Leap years add one extra day (Feb 29), making them 366 days.',
  },
  {
    q: 'How old is someone born in 1990?',
    a: 'Someone born in 1990 is 34–35 years old as of 2025, depending on whether their birthday has passed this year. Enter the exact birth date above for a precise answer in years, months, and days.',
  },
  {
    q: "How do I know how many weeks I've been alive?",
    a: 'Divide your total days lived by 7. At 30 years old, you\'ve lived approximately 10,950 days ÷ 7 = 1,564 weeks. This calculator shows your exact week count, accounting for all leap years in your lifetime.',
  },
]

const RELATED = [
  { name: 'Unit Converter', href: '/unit-converter' },
  { name: 'Tip Calculator', href: '/tip' },
]

function parseDate(str: string): Date {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export default function AgeCalculator() {
  const todayStr = new Date().toISOString().slice(0, 10)
  const [birthdate, setBirthdate] = useState('1990-01-01')
  const [asOf, setAsOf] = useState(todayStr)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [error, setError] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (!birthdate || !asOf) return
      const r = calcAge(parseDate(birthdate), parseDate(asOf))
      if (!r) {
        setError(true)
        setResult(null)
      } else {
        setError(false)
        setResult(r)
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [birthdate, asOf])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="birthdate" className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
              max={todayStr}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="asof" className="text-sm font-medium text-gray-700">Calculate age as of</label>
            <input
              id="asof"
              type="date"
              value={asOf}
              onChange={e => setAsOf(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Your Age"
      value={`${result.years} years`}
      subtitle={`${result.months} months, ${result.days} days`}
      rows={[
        { label: 'Total Days Lived', value: result.totalDays.toLocaleString() },
        { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
        { label: 'Next Birthday', value: result.nextBirthdayDays === 0 ? '🎂 Today!' : result.nextBirthdayDays + ' days away' },
      ]}
    />
  ) : error ? (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-sm text-red-500 font-medium">
      Birth date must be before the &ldquo;as of&rdquo; date.
    </div>
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Age Calculator" description="Calculate your exact age in years, months, and days. Find out how many days and weeks you've been alive." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
