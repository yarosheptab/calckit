'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

const TIP_PRESETS = ['10', '15', '18', '20', 'Custom']
const RELATED = [
  { name: 'Currency Converter', href: '/currency' },
  { name: 'Tax Estimator', href: '/tax' },
]

export default function TipPage() {
  const [bill, setBill] = useState('50')
  const [tipPreset, setTipPreset] = useState('18')
  const [customTip, setCustomTip] = useState('18')
  const [people, setPeople] = useState('2')

  const activeTipPct = tipPreset === 'Custom' ? customTip : tipPreset

  const [result, setResult] = useState<{ tipAmount: number; total: number; perPerson: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const b = parseFloat(bill) || 0
      const t = (parseFloat(activeTipPct) || 0) / 100
      const p = parseInt(people) || 1
      if (!b || t < 0) return
      const tipAmount = b * t
      const total = b + tipAmount
      setResult({ tipAmount, total, perPerson: total / p })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [bill, activeTipPct, people])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Bill Amount" prefix="$" value={bill} onChange={setBill} id="bill" />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Tip %</span>
            <SegmentedToggle options={TIP_PRESETS} value={tipPreset} onChange={setTipPreset} />
            {tipPreset === 'Custom' && (
              <FieldInput label="" suffix="%" value={customTip} onChange={setCustomTip} id="customTip" />
            )}
          </div>
          <FieldInput label="Number of People" value={people} onChange={setPeople} id="people" />
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Tip Amount"
      value={fmt(result.tipAmount)}
      subtitle={`${activeTipPct}% of ${fmt(parseFloat(bill) || 0)}`}
      rows={[
        { label: 'Total Bill', value: fmt(result.total) },
        { label: 'Per Person', value: fmt(result.perPerson) },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Tip Calculator" description="Calculate tip amount and split the bill by number of people." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
