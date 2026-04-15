'use client'
import Link from 'next/link'

const TOOLS = [
  { name: 'Mortgage', desc: 'Monthly payment & amortization', href: '/mortgage' },
  { name: 'Compound Interest', desc: 'Future value with compounding', href: '/compound-interest' },
  { name: 'ROI', desc: 'Return on investment %', href: '/roi' },
  { name: 'Currency Converter', desc: 'Live exchange rates, 170+ currencies', href: '/currency' },
  { name: 'Unit Converter', desc: 'Length, weight, temp, data', href: '/unit-converter' },
  { name: 'Tip Calculator', desc: 'Split bills and tip amounts', href: '/tip' },
  { name: 'Tax Estimator', desc: 'Take-home pay after tax', href: '/tax' },
]

export default function HomePage() {
  return (
    <div style={{ background: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      {/* Hero */}
      <section style={{ padding: '28px 20px 24px', borderBottom: '1px solid #f3f4f6' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '7px' }}>
          Free calculators<br />for everyday math.
        </h1>
        <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.6, marginBottom: '14px', maxWidth: '300px' }}>
          Mortgage, interest, ROI, currency, unit conversions, and more. No account. No ads.
        </p>
        <Link href="#tools" style={{
          display: 'inline-block', background: '#2563eb', color: '#fff',
          fontSize: '11px', fontWeight: 600, padding: '7px 16px', borderRadius: '6px',
          textDecoration: 'none',
        }}>Browse tools</Link>
      </section>

      {/* Tool Grid */}
      <section id="tools" style={{ padding: '16px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', color: '#d1d5db', textTransform: 'uppercase' }}>
            All Calculators
          </span>
          <span style={{ fontSize: '9px', color: '#d1d5db' }}>7 tools</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
          {TOOLS.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  )
}

function ToolCard({ tool }: { tool: { name: string; desc: string; href: string } }) {
  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.borderColor = '#bfdbfe'
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.borderColor = '#f0f0f0'
  }
  return (
    <Link href={tool.href} style={{ textDecoration: 'none' }}>
      <div
        style={{ border: '1px solid #f0f0f0', borderRadius: '6px', padding: '10px', transition: 'border-color 120ms ease' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{tool.name}</div>
        <div style={{ fontSize: '8px', color: '#9ca3af', lineHeight: 1.4 }}>{tool.desc}</div>
      </div>
    </Link>
  )
}
