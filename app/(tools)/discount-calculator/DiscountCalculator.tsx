'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { FaqSection } from '@/components/tool/FaqSection'
import { calcDiscount, calcDiscountPercent, calcOriginalPrice } from '@/lib/calculators/discount'
import { TOOL } from '@/lib/tools'

const FAQS = [
  {
    q: 'How do I calculate a percentage discount?',
    a: "Multiply the original price by the discount percentage, then subtract from the original. Formula: Sale Price = Original × (1 − Discount%). Example: 25% off $80 = $80 × 0.75 = $60. You save $20. Mental shortcut: 25% off means you pay 75% of the price.",
  },
  {
    q: 'What is 20% off $50?',
    a: '20% off $50 = $40. You save $10. Quick method: 10% of $50 = $5, doubled = $10 discount. Final price: $50 − $10 = $40. This calculator handles any combination: enter 50 as original price and 20 as discount percentage.',
  },
  {
    q: 'How do I find the original price before a discount?',
    a: "Divide the sale price by (1 − discount%). Example: if an item is $75 after a 25% discount: original = $75 ÷ 0.75 = $100. Use the 'Find Original' mode above — enter the sale price and discount percentage.",
  },
  {
    q: 'What percentage off is a sale price?',
    a: "Subtract the sale price from the original, divide by the original, multiply by 100. Formula: Discount% = ((Original − Sale) ÷ Original) × 100. Example: original $120, sale $84: (36/120) × 100 = 30% off. Use the 'Find %' mode above.",
  },
  {
    q: 'How do I calculate multiple discounts stacked?',
    a: 'Apply discounts sequentially, not additively. A 20% discount followed by a 10% discount is NOT 30% off. Example: $100 → −20% = $80 → −10% = $72. Total savings: $28 (28% off, not 30%). To combine: (1−0.20) × (1−0.10) = 0.72 = 28% total discount.',
  },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

const MODES = ['% Off', 'Find %', 'Find Original']

export default function DiscountCalculator({ pageTitle }: { pageTitle?: string } = {}) {
  const [mode, setMode] = useState('% Off')

  // Mode A
  const [modeAOriginal, setModeAOriginal] = useState('80')
  const [modeADiscount, setModeADiscount] = useState('25')

  // Mode B
  const [modeBOriginal, setModeBOriginal] = useState('80')
  const [modeBSale, setModeBSale] = useState('60')

  // Mode C
  const [modeCSale, setModeCSale] = useState('60')
  const [modeCDiscount, setModeCDiscount] = useState('25')

  type ResultA = { salePrice: number; savings: number; discountPercent: number }
  type ResultB = number
  type ResultC = number

  const [resultA, setResultA] = useState<ResultA | null>(null)
  const [resultB, setResultB] = useState<ResultB | null>(null)
  const [resultC, setResultC] = useState<ResultC | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (mode === '% Off') {
        setResultA(calcDiscount(parseFloat(modeAOriginal) || 0, parseFloat(modeADiscount) || 0))
      } else if (mode === 'Find %') {
        setResultB(calcDiscountPercent(parseFloat(modeBOriginal) || 0, parseFloat(modeBSale) || 0))
      } else {
        setResultC(calcOriginalPrice(parseFloat(modeCSale) || 0, parseFloat(modeCDiscount) || 0))
      }
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [mode, modeAOriginal, modeADiscount, modeBOriginal, modeBSale, modeCSale, modeCDiscount])

  function handleModeChange(newMode: string) {
    setMode(newMode)
    if (newMode === '% Off') {
      setModeAOriginal('80')
      setModeADiscount('25')
    } else if (newMode === 'Find %') {
      setModeBOriginal('80')
      setModeBSale('60')
    } else {
      setModeCSale('60')
      setModeCDiscount('25')
    }
  }

  let inputFields = null
  let resultPanel = null

  if (mode === '% Off') {
    const originalPrice = parseFloat(modeAOriginal) || 0
    const discountPercent = parseFloat(modeADiscount) || 0
    inputFields = (
      <>
        <FieldInput label="Original Price" prefix="$" value={modeAOriginal} onChange={setModeAOriginal} id="modeA-original" />
        <FieldInput label="Discount" suffix="% off" value={modeADiscount} onChange={setModeADiscount} id="modeA-discount" />
      </>
    )
    resultPanel = resultA ? (
      <ResultPanel
        label="Sale Price"
        value={fmt(resultA.salePrice)}
        subtitle={`${discountPercent}% off $${originalPrice}`}
        rows={[
          { label: 'You Save', value: fmt(resultA.savings) },
          { label: 'Original Price', value: fmt(originalPrice) },
          { label: 'Discount', value: discountPercent + '%' },
        ]}
      />
    ) : (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
        Enter your details to see the result.
      </div>
    )
  } else if (mode === 'Find %') {
    const originalPrice = parseFloat(modeBOriginal) || 0
    const salePrice = parseFloat(modeBSale) || 0
    inputFields = (
      <>
        <FieldInput label="Original Price" prefix="$" value={modeBOriginal} onChange={setModeBOriginal} id="modeB-original" />
        <FieldInput label="Sale Price" prefix="$" value={modeBSale} onChange={setModeBSale} id="modeB-sale" />
      </>
    )
    resultPanel = resultB !== null ? (
      <ResultPanel
        label="Discount"
        value={resultB.toFixed(1) + '% off'}
        subtitle={`saved ${fmt(originalPrice - salePrice)}`}
        rows={[
          { label: 'Original Price', value: fmt(originalPrice) },
          { label: 'Sale Price', value: fmt(salePrice) },
          { label: 'Amount Saved', value: fmt(originalPrice - salePrice) },
        ]}
      />
    ) : (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
        Enter your details to see the result.
      </div>
    )
  } else {
    const salePrice = parseFloat(modeCSale) || 0
    const discountPercent = parseFloat(modeCDiscount) || 0
    const origPrice = resultC ?? 0
    inputFields = (
      <>
        <FieldInput label="Sale Price" prefix="$" value={modeCSale} onChange={setModeCSale} id="modeC-sale" />
        <FieldInput label="Discount Applied" suffix="% off" value={modeCDiscount} onChange={setModeCDiscount} id="modeC-discount" />
      </>
    )
    resultPanel = resultC !== null ? (
      <ResultPanel
        label="Original Price"
        value={fmt(origPrice)}
        subtitle={`before ${discountPercent}% discount`}
        rows={[
          { label: 'Amount Saved', value: fmt(origPrice - salePrice) },
          { label: 'Sale Price', value: fmt(salePrice) },
        ]}
      />
    ) : (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
        Enter your details to see the result.
      </div>
    )
  }

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Mode</span>
            <SegmentedToggle options={MODES} value={mode} onChange={handleModeChange} />
          </div>
          {inputFields}
        </div>
      </div>
    </>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Discount Calculator" description="Calculate the sale price after a percentage discount, find what percentage off an item is, or work backwards from a sale price." pageTitle={pageTitle} />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
