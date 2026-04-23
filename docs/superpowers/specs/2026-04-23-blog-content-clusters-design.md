# Blog Content Clusters — Design Spec

## Goal

Add 15 new blog posts organized into three topical clusters (Finance, Health, Everyday Math). Each cluster's posts link to each other and to the relevant calculator. The goal is topical authority — signaling to Google that calckit is a deep resource on each topic, not just a tool collection.

## Architecture

### File format
Markdown files in `content/blog/<slug>.md` with frontmatter:
```yaml
---
title: "..."
date: "YYYY-MM-DD"
excerpt: "..."
---
```
No schema changes needed — the existing `lib/blog.ts` picks up all `.md` files automatically.

### Post format (matches existing style)
- ~900–1200 words
- H2 subheadings (no H1 — the blog post page renders the title as H1)
- Real worked examples with concrete numbers
- At least one comparison table
- 1–2 internal links to the relevant calculator using `/slug` paths
- 1–2 internal links to other posts in the same cluster
- Final CTA link to the calculator

### Publishing dates
Spread across the past 6 weeks (2026-03-12 through 2026-04-22) at a rate of 2–3 per week. This simulates a natural publishing cadence rather than a bulk upload spike.

---

## Cluster 1: Finance (6 posts)

Posts in this cluster link to each other where topically relevant.

| Slug | Title | Date | Calculator |
|---|---|---|---|
| `15-year-vs-30-year-mortgage` | 15-Year vs 30-Year Mortgage: Which Saves More Money? | 2026-03-12 | `/mortgage-calculator` |
| `debt-avalanche-vs-snowball-method` | Debt Avalanche vs Debt Snowball: Which Payoff Method Wins? | 2026-03-17 | `/debt-payoff-calculator` |
| `2025-tax-brackets-explained` | 2025 Federal Tax Brackets: What You'll Actually Pay | 2026-03-24 | `/tax-calculator` |
| `emergency-fund-how-much-do-you-need` | Emergency Fund: How Much Do You Really Need? | 2026-03-31 | `/savings-calculator` |
| `what-is-a-good-roi` | What Is a Good ROI? Benchmarks by Investment Type | 2026-04-07 | `/roi-calculator` |
| `how-to-read-your-paycheck` | How to Read Your Paycheck: Gross Pay, Net Pay & Deductions | 2026-04-14 | `/salary-calculator` |

**Internal links within cluster:**
- `15-year-vs-30-year-mortgage` → `emergency-fund-how-much-do-you-need` (down payment / savings angle)
- `debt-avalanche-vs-snowball-method` → `emergency-fund-how-much-do-you-need` (build fund before attacking debt)
- `2025-tax-brackets-explained` → `how-to-read-your-paycheck` (withholding connection)
- `what-is-a-good-roi` → `15-year-vs-30-year-mortgage` (real estate ROI context)
- `how-to-read-your-paycheck` → `2025-tax-brackets-explained` (tax withholding)
- `emergency-fund-how-much-do-you-need` → `debt-avalanche-vs-snowball-method` (what to do after fund is built)

---

## Cluster 2: Health (4 posts)

| Slug | Title | Date | Calculator |
|---|---|---|---|
| `how-many-calories-to-lose-weight` | How Many Calories Should You Eat to Lose Weight? | 2026-03-19 | `/calorie-calculator` |
| `what-is-tdee` | What Is TDEE and How Do You Calculate It? | 2026-03-26 | `/calorie-calculator` |
| `healthy-body-fat-percentage-by-age` | Healthy Body Fat Percentage by Age & Gender (2025 Charts) | 2026-04-02 | `/body-fat-calculator` |
| `ideal-weight-for-your-height` | Ideal Weight for Your Height: Methods, Charts & What They Mean | 2026-04-09 | `/bmi-calculator` |

**Internal links within cluster:**
- `how-many-calories-to-lose-weight` → `what-is-tdee` (TDEE is the foundation of calorie targets)
- `what-is-tdee` → `how-many-calories-to-lose-weight` (applying TDEE)
- `healthy-body-fat-percentage-by-age` → `ideal-weight-for-your-height` (body composition vs weight)
- `ideal-weight-for-your-height` → `healthy-body-fat-percentage-by-age` (weight alone doesn't tell the full story)

---

## Cluster 3: Everyday Math (5 posts)

| Slug | Title | Date | Calculator |
|---|---|---|---|
| `compound-interest-vs-simple-interest` | Compound Interest vs Simple Interest: The Real Difference | 2026-03-14 | `/compound-interest-calculator` |
| `50-30-20-budget-rule` | The 50/30/20 Budget Rule: A Simple Framework for Your Money | 2026-03-21 | `/savings-calculator` |
| `celsius-to-fahrenheit-conversion-guide` | Celsius to Fahrenheit: Formula, Chart & Quick Reference | 2026-03-28 | `/unit-converter` |
| `how-to-split-a-restaurant-bill` | How to Split a Restaurant Bill (Including Tip & Unequal Splits) | 2026-04-04 | `/tip-calculator` |
| `how-to-avoid-currency-exchange-fees` | How to Avoid Currency Exchange Fees When Traveling | 2026-04-11 | `/currency-converter` |

**Internal links within cluster:**
- `compound-interest-vs-simple-interest` → `50-30-20-budget-rule` (savings rate context)
- `50-30-20-budget-rule` → `compound-interest-vs-simple-interest` (why investing the 20% matters)
- `how-to-split-a-restaurant-bill` → `how-to-avoid-currency-exchange-fees` (travel context)
- `how-to-avoid-currency-exchange-fees` → `celsius-to-fahrenheit-conversion-guide` (travel utility angle)

---

## Content requirements per post

Each post must:
1. Have a unique, keyword-targeted H2 as the first heading (matches the post's target query)
2. Include at least one concrete worked example with real numbers
3. Include at least one markdown table
4. Link to the relevant calculator at least twice (once early, once as final CTA)
5. Link to at least one other post in the same cluster
6. Not duplicate content from any of the 41 existing posts (check slug list before writing)
7. Be factually accurate — no invented statistics, all numbers verifiable

## Existing posts to avoid duplicating

The 41 existing posts cover: mortgage payment calculation, discount/percent-off, compound interest (×3), calorie needs (×2), savings, currency (×2), BMI (×2), salary-to-hourly (×2), date/days between (×2), age calculation (×2), percentage change (×3), unit conversion (×2), GPA/grade (×2), body fat navy method (×2), loan payments (×2), debt payoff (×2), ROI (×2), federal income tax (×2), inflation/purchasing power (×2), tip calculation (×2), savings goal.

The new posts specifically avoid these angles and instead cover: comparison/versus posts, "how much" guide posts, and cluster-specific context posts not yet addressed.
