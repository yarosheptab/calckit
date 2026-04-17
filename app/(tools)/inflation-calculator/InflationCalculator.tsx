'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcInflation, calcImpliedInflation } from '@/lib/calculators/inflation'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'What is inflation?',
    a: 'Inflation is the rate at which the general price level of goods and services rises over time, reducing purchasing power. At 3% annual inflation, $100 today buys what $97 bought last year. The US Federal Reserve targets 2% annual inflation. Measured by the Consumer Price Index (CPI), US inflation averaged about 3.1% per year from 1914 to 2024.',
  },
  {
    q: 'How much is $1,000 in 2000 worth today?',
    a: 'At the US historical average of ~2.7% inflation, $1,000 in 2000 is worth approximately $1,890 in 2025. In other words, you\'d need $1,890 today to have the same purchasing power as $1,000 in 2000 — a 89% cumulative increase over 25 years.',
  },
  {
    q: 'What was the inflation rate in 2022?',
    a: 'US inflation peaked at 9.1% in June 2022 — the highest since 1981. This was driven by pandemic supply chain disruptions, stimulus spending, and the 2022 energy crisis following the Ukraine invasion. By 2024, inflation had moderated to around 3.5%, still above the Fed\'s 2% target.',
  },
  {
    q: 'How does inflation affect savings?',
    a: 'At 3% inflation, money in a 0% savings account loses 3% of its purchasing power each year. $100,000 becomes worth only $73,700 in real terms after 10 years at 3% inflation. This is why keeping large amounts in a checking account erodes wealth — high-yield savings or investments are needed to outpace inflation.',
  },
  {
    q: 'What is the real interest rate?',
    a: 'The real interest rate = nominal rate − inflation rate. If your savings account pays 5% but inflation is 3%, your real return is only 2%. If your loan charges 7% but inflation is 4%, your real cost is 3%. The real rate matters more than the nominal rate for financial planning. Use the ROI Calculator on CalcKit to model real vs nominal returns.',
  },
]

const MODES = ['Adjust for Inflation', 'Find Rate']
const RELATED = [TOOL.compoundInterest, TOOL.roi, TOOL.savings, TOOL.currency]

function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const CURRENT_YEAR = new Date().getFullYear().toString()

export default function InflationCalculator() {
  const [mode, setMode] = useState(MODES[0])

  // Mode A state
  const [amount, setAmount] = useState('1000')
  const [fromYear, setFromYear] = useState('2000')
  const [toYear, setToYear] = useState(CURRENT_YEAR)
  const [rate, setRate] = useState('3.0')

  // Mode B state
  const [startPrice, setStartPrice] = useState('50')
  const [endPrice, setEndPrice] = useState('75')
  const [years, setYears] = useState('20')

  const [resultA, setResultA] = useState<ReturnType<typeof calcInflation>>(null)
  const [resultB, setResultB] = useState<number | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === MODES[0]) {
        setResultA(
          calcInflation(
            parseFloat(amount) || 0,
            parseInt(fromYear) || 0,
            parseInt(toYear) || 0,
            parseFloat(rate) || 0,
          ),
        )
      } else {
        setResultB(
          calcImpliedInflation(
            parseFloat(startPrice) || 0,
            parseFloat(endPrice) || 0,
            parseFloat(years) || 0,
          ),
        )
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, amount, fromYear, toYear, rate, startPrice, endPrice, years])

  const emptyState = (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  let inputPanel: React.ReactNode
  let resultPanel: React.ReactNode

  if (mode === MODES[0]) {
    inputPanel = (
      <>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 pt-5 pb-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Mode</span>
              <SegmentedToggle options={MODES} value={mode} onChange={setMode} />
            </div>
            <FieldInput label="Amount" prefix="$" value={amount} onChange={setAmount} id="amount" />
            <FieldInput
              label="From Year"
              value={fromYear}
              onChange={setFromYear}
              id="fromYear"
              type="number"
              min="1900"
              max="2100"
              step="1"
            />
            <FieldInput
              label="To Year"
              value={toYear}
              onChange={setToYear}
              id="toYear"
              type="number"
              min="1900"
              max="2100"
              step="1"
            />
            <FieldInput label="Annual Inflation Rate" suffix="%" value={rate} onChange={setRate} id="rate" />
          </div>
        </div>
        <RelatedTools tools={RELATED} />
      </>
    )

    const amountNum = parseFloat(amount) || 0
    const fromYearNum = parseInt(fromYear) || 0
    const toYearNum = parseInt(toYear) || 0

    resultPanel = resultA ? (
      <ResultPanel
        label="Equivalent Value"
        value={fmtUSD(resultA.adjustedAmount)}
        subtitle={`$${amountNum} in ${fromYearNum} = $${resultA.adjustedAmount.toFixed(0)} in ${toYearNum}`}
        rows={[
          { label: 'Total Inflation', value: resultA.totalInflation.toFixed(1) + '%' },
          { label: 'Annual Rate', value: resultA.annualRate.toFixed(1) + '%/yr' },
          { label: 'Purchasing Power Lost', value: resultA.purchasingPowerLost.toFixed(1) + '%' },
        ]}
      />
    ) : emptyState
  } else {
    const startNum = parseFloat(startPrice) || 0
    const endNum = parseFloat(endPrice) || 0
    const yearsNum = parseFloat(years) || 0
    const totalChange = startNum > 0 ? (((endNum - startNum) / startNum) * 100).toFixed(1) + '%' : '—'

    inputPanel = (
      <>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 pt-5 pb-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Mode</span>
              <SegmentedToggle options={MODES} value={mode} onChange={setMode} />
            </div>
            <FieldInput label="Price in Start Year" prefix="$" value={startPrice} onChange={setStartPrice} id="startPrice" />
            <FieldInput label="Price Today" prefix="$" value={endPrice} onChange={setEndPrice} id="endPrice" />
            <FieldInput label="Number of Years" suffix="years" value={years} onChange={setYears} id="years" />
          </div>
        </div>
        <RelatedTools tools={RELATED} />
      </>
    )

    resultPanel = resultB !== null ? (
      <ResultPanel
        label="Annual Inflation Rate"
        value={resultB.toFixed(2) + '%'}
        subtitle="implied average annual rate"
        rows={[
          { label: 'Total Change', value: totalChange },
          { label: 'Over', value: yearsNum + ' years' },
        ]}
      />
    ) : emptyState
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader
        title="Inflation Calculator"
        description="Calculate the inflation-adjusted value of money over time, or find the implied inflation rate between two prices."
      />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
