'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcPercentOf, calcWhatPercent, calcPercentChange } from '@/lib/calculators/percentage'

const FAQS = [
  {
    q: 'How do I calculate percentage?',
    a: 'To find X% of a number: multiply the number by X and divide by 100. Example: 15% of $80 = 80 × 0.15 = $12. For percentage change: subtract the old value from the new, divide by the absolute old value, and multiply by 100. Example: price went from $50 to $65 → (65−50)/50 × 100 = +30%.',
  },
  {
    q: 'What is 20% of $150?',
    a: '20% of $150 = $30. To verify: 10% of $150 = $15, doubled = $30. Quick mental math: move the decimal one place left to get 10%, then adjust. For 15%: find 10% ($15) + half of 10% ($7.50) = $22.50.',
  },
  {
    q: 'How do I calculate a percentage increase?',
    a: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New − Old) / Old) × 100. Example: salary went from $60,000 to $66,000 → (6,000 / 60,000) × 100 = 10% raise.',
  },
  {
    q: 'What percentage is 30 out of 200?',
    a: '30 out of 200 = 15%. Formula: (30 / 200) × 100 = 15%. This is the same as asking "30 is what percent of 200?" Divide the part by the whole and multiply by 100.',
  },
  {
    q: 'How do I calculate a discount percentage?',
    a: 'Use the percentage change formula. If an item dropped from $80 to $60: ((60 − 80) / 80) × 100 = −25%. Or use "X% of": if it\'s 25% off $80, the discount is $20, leaving $60. This calculator handles all three forms.',
  },
]

const MODES = ['% of', 'What %', '% change'] as const
type Mode = typeof MODES[number]

const RELATED = [
  { name: 'Tip Calculator', href: '/tip' },
  { name: 'Tax Estimator', href: '/tax' },
]

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('% of')

  // Mode 1: % of
  const [percent, setPercent] = useState('15')
  const [ofValue, setOfValue] = useState('200')

  // Mode 2: What %
  const [part, setPart] = useState('30')
  const [whole, setWhole] = useState('200')

  // Mode 3: % change
  const [fromVal, setFromVal] = useState('100')
  const [toVal, setToVal] = useState('125')

  const [result, setResult] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleModeChange(newMode: string) {
    setMode(newMode as Mode)
    if (newMode === '% of') {
      setPercent('15')
      setOfValue('200')
    } else if (newMode === 'What %') {
      setPart('30')
      setWhole('200')
    } else {
      setFromVal('100')
      setToVal('125')
    }
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === '% of') {
        setResult(calcPercentOf(parseFloat(percent) || 0, parseFloat(ofValue) || 0))
      } else if (mode === 'What %') {
        setResult(calcWhatPercent(parseFloat(part) || 0, parseFloat(whole) || 0))
      } else {
        setResult(calcPercentChange(parseFloat(fromVal) || 0, parseFloat(toVal) || 0))
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, percent, ofValue, part, whole, fromVal, toVal])

  function formatResult(): string {
    if (result === null) return '—'
    if (mode === '% of') return result.toLocaleString('en-US', { maximumFractionDigits: 4 })
    if (mode === 'What %') return result.toFixed(2) + '%'
    return (result >= 0 ? '+' : '') + result.toFixed(2) + '%'
  }

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Calculate</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Mode</span>
            <SegmentedToggle options={[...MODES]} value={mode} onChange={handleModeChange} />
          </div>

          {mode === '% of' && (
            <>
              <FieldInput label="Percentage" suffix="%" value={percent} onChange={setPercent} id="percent" />
              <FieldInput label="Of value" value={ofValue} onChange={setOfValue} id="ofValue" placeholder="e.g. 200" />
            </>
          )}

          {mode === 'What %' && (
            <>
              <FieldInput label="Part value" value={part} onChange={setPart} id="part" />
              <FieldInput label="Whole / Total" value={whole} onChange={setWhole} id="whole" />
            </>
          )}

          {mode === '% change' && (
            <>
              <FieldInput label="Original" value={fromVal} onChange={setFromVal} id="fromVal" />
              <FieldInput label="New Value" value={toVal} onChange={setToVal} id="toVal" />
            </>
          )}
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  function getRows(): { label: string; value: string }[] {
    if (result === null) return []
    if (mode === '% of') {
      const v = parseFloat(ofValue) || 0
      const remaining = v - result
      const remainingPct = (100 - (parseFloat(percent) || 0)).toFixed(2)
      return [{ label: `Remaining (${remainingPct}%)`, value: remaining.toFixed(2) }]
    }
    if (mode === '% change') {
      const f = parseFloat(fromVal) || 0
      const t = parseFloat(toVal) || 0
      return [
        { label: 'Absolute change', value: (t - f).toFixed(2) },
        { label: 'Direction', value: t >= f ? 'Increase' : 'Decrease' },
      ]
    }
    return []
  }

  function getSubtitle(): string | undefined {
    if (result === null) return undefined
    if (mode === '% of') {
      return `${percent}% of ${ofValue} = ${formatResult()}`
    }
    if (mode === 'What %') {
      return 'Part / Whole × 100'
    }
    return undefined
  }

  function getLabel(): string {
    if (mode === '% of') return 'Result'
    if (mode === 'What %') return 'Percentage'
    return 'Percentage Change'
  }

  const resultPanel = result !== null ? (
    <ResultPanel
      label={getLabel()}
      value={formatResult()}
      subtitle={getSubtitle()}
      rows={getRows()}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Percentage Calculator" description="Calculate percentages: find X% of a number, what percent one value is of another, or the percentage change between two values." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
