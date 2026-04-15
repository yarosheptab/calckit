'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

type FilingStatus = 'single' | 'married'

// 2024 US Federal standard deductions
const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 14600, married: 29200 }

// Brackets: [rate, upTo] — final bracket has upTo = Infinity
const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [
    [0.10, 11600], [0.12, 47150], [0.22, 100525],
    [0.24, 191950], [0.32, 243725], [0.35, 609350], [0.37, Infinity],
  ],
  married: [
    [0.10, 23200], [0.12, 94300], [0.22, 201050],
    [0.24, 383900], [0.32, 487450], [0.35, 731200], [0.37, Infinity],
  ],
}

function calcFederalTax(taxable: number, status: FilingStatus): number {
  let tax = 0
  let prev = 0
  for (const [rate, upTo] of BRACKETS[status]) {
    if (taxable <= prev) break
    const chunk = Math.min(taxable, upTo) - prev
    tax += chunk * rate
    prev = upTo
    if (upTo === Infinity) break
  }
  return Math.max(0, tax)
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function TaxPage() {
  const [salary, setSalary] = useState('75000')
  const [status, setStatus] = useState<FilingStatus>('single')
  const [result, setResult] = useState<{ federalTax: number; effectiveRate: number; takeHomeAnnual: number; takeHomeMonthly: number } | null>(null)

  function calculate() {
    const gross = parseFloat(salary)
    if (!gross) return
    const deduction = STANDARD_DEDUCTION[status]
    const taxable = Math.max(0, gross - deduction)
    const federalTax = calcFederalTax(taxable, status)
    const effectiveRate = (federalTax / gross) * 100
    const takeHomeAnnual = gross - federalTax
    setResult({ federalTax, effectiveRate, takeHomeAnnual, takeHomeMonthly: takeHomeAnnual / 12 })
  }

  const selectStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px',
    padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff', marginBottom: '12px',
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Tax Estimator" description="Estimate your federal income tax using 2024 US brackets. Approximation only." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Gross Annual Salary ($)" id="salary" value={salary} onChange={setSalary} placeholder="75000" min="0" />
            <div>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Filing Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)} style={selectStyle}>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>
            <CalcButton onClick={calculate} />
            <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: '8px', lineHeight: 1.5 }}>
              Estimate only. Uses 2024 federal standard deduction and brackets. Does not include FICA, state tax, or credits.
            </p>
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Estimated Federal Tax"
              value={fmt(result.federalTax)}
              subtitle={`effective rate ${result.effectiveRate.toFixed(1)}%`}
              rows={[
                { label: 'Take-Home (Annual)', value: fmt(result.takeHomeAnnual) },
                { label: 'Take-Home (Monthly)', value: fmt(result.takeHomeMonthly) },
                { label: 'Effective Rate', value: result.effectiveRate.toFixed(2) + '%' },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter your salary and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
