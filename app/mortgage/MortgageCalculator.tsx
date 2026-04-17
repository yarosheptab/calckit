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

const FAQS = [
  {
    q: 'What is the monthly payment on a $400,000 mortgage?',
    a: 'At 6.5% interest over 30 years with a 20% down payment ($80,000), your loan is $320,000 and the monthly principal & interest payment is approximately $2,023. Property taxes, insurance, and PMI will increase your total monthly cost.',
  },
  {
    q: 'How is a mortgage payment calculated?',
    a: 'The formula is M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). This gives the fixed monthly principal + interest payment.',
  },
  {
    q: 'How much house can I afford?',
    a: 'A common guideline is the 28/36 rule: your monthly mortgage payment should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. For a $100,000 annual salary, that means a mortgage payment under ~$2,333/month.',
  },
  {
    q: 'What is the difference between interest rate and APR?',
    a: 'The interest rate is the base cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus lender fees, points, and mortgage insurance — making it a more complete measure of the loan\'s true annual cost. APR is always equal to or higher than the interest rate.',
  },
  {
    q: 'How much of my mortgage payment goes to interest vs principal?',
    a: 'In the early years, most of your payment goes to interest. On a 30-year $300,000 loan at 6.5%, your first payment splits roughly $1,625 to interest and $271 to principal. Over time this flips: by year 25, most of each payment is principal. The amortization schedule shows this breakdown month by month.',
  },
]

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
      <FaqSection items={FAQS} />
    </div>
  )
}
