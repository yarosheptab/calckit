'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

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

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('Length')
  const [fromIdx, setFromIdx] = useState(0)
  const [toIdx, setToIdx] = useState(1)
  const [value, setValue] = useState('1')
  const [result, setResult] = useState<string | null>(null)

  const catUnits = units[category]

  function convert() {
    const v = parseFloat(value)
    if (isNaN(v)) return
    const inBase = catUnits[fromIdx].toBase(v)
    const out = catUnits[toIdx].fromBase(inBase)
    setResult(parseFloat(out.toPrecision(7)).toString())
  }

  const selectStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px',
    padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff',
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Unit Converter" description="Convert between length, weight, temperature, and data units." />
      <TwoColLayout
        left={
          <>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Category</label>
              <select value={category} onChange={e => { setCategory(e.target.value as Category); setFromIdx(0); setToIdx(1); setResult(null) }} style={selectStyle}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Value</label>
              <input type="number" value={value} onChange={e => setValue(e.target.value)}
                style={selectStyle} placeholder="1" />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>From</label>
              <select value={fromIdx} onChange={e => setFromIdx(Number(e.target.value))} style={selectStyle}>
                {catUnits.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>To</label>
              <select value={toIdx} onChange={e => setToIdx(Number(e.target.value))} style={selectStyle}>
                {catUnits.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
              </select>
            </div>
            <CalcButton onClick={convert} />
          </>
        }
        right={
          result !== null ? (
            <ResultPanel
              label="Converted Value"
              value={result}
              subtitle={`${value} ${catUnits[fromIdx].label} = ${result} ${catUnits[toIdx].label}`}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Select units and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
