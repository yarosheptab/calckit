'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeftRight, RefreshCw, Loader2 } from 'lucide-react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Label } from '@/components/ui/label'
import { FaqSection } from '@/components/tool/FaqSection'

const FAQS = [
  {
    q: 'How often are exchange rates updated?',
    a: 'Our rates are sourced from an open exchange-rate API and updated hourly. For real-time trading rates, use a dedicated forex platform. For everyday conversions — travel, transfers, purchases — hourly rates are more than accurate enough.',
  },
  {
    q: 'What is the mid-market exchange rate?',
    a: 'The mid-market rate (also called the interbank rate) is the midpoint between the buy and sell prices in the global currency market. It\'s the "true" exchange rate you see on Google or financial data providers. Banks and services typically charge a margin above this rate.',
  },
  {
    q: 'Why do banks give worse rates than this calculator?',
    a: 'Banks, airport kiosks, and transfer services add a markup (spread) on top of the mid-market rate — often 1–5%. That\'s how they profit on currency exchange. Services like Wise and Revolut are closer to the mid-market rate with a transparent fee, making them cheaper for international transfers.',
  },
  {
    q: 'Which currency is the strongest in the world?',
    a: 'By nominal exchange rate, the Kuwaiti Dinar (KWD) is the highest-valued currency against the US Dollar (1 KWD ≈ $3.25 USD). However, "strong" doesn\'t mean better for an economy — exchange rates reflect supply, demand, monetary policy, and trade balances, not economic health alone.',
  },
  {
    q: 'What is the difference between a fixed and floating exchange rate?',
    a: 'A floating exchange rate is determined by market supply and demand (USD, EUR, GBP). A fixed (pegged) rate is set and maintained by a government against another currency — for example, the Hong Kong Dollar is pegged to the USD at roughly 7.8:1. Fixed rates offer stability; floating rates adjust to economic conditions.',
  },
]

const CURRENCIES = [
  'USD','EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR','MXN',
  'BRL','SGD','HKD','KRW','NOK','SEK','DKK','NZD','ZAR','UAH',
]

const COMMON_PAIRS = ['GBP', 'JPY', 'CAD']

const RELATED = [
  { name: 'Unit Converter', href: '/unit-converter' },
  { name: 'Tip Calculator', href: '/tip' },
]

export default function CurrencyPage() {
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('1000')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [result, setResult] = useState<{ converted: number; rate: number } | null>(null)

  function loadRates() {
    setLoading(true)
    setError('')
    fetch('/api/exchange-rates')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); setLoading(false); return }
        setRates(d.rates)
        setLoading(false)
      })
      .catch(() => { setError('Could not load exchange rates.'); setLoading(false) })
  }

  useEffect(() => { loadRates() }, [])

  useEffect(() => {
    if (!rates) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const amt = parseFloat(amount) || 0
      if (!amt) return
      const inUSD = amt / (rates[from] ?? 1)
      const out = inUSD * (rates[to] ?? 1)
      const rate = (rates[to] ?? 1) / (rates[from] ?? 1)
      setResult({ converted: out, rate })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [amount, from, to, rates])

  function swap() { setFrom(to); setTo(from); setResult(null) }

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Convert</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {error && (
            <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <span className="text-sm text-red-600">{error}</span>
              <button
                onClick={loadRates}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          )}
          <FieldInput label="Amount" value={amount} onChange={setAmount} id="amount" type="number" />
          <div className="flex flex-col gap-1.5">
            <Label>From</Label>
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            onClick={swap}
            type="button"
            className="self-start flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
          <div className="flex flex-col gap-1.5">
            <Label>To</Label>
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = loading ? (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-center gap-3 text-blue-400">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span className="text-sm font-medium">Loading exchange rates…</span>
    </div>
  ) : result ? (
    <div className="flex flex-col gap-4">
      <ResultPanel
        label={`${amount} ${from} =`}
        value={result.converted.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + to}
        subtitle={`1 ${from} = ${result.rate.toFixed(4)} ${to}`}
        rows={
          rates
            ? COMMON_PAIRS.filter(p => p !== to).slice(0, 3).map(code => ({
                label: `${amount} ${from} → ${code}`,
                value: (parseFloat(amount) * ((rates[code] ?? 1) / (rates[from] ?? 1))).toLocaleString('en-US', { maximumFractionDigits: 2 }),
              }))
            : []
        }
      />
    </div>
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter an amount to convert.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Currency Converter" description="Convert between 170+ currencies using live exchange rates." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
      <FaqSection items={FAQS} />
    </div>
  )
}
