'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { FaqSection } from '@/components/tool/FaqSection'

const FAQS = [
  {
    q: 'How do I convert kilometers to miles?',
    a: 'Multiply kilometers by 0.621371 to get miles. For example, 10 km × 0.621371 = 6.21 miles. Going the other direction, multiply miles by 1.60934 to get kilometers. A quick mental shortcut: 5 miles ≈ 8 km.',
  },
  {
    q: 'How do I convert Celsius to Fahrenheit?',
    a: 'Use the formula: °F = (°C × 9/5) + 32. So 20°C = (20 × 1.8) + 32 = 68°F. To convert Fahrenheit to Celsius: °C = (°F − 32) × 5/9. A useful benchmark: 0°C = 32°F, 100°C = 212°F, and body temperature is 37°C = 98.6°F.',
  },
  {
    q: 'How many pounds are in a kilogram?',
    a: 'One kilogram equals approximately 2.20462 pounds. To convert kg to pounds, multiply by 2.205. To convert pounds to kg, divide by 2.205 (or multiply by 0.453592). For example, 70 kg ≈ 154 pounds; 150 pounds ≈ 68 kg.',
  },
  {
    q: 'How many megabytes are in a gigabyte?',
    a: 'In binary (used by computers): 1 GB = 1,024 MB. In decimal (used by storage manufacturers): 1 GB = 1,000 MB. This is why a 128 GB USB drive shows up as 119 GB on your computer — the OS reports in binary while the manufacturer labels in decimal.',
  },
  {
    q: 'What is the difference between metric and imperial units?',
    a: 'The metric system (SI) uses units based on powers of 10 — meters, kilograms, liters. It\'s used by most of the world and all of science. The imperial system uses units like inches, feet, pounds, and gallons — still common in the US, UK (partially), and a few other countries. Metric is generally easier to calculate with due to its base-10 structure.',
  },
]

type Category = 'Length' | 'Weight' | 'Temperature' | 'Data'

const units: Record<Category, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  Length: [
    { label: 'Meters', toBase: v => v, fromBase: v => v },
    { label: 'Kilometers', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: 'Miles', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    { label: 'Feet', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { label: 'Inches', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    { label: 'Centimeters', toBase: v => v * 0.01, fromBase: v => v / 0.01 },
    { label: 'Yards', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
  ],
  Weight: [
    { label: 'Kilograms', toBase: v => v, fromBase: v => v },
    { label: 'Pounds', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    { label: 'Grams', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: 'Ounces', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { label: 'Metric Tons', toBase: v => v * 1000, fromBase: v => v / 1000 },
  ],
  Temperature: [
    { label: 'Celsius', toBase: v => v, fromBase: v => v },
    { label: 'Fahrenheit', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { label: 'Kelvin', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  ],
  Data: [
    { label: 'Bytes', toBase: v => v, fromBase: v => v },
    { label: 'Kilobytes', toBase: v => v * 1024, fromBase: v => v / 1024 },
    { label: 'Megabytes', toBase: v => v * 1024 ** 2, fromBase: v => v / 1024 ** 2 },
    { label: 'Gigabytes', toBase: v => v * 1024 ** 3, fromBase: v => v / 1024 ** 3 },
    { label: 'Terabytes', toBase: v => v * 1024 ** 4, fromBase: v => v / 1024 ** 4 },
  ],
}

const CATEGORIES: Category[] = ['Length', 'Weight', 'Temperature', 'Data']

const RELATED = [
  { name: 'Currency Converter', href: '/currency' },
  { name: 'Tip Calculator', href: '/tip' },
]

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('Length')
  const [fromIdx, setFromIdx] = useState(0)
  const [toIdx, setToIdx] = useState(1)
  const [value, setValue] = useState('1')
  const [result, setResult] = useState<string | null>(null)

  const catUnits = units[category]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const v = parseFloat(value)
      if (isNaN(v)) return
      const inBase = catUnits[fromIdx].toBase(v)
      const out = catUnits[toIdx].fromBase(inBase)
      setResult(parseFloat(out.toPrecision(7)).toString())
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [value, fromIdx, toIdx, catUnits])

  function handleCategoryChange(cat: Category) {
    setCategory(cat)
    setFromIdx(0)
    setToIdx(1)
    setResult(null)
  }

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Convert</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {/* Category pill tabs */}
          <div className="flex flex-col gap-1.5">
            <Label>Category</Label>
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    'px-3.5 py-1.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer',
                    category === cat
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <FieldInput label="Value" value={value} onChange={setValue} id="value" />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fromUnit">From</Label>
            <select
              id="fromUnit"
              value={fromIdx}
              onChange={e => setFromIdx(Number(e.target.value))}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            >
              {catUnits.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="toUnit">To</Label>
            <select
              id="toUnit"
              value={toIdx}
              onChange={e => setToIdx(Number(e.target.value))}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            >
              {catUnits.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result !== null ? (() => {
    const reverseVal = catUnits[fromIdx].fromBase(catUnits[toIdx].toBase(parseFloat(result)))
    return (
      <ResultPanel
        label="Converted Value"
        value={result}
        subtitle={`${value} ${catUnits[fromIdx].label} = ${result} ${catUnits[toIdx].label}`}
        rows={[
          { label: 'Reverse', value: `${parseFloat(reverseVal.toPrecision(7))} ${catUnits[fromIdx].label}` },
        ]}
      />
    )
  })() : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter a value to convert.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Unit Converter" description="Convert between length, weight, temperature, and data units." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
