'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function MortgagePage() {
  const [loanAmount, setLoanAmount] = useState('300000')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [downPayment, setDownPayment] = useState('0')
  const [result, setResult] = useState<{ monthly: number; principal: number; totalInterest: number; totalPaid: number } | null>(null)

  function calculate() {
    const P = parseFloat(loanAmount) - parseFloat(downPayment || '0')
    const annualRate = parseFloat(rate) / 100
    const r = annualRate / 12
    const n = parseFloat(term) * 12
    if (P <= 0 || r <= 0 || n <= 0) return
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPaid = monthly * n
    const totalInterest = totalPaid - P
    setResult({ monthly, principal: P, totalInterest, totalPaid })
  }

  const totalForBars = result ? result.principal + result.totalInterest : 1

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Mortgage Calculator" description="Estimate your monthly payment and total interest." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Loan Amount ($)" id="loanAmount" value={loanAmount} onChange={setLoanAmount} placeholder="300000" min="0" />
            <FieldInput label="Annual Interest Rate (%)" id="rate" value={rate} onChange={setRate} placeholder="6.5" min="0" step="0.01" />
            <FieldInput label="Loan Term (years)" id="term" value={term} onChange={setTerm} placeholder="30" min="1" />
            <FieldInput label="Down Payment ($, optional)" id="downPayment" value={downPayment} onChange={setDownPayment} placeholder="0" min="0" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Monthly Payment"
              value={fmt(result.monthly)}
              subtitle={`for ${parseFloat(term) * 12} months`}
              rows={[
                { label: 'Principal', value: fmt(result.principal), barPct: (result.principal / totalForBars) * 100 },
                { label: 'Total Interest', value: fmt(result.totalInterest), barPct: (result.totalInterest / totalForBars) * 100 },
                { label: 'Total Paid', value: fmt(result.totalPaid) },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter values and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
