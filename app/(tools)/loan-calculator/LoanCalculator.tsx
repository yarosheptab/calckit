'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcLoan, LoanResult } from '@/lib/calculators/loan'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'What is the monthly payment on a $10,000 loan?',
    a: 'At 7.5% interest over 3 years, the monthly payment on a $10,000 loan is approximately $311. Over 5 years at the same rate, it drops to $200/month but you pay more total interest ($2,000 vs $1,193).',
  },
  {
    q: 'How is a loan payment calculated?',
    a: 'Loan payments use the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Each payment covers interest for that period plus a portion of the principal.',
  },
  {
    q: 'What is a good interest rate for a personal loan?',
    a: 'As of 2025, average personal loan rates range from 11–25% APR for most borrowers. Excellent credit (720+) can get 7–12% APR. Below 10% is considered very good. Credit unions and online lenders often offer better rates than banks. Avoid rates above 30%, as these approach payday loan territory.',
  },
  {
    q: 'Is it better to take a shorter or longer loan term?',
    a: 'Shorter terms mean higher monthly payments but less total interest paid. For example, a $15,000 loan at 8%: over 3 years you pay ~$2,000 in interest; over 7 years, ~$4,600. Choose a shorter term if you can afford the payments. Only extend the term if cash flow is tight.',
  },
  {
    q: 'How much does a 1% difference in interest rate matter?',
    a: 'On a $20,000 loan over 5 years, going from 7% to 8% adds about $550 in total interest and raises monthly payments by ~$9. On larger amounts like $50,000, a 1% rate difference over 5 years costs ~$1,400 more. Rates matter more on longer terms and larger principals.',
  },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

const RELATED = [TOOL.mortgage, TOOL.debt, TOOL.savings, TOOL.percentage]

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('10000')
  const [annualRate, setAnnualRate] = useState('7.5')
  const [termUnit, setTermUnit] = useState('Years')
  const [term, setTerm] = useState('3')

  const [result, setResult] = useState<LoanResult | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const termMonths = termUnit === 'Years'
        ? (parseFloat(term) || 0) * 12
        : (parseFloat(term) || 0)
      const result = calcLoan(
        parseFloat(loanAmount) || 0,
        parseFloat(annualRate) || 0,
        termMonths
      )
      setResult(result)
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [loanAmount, annualRate, term, termUnit])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Loan details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Loan Amount" prefix="$" value={loanAmount} onChange={setLoanAmount} id="loanAmount" />
          <FieldInput label="Annual Interest Rate" suffix="%" value={annualRate} onChange={setAnnualRate} id="annualRate" />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Loan Term</span>
            <SegmentedToggle options={['Years', 'Months']} value={termUnit} onChange={setTermUnit} />
            <FieldInput label="" value={term} onChange={setTerm} id="term" suffix={termUnit.toLowerCase()} />
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Monthly Payment"
      value={fmt(result.monthlyPayment)}
      subtitle={`${term} ${termUnit.toLowerCase()} at ${annualRate}%`}
      rows={[
        { label: 'Principal', value: fmt(result.principal) },
        { label: 'Total Interest', value: fmt(result.totalInterest) },
        { label: 'Total Payment', value: fmt(result.totalPayment) },
      ]}
      bar={{ pct: (result.principal / result.totalPayment) * 100, left: 'Principal', right: 'Interest' }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Loan Calculator" description="Calculate monthly loan payments and total interest for any personal, auto, or student loan." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
