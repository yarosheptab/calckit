'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'

type FilingStatus = 'single' | 'married'

const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 14600, married: 29200 }

const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [
    [0.10, 11600], [0.12, 47150], [0.22, 100525],
    [0.24, 191950], [0.32, 243725], [0.35, 609350], [0.37, Infinity],
  ],
  married: [
    [0.10, 23200], [0.12, 94300], [0.22, 201050],
    [0.24, 383900], [0.32, 487450], [0.35, 731200], [0.37, Infinity],
  ],
}

function calcFederalTax(taxable: number, status: FilingStatus): number {
  let tax = 0
  let prev = 0
  for (const [rate, upTo] of BRACKETS[status]) {
    if (taxable <= prev) break
    const chunk = Math.min(taxable, upTo) - prev
    tax += chunk * rate
    prev = upTo
    if (upTo === Infinity) break
  }
  return Math.max(0, tax)
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Mortgage Calculator', href: '/mortgage' },
  { name: 'ROI Calculator', href: '/roi' },
  { name: 'Tip Calculator', href: '/tip' },
]

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
      const gross = parseFloat(salary) || 0
      if (!gross) return
      const deduction = STANDARD_DEDUCTION[status]
      const taxable = Math.max(0, gross - deduction)
      const federalTax = calcFederalTax(taxable, status)
      const effectiveRate = (federalTax / gross) * 100
      const takeHomeAnnual = gross - federalTax
      setResult({ federalTax, effectiveRate, takeHomeAnnual, takeHomeMonthly: takeHomeAnnual / 12 })
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
    </div>
  )
}
