# calckit.yaro-labs.com — Design Specification

**Date:** 2026-04-15  
**Status:** Approved  
**Scope:** Homepage, tool pages, blog, about — full site design for calckit.yaro-labs.com

---

## Overview

calckit is a calculator utilities site — the fifth of five tool-kit sub-sites under yaro-labs.com. It targets anyone who needs quick, accurate calculations: mortgage payments, investment returns, currency conversions, unit conversions, tips, and taxes.

**Design philosophy:** Clean and functional. White background, blue accent. Standard top nav. No gimmicks, no creative layouts — just labeled inputs on the left and results on the right. Feels like a well-made utility app, not a marketing site.

---

## Visual Design

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#f9fafb` | Page background |
| Surface | `#ffffff` | Nav, cards, tool panels |
| Muted | `#f3f4f6` | Input hover, section bg |
| Border | `#e5e7eb` | Default borders |
| Border muted | `#f0f0f0` | Light dividers |
| Foreground | `#111827` | Primary text |
| Muted foreground | `#6b7280` | Labels, descriptions |
| Subtle | `#9ca3af` | Placeholders, nav links |
| Accent | `#2563eb` | Blue — CTAs, active states, links |
| Accent light | `#eff6ff` | Rate card bg, hover states |
| Accent border | `#bfdbfe` | Focused inputs, accent card border |

### Typography

- **All UI:** Inter (sans-serif) — headings, body, buttons, labels
- **Border radius:** 6px

### Motion

Transitions: 120ms ease on border-color and background.

---

## Layout System

calckit uses a standard top-nav layout:

```
┌──────────────────────────────────────────────────┐
│  Navbar (50px, white, border-bottom)             │
├──────────────────────────────────────────────────┤
│  Page content (bg #f9fafb)                       │
└──────────────────────────────────────────────────┘
```

### Navbar (50px, full-width)
- White background, bottom border `#efefef`
- Left: "calc**kit**" wordmark — "calc" in `#111`, "kit" in `#2563eb`, Inter 800
- Right: nav links (Tools / Blog / About in subtle gray) + "Browse tools" blue CTA button
- On tool pages: no CTA button, just nav links

---

## Layout: Homepage

### Hero Section
- White background, generous padding
- Bold headline: "Free calculators for everyday math."
- Body: "Mortgage, interest, ROI, currency, unit conversions, and more. No account. No ads."
- Single CTA: "Browse tools" (blue button)

### Tool Grid
- Header: "ALL CALCULATORS" label (uppercase, subtle) + "7 tools" count (right-aligned)
- 3-column grid, cards with `1px border #f0f0f0`, 6px radius
- Card hover: border-color → `#bfdbfe`
- Card anatomy: tool name (700 10px) + short description (8px muted)

---

## Layout: Tool Page

### Breadcrumb
- Below navbar: `calckit / Tool Name` — "Tool Name" in blue

### Tool Header
- Tool name: Inter 800 16px
- One-line description: Inter 10px muted

### Two-Column Body
- Left panel (white bg, right border): labeled input fields + "Calculate" blue button
- Right panel (off-white `#f9fafb`): result display + breakdown

**Left panel:**
- Field label: 9px, `#6b7280`, above each input
- Input: `border: 1px solid #e5e7eb`, 5px radius, 7px 10px padding, 11px text
- No "INPUTS" section label — just the individual field labels
- Calculate button: full-width blue, 11px 600

**Right panel:**
- Result label: 9px muted
- Result value: 30–32px, 800 weight, `#111`
- Result subtitle: 9px muted (e.g. "for 360 months")
- Hairline divider, then breakdown rows (label left, value right)
- Optional: mini bar charts for proportions (blue bar on `#f3f4f6` track)

---

## Tools (7 total)

| Slug | Name | Description | Key Inputs | Key Output |
|---|---|---|---|---|
| `/mortgage` | Mortgage Calculator | Monthly payment & amortization | Loan amount, rate, term, down payment | Monthly payment + principal/interest/total breakdown |
| `/compound-interest` | Compound Interest | Future value with compounding | Principal, rate, years, compound frequency | Future value + total interest earned |
| `/roi` | ROI Calculator | Return on investment % | Initial investment, final value, time period | ROI %, annualized return |
| `/currency` | Currency Converter | Live exchange rates, 170+ currencies | Amount, from-currency, to-currency (dropdowns) | Converted amount + exchange rate + common pairs sidebar |
| `/unit-converter` | Unit Converter | Length, weight, temperature, data | Value, from-unit, to-unit | Converted value |
| `/tip` | Tip Calculator | Split bills and tip amounts | Bill total, tip %, number of people | Tip amount, total, per person |
| `/tax` | Tax Estimator | Take-home pay after tax | Gross salary, filing status, state | Estimated take-home, effective rate, federal/state breakdown |

### Currency Converter — special notes
- Uses a free exchange rate API (e.g. `https://open.er-api.com/v6/latest/USD`) for live rates
- Fetches via a Next.js Route Handler to avoid CORS: `app/api/exchange-rates/route.ts`
- Cache the response for 1 hour (using `next: { revalidate: 3600 }` in fetch options)
- Shows a ⇅ swap button between the two currency fields
- Right panel shows: result, exchange rate card (blue), and 3 common "Other conversions" rows

---

## Layout: Blog & About

- Blog index: date (muted) · title · excerpt, separated by hairlines
- Blog post: prose, max-width 680px, centered
- About: single-column prose, max-width 640px

---

## Technical Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 |
| Fonts | `next/font/google` — Inter |
| Blog | MDX via `gray-matter` + `marked` |
| Analytics | GA4 via `next/script` afterInteractive |
| Currency rates | `open.er-api.com` free API via Route Handler (1h cache) |
| Deployment | Vercel → calckit.yaro-labs.com |
| Repo | GitHub, repo named `calckit` |

### Key Notes
- All calculations run client-side in the browser (no server compute)
- Currency conversion fetches rates via a Route Handler (`/api/exchange-rates`) to avoid CORS
- No external UI libraries
- Tool pages at `app/mortgage/page.tsx`, `app/currency/page.tsx`, etc.
- Design reference: `/Users/a1111/Public/Prog/js/devkit/.superpowers/brainstorm/40054-1776278865/content/calckit-final2.html`

---

## Success Criteria

- Loads < 1s on Vercel edge (SSG homepage + static tool pages)
- All 7 calculators produce correct results
- Currency converter shows live rates (falls back gracefully if API down)
- Lighthouse accessibility ≥ 90
- GA4 fires on page load and calculation
