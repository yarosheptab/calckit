'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcTip } from '@/lib/calculators/tip'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'How much should I tip at a restaurant?',
    a: 'In the US, 15% is the minimum for acceptable service, 18–20% is standard for good service, and 20–25% acknowledges excellent service. For buffets and counter service, 10% or a couple of dollars is typical. Tipping norms vary internationally — in Japan tips are often considered rude.',
  },
  {
    q: 'Should I tip on the pre-tax or post-tax amount?',
    a: 'Etiquette guidelines recommend tipping on the pre-tax subtotal, since tax isn\'t part of the service you received. In practice, most people tip on the total — the difference is small. On a $80 bill with 8% tax, tipping 20% on $80 vs $86.40 is a $1.28 difference.',
  },
  {
    q: 'What is the standard tip for food delivery?',
    a: '$3–5 minimum for short distances, or 15–20% of the order total — whichever is higher. For large orders or bad weather, 20–25% is considerate. Delivery drivers often rely on tips as a significant part of their income, especially on busy platforms.',
  },
  {
    q: 'How do I split a bill unevenly?',
    a: 'This calculator splits the total (bill + tip) evenly between everyone. For uneven splits where different people ordered different amounts, calculate each person\'s share of the pre-tip bill separately, then apply the tip percentage to each sub-total. Most restaurant POS systems can also split checks by item.',
  },
  {
    q: 'What is a 20% tip on a $100 bill?',
    a: 'A 20% tip on $100 is $20, making the total $120. Per person: 2 people pay $60 each, 4 people pay $30 each. A quick mental calculation: move the decimal to get 10% ($10), then double it for 20% ($20).',
  },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

const TIP_PRESETS = ['10', '15', '18', '20', 'Custom']
const RELATED = [TOOL.percentage, TOOL.discount, TOOL.currency]

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
      const result = calcTip(parseFloat(bill) || 0, parseFloat(activeTipPct) || 0, parseInt(people) || 1)
      if (!result) return
      setResult(result)
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
      <FaqSection items={FAQS} />
    </div>
  )
}
