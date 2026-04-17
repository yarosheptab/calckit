'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'ROI Calculator', href: '/roi' },
  { name: 'Tax Estimator', href: '/tax' },
]

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downPayment, setDownPayment] = useState('20')
  const [downMode, setDownMode] = useState('%')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [termMode, setTermMode] = useState('yr')
  // Advanced
  const [propTax, setPropTax] = useState('1.2')
  const [hoa, setHoa] = useState('0')
  const [insurance, setInsurance] = useState('1200')
  const [pmi, setPmi] = useState('0.5')

  const [result, setResult] = useState<{
    monthly: number; principal: number; totalInterest: number; totalCost: number
    withExtras: number
  } | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const price = parseFloat(homePrice) || 0
      const dp = downMode === '%'
        ? price * (parseFloat(downPayment) || 0) / 100
        : parseFloat(downPayment) || 0
      const P = price - dp
      const annualRate = (parseFloat(rate) || 0) / 100
      const r = annualRate / 12
      const termMonths = termMode === 'yr'
        ? (parseFloat(term) || 0) * 12
        : parseFloat(term) || 0
      if (P <= 0 || r <= 0 || termMonths <= 0) return
      const monthly = (P * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)
      const totalCost = monthly * termMonths
      const totalInterest = totalCost - P
      const monthlyExtras =
        (price * (parseFloat(propTax) || 0)) / 100 / 12 +
        (parseFloat(hoa) || 0) +
        (parseFloat(insurance) || 0) / 12 +
        (P * (parseFloat(pmi) || 0)) / 100 / 12
      setResult({ monthly, principal: P, totalInterest, totalCost, withExtras: monthly + monthlyExtras })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [homePrice, downPayment, downMode, rate, term, termMode, propTax, hoa, insurance, pmi])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Home Price" prefix="$" value={homePrice} onChange={setHomePrice} id="homePrice" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Down Payment</span>
              <SegmentedToggle options={['%', '$']} value={downMode} onChange={setDownMode} />
            </div>
            <FieldInput
              label=""
              prefix={downMode === '$' ? '$' : undefined}
              suffix={downMode === '%' ? '%' : undefined}
              value={downPayment}
              onChange={setDownPayment}
              id="downPayment"
            />
          </div>
          <FieldInput
            label="Interest Rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            id="rate"
            tooltip="Annual percentage rate (APR) on the loan"
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Loan Term</span>
              <SegmentedToggle options={['yr', 'mo']} value={termMode} onChange={setTermMode} />
            </div>
            <FieldInput
              label=""
              suffix={termMode}
              value={term}
              onChange={setTerm}
              id="term"
            />
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Add taxes, insurance &amp; PMI</AccordionTrigger>
            <AccordionContent>
              <FieldInput label="Property Tax" suffix="% / yr" value={propTax} onChange={setPropTax} id="propTax" tooltip="Annual property tax as a percentage of home value" />
              <FieldInput label="HOA Fee" prefix="$" suffix="/ mo" value={hoa} onChange={setHoa} id="hoa" />
              <FieldInput label="Home Insurance" prefix="$" suffix="/ yr" value={insurance} onChange={setInsurance} id="insurance" />
              <FieldInput label="PMI" suffix="%" value={pmi} onChange={setPmi} id="pmi" tooltip="Private mortgage insurance — typically required when down payment is below 20%" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Monthly Payment"
      value={fmt(result.monthly)}
      subtitle={result.withExtras > result.monthly ? `${fmt(result.withExtras)} with taxes & insurance` : `for ${termMode === 'yr' ? parseFloat(term) * 12 : parseFloat(term)} months`}
      rows={[
        { label: 'Loan Amount', value: fmt(result.principal) },
        { label: 'Total Interest', value: fmt(result.totalInterest) },
        { label: 'Total Cost', value: fmt(result.totalCost) },
      ]}
      bar={{
        pct: (result.principal / result.totalCost) * 100,
        left: 'Principal ' + ((result.principal / result.totalCost) * 100).toFixed(0) + '%',
        right: 'Interest ' + ((result.totalInterest / result.totalCost) * 100).toFixed(0) + '%',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Mortgage Calculator" description="Estimate your monthly payment, total interest, and true cost of your loan." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
