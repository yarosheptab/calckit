'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcTax, type FilingStatus as TaxFilingStatus } from '@/lib/calculators/tax'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'What are the 2024 US federal income tax brackets?',
    a: 'For single filers: 10% up to $11,600; 12% up to $47,150; 22% up to $100,525; 24% up to $191,950; 32% up to $243,725; 35% up to $609,350; 37% above. For married filing jointly, thresholds are roughly double. These are marginal rates — each bracket only applies to the income within that range.',
  },
  {
    q: 'What is the standard deduction for 2024?',
    a: 'The 2024 standard deduction is $14,600 for single filers and $29,200 for married filing jointly. This amount is subtracted from your gross income before calculating tax. Most taxpayers take the standard deduction rather than itemizing because it\'s simpler and usually larger.',
  },
  {
    q: 'What is the difference between effective and marginal tax rate?',
    a: 'Your marginal tax rate is the rate applied to your last dollar of income — your top bracket. Your effective tax rate is total tax paid ÷ gross income — always lower because income in lower brackets is taxed at lower rates. On a $75,000 salary (single), the marginal rate is 22% but the effective rate is approximately 13.3%.',
  },
  {
    q: 'Does this calculator include Social Security and Medicare taxes?',
    a: 'No — this calculator estimates federal income tax only. FICA taxes (Social Security at 6.2% up to $168,600, and Medicare at 1.45% on all wages) are separate and not included here. State income taxes also vary from 0% (Texas, Florida) to over 13% (California). Your total tax burden is higher than the federal estimate shown.',
  },
  {
    q: 'What is the marriage tax penalty?',
    a: 'A marriage tax penalty occurs when two earners filing jointly pay more total tax than they would as two singles. This typically happens when both partners earn similar incomes and are pushed into higher combined brackets. The opposite — a marriage bonus — happens when one partner earns significantly more, as the lower-income partner\'s earnings are partially sheltered by the other\'s lower bracket space.',
  },
]

type FilingStatus = TaxFilingStatus

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [TOOL.salary, TOOL.savings, TOOL.inflation]

export default function TaxPage() {
  const [salary, setSalary] = useState('75000')
  const [status, setStatus] = useState<FilingStatus>('single')

  const [result, setResult] = useState<{
    federalTax: number; effectiveRate: number; takeHomeAnnual: number; takeHomeMonthly: number
  } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const result = calcTax(parseFloat(salary) || 0, status)
      if (!result) return
      setResult(result)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [salary, status])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Annual Income" prefix="$" value={salary} onChange={setSalary} id="salary" />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Filing Status</span>
            <SegmentedToggle
              options={['single', 'married']}
              value={status}
              onChange={v => setStatus(v as FilingStatus)}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed px-1">
        Estimate only — uses 2024 federal standard deduction and brackets. Does not include state tax, FICA, or credits.
      </p>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Federal Tax"
      value={fmt(result.federalTax)}
      subtitle={`effective rate ${result.effectiveRate.toFixed(1)}%`}
      rows={[
        { label: 'Take-Home (Annual)', value: fmt(result.takeHomeAnnual) },
        { label: 'Take-Home (Monthly)', value: fmt(result.takeHomeMonthly) },
        { label: 'Effective Rate', value: result.effectiveRate.toFixed(2) + '%' },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your income to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Tax Estimator" description="Estimate your US federal income tax using 2024 brackets and standard deduction." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
