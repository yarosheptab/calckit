'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcMonthlySavings, calcSavingsProjection } from '@/lib/calculators/savings'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'How much should I save each month?',
    a: "A common rule is to save 20% of your income (the 50/30/20 budget). On a $60,000 salary that's $1,000/month. If saving for a specific goal — like a $20,000 emergency fund — use this calculator to find the exact monthly amount based on your timeline and interest rate.",
  },
  {
    q: 'How long does it take to save $10,000?',
    a: 'Saving $500/month with no interest takes 20 months. With a 4.5% APY high-yield savings account, you reach $10,000 in about 19 months. Starting with $2,000 already saved reduces that to 16 months. The higher your starting balance and interest rate, the faster you get there.',
  },
  {
    q: 'What is compound interest on savings?',
    a: 'Compound interest means you earn interest on your interest. At 5% APY on $10,000 over 10 years: simple interest gives $15,000; compound interest gives $16,289. The longer the time horizon, the more dramatic the difference. Einstein reputedly called compound interest "the eighth wonder of the world."',
  },
  {
    q: 'What is a high-yield savings account?',
    a: 'A high-yield savings account (HYSA) pays significantly more than a traditional savings account. As of 2025, the best HYSAs pay 4.5–5.0% APY vs. the national average of ~0.5%. On $10,000, that\'s $450–500/year vs. $50. FDIC-insured, they\'re as safe as regular savings.',
  },
  {
    q: 'How much interest does $10,000 earn in a year?',
    a: 'At 5% APY, $10,000 earns $500 in one year. At 4%, $400. At 0.5% (typical bank account), only $50. Over 10 years at 5%, that $10,000 grows to $16,289 — $6,289 in pure interest with no additional contributions.',
  },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const MODES = ['Reach a Goal', 'Project Savings']

const RELATED = [TOOL.compoundInterest, TOOL.inflation, TOOL.loan, TOOL.percentage]

export default function SavingsCalculator({ pageTitle }: { pageTitle?: string } = {}) {
  const [mode, setMode] = useState('Reach a Goal')

  // Mode A — Reach a Goal
  const [goal, setGoal] = useState('10000')
  const [initialA, setInitialA] = useState('0')
  const [rateA, setRateA] = useState('4.5')
  const [yearsA, setYearsA] = useState('3')

  // Mode B — Project Savings
  const [initialB, setInitialB] = useState('1000')
  const [monthly, setMonthly] = useState('200')
  const [rateB, setRateB] = useState('4.5')
  const [yearsB, setYearsB] = useState('10')

  const [resultA, setResultA] = useState<ReturnType<typeof calcMonthlySavings>>(null)
  const [resultB, setResultB] = useState<ReturnType<typeof calcSavingsProjection>>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === 'Reach a Goal') {
        const r = calcMonthlySavings(
          parseFloat(goal) || 0,
          parseFloat(initialA) || 0,
          parseFloat(rateA) || 0,
          parseFloat(yearsA) || 0,
        )
        setResultA(r)
      } else {
        const r = calcSavingsProjection(
          parseFloat(initialB) || 0,
          parseFloat(monthly) || 0,
          parseFloat(rateB) || 0,
          parseFloat(yearsB) || 0,
        )
        setResultB(r)
      }
    }, 150)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [mode, goal, initialA, rateA, yearsA, initialB, monthly, rateB, yearsB])

  const inputPanelA = (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 pt-5 pb-0">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <FieldInput label="Goal Amount" prefix="$" value={goal} onChange={setGoal} id="goal" />
        <FieldInput label="Current Savings" prefix="$" value={initialA} onChange={setInitialA} id="initial" />
        <FieldInput label="Annual Interest Rate" suffix="%" value={rateA} onChange={setRateA} id="rate" />
        <FieldInput label="Time" suffix="years" value={yearsA} onChange={setYearsA} id="years" />
      </div>
    </div>
  )

  const inputPanelB = (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 pt-5 pb-0">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <FieldInput label="Initial Deposit" prefix="$" value={initialB} onChange={setInitialB} id="initial" />
        <FieldInput label="Monthly Contribution" prefix="$" value={monthly} onChange={setMonthly} id="monthly" />
        <FieldInput label="Annual Interest Rate" suffix="%" value={rateB} onChange={setRateB} id="rate" />
        <FieldInput label="Time" suffix="years" value={yearsB} onChange={setYearsB} id="years" />
      </div>
    </div>
  )

  const resultPanelA = resultA ? (
    <ResultPanel
      label="Monthly Savings Needed"
      value={fmt(resultA.monthlyContribution)}
      subtitle={`to reach ${fmt(parseFloat(goal) || 0)} in ${yearsA} years`}
      rows={[
        { label: 'Total Contributions', value: fmt(resultA.totalContributions) },
        { label: 'Interest Earned', value: fmt(resultA.totalInterest) },
        { label: 'Final Balance', value: fmt(resultA.finalBalance) },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  const resultPanelB = resultB ? (
    <ResultPanel
      label="Final Balance"
      value={fmt(resultB.finalBalance)}
      subtitle={`after ${yearsB} years of saving`}
      rows={[
        { label: 'Initial Deposit', value: fmt(resultB.initialDeposit) },
        { label: 'Total Contributions', value: fmt(resultB.totalContributions) },
        { label: 'Interest Earned', value: fmt(resultB.totalInterest) },
      ]}
      bar={{
        pct: resultB.finalBalance > 0 ? ((resultB.totalContributions + resultB.initialDeposit) / resultB.finalBalance) * 100 : 100,
        left: 'Contributions',
        right: 'Interest',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  const inputPanel = (
    <>
      <div className="mb-4">
        <SegmentedToggle options={MODES} value={mode} onChange={setMode} />
      </div>
      {mode === 'Reach a Goal' ? inputPanelA : inputPanelB}
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = mode === 'Reach a Goal' ? resultPanelA : resultPanelB

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Savings Calculator" description="Calculate how much to save each month to reach your goal, or project your final savings balance." pageTitle={pageTitle} />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
