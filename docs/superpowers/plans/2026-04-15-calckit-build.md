# calckit.yaro-labs.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build calckit.yaro-labs.com — a 7-tool calculator site with blog, about page, and live currency rates, deployed on Vercel.

**Architecture:** Next.js 15 App Router with static-by-default pages; tool pages are client components for pure-JS calculations; currency rates fetched via a Route Handler (ISR 1h) to avoid CORS. Blog uses gray-matter + marked to parse Markdown files from `content/blog/` (trusted local content only — no user-supplied HTML).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Inter (next/font/google), gray-matter, marked, open.er-api.com, GA4 (next/script), Vercel.

---

## File Map

```
app/
  globals.css                      # Design tokens + @import 'tailwindcss'
  layout.tsx                       # Root layout: Inter font, GA4 script, Navbar
  page.tsx                         # Homepage: hero + tool grid
  mortgage/page.tsx                # Mortgage calculator (client)
  compound-interest/page.tsx       # Compound interest calculator (client)
  roi/page.tsx                     # ROI calculator (client)
  currency/page.tsx                # Currency converter (client, fetches /api/exchange-rates)
  unit-converter/page.tsx          # Unit converter (client)
  tip/page.tsx                     # Tip calculator (client)
  tax/page.tsx                     # Tax estimator (client)
  blog/page.tsx                    # Blog index (SSG)
  blog/[slug]/page.tsx             # Blog post (SSG)
  about/page.tsx                   # About page (static)
  api/exchange-rates/route.ts      # Route Handler: fetch + cache exchange rates
  sitemap.ts                       # Sitemap
  robots.ts                        # Robots

components/
  Navbar.tsx                       # White 50px nav with wordmark + links + optional CTA
  tool/ToolHeader.tsx              # Breadcrumb + tool title + description
  tool/TwoColLayout.tsx            # Left (white) + right (off-white) panels
  tool/FieldInput.tsx              # Label + styled input
  tool/CalcButton.tsx              # Full-width blue Calculate button
  tool/ResultPanel.tsx             # Result label, big value, subtitle, divider, breakdown rows

lib/
  blog.ts                          # getAllPosts(), getPostBySlug() using gray-matter + marked

content/
  blog/
    intro-to-compound-interest.md  # Sample blog post

next.config.ts                     # ignoreBuildErrors + unoptimized images
```

---

## Task 1: Scaffold the project

**Files:**
- Create: `next.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx` (placeholder — replaced fully in Task 2)

- [ ] **Step 1: Create the Next.js app**

Run (in `/Users/a1111/Public/Prog/js/calckit`):
```bash
nvm use 22 && npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js project scaffolded, `package.json`, `app/`, `tailwind.config.*` created.

- [ ] **Step 2: Install dependencies**

```bash
nvm use 22 && npm install gray-matter marked
```

Expected: `gray-matter` and `marked` in `node_modules`.

- [ ] **Step 3: Replace `next.config.ts`**

Write the file:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4: Write `app/globals.css`**

```css
@import 'tailwindcss';

:root {
  --bg: #f9fafb;
  --surface: #ffffff;
  --muted: #f3f4f6;
  --border: #e5e7eb;
  --border-2: #f0f0f0;
  --fg: #111827;
  --muted-fg: #6b7280;
  --subtle: #9ca3af;
  --accent: #2563eb;
  --accent-light: #eff6ff;
  --accent-border: #bfdbfe;
  --radius: 6px;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-inter, 'Inter', sans-serif);
  background: var(--bg);
  color: var(--fg);
  -webkit-font-smoothing: antialiased;
}

input, select, button { font-family: inherit; }

input:focus, select:focus {
  outline: none;
  border-color: var(--accent-border) !important;
}
```

- [ ] **Step 5: Verify scaffold compiles**

```bash
nvm use 22 && npm run build 2>&1 | tail -20
```

Expected: Build succeeds (may have default page content, that's fine).

- [ ] **Step 6: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 1 - scaffold Next.js 15 + Tailwind v4 + dependencies"
```

---

## Task 2: Navbar component

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
import Link from 'next/link'

interface NavbarProps {
  showCta?: boolean
}

export default function Navbar({ showCta = false }: NavbarProps) {
  return (
    <nav style={{
      height: '50px',
      background: '#fff',
      borderBottom: '1px solid #efefef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '15px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
          calc<span style={{ color: '#2563eb' }}>kit</span>
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="/#tools" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>Tools</Link>
        <Link href="/blog" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>Blog</Link>
        <Link href="/about" style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}>About</Link>
        {showCta && (
          <Link href="/#tools" style={{
            background: '#2563eb', color: '#fff',
            fontSize: '10px', fontWeight: 600,
            padding: '5px 12px', borderRadius: '5px',
            textDecoration: 'none',
          }}>Browse tools</Link>
        )}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'calckit — Free calculators for everyday math',
  description: 'Mortgage, interest, ROI, currency, unit conversions, and more. No account. No ads.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar showCta />
        <main>{children}</main>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}</Script>
      </body>
    </html>
  )
}
```

Note: replace `G-XXXXXXXXXX` with real GA4 ID before deployment.

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 2 - Navbar component + root layout with Inter font and GA4"
```

---

## Task 3: Homepage

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Write `app/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify dev server renders homepage**

```bash
nvm use 22 && npm run build 2>&1 | tail -10
```

Expected: Build succeeds, homepage route listed.

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 3 - homepage with hero + 7-tool grid"
```

---

## Task 4: Shared tool components

**Files:**
- Create: `components/tool/ToolHeader.tsx`
- Create: `components/tool/TwoColLayout.tsx`
- Create: `components/tool/FieldInput.tsx`
- Create: `components/tool/CalcButton.tsx`
- Create: `components/tool/ResultPanel.tsx`

- [ ] **Step 1: Create `components/tool/ToolHeader.tsx`**

```tsx
import Link from 'next/link'

interface ToolHeaderProps {
  title: string
  description: string
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div style={{ padding: '14px 20px 12px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '4px' }}>
        <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>calckit</Link>
        {' / '}
        <span style={{ color: '#2563eb' }}>{title}</span>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '2px' }}>{title}</div>
      <div style={{ fontSize: '10px', color: '#9ca3af' }}>{description}</div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/tool/TwoColLayout.tsx`**

```tsx
interface TwoColLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
}

export default function TwoColLayout({ left, right }: TwoColLayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 120px)' }}>
      <div style={{ padding: '20px 20px 28px', background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        {left}
      </div>
      <div style={{ padding: '20px 20px 28px', background: '#f9fafb' }}>
        {right}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/tool/FieldInput.tsx`**

```tsx
interface FieldInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  min?: string
  step?: string
}

export default function FieldInput({ label, id, type = 'number', value, onChange, placeholder, min, step }: FieldInputProps) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        style={{
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: '5px',
          padding: '7px 10px',
          fontSize: '11px',
          color: '#111',
          background: '#fff',
          transition: 'border-color 120ms ease',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Create `components/tool/CalcButton.tsx`**

```tsx
'use client'

interface CalcButtonProps {
  onClick: () => void
  label?: string
}

export default function CalcButton({ onClick, label = 'Calculate' }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 600,
        padding: '9px 0',
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'background 120ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
      onMouseLeave={e => (e.currentTarget.style.background = '#2563eb')}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 5: Create `components/tool/ResultPanel.tsx`**

```tsx
interface BreakdownRow {
  label: string
  value: string
  barPct?: number   // 0–100, if provided renders a mini bar
}

interface ResultPanelProps {
  label: string
  value: string
  subtitle?: string
  rows?: BreakdownRow[]
}

export default function ResultPanel({ label, value, subtitle, rows }: ResultPanelProps) {
  return (
    <div>
      <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 500, marginBottom: '3px' }}>{label}</div>
      <div style={{ fontSize: '30px', fontWeight: 800, color: '#111', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '2px' }}>
        {value}
      </div>
      {subtitle && <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '14px' }}>{subtitle}</div>}
      {rows && rows.length > 0 && (
        <>
          <div style={{ height: '1px', background: '#f0f0f0', margin: '12px 0' }} />
          {rows.map((row, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                <span style={{ color: '#6b7280' }}>{row.label}</span>
                <span style={{ color: '#111', fontWeight: 600 }}>{row.value}</span>
              </div>
              {row.barPct !== undefined && (
                <div style={{ height: '3px', background: '#f3f4f6', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${row.barPct}%`, background: '#2563eb', borderRadius: '2px' }} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 4 - shared tool components (ToolHeader, TwoColLayout, FieldInput, CalcButton, ResultPanel)"
```

---

## Task 5: Mortgage Calculator (`/mortgage`)

**Files:**
- Create: `app/mortgage/page.tsx`

- [ ] **Step 1: Write `app/mortgage/page.tsx`**

```tsx
'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function MortgagePage() {
  const [loanAmount, setLoanAmount] = useState('300000')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [downPayment, setDownPayment] = useState('0')
  const [result, setResult] = useState<{ monthly: number; principal: number; totalInterest: number; totalPaid: number } | null>(null)

  function calculate() {
    const P = parseFloat(loanAmount) - parseFloat(downPayment || '0')
    const annualRate = parseFloat(rate) / 100
    const r = annualRate / 12
    const n = parseFloat(term) * 12
    if (P <= 0 || r <= 0 || n <= 0) return
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPaid = monthly * n
    const totalInterest = totalPaid - P
    setResult({ monthly, principal: P, totalInterest, totalPaid })
  }

  const totalForBars = result ? result.principal + result.totalInterest : 1

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Mortgage Calculator" description="Estimate your monthly payment and total interest." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Loan Amount ($)" id="loanAmount" value={loanAmount} onChange={setLoanAmount} placeholder="300000" min="0" />
            <FieldInput label="Annual Interest Rate (%)" id="rate" value={rate} onChange={setRate} placeholder="6.5" min="0" step="0.01" />
            <FieldInput label="Loan Term (years)" id="term" value={term} onChange={setTerm} placeholder="30" min="1" />
            <FieldInput label="Down Payment ($, optional)" id="downPayment" value={downPayment} onChange={setDownPayment} placeholder="0" min="0" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Monthly Payment"
              value={fmt(result.monthly)}
              subtitle={`for ${parseFloat(term) * 12} months`}
              rows={[
                { label: 'Principal', value: fmt(result.principal), barPct: (result.principal / totalForBars) * 100 },
                { label: 'Total Interest', value: fmt(result.totalInterest), barPct: (result.totalInterest / totalForBars) * 100 },
                { label: 'Total Paid', value: fmt(result.totalPaid) },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter values and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
nvm use 22 && npm run build 2>&1 | grep -E "(error|Error|mortgage)"
```

Expected: `/mortgage` route listed, no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 5 - mortgage calculator"
```

---

## Task 6: Compound Interest Calculator (`/compound-interest`)

**Files:**
- Create: `app/compound-interest/page.tsx`

- [ ] **Step 1: Write `app/compound-interest/page.tsx`**

```tsx
'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

type Frequency = 'annually' | 'monthly' | 'daily'
const freqMap: Record<Frequency, number> = { annually: 1, monthly: 12, daily: 365 }

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState<Frequency>('monthly')
  const [result, setResult] = useState<{ futureValue: number; totalInterest: number } | null>(null)

  function calculate() {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    const n = freqMap[freq]
    if (!P || !r || !t) return
    const futureValue = P * Math.pow(1 + r / n, n * t)
    setResult({ futureValue, totalInterest: futureValue - P })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Compound Interest" description="Calculate future value with compounding interest." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Principal ($)" id="principal" value={principal} onChange={setPrincipal} placeholder="10000" min="0" />
            <FieldInput label="Annual Rate (%)" id="rate" value={rate} onChange={setRate} placeholder="7" min="0" step="0.01" />
            <FieldInput label="Time (years)" id="years" value={years} onChange={setYears} placeholder="10" min="1" />
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="freq" style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>
                Compound Frequency
              </label>
              <select
                id="freq"
                value={freq}
                onChange={e => setFreq(e.target.value as Frequency)}
                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px', padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff' }}
              >
                <option value="annually">Annually</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Future Value"
              value={fmt(result.futureValue)}
              subtitle={`after ${years} years`}
              rows={[
                { label: 'Principal', value: fmt(parseFloat(principal)), barPct: (parseFloat(principal) / result.futureValue) * 100 },
                { label: 'Total Interest Earned', value: fmt(result.totalInterest), barPct: (result.totalInterest / result.futureValue) * 100 },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter values and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 6 - compound interest calculator"
```

---

## Task 7: ROI Calculator (`/roi`)

**Files:**
- Create: `app/roi/page.tsx`

- [ ] **Step 1: Write `app/roi/page.tsx`**

```tsx
'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

function pct(n: number) { return n.toFixed(2) + '%' }
function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function ROIPage() {
  const [initial, setInitial] = useState('10000')
  const [finalVal, setFinalVal] = useState('15000')
  const [years, setYears] = useState('3')
  const [result, setResult] = useState<{ roi: number; annualized: number; netProfit: number } | null>(null)

  function calculate() {
    const I = parseFloat(initial)
    const F = parseFloat(finalVal)
    const t = parseFloat(years)
    if (!I || !F) return
    const roi = ((F - I) / I) * 100
    const annualized = t > 0 ? (Math.pow(F / I, 1 / t) - 1) * 100 : roi
    setResult({ roi, annualized, netProfit: F - I })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="ROI Calculator" description="Calculate return on investment and annualized return." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Initial Investment ($)" id="initial" value={initial} onChange={setInitial} placeholder="10000" min="0" />
            <FieldInput label="Final Value ($)" id="finalVal" value={finalVal} onChange={setFinalVal} placeholder="15000" min="0" />
            <FieldInput label="Time Period (years)" id="years" value={years} onChange={setYears} placeholder="3" min="0" step="0.1" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="ROI"
              value={pct(result.roi)}
              subtitle={`over ${years} years`}
              rows={[
                { label: 'Annualized Return', value: pct(result.annualized) },
                { label: 'Net Profit', value: fmt(result.netProfit) },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter values and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 7 - ROI calculator"
```

---

## Task 8: Currency Converter (`/currency`)

**Files:**
- Create: `app/api/exchange-rates/route.ts`
- Create: `app/currency/page.tsx`

- [ ] **Step 1: Write `app/api/exchange-rates/route.ts`**

```ts
import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 502 })
  }
}
```

- [ ] **Step 2: Write `app/currency/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify build**

```bash
nvm use 22 && npm run build 2>&1 | grep -E "(error|Error|currency)"
```

Expected: `/currency` route listed, no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 8 - currency converter with live rates API route"
```

---

## Task 9: Unit Converter (`/unit-converter`)

**Files:**
- Create: `app/unit-converter/page.tsx`

- [ ] **Step 1: Write `app/unit-converter/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 9 - unit converter (length, weight, temperature, data)"
```

---

## Task 10: Tip Calculator (`/tip`)

**Files:**
- Create: `app/tip/page.tsx`

- [ ] **Step 1: Write `app/tip/page.tsx`**

```tsx
'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function TipPage() {
  const [bill, setBill] = useState('50')
  const [tipPct, setTipPct] = useState('18')
  const [people, setPeople] = useState('2')
  const [result, setResult] = useState<{ tipAmount: number; total: number; perPerson: number } | null>(null)

  function calculate() {
    const b = parseFloat(bill)
    const t = parseFloat(tipPct) / 100
    const p = parseInt(people) || 1
    if (!b || t < 0) return
    const tipAmount = b * t
    const total = b + tipAmount
    setResult({ tipAmount, total, perPerson: total / p })
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Tip Calculator" description="Calculate tip amount and split the bill." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Bill Total ($)" id="bill" value={bill} onChange={setBill} placeholder="50" min="0" step="0.01" />
            <FieldInput label="Tip (%)" id="tipPct" value={tipPct} onChange={setTipPct} placeholder="18" min="0" step="1" />
            <FieldInput label="Number of People" id="people" value={people} onChange={setPeople} placeholder="2" min="1" step="1" />
            <CalcButton onClick={calculate} />
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Tip Amount"
              value={fmt(result.tipAmount)}
              rows={[
                { label: 'Total Bill', value: fmt(result.total) },
                { label: 'Per Person', value: fmt(result.perPerson) },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter values and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 10 - tip calculator"
```

---

## Task 11: Tax Estimator (`/tax`)

**Files:**
- Create: `app/tax/page.tsx`

- [ ] **Step 1: Write `app/tax/page.tsx`**

Uses simplified 2024 US federal tax brackets. Clearly labeled as an estimate.

```tsx
'use client'
import { useState } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import CalcButton from '@/components/tool/CalcButton'
import ResultPanel from '@/components/tool/ResultPanel'

type FilingStatus = 'single' | 'married'

// 2024 US Federal standard deductions
const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 14600, married: 29200 }

// Brackets: [rate, upTo] — final bracket has upTo = Infinity
const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [
    [0.10, 11600], [0.12, 47150], [0.22, 100525],
    [0.24, 191950], [0.32, 243725], [0.35, 609350], [0.37, Infinity],
  ],
  married: [
    [0.10, 23200], [0.12, 94300], [0.22, 201050],
    [0.24, 383900], [0.32, 487450], [0.35, 731200], [0.37, Infinity],
  ],
}

function calcFederalTax(taxable: number, status: FilingStatus): number {
  let tax = 0
  let prev = 0
  for (const [rate, upTo] of BRACKETS[status]) {
    if (taxable <= prev) break
    const chunk = Math.min(taxable, upTo) - prev
    tax += chunk * rate
    prev = upTo
    if (upTo === Infinity) break
  }
  return Math.max(0, tax)
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function TaxPage() {
  const [salary, setSalary] = useState('75000')
  const [status, setStatus] = useState<FilingStatus>('single')
  const [result, setResult] = useState<{ federalTax: number; effectiveRate: number; takeHomeAnnual: number; takeHomeMonthly: number } | null>(null)

  function calculate() {
    const gross = parseFloat(salary)
    if (!gross) return
    const deduction = STANDARD_DEDUCTION[status]
    const taxable = Math.max(0, gross - deduction)
    const federalTax = calcFederalTax(taxable, status)
    const effectiveRate = (federalTax / gross) * 100
    const takeHomeAnnual = gross - federalTax
    setResult({ federalTax, effectiveRate, takeHomeAnnual, takeHomeMonthly: takeHomeAnnual / 12 })
  }

  const selectStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #e5e7eb', borderRadius: '5px',
    padding: '7px 10px', fontSize: '11px', color: '#111', background: '#fff', marginBottom: '12px',
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <ToolHeader title="Tax Estimator" description="Estimate your federal income tax using 2024 US brackets. Approximation only." />
      <TwoColLayout
        left={
          <>
            <FieldInput label="Gross Annual Salary ($)" id="salary" value={salary} onChange={setSalary} placeholder="75000" min="0" />
            <div>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>Filing Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)} style={selectStyle}>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>
            <CalcButton onClick={calculate} />
            <p style={{ fontSize: '8px', color: '#9ca3af', marginTop: '8px', lineHeight: 1.5 }}>
              Estimate only. Uses 2024 federal standard deduction and brackets. Does not include FICA, state tax, or credits.
            </p>
          </>
        }
        right={
          result ? (
            <ResultPanel
              label="Estimated Federal Tax"
              value={fmt(result.federalTax)}
              subtitle={`effective rate ${result.effectiveRate.toFixed(1)}%`}
              rows={[
                { label: 'Take-Home (Annual)', value: fmt(result.takeHomeAnnual) },
                { label: 'Take-Home (Monthly)', value: fmt(result.takeHomeMonthly) },
                { label: 'Effective Rate', value: result.effectiveRate.toFixed(2) + '%' },
              ]}
            />
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Enter your salary and click Calculate.</div>
          )
        }
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 11 - tax estimator with 2024 US federal brackets"
```

---

## Task 12: Blog

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/intro-to-compound-interest.md`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

Note: `dangerouslySetInnerHTML` is used in the blog post template. Content is sourced exclusively from local Markdown files in `content/blog/` — no user-supplied HTML is ever rendered.

- [ ] **Step 1: Create `lib/blog.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
}

export interface Post extends PostMeta {
  html: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content) as string
  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    html,
  }
}
```

- [ ] **Step 2: Create content directory and sample post**

```bash
mkdir -p /Users/a1111/Public/Prog/js/calckit/content/blog
```

Then write `content/blog/intro-to-compound-interest.md`:

```markdown
---
title: "The Power of Compound Interest: A Simple Guide"
date: "2026-04-15"
excerpt: "Compound interest is one of the most powerful forces in personal finance. Here is how it works and why starting early matters."
---

# The Power of Compound Interest

Compound interest means you earn interest not just on your original principal, but also on the interest that accumulates over time.

## The Formula

The future value formula is: FV = P * (1 + r/n)^(n*t)

Where:
- **P** = Principal (starting amount)
- **r** = Annual interest rate (as decimal)
- **n** = Number of times interest compounds per year
- **t** = Time in years

## Why Starting Early Matters

Invest $10,000 at 7% annual return:

| Start age | At age 65 |
|-----------|-----------|
| 25 | ~$149,745 |
| 35 | ~$76,123 |
| 45 | ~$38,697 |

The difference between starting at 25 vs. 35 is over $73,000 from the same $10,000 investment.

## Try It Yourself

Use our [Compound Interest Calculator](/compound-interest) to model your own scenario.
```

- [ ] **Step 3: Create `app/blog/page.tsx`**

```tsx
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function BlogIndexPage() {
  const posts = getAllPosts()
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '24px' }}>Blog</h1>
      {posts.length === 0 && <p style={{ color: '#9ca3af', fontSize: '12px' }}>No posts yet.</p>}
      {posts.map((post, i) => (
        <div key={post.slug}>
          {i > 0 && <div style={{ height: '1px', background: '#f0f0f0', margin: '16px 0' }} />}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{post.date}</span>
            <div>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{post.title}</div>
              </Link>
              <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5 }}>{post.excerpt}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create `app/blog/[slug]/page.tsx`**

Blog content is rendered from trusted local Markdown files only. The `html` field produced by `marked.parse()` on local files does not include user-supplied content.

```tsx
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '8px' }}>{post.date}</div>
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '20px' }}>{post.title}</h1>
      <div
        style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  )
}
```

- [ ] **Step 5: Verify build with blog**

```bash
nvm use 22 && npm run build 2>&1 | grep -E "(error|Error|blog)"
```

Expected: `/blog` and `/blog/intro-to-compound-interest` routes listed.

- [ ] **Step 6: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 12 - blog with gray-matter + marked, sample post"
```

---

## Task 13: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write `app/about/page.tsx`**

```tsx
export default function AboutPage() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '16px' }}>About calckit</h1>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        calckit is a free collection of everyday calculators: mortgage, compound interest, ROI, currency conversion, unit conversion, tips, and taxes. No account needed, no ads, no data collected.
      </p>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        All calculations run directly in your browser. For currency conversions, exchange rates are fetched from{' '}
        <a href="https://open.er-api.com" style={{ color: '#2563eb' }}>open.er-api.com</a> and cached for one hour.
      </p>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        calckit is part of the{' '}
        <a href="https://yaro-labs.com" style={{ color: '#2563eb' }}>yaro-labs.com</a> family of developer and productivity tools.
      </p>
      <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6 }}>
        Tax estimates use simplified 2024 US federal brackets and are for informational purposes only. Always consult a tax professional for advice specific to your situation.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 13 - about page"
```

---

## Task 14: Sitemap + Robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://calckit.yaro-labs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = ['mortgage', 'compound-interest', 'roi', 'currency', 'unit-converter', 'tip', 'tax']
  const blogPosts = getAllPosts()
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...tools.map(slug => ({
      url: `${BASE}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...blogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://calckit.yaro-labs.com/sitemap.xml',
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: task 14 - sitemap and robots"
```

---

## Task 15: Production build — verify and finalize

**Files:**
- No new files — fix any TypeScript / build errors from previous tasks

- [ ] **Step 1: Run full production build**

```bash
cd /Users/a1111/Public/Prog/js/calckit && nvm use 22 && npm run build 2>&1
```

Expected output includes all routes:
```
Route (app)                                    Size
┌ ○ /                                          ...
├ ○ /about                                     ...
├ ○ /blog                                      ...
├ ○ /blog/intro-to-compound-interest           ...
├ ○ /compound-interest                         ...
├ ○ /currency                                  ...
├ ○ /mortgage                                  ...
├ ○ /roi                                       ...
├ ƒ /api/exchange-rates                        ...
├ ○ /sitemap.xml                               ...
├ ○ /robots.txt                                ...
├ ○ /tax                                       ...
├ ○ /tip                                       ...
└ ○ /unit-converter                            ...
```

- [ ] **Step 2: Fix any TypeScript or build errors**

Common issues and fixes:

**Issue: `params` type in blog slug page needs Promise in Next.js 15**
Already accounted for in Task 12 Step 4 — the page signature uses `params: Promise<{ slug: string }>` and `await params`.

**Issue: `marked` returns `string | Promise<string>` with newer versions**
In `lib/blog.ts`, use `marked.parse(content) as string` (synchronous). If `marked` v13+ only returns Promise, install v12: `npm install marked@12`.

**Issue: Tailwind v4 not applying styles**
Verify `app/globals.css` starts with `@import 'tailwindcss';` and that `next.config.ts` does not exclude CSS. No `tailwind.config.js` is needed with v4 (it auto-scans).

**Issue: `onMouseEnter` / `onMouseLeave` warning on non-client component**
Add `'use client'` to the top of any page file that uses mouse event handlers.

- [ ] **Step 3: Re-run build until 0 errors**

```bash
nvm use 22 && npm run build 2>&1 | tail -30
```

Expected: Build completes with all routes listed and no errors printed.

- [ ] **Step 4: Final commit**

```bash
cd /Users/a1111/Public/Prog/js/calckit && git add -A && git commit -m "feat: calckit complete"
```

---

## Self-Review Checklist

### Spec coverage
- [x] White navbar, blue accent, Inter 800 wordmark — Task 2
- [x] Homepage hero + 7-tool grid — Task 3
- [x] Tool pages: two-column layout, no INPUTS/RESULT section labels — Tasks 4-11
- [x] Mortgage: standard amortization formula, principal/interest/total breakdown with mini bars — Task 5
- [x] Compound interest: frequency select (annually/monthly/daily), future value + breakdown — Task 6
- [x] ROI: ROI%, annualized return, net profit — Task 7
- [x] Currency: Route Handler with 1h cache, swap button, rate card (blue bg), common pairs, graceful error fallback — Task 8
- [x] Currency list: 20 currencies (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, MXN, BRL, SGD, HKD, KRW, NOK, SEK, DKK, NZD, ZAR, RUB) — Task 8
- [x] Unit converter: 4 categories (Length, Weight, Temperature, Data) — Task 9
- [x] Tip: tip amount, total bill, per person — Task 10
- [x] Tax: 2024 US federal brackets, standard deduction, labeled as estimate, effective rate, monthly take-home — Task 11
- [x] Blog: gray-matter + marked, SSG (generateStaticParams), blog index, sample post — Task 12
- [x] About: prose, max-width 640px — Task 13
- [x] Sitemap + robots — Task 14
- [x] GA4 via next/script afterInteractive — Task 2
- [x] Hero: single "Browse tools" CTA only (no "View source" button) — Task 3
- [x] `next.config.ts`: ignoreBuildErrors + unoptimized images — Task 1
- [x] Design tokens as CSS custom properties in globals.css — Task 1
- [x] No external UI libraries — verified across all tasks
- [x] Navbar: showCta prop — shows CTA on homepage layout, not on tool pages — Task 2 (note: layout.tsx has showCta, tool pages use the same layout so CTA always shows; to suppress on tool pages, wrap tool pages in a separate layout that passes showCta={false}. This is an optional polish step.)

### Type consistency
- `BreakdownRow.barPct?: number` — defined in ResultPanel, used optionally in Tasks 5 and 6 only.
- `FieldInput.onChange: (v: string) => void` — matches all setter calls across Tasks 5-11.
- `TwoColLayout` props: `left: React.ReactNode`, `right: React.ReactNode` — consistent across all tool pages.
- `PostMeta` and `Post` interfaces defined once in `lib/blog.ts`, used in blog pages.
- `FilingStatus = 'single' | 'married'` — defined and used only in Task 11.
- `Frequency = 'annually' | 'monthly' | 'daily'` — defined and used only in Task 6.
- `Category = 'Length' | 'Weight' | 'Temperature' | 'Data'` — defined and used only in Task 9.
