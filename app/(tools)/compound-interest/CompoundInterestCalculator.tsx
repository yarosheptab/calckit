'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcCompound, type CompoundFrequency } from '@/lib/calculators/compound'

const FAQS = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest earned on both your original principal and the interest already accumulated. Unlike simple interest (earned only on the principal), compound interest grows exponentially — each period\'s interest becomes part of the base for the next period\'s calculation.',
  },
  {
    q: 'What is the compound interest formula?',
    a: 'FV = P × (1 + r/n)^(n×t), where P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year (12 for monthly, 365 for daily), and t is the time in years. The result is the future value including all compounded interest.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'The Rule of 72 is a shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 6%, money doubles in roughly 72 ÷ 6 = 12 years. At 9%, it doubles in 8 years. This works because of how compound growth curves behave.',
  },
  {
    q: 'Does compounding frequency matter?',
    a: 'Yes, but the difference diminishes at higher frequencies. Moving from annual to monthly compounding on $10,000 at 7% over 10 years increases your return by about $300. Moving from monthly to daily adds only ~$10 more. The biggest jump is from simple to any compounding.',
  },
  {
    q: 'How do regular contributions affect compound growth?',
    a: 'Regular contributions dramatically accelerate growth. Adding $200/month to a $10,000 principal at 7% for 20 years yields ~$208,000 — compared to ~$38,700 with no contributions. This is why consistent investing early, even in small amounts, produces outsized long-term results.',
  },
]

type Frequency = CompoundFrequency

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
      const result = calcCompound({
        principal: parseFloat(principal) || 0,
        annualRate: parseFloat(rate) || 0,
        years: parseFloat(years) || 0,
        freq,
        monthlyContribution: parseFloat(contribution) || 0,
      })
      if (!result) return
      setResult(result)
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
      <FaqSection items={FAQS} />
    </div>
  )
}
