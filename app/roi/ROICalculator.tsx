'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'

const FAQS = [
  {
    q: 'What is ROI and how is it calculated?',
    a: 'ROI (Return on Investment) measures profit relative to cost. The formula is: ROI = ((Final Value − Initial Investment) / Initial Investment) × 100. For example, investing $10,000 that grows to $14,500 gives an ROI of 45%.',
  },
  {
    q: 'What is a good ROI?',
    a: 'It depends on asset class and risk. The S&P 500 has historically returned 7–10% annually (inflation-adjusted). Real estate typically yields 8–12%. A business investment might target 15–30%. Always compare ROI against the risk taken and opportunity cost of alternatives.',
  },
  {
    q: 'What is the difference between ROI and annualized return?',
    a: 'ROI is the total percentage gain over the entire holding period. Annualized return converts that to a consistent per-year rate using: (1 + ROI/100)^(1/years) − 1. For example, a 50% ROI over 4 years equals an annualized return of about 10.67% per year.',
  },
  {
    q: 'How do I calculate ROI on a rental property?',
    a: 'For real estate, ROI = (Annual Rental Income − Annual Costs) / Total Investment × 100. Include mortgage payments, taxes, insurance, maintenance, and vacancy in your costs. A common benchmark is 8–12% cash-on-cash return for a good rental investment.',
  },
  {
    q: 'Does ROI account for inflation?',
    a: 'Standard ROI does not adjust for inflation. To calculate real (inflation-adjusted) ROI: Real ROI = ((1 + Nominal ROI) / (1 + Inflation Rate)) − 1. With a 10% nominal ROI and 3% inflation, your real ROI is approximately 6.8%.',
  },
]

function pct(n: number) { return n.toFixed(2) + '%' }
function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'Mortgage Calculator', href: '/mortgage' },
]

export default function ROIPage() {
  const [initial, setInitial] = useState('10000')
  const [finalVal, setFinalVal] = useState('15000')
  const [years, setYears] = useState('3')

  const [result, setResult] = useState<{ roi: number; annualized: number; netProfit: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const I = parseFloat(initial) || 0
      const F = parseFloat(finalVal) || 0
      const t = parseFloat(years) || 0
      if (!I || !F) return
      const roi = ((F - I) / I) * 100
      const annualized = t > 0 ? (Math.pow(F / I, 1 / t) - 1) * 100 : roi
      setResult({ roi, annualized, netProfit: F - I })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [initial, finalVal, years])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Initial Investment" prefix="$" value={initial} onChange={setInitial} id="initial" />
          <FieldInput label="Final Value" prefix="$" value={finalVal} onChange={setFinalVal} id="finalVal" />
          <FieldInput label="Time Period" suffix="years" value={years} onChange={setYears} id="years" />
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="ROI"
      value={pct(result.roi)}
      subtitle={`over ${years} years`}
      rows={[
        { label: 'Annualized Return', value: pct(result.annualized) },
        { label: 'Net Profit', value: fmt(result.netProfit) },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="ROI Calculator" description="Calculate return on investment, annualized return, and net profit." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
