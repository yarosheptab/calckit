# CalcKit Rewrite — Design Spec
**Date:** 2026-04-17  
**Status:** Approved

---

## Overview

Full rewrite of calckit.yaro-labs.com — a 7-tool free calculator site. Goals: replace all inline styles with Tailwind v4, adopt shadcn/ui primitives, implement competitor-informed UX patterns, and ship a design that is clean, modern, accessible to typical users, and distinctly not AI-generic.

All existing features and SEO infrastructure are preserved.

---

## Design Principles

- **Functional over decorative** — the product is the tool, not the landing page
- **Typical user first** — clear affordances, comfortable sizing, obvious interactive elements
- **Numbers deserve respect** — JetBrains Mono for all numeric outputs; they should feel precise
- **Result is the hero** — the blue-tinted result panel signals "this is your answer" visually
- **No AI tells** — no trust badge pills, no lift-shadow card hovers, no gradient soup

---

## Visual Foundation

| Token | Value |
|---|---|
| Page background | `#f9fafb` (slate-50) |
| Surface | `#ffffff` |
| Border | `#e5e7eb` (gray-200) |
| Heading | `#111827` (gray-900) |
| Body text | `#374151` (gray-700) |
| Muted text | `#6b7280` (gray-500) |
| Subtle text | `#9ca3af` (gray-400) |
| Accent | `#2563eb` (blue-600) |
| Accent hover | `#1d4ed8` (blue-700) |
| Result bg | `#eff6ff` (blue-50) |
| Result border | `#bfdbfe` (blue-200) |
| Result heading | `#1e3a8a` (blue-900) |
| Result label | `#60a5fa` (blue-400) |

**Typography:**
- UI font: Inter (all weights via `next/font/google`)
- Number font: JetBrains Mono — used exclusively for result numbers and breakdown values in ResultPanel. Input fields use Inter (standard text).
- Base size: 14–15px body, 28–30px tool title, 44px hero headline, 52–54px primary result number

**Radii:** `rounded-xl` (12px) panels, `rounded-lg` (10px) inputs, `rounded-2xl` (16px) hero widget  
**Shadows:** `shadow-sm` default panels, `shadow-xl` on hero widget only  
**No inline `style={}` props anywhere** — all styling via Tailwind v4 utilities

---

## Dependencies (new)

| Package | Purpose |
|---|---|
| `lucide-react` | SVG icons (tooltip `?`, chevron, swap, spinner) |
| `class-variance-authority` | Component variant typing |
| `@radix-ui/react-tooltip` | Accessible tooltip on `?` fields |
| `@radix-ui/react-accordion` | Advanced options accordion |
| `tailwind-merge` + `clsx` | `cn()` utility |

shadcn/ui components added to `components/ui/`: `Button`, `Input`, `Label`, `Tooltip`, `Accordion`.

---

## Homepage

**Route:** `app/page.tsx` — server component (no `'use client'`)  
**All hover states via CSS only** — no JS event handlers

### Nav
- Height 58px, white, `border-b border-gray-200`, sticky
- Wordmark: `calc` + `kit` (blue), 17px, `font-extrabold`, `tracking-tight`
- Links: Tools, Blog, About — `text-sm text-gray-500 font-medium`, hover `bg-gray-100 rounded-lg`
- No CTA button

### Hero (two-column)
**Left column:**
- Eyebrow: `text-sm font-semibold text-gray-500` — "Free calculators — no account, no ads"
- Headline: 44px `font-extrabold tracking-tight` — "Built for everyday math." with "everyday math." in `text-blue-600`
- Description: 16px `text-gray-500 leading-relaxed` max-w ~380px
- CTA button: `bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl` — "Browse all tools →"

**Right column — Live Mini Calculator Widget:**
- White card, `rounded-2xl border border-gray-200 shadow-xl overflow-hidden`
- Tab bar (4 tabs): Mortgage, Compound, ROI, Tip — `text-xs font-semibold`, active tab has `text-blue-600 border-b-2 border-blue-600`
- Input fields: 38px height, `rounded-lg border border-gray-200`, prefix/suffix separators
- Result card: `bg-blue-50 border border-blue-200 rounded-xl` — JetBrains Mono number, `text-blue-900`
- "Open full calculator →" link at bottom
- Auto-computes on every input change (no debounce needed — all math is synchronous)
- Each tab shows a different mini calculator (Mortgage, Compound Interest, ROI, Tip)

### Tool Grid
Two sections with divider labels:

**Finance** (4-column grid):  
Mortgage · Compound Interest · ROI Calculator · Tax Estimator

**Everyday** (3-column grid):  
Currency Converter · Unit Converter · Tip Calculator

**Card anatomy:**
- `bg-white border border-gray-200 rounded-xl p-5` 
- Hover: `border-blue-300 shadow-sm` (CSS only, no transform)
- 32px tinted icon block: `rounded-lg p-2` with per-tool background/color pair (see table below)
- Tool name: `text-[15px] font-bold text-gray-900`
- Description: `text-[13px] text-gray-400 leading-relaxed`
- "Open →" link: `text-xs font-semibold text-blue-600 mt-3`

**Icon color pairs:**
| Tool | Background | Color |
|---|---|---|
| Mortgage | `bg-blue-100` | `text-blue-700` |
| Compound Interest | `bg-green-100` | `text-green-700` |
| ROI | `bg-indigo-100` | `text-indigo-700` |
| Tax | `bg-amber-100` | `text-amber-700` |
| Currency | `bg-teal-100` | `text-teal-700` |
| Unit Converter | `bg-purple-100` | `text-purple-700` |
| Tip | `bg-rose-100` | `text-rose-700` |

Icons from `lucide-react`: Home, TrendingUp, BarChart2, Receipt, ArrowLeftRight, Ruler, UtensilsCrossed.

---

## Tool Page Layout

**All 7 tools follow the same structure.**

### Page wrapper (`app/[tool]/page.tsx`)
- Server component
- Exports `metadata` and JSON-LD schema (unchanged from current)
- Renders `<ToolName />` client component

### Client component (`app/[tool]/ToolName.tsx`)
- `'use client'`
- All state and calculation logic lives here
- Auto-computes via `useEffect` watching all input state, 150ms debounce (prevents thrashing on fast typing; hero widget skips debounce since all its math is synchronous)

### Layout
```
[Breadcrumb]
[Tool Title] [Tool Description]

[grid: 400px | 1fr]
  Left: InputPanel      Right: ResultPanel (sticky top-[80px])
  Related tools chips
```

### Breadcrumb
`text-sm text-gray-400` — `calckit / Tool Name`, link on "calckit"

### InputPanel
```
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
  <div class="px-5 pt-5 pb-0">
    <span class="text-[11px] font-bold uppercase tracking-widest text-gray-400">
      Your details
    </span>
  </div>
  <div class="p-5 flex flex-col gap-4">
    [fields]
  </div>
  [AdvancedAccordion]
</div>
```

### FieldInput component (`components/tool/FieldInput.tsx`)
Props: `label`, `value`, `onChange`, `prefix?`, `suffix?`, `tooltip?`

```
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
    {label}
    {tooltip && <TooltipIcon text={tooltip} />}
  </label>
  <div class="flex items-center h-11 border-1.5 border-gray-200 rounded-lg 
              bg-white overflow-hidden
              focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/10
              transition-all">
    {prefix && <span class="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-100 h-full flex items-center">{prefix}</span>}
    <input class="flex-1 px-3 h-full text-[15px] font-medium text-gray-900 bg-transparent outline-none" />
    {suffix && <span class="px-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-100 h-full flex items-center whitespace-nowrap">{suffix}</span>}
  </div>
</div>
```

### SegmentedToggle component (`components/tool/SegmentedToggle.tsx`)
Used for: % / $ (down payment), yr / mo (loan term), Single / Married (tax), compounding frequency.

```
<div class="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
  {options.map(opt => (
    <button class={active === opt
      ? "bg-white text-gray-900 shadow-sm rounded-md px-3 py-1.5 text-xs font-semibold"
      : "text-gray-400 px-3 py-1.5 text-xs font-semibold"
    }>
  ))}
</div>
```

### AdvancedAccordion (Radix)
- Trigger: `"▾ Add taxes, insurance & PMI"` — `text-sm text-gray-500 font-medium border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 hover:bg-gray-50`
- Content: slides in, same field components

### TooltipIcon (`components/tool/TooltipIcon.tsx`)
- 16px circle, `bg-gray-100 border border-gray-200 text-gray-400 text-[9px] font-bold`
- Radix Tooltip: `bg-gray-900 text-white text-xs rounded-md px-2 py-1.5 max-w-[200px]`, 150ms delay

### ResultPanel (`components/tool/ResultPanel.tsx`)

```
<div class="bg-blue-50 border-1.5 border-blue-200 rounded-xl overflow-hidden sticky top-20">
  
  {/* Primary result */}
  <div class="px-6 pt-6 pb-5 border-b border-blue-100">
    <div class="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-2">
      {label}
    </div>
    <div class="font-mono text-[52px] font-semibold text-blue-900 tracking-tight leading-none mb-1">
      {value}
    </div>
    <div class="text-sm text-blue-300">{subtitle}</div>
  </div>

  {/* Breakdown rows (white bg) */}
  <div class="bg-white px-6 py-1">
    {rows.map(row => (
      <div class="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
        <span class="text-sm text-gray-500">{row.label}</span>
        <span class="font-mono text-sm font-semibold text-gray-900">{row.value}</span>
      </div>
    ))}
  </div>

  {/* Progress bar (optional) */}
  {bar && (
    <div class="bg-white px-6 pb-5">
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-blue-600 rounded-full" style={{width: bar.pct}} />
      </div>
      <div class="flex justify-between mt-2">
        <span class="text-xs text-blue-600 font-semibold">{bar.left}</span>
        <span class="text-xs text-gray-400 font-semibold">{bar.right}</span>
      </div>
    </div>
  )}

</div>
```

### Related Tools
Below the input panel:
```
<div class="mt-5">
  <span class="text-[11px] font-bold uppercase tracking-widest text-gray-400">Related tools</span>
  <div class="flex gap-2 mt-2.5 flex-wrap">
    {links.map(l => (
      <Link class="text-sm font-medium text-gray-600 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
        {l.name}
      </Link>
    ))}
  </div>
</div>
```

---

## Per-Tool Enhancements

### Mortgage
- Fields: Home Price ($), Down Payment (% / $ toggle), Interest Rate (% tooltip), Loan Term (yr / mo toggle)
- Advanced accordion: Property Tax (% / yr), HOA ($/mo), Home Insurance ($/yr), PMI (%)
- Result: Monthly Payment → breakdown (Loan Amount, Total Interest, Total Cost) → principal/interest bar

### Compound Interest
- Fields: Principal ($), Annual Rate (%), Time (years)
- Advanced accordion: Compounding Frequency (segmented: Daily / Monthly / Annually), Additional Contributions ($/mo)
- Result: Future Value → breakdown (Principal, Total Interest Earned) → principal/interest bar

### ROI
- Fields: Initial Investment ($), Final Value ($), Time Period (years)
- Result: ROI (%), Annualized Return (%), Net Profit ($)
- No bar — 3 stat cards instead

### Currency
- Fields: Amount, From currency, To currency (swap button)
- Loading: spinner in result panel while fetching
- Error state: "Rates unavailable — try again" with retry button
- Result: converted amount + exchange rate card + 3 other conversions

### Unit Converter  
- Category: pill tab group (Length / Weight / Temperature / Data) — replaces dropdown
- Fields change based on category
- Result: uses the standard two-col layout. Right panel shows converted value large (mono), with the reverse conversion below and unit equivalents as breakdown rows. No progress bar.

### Tip Calculator
- Fields: Bill Amount ($), Tip % (segmented: 10 / 15 / 18 / 20 / custom), Number of People
- Result: Tip Amount, Total, Per Person

### Tax Estimator
- Fields: Annual Income ($), Filing Status (Single / Married toggle)
- Result: Federal Tax, Effective Rate, Monthly Take-Home
- Disclaimer: "Estimate only — does not include state tax or deductions other than standard"

---

## Shared Components Rewrite

| Component | Change |
|---|---|
| `components/tool/FieldInput.tsx` | Rewritten — Tailwind only, accepts prefix/suffix/tooltip props |
| `components/tool/SegmentedToggle.tsx` | New — replaces dropdowns and JS toggles |
| `components/tool/ResultPanel.tsx` | Rewritten — blue-tinted, mono numbers, breakdown rows, optional bar |
| `components/tool/TwoColLayout.tsx` | Rewritten — `grid-cols-[400px_1fr]`, sticky right, mobile single-col |
| `components/tool/ToolHeader.tsx` | Rewritten — breadcrumb, title, description, Tailwind only |
| `components/tool/TooltipIcon.tsx` | New — Radix Tooltip wrapper |
| `components/tool/RelatedTools.tsx` | New — chip links |
| `components/ui/` | New shadcn/ui files: Button, Input, Label, Tooltip, Accordion |

---

## Code Quality

- Remove `typescript: { ignoreBuildErrors: true }` from `next.config.ts`
- Remove `'use client'` from `app/page.tsx` (homepage becomes server component)
- All hover states via Tailwind `hover:` — no `onMouseEnter`/`onMouseLeave` anywhere
- `app/blog/page.tsx` exports proper `metadata`
- `.gitignore` gets `.superpowers/` added

---

## What Is NOT Changing

- Calculator math logic (all formulas are correct)
- SEO: metadata, JSON-LD schemas, sitemap, robots
- Analytics: GTM, Vercel Analytics
- Cookie consent, Privacy, Terms, Cookies pages
- Blog (markdown SSG)
- About page
- API route `/api/exchange-rates` (ISR 1h cache)
- Favicon files
