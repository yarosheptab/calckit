# CalcKit Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all inline styles with Tailwind v4, adopt shadcn/ui primitives, and implement competitor-informed UX patterns across all 7 calculator tools and the homepage.

**Architecture:** Each tool page remains a server component wrapper (`page.tsx`) that renders a `'use client'` calculator component. Shared UI lives in `components/ui/` (shadcn/ui primitives) and `components/tool/` (domain components). Auto-compute replaces CalcButton everywhere.

**Tech Stack:** Next.js 16.2.3, React 19, TypeScript 5, Tailwind v4 (`@tailwindcss/postcss`), Radix UI (Tooltip, Accordion), lucide-react, class-variance-authority, tailwind-merge, clsx

---

## File Map

| File | Action |
|---|---|
| `package.json` | Add 5 deps: lucide-react, class-variance-authority, @radix-ui/react-tooltip, @radix-ui/react-accordion, tailwind-merge, clsx |
| `next.config.ts` | Remove `typescript: { ignoreBuildErrors: true }` |
| `.gitignore` | Add `.superpowers/` |
| `app/globals.css` | Rewrite — new Tailwind v4 theme tokens, remove .tool-grid/.two-col-layout |
| `app/layout.tsx` | Add JetBrains Mono font variable |
| `lib/utils.ts` | Create — `cn()` utility |
| `components/ui/button.tsx` | Create — shadcn/ui Button |
| `components/ui/input.tsx` | Create — shadcn/ui Input |
| `components/ui/label.tsx` | Create — shadcn/ui Label |
| `components/ui/tooltip.tsx` | Create — Radix Tooltip wrapper |
| `components/ui/accordion.tsx` | Create — Radix Accordion wrapper |
| `components/tool/TooltipIcon.tsx` | Create — 16px `?` circle with Radix Tooltip |
| `components/tool/SegmentedToggle.tsx` | Create — pill toggle replacing dropdowns and JS toggles |
| `components/tool/FieldInput.tsx` | Rewrite — prefix/suffix/tooltip props, Tailwind only |
| `components/tool/ResultPanel.tsx` | Rewrite — blue-tinted, mono numbers, breakdown rows, optional bar |
| `components/tool/TwoColLayout.tsx` | Rewrite — `grid-cols-[400px_1fr]`, sticky result, mobile single-col |
| `components/tool/ToolHeader.tsx` | Rewrite — breadcrumb, title, description |
| `components/tool/RelatedTools.tsx` | Create — chip links below input panel |
| `components/tool/CalcButton.tsx` | Delete — replaced by auto-compute |
| `components/Navbar.tsx` | Rewrite — Tailwind only, no CTA button, keep `'use client'` for pathname |
| `app/page.tsx` | Rewrite — server component, hero + live mini widget + tool grid |
| `app/mortgage/MortgageCalculator.tsx` | Rewrite — auto-compute, dual-unit toggles, accordion |
| `app/compound-interest/CompoundInterestCalculator.tsx` | Rewrite — auto-compute, segmented frequency toggle |
| `app/roi/ROICalculator.tsx` | Rewrite — auto-compute, 3-stat layout |
| `app/tip/TipCalculator.tsx` | Rewrite — auto-compute, segmented tip presets |
| `app/tax/TaxCalculator.tsx` | Rewrite — auto-compute, Single/Married toggle (preserve BRACKETS math) |
| `app/currency/CurrencyConverter.tsx` | Rewrite — auto-convert, spinner, retry button |
| `app/unit-converter/UnitConverterCalculator.tsx` | Rewrite — auto-compute, pill category tabs (preserve units math) |
| `app/blog/page.tsx` | Add proper `metadata` export |

---

## Task 1: Dependencies, gitignore, next.config

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Install new packages**

```bash
npm install lucide-react class-variance-authority @radix-ui/react-tooltip @radix-ui/react-accordion tailwind-merge clsx
```

Expected: packages added to `node_modules/`, `package.json` dependencies updated.

- [ ] **Step 2: Remove ignoreBuildErrors from next.config.ts**

Replace the file content:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 3: Add .superpowers/ to .gitignore**

Append to `.gitignore`:

```
# superpowers plugin working files
.superpowers/
```

- [ ] **Step 4: Verify build still passes**

```bash
npm run build
```

Expected: build succeeds (no TypeScript errors introduced yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts .gitignore
git commit -m "feat: add radix/lucide/cva deps, remove ignoreBuildErrors"
```

---

## Task 2: cn() utility and JetBrains Mono font

**Files:**
- Create: `lib/utils.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create lib/utils.ts**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Add JetBrains Mono to layout.tsx**

Replace the font import section at the top of `app/layout.tsx`:

```ts
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

Replace the `<html>` tag:

```tsx
<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts app/layout.tsx
git commit -m "feat: add cn() utility and JetBrains Mono font variable"
```

---

## Task 3: Design tokens (globals.css)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Rewrite globals.css**

```css
@import 'tailwindcss';

@theme {
  --font-sans: var(--font-inter), 'Inter', sans-serif;
  --font-mono: var(--font-mono), 'JetBrains Mono', monospace;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-sans);
  background: #f9fafb;
  color: #111827;
  -webkit-font-smoothing: antialiased;
}

input, select, button { font-family: inherit; }
```

Note: All layout classes (`.tool-grid`, `.two-col-layout`) are removed — layout is now handled by Tailwind utilities directly in components.

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: update globals.css with Tailwind v4 theme tokens"
```

---

## Task 4: shadcn/ui primitive components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/label.tsx`
- Create: `components/ui/tooltip.tsx`
- Create: `components/ui/accordion.tsx`

- [ ] **Step 1: Create components/ui/button.tsx**

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
        ghost: 'text-gray-500 hover:bg-gray-100',
      },
      size: {
        default: 'px-5 py-2.5',
        sm: 'px-3 py-1.5 text-xs',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

- [ ] **Step 2: Create components/ui/input.tsx**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[15px] font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
```

- [ ] **Step 3: Create components/ui/label.tsx**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium text-gray-700', className)}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
```

- [ ] **Step 4: Create components/ui/tooltip.tsx**

```tsx
'use client'
import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-[200px] rounded-md bg-gray-900 px-2 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95',
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

- [ ] **Step 5: Create components/ui/accordion.tsx**

```tsx
'use client'
import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-t border-gray-100', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center px-5 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className="ml-auto shrink-0 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('px-5 pb-5 pt-2 flex flex-col gap-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/
git commit -m "feat: add shadcn/ui Button, Input, Label, Tooltip, Accordion primitives"
```

---

## Task 5: Shared tool components

**Files:**
- Create: `components/tool/TooltipIcon.tsx`
- Create: `components/tool/SegmentedToggle.tsx`
- Rewrite: `components/tool/FieldInput.tsx`
- Rewrite: `components/tool/ResultPanel.tsx`
- Rewrite: `components/tool/TwoColLayout.tsx`
- Rewrite: `components/tool/ToolHeader.tsx`
- Create: `components/tool/RelatedTools.tsx`

- [ ] **Step 1: Create components/tool/TooltipIcon.tsx**

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function TooltipIcon({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 border border-gray-200 text-gray-400 text-[9px] font-bold cursor-help select-none">
            ?
          </span>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

- [ ] **Step 2: Create components/tool/SegmentedToggle.tsx**

```tsx
import { cn } from '@/lib/utils'

interface SegmentedToggleProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-md transition-all',
            value === opt
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Rewrite components/tool/FieldInput.tsx**

```tsx
import { Label } from '@/components/ui/label'
import { TooltipIcon } from './TooltipIcon'
import { cn } from '@/lib/utils'

interface FieldInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  prefix?: string
  suffix?: string
  tooltip?: string
  placeholder?: string
  type?: string
  min?: string
  step?: string
  id?: string
}

export default function FieldInput({
  label, value, onChange, prefix, suffix, tooltip, placeholder, type = 'number', min, step, id,
}: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="flex items-center gap-1.5">
        {label}
        {tooltip && <TooltipIcon text={tooltip} />}
      </Label>
      <div className="flex items-center h-11 border border-gray-200 rounded-lg bg-white overflow-hidden transition-all focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/10">
        {prefix && (
          <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-100 h-full flex items-center select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          className="flex-1 px-3 h-full text-[15px] font-medium text-gray-900 bg-transparent outline-none"
        />
        {suffix && (
          <span className="px-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-100 h-full flex items-center whitespace-nowrap select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Rewrite components/tool/ResultPanel.tsx**

```tsx
interface BreakdownRow {
  label: string
  value: string
}

interface BarData {
  pct: number
  left: string
  right: string
}

interface ResultPanelProps {
  label: string
  value: string
  subtitle?: string
  rows?: BreakdownRow[]
  bar?: BarData
}

export default function ResultPanel({ label, value, subtitle, rows, bar }: ResultPanelProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden sticky top-20">
      {/* Primary result */}
      <div className="px-6 pt-6 pb-5 border-b border-blue-100">
        <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-2">
          {label}
        </div>
        <div className="font-mono text-[52px] font-semibold text-blue-900 tracking-tight leading-none mb-1">
          {value}
        </div>
        {subtitle && <div className="text-sm text-blue-300">{subtitle}</div>}
      </div>

      {/* Breakdown rows */}
      {rows && rows.length > 0 && (
        <div className="bg-white px-6 py-1">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm text-gray-500">{row.label}</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Optional progress bar */}
      {bar && (
        <div className="bg-white px-6 pb-5">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, bar.pct))}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-blue-600 font-semibold">{bar.left}</span>
            <span className="text-xs text-gray-400 font-semibold">{bar.right}</span>
          </div>
        </div>
      )}
    </div>
  )
}
```

Note: The `style={{ width }}` on the bar div is intentional — dynamic percentages can't be expressed as static Tailwind classes. This is the only permitted `style={}` prop.

- [ ] **Step 5: Rewrite components/tool/TwoColLayout.tsx**

```tsx
interface TwoColLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
}

export default function TwoColLayout({ left, right }: TwoColLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6 max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-5">{left}</div>
      <div>{right}</div>
    </div>
  )
}
```

- [ ] **Step 6: Rewrite components/tool/ToolHeader.tsx**

```tsx
import Link from 'next/link'

interface ToolHeaderProps {
  title: string
  description: string
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
      <div className="text-sm text-gray-400 mb-3">
        <Link href="/" className="hover:text-gray-600 transition-colors">calckit</Link>
        {' / '}
        <span>{title}</span>
      </div>
      <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
        {title}
      </h1>
      <p className="text-[15px] text-gray-500 leading-relaxed max-w-lg">{description}</p>
    </div>
  )
}
```

- [ ] **Step 7: Create components/tool/RelatedTools.tsx**

```tsx
import Link from 'next/link'

interface RelatedTool {
  name: string
  href: string
}

export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="mt-5">
      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
        Related tools
      </span>
      <div className="flex gap-2 mt-2.5 flex-wrap">
        {tools.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className="text-sm font-medium text-gray-600 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {t.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: build passes (no TypeScript errors from new components).

- [ ] **Step 9: Commit**

```bash
git add components/tool/ components/ui/
git commit -m "feat: rewrite shared tool components with Tailwind, add SegmentedToggle/TooltipIcon/RelatedTools"
```

---

## Task 6: Navbar rewrite

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx**

Keep `'use client'` because `usePathname` is needed for active link state, but remove conditional CTA button per spec.

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/#tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="h-[58px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/" className="no-underline">
        <span className="text-[17px] font-extrabold tracking-tight text-gray-900">
          calc<span className="text-blue-600">kit</span>
        </span>
      </Link>
      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors',
              pathname === href || (href === '/blog' && pathname.startsWith('/blog'))
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: rewrite Navbar with Tailwind, remove CTA button"
```

---

## Task 7: Homepage rewrite

**Files:**
- Modify: `app/page.tsx`

The homepage becomes a server component. The live mini calculator widget requires client interactivity, so it is extracted to `app/_components/HeroWidget.tsx` (a `'use client'` component).

- [ ] **Step 1: Create app/_components/HeroWidget.tsx**

This is the live mini calculator widget shown in the hero. Four tabs (Mortgage, Compound, ROI, Tip), auto-computing on every input change.

```tsx
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
```

- [ ] **Step 2: Rewrite app/page.tsx as server component**

```tsx
import Link from 'next/link'
import { Home, TrendingUp, BarChart2, Receipt, ArrowLeftRight, Ruler, UtensilsCrossed } from 'lucide-react'
import { HeroWidget } from './_components/HeroWidget'

const FINANCE_TOOLS = [
  {
    name: 'Mortgage Calculator',
    desc: 'Monthly payment, total interest & amortization',
    href: '/mortgage',
    icon: Home,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    name: 'Compound Interest',
    desc: 'Future value with compounding and contributions',
    href: '/compound-interest',
    icon: TrendingUp,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    name: 'ROI Calculator',
    desc: 'Return on investment and annualized return',
    href: '/roi',
    icon: BarChart2,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    name: 'Tax Estimator',
    desc: 'Federal income tax and take-home pay',
    href: '/tax',
    icon: Receipt,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
]

const EVERYDAY_TOOLS = [
  {
    name: 'Currency Converter',
    desc: 'Live exchange rates, 170+ currencies',
    href: '/currency',
    icon: ArrowLeftRight,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    name: 'Unit Converter',
    desc: 'Length, weight, temperature, data',
    href: '/unit-converter',
    icon: Ruler,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    name: 'Tip Calculator',
    desc: 'Split bills and calculate tip amounts',
    href: '/tip',
    icon: UtensilsCrossed,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
  },
]

interface Tool {
  name: string; desc: string; href: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string; iconColor: string
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} className="no-underline group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 transition-colors hover:border-blue-300 hover:shadow-sm">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${tool.iconBg} mb-3`}>
          <Icon className={`w-4 h-4 ${tool.iconColor}`} />
        </div>
        <div className="text-[15px] font-bold text-gray-900 mb-1">{tool.name}</div>
        <div className="text-[13px] text-gray-400 leading-relaxed mb-3">{tool.desc}</div>
        <span className="text-xs font-semibold text-blue-600">Open →</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-4">
            Free calculators — no account, no ads
          </p>
          <h1 className="text-[44px] font-extrabold tracking-tight text-gray-900 leading-tight mb-5">
            Built for<br />
            <span className="text-blue-600">everyday math.</span>
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-sm mb-8">
            Mortgage, interest, ROI, currency, units, tips and tax — precise answers in seconds, no account needed.
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Browse all tools →
          </Link>
        </div>
        <div>
          <HeroWidget />
        </div>
      </section>

      {/* Tool Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Finance</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FINANCE_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Everyday</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVERYDAY_TOOLS.map(t => <ToolCard key={t.href} tool={t} />)}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Verify build and run dev server**

```bash
npm run build
```

Expected: build passes. Then verify visually:

```bash
npm run dev
```

Open `http://localhost:3000` and check: hero two-column layout, live mini widget tabs computing, tool grid cards with colored icons.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/_components/
git commit -m "feat: rewrite homepage as server component with hero widget and tool grid"
```

---

## Task 8: Delete CalcButton

**Files:**
- Delete: `components/tool/CalcButton.tsx`

- [ ] **Step 1: Delete CalcButton.tsx**

```bash
rm components/tool/CalcButton.tsx
```

Do NOT do this until all calculator rewrites are complete (Tasks 9–15 import it until rewritten). This task is a placeholder — run it after Task 15.

---

## Task 9: Mortgage Calculator rewrite

**Files:**
- Modify: `app/mortgage/MortgageCalculator.tsx`

- [ ] **Step 1: Rewrite MortgageCalculator.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'ROI Calculator', href: '/roi' },
  { name: 'Tax Estimator', href: '/tax' },
]

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downPayment, setDownPayment] = useState('20')
  const [downMode, setDownMode] = useState('%')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [termMode, setTermMode] = useState('yr')
  // Advanced
  const [propTax, setPropTax] = useState('1.2')
  const [hoa, setHoa] = useState('0')
  const [insurance, setInsurance] = useState('1200')
  const [pmi, setPmi] = useState('0.5')

  const [result, setResult] = useState<{
    monthly: number; principal: number; totalInterest: number; totalCost: number
    withExtras: number
  } | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const price = parseFloat(homePrice) || 0
      const dp = downMode === '%'
        ? price * (parseFloat(downPayment) || 0) / 100
        : parseFloat(downPayment) || 0
      const P = price - dp
      const annualRate = (parseFloat(rate) || 0) / 100
      const r = annualRate / 12
      const termMonths = termMode === 'yr'
        ? (parseFloat(term) || 0) * 12
        : parseFloat(term) || 0
      if (P <= 0 || r <= 0 || termMonths <= 0) return
      const monthly = (P * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)
      const totalCost = monthly * termMonths
      const totalInterest = totalCost - P
      const monthlyExtras =
        (price * (parseFloat(propTax) || 0)) / 100 / 12 +
        (parseFloat(hoa) || 0) +
        (parseFloat(insurance) || 0) / 12 +
        (P * (parseFloat(pmi) || 0)) / 100 / 12
      setResult({ monthly, principal: P, totalInterest, totalCost, withExtras: monthly + monthlyExtras })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [homePrice, downPayment, downMode, rate, term, termMode, propTax, hoa, insurance, pmi])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Home Price" prefix="$" value={homePrice} onChange={setHomePrice} id="homePrice" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Down Payment</span>
              <SegmentedToggle options={['%', '$']} value={downMode} onChange={setDownMode} />
            </div>
            <FieldInput
              label=""
              prefix={downMode === '$' ? '$' : undefined}
              suffix={downMode === '%' ? '%' : undefined}
              value={downPayment}
              onChange={setDownPayment}
              id="downPayment"
            />
          </div>
          <FieldInput
            label="Interest Rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            id="rate"
            tooltip="Annual percentage rate (APR) on the loan"
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Loan Term</span>
              <SegmentedToggle options={['yr', 'mo']} value={termMode} onChange={setTermMode} />
            </div>
            <FieldInput
              label=""
              suffix={termMode}
              value={term}
              onChange={setTerm}
              id="term"
            />
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Add taxes, insurance & PMI</AccordionTrigger>
            <AccordionContent>
              <FieldInput label="Property Tax" suffix="% / yr" value={propTax} onChange={setPropTax} id="propTax" tooltip="Annual property tax as a percentage of home value" />
              <FieldInput label="HOA Fee" prefix="$" suffix="/ mo" value={hoa} onChange={setHoa} id="hoa" />
              <FieldInput label="Home Insurance" prefix="$" suffix="/ yr" value={insurance} onChange={setInsurance} id="insurance" />
              <FieldInput label="PMI" suffix="%" value={pmi} onChange={setPmi} id="pmi" tooltip="Private mortgage insurance — typically required when down payment is below 20%" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Monthly Payment"
      value={fmt(result.monthly)}
      subtitle={result.withExtras > result.monthly ? `${fmt(result.withExtras)} with taxes & insurance` : `for ${termMode === 'yr' ? parseFloat(term) * 12 : parseFloat(term)} months`}
      rows={[
        { label: 'Loan Amount', value: fmt(result.principal) },
        { label: 'Total Interest', value: fmt(result.totalInterest) },
        { label: 'Total Cost', value: fmt(result.totalCost) },
      ]}
      bar={{
        pct: (result.principal / result.totalCost) * 100,
        left: 'Principal ' + ((result.principal / result.totalCost) * 100).toFixed(0) + '%',
        right: 'Interest ' + ((result.totalInterest / result.totalCost) * 100).toFixed(0) + '%',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Mortgage Calculator" description="Estimate your monthly payment, total interest, and true cost of your loan." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: passes. Visually verify on `http://localhost:3000/mortgage` — auto-compute fires on input change, bar updates, accordion opens.

- [ ] **Step 3: Commit**

```bash
git add app/mortgage/MortgageCalculator.tsx
git commit -m "feat: rewrite Mortgage calculator with auto-compute, toggles, accordion"
```

---

## Task 10: Compound Interest Calculator rewrite

**Files:**
- Modify: `app/compound-interest/CompoundInterestCalculator.tsx`

- [ ] **Step 1: Rewrite CompoundInterestCalculator.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

type Frequency = 'Daily' | 'Monthly' | 'Annually'
const freqMap: Record<Frequency, number> = { Daily: 365, Monthly: 12, Annually: 1 }

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Mortgage Calculator', href: '/mortgage' },
  { name: 'ROI Calculator', href: '/roi' },
]

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState<Frequency>('Monthly')
  const [contribution, setContribution] = useState('0')

  const [result, setResult] = useState<{ futureValue: number; totalInterest: number; totalContributions: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const P = parseFloat(principal) || 0
      const r = (parseFloat(rate) || 0) / 100
      const t = parseFloat(years) || 0
      const n = freqMap[freq]
      const pmt = parseFloat(contribution) || 0
      if (!P || !r || !t) return
      const fvPrincipal = P * Math.pow(1 + r / n, n * t)
      const fvContrib = pmt > 0
        ? pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
        : 0
      const futureValue = fvPrincipal + fvContrib
      const totalContributions = pmt * 12 * t
      setResult({ futureValue, totalInterest: futureValue - P - totalContributions, totalContributions })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [principal, rate, years, freq, contribution])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Principal" prefix="$" value={principal} onChange={setPrincipal} id="principal" />
          <FieldInput label="Annual Rate" suffix="%" value={rate} onChange={setRate} id="rate" />
          <FieldInput label="Time Period" suffix="years" value={years} onChange={setYears} id="years" />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Compounding & contributions</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-gray-700">Compounding Frequency</span>
                <SegmentedToggle options={['Daily', 'Monthly', 'Annually']} value={freq} onChange={v => setFreq(v as Frequency)} />
              </div>
              <FieldInput label="Monthly Contribution" prefix="$" suffix="/ mo" value={contribution} onChange={setContribution} id="contribution" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Future Value"
      value={fmt(result.futureValue)}
      subtitle={`after ${years} years`}
      rows={[
        { label: 'Principal', value: fmt(parseFloat(principal) || 0) },
        ...(result.totalContributions > 0 ? [{ label: 'Total Contributions', value: fmt(result.totalContributions) }] : []),
        { label: 'Total Interest Earned', value: fmt(result.totalInterest) },
      ]}
      bar={{
        pct: ((parseFloat(principal) || 0) / result.futureValue) * 100,
        left: 'Principal',
        right: 'Interest',
      }}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Compound Interest Calculator" description="Calculate future value with compounding interest and optional monthly contributions." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/compound-interest/CompoundInterestCalculator.tsx
git commit -m "feat: rewrite Compound Interest calculator with auto-compute and frequency toggle"
```

---

## Task 11: ROI Calculator rewrite

**Files:**
- Modify: `app/roi/ROICalculator.tsx`

- [ ] **Step 1: Rewrite ROICalculator.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'

function pct(n: number) { return n.toFixed(2) + '%' }
function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const RELATED = [
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'Mortgage Calculator', href: '/mortgage' },
]

export default function ROIPage() {
  const [initial, setInitial] = useState('10000')
  const [finalVal, setFinalVal] = useState('15000')
  const [years, setYears] = useState('3')

  const [result, setResult] = useState<{ roi: number; annualized: number; netProfit: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const I = parseFloat(initial) || 0
      const F = parseFloat(finalVal) || 0
      const t = parseFloat(years) || 0
      if (!I || !F) return
      const roi = ((F - I) / I) * 100
      const annualized = t > 0 ? (Math.pow(F / I, 1 / t) - 1) * 100 : roi
      setResult({ roi, annualized, netProfit: F - I })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [initial, finalVal, years])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Initial Investment" prefix="$" value={initial} onChange={setInitial} id="initial" />
          <FieldInput label="Final Value" prefix="$" value={finalVal} onChange={setFinalVal} id="finalVal" />
          <FieldInput label="Time Period" suffix="years" value={years} onChange={setYears} id="years" />
        </div>
      </div>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
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
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your details to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="ROI Calculator" description="Calculate return on investment, annualized return, and net profit." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/roi/ROICalculator.tsx
git commit -m "feat: rewrite ROI calculator with auto-compute"
```

---

## Task 12: Tip Calculator rewrite

**Files:**
- Modify: `app/tip/TipCalculator.tsx`

- [ ] **Step 1: Rewrite TipCalculator.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

const TIP_PRESETS = ['10', '15', '18', '20', 'Custom']
const RELATED = [
  { name: 'Currency Converter', href: '/currency' },
  { name: 'Tax Estimator', href: '/tax' },
]

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
      const b = parseFloat(bill) || 0
      const t = (parseFloat(activeTipPct) || 0) / 100
      const p = parseInt(people) || 1
      if (!b || t < 0) return
      const tipAmount = b * t
      const total = b + tipAmount
      setResult({ tipAmount, total, perPerson: total / p })
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
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tip/TipCalculator.tsx
git commit -m "feat: rewrite Tip calculator with auto-compute and segmented tip presets"
```

---

## Task 13: Tax Estimator rewrite

**Files:**
- Modify: `app/tax/TaxCalculator.tsx`

- [ ] **Step 1: Rewrite TaxCalculator.tsx**

The `BRACKETS` and `STANDARD_DEDUCTION` constants and `calcFederalTax` function are preserved exactly.

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { SegmentedToggle } from '@/components/tool/SegmentedToggle'
import { RelatedTools } from '@/components/tool/RelatedTools'

type FilingStatus = 'single' | 'married'

const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 14600, married: 29200 }

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

const RELATED = [
  { name: 'Mortgage Calculator', href: '/mortgage' },
  { name: 'ROI Calculator', href: '/roi' },
  { name: 'Tip Calculator', href: '/tip' },
]

export default function TaxPage() {
  const [salary, setSalary] = useState('75000')
  const [status, setStatus] = useState<FilingStatus>('single')

  const [result, setResult] = useState<{
    federalTax: number; effectiveRate: number; takeHomeAnnual: number; takeHomeMonthly: number
  } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const gross = parseFloat(salary) || 0
      if (!gross) return
      const deduction = STANDARD_DEDUCTION[status]
      const taxable = Math.max(0, gross - deduction)
      const federalTax = calcFederalTax(taxable, status)
      const effectiveRate = (federalTax / gross) * 100
      const takeHomeAnnual = gross - federalTax
      setResult({ federalTax, effectiveRate, takeHomeAnnual, takeHomeMonthly: takeHomeAnnual / 12 })
    }, 150)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [salary, status])

  const inputPanel = (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Your details</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <FieldInput label="Annual Income" prefix="$" value={salary} onChange={setSalary} id="salary" />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Filing Status</span>
            <SegmentedToggle
              options={['single', 'married']}
              value={status}
              onChange={v => setStatus(v as FilingStatus)}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed px-1">
        Estimate only — uses 2024 federal standard deduction and brackets. Does not include state tax, FICA, or credits.
      </p>
      <RelatedTools tools={RELATED} />
    </>
  )

  const resultPanel = result ? (
    <ResultPanel
      label="Federal Tax"
      value={fmt(result.federalTax)}
      subtitle={`effective rate ${result.effectiveRate.toFixed(1)}%`}
      rows={[
        { label: 'Take-Home (Annual)', value: fmt(result.takeHomeAnnual) },
        { label: 'Take-Home (Monthly)', value: fmt(result.takeHomeMonthly) },
        { label: 'Effective Rate', value: result.effectiveRate.toFixed(2) + '%' },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter your income to see the result.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Tax Estimator" description="Estimate your US federal income tax using 2024 brackets and standard deduction." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tax/TaxCalculator.tsx
git commit -m "feat: rewrite Tax Estimator with auto-compute and filing status toggle"
```

---

## Task 14: Currency Converter rewrite

**Files:**
- Modify: `app/currency/CurrencyConverter.tsx`

- [ ] **Step 1: Rewrite CurrencyConverter.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeftRight, RefreshCw, Loader2 } from 'lucide-react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Label } from '@/components/ui/label'

const CURRENCIES = [
  'USD','EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR','MXN',
  'BRL','SGD','HKD','KRW','NOK','SEK','DKK','NZD','ZAR','RUB',
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
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/currency/CurrencyConverter.tsx
git commit -m "feat: rewrite Currency Converter with auto-convert, spinner, retry button"
```

---

## Task 15: Unit Converter rewrite

**Files:**
- Modify: `app/unit-converter/UnitConverterCalculator.tsx`

- [ ] **Step 1: Rewrite UnitConverterCalculator.tsx**

The `units` map (toBase/fromBase functions) is preserved exactly.

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import ToolHeader from '@/components/tool/ToolHeader'
import TwoColLayout from '@/components/tool/TwoColLayout'
import FieldInput from '@/components/tool/FieldInput'
import ResultPanel from '@/components/tool/ResultPanel'
import { RelatedTools } from '@/components/tool/RelatedTools'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

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
                    'px-3.5 py-1.5 text-sm font-medium rounded-lg border transition-colors',
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

  const resultPanel = result !== null ? (
    <ResultPanel
      label="Converted Value"
      value={result}
      subtitle={`${value} ${catUnits[fromIdx].label} = ${result} ${catUnits[toIdx].label}`}
      rows={[
        { label: 'Reverse', value: `${parseFloat(parseFloat(catUnits[fromIdx].fromBase(catUnits[toIdx].toBase(parseFloat(result) || 0)).toPrecision(7)).toString())} ${catUnits[fromIdx].label}` },
      ]}
    />
  ) : (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-300 font-medium">
      Enter a value to convert.
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToolHeader title="Unit Converter" description="Convert between length, weight, temperature, and data units." />
      <TwoColLayout left={inputPanel} right={resultPanel} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/unit-converter/UnitConverterCalculator.tsx
git commit -m "feat: rewrite Unit Converter with auto-compute and pill category tabs"
```

---

## Task 16: Delete CalcButton and final cleanup

**Files:**
- Delete: `components/tool/CalcButton.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Delete CalcButton.tsx**

Verify no imports remain first:

```bash
grep -r "CalcButton" app/ components/
```

Expected: zero matches (all calculators now use auto-compute). Then:

```bash
rm components/tool/CalcButton.tsx
```

- [ ] **Step 2: Add metadata to blog/page.tsx**

Read the current blog page first, then add metadata export:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — calckit',
  description: 'Articles about personal finance, math, and everyday calculations.',
}
```

Add this at the top of `app/blog/page.tsx` before the default export.

- [ ] **Step 3: Final build verification**

```bash
npm run build
```

Expected: clean build, zero TypeScript errors, zero unused imports.

- [ ] **Step 4: Visual smoke test**

```bash
npm run dev
```

Verify each route loads and auto-computes correctly:
- `http://localhost:3000` — hero widget tabs, tool grid
- `http://localhost:3000/mortgage` — auto-compute, down payment toggle, accordion
- `http://localhost:3000/compound-interest` — frequency accordion
- `http://localhost:3000/roi` — 3 stat rows
- `http://localhost:3000/tip` — segmented tip presets
- `http://localhost:3000/tax` — filing status toggle
- `http://localhost:3000/currency` — loading spinner, auto-convert
- `http://localhost:3000/unit-converter` — category pill tabs

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: delete CalcButton, add blog metadata, complete rewrite"
```

---

## Spec Coverage Self-Check

| Spec Requirement | Task |
|---|---|
| Replace all inline styles with Tailwind v4 | Tasks 5–15 |
| shadcn/ui Button, Input, Label, Tooltip, Accordion | Task 4 |
| JetBrains Mono for result numbers | Task 2 (font var) + Task 5 ResultPanel (font-mono class) |
| Auto-compute via useEffect 150ms debounce | Tasks 9–15 |
| Blue-tinted ResultPanel | Task 5 |
| Dual-unit toggles (% / $, yr / mo) | Task 9 (Mortgage) |
| Segmented toggle for filing status | Task 13 (Tax) |
| Segmented tip presets | Task 12 (Tip) |
| Compounding frequency accordion toggle | Task 10 (Compound) |
| Tooltip icons on jargon fields | Task 9 (rate, pmi, propTax) |
| Advanced options accordion | Tasks 9, 10 |
| Homepage server component (remove 'use client') | Task 7 |
| Hero two-column with live mini widget | Task 7 |
| Colored icon blocks on tool cards | Task 7 |
| Finance 4-col + Everyday 3-col grids | Task 7 |
| RelatedTools chip links | All calculator tasks |
| Navbar rewrite, no CTA button | Task 6 |
| Remove ignoreBuildErrors | Task 1 |
| Add .superpowers/ to .gitignore | Task 1 |
| Currency: spinner + retry button | Task 14 |
| Unit Converter: pill category tabs | Task 15 |
| No onMouseEnter/onMouseLeave anywhere | Tasks 6, 7 |
| No inline style={} anywhere (except bar width) | All tasks |
| Blog metadata | Task 16 |
