'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcDebtPayoff, calcRequiredPayment } from '@/lib/calculators/debt'

const FAQS = [
  {
    q: 'What is the debt avalanche method?',
    a: 'The debt avalanche method prioritizes paying off debts with the highest interest rate first while making minimum payments on others. This minimizes total interest paid. For example, if you have a 24% credit card and a 12% car loan, attack the credit card first. You save more money with avalanche vs. snowball, but the snowball may feel more motivating.',
  },
  {
    q: 'What is the debt snowball method?',
    a: 'The debt snowball method pays off the smallest balance first, regardless of interest rate, to gain psychological momentum. Once the smallest debt is paid, roll that payment into the next. Dave Ramsey popularized this. Research shows some people stick with it better than avalanche, even though you pay more total interest.',
  },
  {
    q: 'How long does it take to pay off $5,000 in credit card debt?',
    a: 'At 20% APR with a $150/month payment, it takes about 42 months (3.5 years) and $1,263 in interest. Increasing to $200/month cuts it to 29 months and $785 in interest — saving $478. Doubling your minimum payment dramatically shortens payoff time.',
  },
  {
    q: 'What is the minimum payment on a credit card?',
    a: 'Most cards set minimums at 1–2% of balance or $25, whichever is greater. On a $5,000 balance at 20% APR, the minimum is roughly $100–125/month. At this rate, it takes over 10 years and $6,000+ in interest to pay off. Always pay more than the minimum.',
  },
  {
    q: 'How does credit card interest work?',
    a: 'Credit cards use daily periodic rate (APR ÷ 365). On a $5,000 balance at 20% APR: daily rate = 0.0548%. Daily interest = $2.74. Monthly ≈ $83. That\'s why minimum payments barely reduce the balance — most of the payment goes to interest, not principal.',
  },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

function formatMonths(months: number): string {
  if (months >= 12) {
    const years = Math.floor(months / 12)
    const mo = months % 12
    return mo > 0 ? `${years}y ${mo}m` : `${years}y`
  }
  return `${months} months`
}

function addMonths(date: Date, months: number): string {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const MODES = ['Payoff Timeline', 'Required Payment']
const RELATED = [
  { name: 'Loan Calculator', href: '/loan' },
  { name: 'Mortgage Calculator', href: '/mortgage' },
]

export default function DebtCalculator() {
  const [mode, setMode] = useState('Payoff Timeline')

  // Mode A fields
  const [balance, setBalance] = useState('5000')
  const [rate, setRate] = useState('19.99')
  const [payment, setPayment] = useState('150')

  // Mode B fields
  const [balanceB, setBalanceB] = useState('5000')
  const [rateB, setRateB] = useState('19.99')
  const [targetMonths, setTargetMonths] = useState('24')

  type ResultA = { monthsToPayoff: number; totalInterestPaid: number; totalPaid: number } | null
  type ResultB = number | null

  const [resultA, setResultA] = useState<ResultA>(null)
  const [resultB, setResultB] = useState<ResultB>(null)
  const [paymentTooLow, setPaymentTooLow] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === 'Payoff Timeline') {
        const r = calcDebtPayoff(
          parseFloat(balance) || 0,
          parseFloat(rate) || 0,
          parseFloat(payment) || 0
        )
        if (r === null && parseFloat(balance) > 0 && parseFloat(payment) > 0) {
          setPaymentTooLow(true)
          setResultA(null)
        } else {
          setPaymentTooLow(false)
          setResultA(r)
        }
      } else {
        const r = calcRequiredPayment(
          parseFloat(balanceB) || 0,
          parseFloat(rateB) || 0,
          parseInt(targetMonths) || 0
        )
        setResultB(r)
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, balance, rate, payment, balanceB, rateB, targetMonths])

  const modeToggle = (
    <div className="mb-4">
      <SegmentedToggle options={MODES} value={mode} onChange={setMode} />
    </div>
  )

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {modeToggle}
          {mode === 'Payoff Timeline' ? (
            <>
              <FieldInput label="Current Balance" prefix="$" value={balance} onChange={setBalance} id="balance" />
              <FieldInput label="Interest Rate" suffix="% APR" value={rate} onChange={setRate} id="rate" />
              <FieldInput label="Monthly Payment" prefix="$" value={payment} onChange={setPayment} id="payment" />
            </>
          ) : (
            <>
              <FieldInput label="Current Balance" prefix="$" value={balanceB} onChange={setBalanceB} id="balanceB" />
              <FieldInput label="Interest Rate" suffix="% APR" value={rateB} onChange={setRateB} id="rateB" />
              <FieldInput label="Pay Off In" suffix="months" value={targetMonths} onChange={setTargetMonths} id="targetMonths" />
            </>
          )}
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  let resultPanel: React.ReactNode

  if (mode === 'Payoff Timeline') {
    if (paymentTooLow) {
      resultPanel = (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-sm text-red-600 font-medium">
          Monthly payment is too low to cover interest. Increase your payment.
        </div>
      )
    } else if (resultA) {
      const debtFreeDate = addMonths(new Date(), resultA.monthsToPayoff)
      resultPanel = (
        <ResultPanel
          label="Months to Payoff"
          value={formatMonths(resultA.monthsToPayoff)}
          subtitle={`Debt-free by ${debtFreeDate}`}
          rows={[
            { label: 'Total Interest', value: fmt(resultA.totalInterestPaid) },
            { label: 'Total Paid', value: fmt(resultA.totalPaid) },
            { label: 'Original Balance', value: fmt(parseFloat(balance) || 0) },
          ]}
        />
      )
    } else {
      resultPanel = (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
          Enter your details to see the result.
        </div>
      )
    }
  } else {
    const months = parseInt(targetMonths) || 0
    if (resultB !== null && months > 0) {
      resultPanel = (
        <ResultPanel
          label="Monthly Payment"
          value={fmt(resultB)}
          subtitle={`to be debt-free in ${months} months`}
          rows={[
            { label: 'Total Interest', value: fmt(resultB * months - (parseFloat(balanceB) || 0)) },
            { label: 'Total Paid', value: fmt(resultB * months) },
          ]}
        />
      )
    } else {
      resultPanel = (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
          Enter your details to see the result.
        </div>
      )
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Debt Payoff Calculator" description="Calculate how long to pay off any debt and total interest paid." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
