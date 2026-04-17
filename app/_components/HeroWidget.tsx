'use client'
import { useState } from 'react'

type Tab = 'Mortgage' | 'Compound' | 'ROI' | 'Tip'
const TABS: Tab[] = ['Mortgage', 'Compound', 'ROI', 'Tip']

function fmtUSD(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function MortgageMini() {
  const [price, setPrice] = useState('400000')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')

  const P = parseFloat(price) || 0
  const r = (parseFloat(rate) || 0) / 100 / 12
  const n = (parseFloat(term) || 30) * 12
  const monthly = P > 0 && r > 0 && n > 0
    ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : 0

  return (
    <div className="flex flex-col gap-3">
      <MiniField label="Home Price" prefix="$" value={price} onChange={setPrice} />
      <MiniField label="Interest Rate" suffix="%" value={rate} onChange={setRate} />
      <MiniField label="Loan Term" suffix="yrs" value={term} onChange={setTerm} />
      <MiniResult label="Monthly Payment" value={monthly > 0 ? fmtUSD(monthly) : '—'} />
    </div>
  )
}

function CompoundMini() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')

  const P = parseFloat(principal) || 0
  const r = (parseFloat(rate) || 0) / 100
  const t = parseFloat(years) || 0
  const fv = P > 0 && r > 0 && t > 0 ? P * Math.pow(1 + r / 12, 12 * t) : 0

  return (
    <div className="flex flex-col gap-3">
      <MiniField label="Principal" prefix="$" value={principal} onChange={setPrincipal} />
      <MiniField label="Annual Rate" suffix="%" value={rate} onChange={setRate} />
      <MiniField label="Years" suffix="yrs" value={years} onChange={setYears} />
      <MiniResult label="Future Value" value={fv > 0 ? fmtUSD(fv) : '—'} />
    </div>
  )
}

function ROIMini() {
  const [initial, setInitial] = useState('10000')
  const [final, setFinal] = useState('15000')

  const I = parseFloat(initial) || 0
  const F = parseFloat(final) || 0
  const roi = I > 0 ? ((F - I) / I) * 100 : 0

  return (
    <div className="flex flex-col gap-3">
      <MiniField label="Initial" prefix="$" value={initial} onChange={setInitial} />
      <MiniField label="Final Value" prefix="$" value={final} onChange={setFinal} />
      <MiniResult label="ROI" value={I > 0 ? roi.toFixed(1) + '%' : '—'} />
    </div>
  )
}

function TipMini() {
  const [bill, setBill] = useState('60')
  const [pct, setPct] = useState('18')

  const b = parseFloat(bill) || 0
  const t = (parseFloat(pct) || 0) / 100
  const tip = b * t
  const total = b + tip

  return (
    <div className="flex flex-col gap-3">
      <MiniField label="Bill" prefix="$" value={bill} onChange={setBill} />
      <MiniField label="Tip %" suffix="%" value={pct} onChange={setPct} />
      <MiniResult label="Total" value={total > 0 ? fmtUSD(total) : '—'} />
    </div>
  )
}

function MiniField({
  label, prefix, suffix, value, onChange,
}: {
  label: string; prefix?: string; suffix?: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <div className="flex items-center h-9 border border-gray-200 rounded-lg bg-white overflow-hidden focus-within:border-blue-400">
        {prefix && <span className="px-2.5 text-xs text-gray-400 bg-gray-50 border-r border-gray-100 h-full flex items-center">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 px-2.5 h-full text-sm font-medium text-gray-900 bg-transparent outline-none"
        />
        {suffix && <span className="px-2.5 text-xs text-gray-400 bg-gray-50 border-l border-gray-100 h-full flex items-center">{suffix}</span>}
      </div>
    </div>
  )
}

function MiniResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-1">
      <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">{label}</div>
      <div className="font-mono text-2xl font-semibold text-blue-900 tracking-tight">{value}</div>
    </div>
  )
}

const CALCULATOR_HREFS: Record<Tab, string> = {
  Mortgage: '/mortgage',
  Compound: '/compound-interest',
  ROI: '/roi',
  Tip: '/tip',
}

export function HeroWidget() {
  const [tab, setTab] = useState<Tab>('Mortgage')

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-100">
        {TABS.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              tab === t
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Calculator content */}
      <div className="p-5">
        {tab === 'Mortgage' && <MortgageMini />}
        {tab === 'Compound' && <CompoundMini />}
        {tab === 'ROI' && <ROIMini />}
        {tab === 'Tip' && <TipMini />}
      </div>

      {/* Footer link */}
      <div className="border-t border-gray-100 px-5 py-3">
        <a href={CALCULATOR_HREFS[tab]} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Open full calculator →
        </a>
      </div>
    </div>
  )
}
