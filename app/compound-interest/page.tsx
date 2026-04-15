'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

type Frequency = 'annually' | 'monthly' | 'daily'
const freqMap: Record<Frequency, number> = { annually: 1, monthly: 12, daily: 365 }

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState<Frequency>('monthly')
  const [result, setResult] = useState<{ futureValue: number; totalInterest: number } | null>(null)

  function calculate() {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    const n = freqMap[freq]
    if (!P || !r || !t) return
    const futureValue = P * Math.pow(1 + r / n, n * t)
    setResult({ futureValue, totalInterest: futureValue - P })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Compound Interest" description="Calculate future value with compounding interest." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Principal ($)" id="principal" value={principal} onChange={setPrincipal} placeholder="10000" min="0" />
            <FieldInput label="Annual Rate (%)" id="rate" value={rate} onChange={setRate} placeholder="7" min="0" step="0.01" />
            <FieldInput label="Time (years)" id="years" value={years} onChange={setYears} placeholder="10" min="1" />
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="freq" style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>
                Compound Frequency
              </label>
              <select
                id="freq"
                value={freq}
                onChange={e => setFreq(e.target.value as Frequency)}
                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px', padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff' }}
              >
                <option value="annually">Annually</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Future Value"
              value={fmt(result.futureValue)}
              subtitle={`after ${years} years`}
              rows={[
                { label: 'Principal', value: fmt(parseFloat(principal)), barPct: (parseFloat(principal) / result.futureValue) * 100 },
                { label: 'Total Interest Earned', value: fmt(result.totalInterest), barPct: (result.totalInterest / result.futureValue) * 100 },
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
