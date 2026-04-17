'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcSalary, SalaryResult } from '@/lib/calculators/salary'

const PERIOD_OPTIONS = ['Hourly', 'Daily', 'Weekly', 'Biweekly', 'Monthly', 'Annual']

type Period = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'

const PERIOD_LABELS: Record<string, string> = {
  Hourly: 'Hourly Rate',
  Daily: 'Daily Rate',
  Weekly: 'Weekly Salary',
  Biweekly: 'Bi-Weekly Salary',
  Monthly: 'Monthly Salary',
  Annual: 'Annual Salary',
}

const FAQS = [
  {
    q: 'How do I convert salary to hourly rate?',
    a: 'Divide your annual salary by 2,080 (52 weeks × 40 hours). A $75,000 salary = $75,000 ÷ 2,080 = $36.06/hour. For a different schedule, multiply your weekly hours by 52 to get total annual hours, then divide. This calculator adjusts for custom hours/day and days/week automatically.',
  },
  {
    q: 'What is $20 an hour annually?',
    a: '$20/hour × 40 hours/week × 52 weeks = $41,600/year. At 35 hours/week it\'s $36,400/year. These figures are pre-tax — your take-home depends on federal, state, and local taxes. Use the Tax Estimator on CalcKit to see after-tax income.',
  },
  {
    q: 'What salary is $25 an hour?',
    a: '$25/hour working full-time (40 hrs/week, 52 weeks) = $52,000/year. Monthly that\'s ~$4,333. Weekly: $1,000. As of 2025, $25/hour is above the US median hourly wage of about $23, placing you in the upper-middle of earners.',
  },
  {
    q: 'What is $100,000 a year hourly?',
    a: '$100,000 ÷ 2,080 hours = $48.08/hour. Daily (8 hrs): $384.62. Weekly: $1,923. Bi-weekly paycheck: $3,846 gross. After taxes, a $100k salary in most US states results in approximately $65,000–$72,000 take-home pay annually.',
  },
  {
    q: 'How many work hours are in a year?',
    a: 'A standard full-time year has 2,080 hours (52 weeks × 40 hrs). Accounting for 10 federal holidays: ~2,000 hours. With 2 weeks of vacation: ~1,960 hours. This calculator uses customizable hours/day and days/week so you can set the exact schedule that applies to you.',
  },
]

const RELATED = [
  { name: 'Tax Estimator', href: '/tax' },
  { name: 'Tip Calculator', href: '/tip' },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function SalaryCalculator() {
  const [amount, setAmount] = useState('75000')
  const [period, setPeriod] = useState('Annual')
  const [hoursPerDay, setHoursPerDay] = useState('8')
  const [daysPerWeek, setDaysPerWeek] = useState('5')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const r = calcSalary(
        parseFloat(amount) || 0,
        period.toLowerCase() as Period,
        parseFloat(hoursPerDay) || 0,
        parseFloat(daysPerWeek) || 0,
      )
      setResult(r)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [amount, period, hoursPerDay, daysPerWeek])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput
            label={PERIOD_LABELS[period] ?? 'Amount'}
            prefix="$"
            value={amount}
            onChange={setAmount}
            id="amount"
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Pay Period</span>
            <SegmentedToggle options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
          </div>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Work Schedule</span>
            <FieldInput
              label="Hours per Day"
              suffix="hrs"
              value={hoursPerDay}
              onChange={setHoursPerDay}
              id="hoursPerDay"
            />
            <FieldInput
              label="Days per Week"
              suffix="days"
              value={daysPerWeek}
              onChange={setDaysPerWeek}
              id="daysPerWeek"
            />
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Salary Breakdown"
      value={'$' + result.hourly.toFixed(2) + '/hr'}
      subtitle={`Annual: ${fmt(result.annual)}`}
      rows={[
        { label: 'Hourly', value: '$' + result.hourly.toFixed(2) },
        { label: 'Daily', value: fmt(result.daily) },
        { label: 'Weekly', value: fmt(result.weekly) },
        { label: 'Bi-Weekly', value: fmt(result.biweekly) },
        { label: 'Monthly', value: fmt(result.monthly) },
        { label: 'Annual', value: fmt(result.annual) },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader
        title="Salary to Hourly Calculator"
        description="Convert salary to hourly rate or any pay period instantly."
      />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
