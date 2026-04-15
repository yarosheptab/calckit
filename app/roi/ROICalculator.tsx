'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

function pct(n: number) { return n.toFixed(2) + '%' }
function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function ROIPage() {
  const [initial, setInitial] = useState('10000')
  const [finalVal, setFinalVal] = useState('15000')
  const [years, setYears] = useState('3')
  const [result, setResult] = useState<{ roi: number; annualized: number; netProfit: number } | null>(null)

  function calculate() {
    const I = parseFloat(initial)
    const F = parseFloat(finalVal)
    const t = parseFloat(years)
    if (!I || !F) return
    const roi = ((F - I) / I) * 100
    const annualized = t > 0 ? (Math.pow(F / I, 1 / t) - 1) * 100 : roi
    setResult({ roi, annualized, netProfit: F - I })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="ROI Calculator" description="Calculate return on investment and annualized return." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Initial Investment ($)" id="initial" value={initial} onChange={setInitial} placeholder="10000" min="0" />
            <FieldInput label="Final Value ($)" id="finalVal" value={finalVal} onChange={setFinalVal} placeholder="15000" min="0" />
            <FieldInput label="Time Period (years)" id="years" value={years} onChange={setYears} placeholder="3" min="0" step="0.1" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="ROI"
              value={pct(result.roi)}
              subtitle={`over ${years} years`}
              rows={[
                { label: 'Annualized Return', value: pct(result.annualized) },
                { label: 'Net Profit', value: fmt(result.netProfit) },
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
