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

export default function TipPage() {
  const [bill, setBill] = useState('50')
  const [tipPct, setTipPct] = useState('18')
  const [people, setPeople] = useState('2')
  const [result, setResult] = useState<{ tipAmount: number; total: number; perPerson: number } | null>(null)

  function calculate() {
    const b = parseFloat(bill)
    const t = parseFloat(tipPct) / 100
    const p = parseInt(people) || 1
    if (!b || t < 0) return
    const tipAmount = b * t
    const total = b + tipAmount
    setResult({ tipAmount, total, perPerson: total / p })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Tip Calculator" description="Calculate tip amount and split the bill." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Bill Total ($)" id="bill" value={bill} onChange={setBill} placeholder="50" min="0" step="0.01" />
            <FieldInput label="Tip (%)" id="tipPct" value={tipPct} onChange={setTipPct} placeholder="18" min="0" step="1" />
            <FieldInput label="Number of People" id="people" value={people} onChange={setPeople} placeholder="2" min="1" step="1" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Tip Amount"
              value={fmt(result.tipAmount)}
              rows={[
                { label: 'Total Bill', value: fmt(result.total) },
                { label: 'Per Person', value: fmt(result.perPerson) },
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
