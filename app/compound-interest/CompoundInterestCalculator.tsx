'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

type Frequency = 'Daily' | 'Monthly' | 'Annually'
const freqMap: Record<Frequency, number> = { Daily: 365, Monthly: 12, Annually: 1 }

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Mortgage Calculator', href: '/mortgage' },
  { name: 'ROI Calculator', href: '/roi' },
]

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState<Frequency>('Monthly')
  const [contribution, setContribution] = useState('0')

  const [result, setResult] = useState<{ futureValue: number; totalInterest: number; totalContributions: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const P = parseFloat(principal) || 0
      const r = (parseFloat(rate) || 0) / 100
      const t = parseFloat(years) || 0
      const n = freqMap[freq]
      const pmt = parseFloat(contribution) || 0
      if (!P || !r || !t) return
      const fvPrincipal = P * Math.pow(1 + r / n, n * t)
      const fvContrib = pmt > 0
        ? pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
        : 0
      const futureValue = fvPrincipal + fvContrib
      const totalContributions = pmt * 12 * t
      setResult({ futureValue, totalInterest: futureValue - P - totalContributions, totalContributions })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [principal, rate, years, freq, contribution])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Principal" prefix="$" value={principal} onChange={setPrincipal} id="principal" />
          <FieldInput label="Annual Rate" suffix="%" value={rate} onChange={setRate} id="rate" />
          <FieldInput label="Time Period" suffix="years" value={years} onChange={setYears} id="years" />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Compounding &amp; contributions</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">Compounding Frequency</span>
                <SegmentedToggle options={['Daily', 'Monthly', 'Annually']} value={freq} onChange={v => setFreq(v as Frequency)} />
              </div>
              <FieldInput label="Monthly Contribution" prefix="$" suffix="/ mo" value={contribution} onChange={setContribution} id="contribution" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Future Value"
      value={fmt(result.futureValue)}
      subtitle={`after ${years} years`}
      rows={[
        { label: 'Principal', value: fmt(parseFloat(principal) || 0) },
        ...(result.totalContributions > 0 ? [{ label: 'Total Contributions', value: fmt(result.totalContributions) }] : []),
        { label: 'Total Interest Earned', value: fmt(result.totalInterest) },
      ]}
      bar={{
        pct: ((parseFloat(principal) || 0) / result.futureValue) * 100,
        left: 'Principal',
        right: 'Interest',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Compound Interest Calculator" description="Calculate future value with compounding interest and optional monthly contributions." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
