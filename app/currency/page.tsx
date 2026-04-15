'use client'
import { useState, useEffect } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import CalcButton from '@/components/tool/CalcButton'

const CURRENCIES = [
  'USD','EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR','MXN',
  'BRL','SGD','HKD','KRW','NOK','SEK','DKK','NZD','ZAR','RUB',
]

const COMMON_PAIRS = [
  { code: 'GBP', symbol: 'GBP ' },
  { code: 'JPY', symbol: 'JPY ' },
  { code: 'CAD', symbol: 'CAD ' },
]

export default function CurrencyPage() {
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('1000')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [result, setResult] = useState<{ converted: number; rate: number } | null>(null)

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return }
        setRates(d.rates)
      })
      .catch(() => setError('Could not load exchange rates.'))
  }, [])

  function convert() {
    if (!rates) return
    const amt = parseFloat(amount)
    if (!amt) return
    // Rates are relative to USD base
    const inUSD = amt / (rates[from] ?? 1)
    const out = inUSD * (rates[to] ?? 1)
    const rate = (rates[to] ?? 1) / (rates[from] ?? 1)
    setResult({ converted: out, rate })
  }

  function swap() { setFrom(to); setTo(from); setResult(null) }

  const inputStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb', borderRadius: '5px',
    padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff',
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Currency Converter" description="Convert between 170+ currencies using live exchange rates." />
      <TwoColLayout
        left={
          <>
            {error && <div style={{ color: '#ef4444', fontSize: '10px', marginBottom: '8px' }}>{error}</div>}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Amount</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} min="0" />
                <select value={from} onChange={e => setFrom(e.target.value)} style={{ ...inputStyle, fontWeight: 600 }}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <button onClick={swap} style={{
                width: '32px', height: '32px', background: '#f0f0f0', border: 'none',
                borderRadius: '5px', fontSize: '14px', color: '#6b7280', cursor: 'pointer',
              }}>&#8645;</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Convert to</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input readOnly value={result ? result.converted.toFixed(2) : '\u2014'}
                  style={{ ...inputStyle, flex: 1, color: result ? '#111' : '#9ca3af' }} />
                <select value={to} onChange={e => setTo(e.target.value)} style={{ ...inputStyle, fontWeight: 600 }}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <CalcButton onClick={convert} label="Convert" />
          </>
        }
        right={
          result ? (
            <div>
              <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 500, marginBottom: '3px' }}>Result</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#111', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '2px' }}>
                {result.converted.toLocaleString('en-US', { maximumFractionDigits: 2 })} {to}
              </div>
              <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '14px' }}>
                {amount} {from} = {result.converted.toFixed(2)} {to}
              </div>
              <div style={{ height: '1px', background: '#f0f0f0', marginBottom: '12px' }} />
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '8px', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Exchange rate</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1d4ed8' }}>1 {from} = {result.rate.toFixed(4)} {to}</div>
              </div>
              {rates && (
                <>
                  <div style={{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.06em', color: '#d1d5db', textTransform: 'uppercase', marginBottom: '6px' }}>Other conversions</div>
                  {COMMON_PAIRS.filter(p => p.code !== to).slice(0, 3).map(pair => {
                    const pairRate = (rates[pair.code] ?? 1) / (rates[from] ?? 1)
                    const pairVal = parseFloat(amount) * pairRate
                    return (
                      <div key={pair.code} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ color: '#6b7280' }}>{amount} {from} to {pair.code}</span>
                        <span style={{ color: '#111', fontWeight: 500 }}>{pair.symbol}{pairVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>
              {error ? 'Exchange rates unavailable.' : 'Enter an amount and click Convert.'}
            </div>
          )
        }
      />
    </div>
  )
}
