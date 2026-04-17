---
title: "Date Calculator: Days Between Dates, Business Days, and More"
date: "2026-04-02"
excerpt: "A date calculator counts exact days between dates, adds days to a date, and handles business days. Learn the math, leap year rules, and real-world uses."
---

## Why You Need a Date Calculator

A **date calculator** solves a deceptively simple problem: how many days are between two dates? Simple subtraction gives you the year difference, but calculating exact calendar days — accounting for months of different lengths, leap years, and time zones — requires more precision than mental math can reliably provide.

People reach for a date calculator in situations like these:

- A vendor contract says "Net 30" — what exact date is that?
- A court filing must be submitted within 90 days of an event — when exactly?
- A subscription started on March 3 and renews after 6 months — when is the renewal?
- A 30-day return window opened on January 15 — is April 5 still within the window?

[Use the free Date Calculator](/date) to get an instant, exact answer.

## The Math Behind Days Between Dates

Computers calculate the difference between two dates in milliseconds, then convert. There are exactly **86,400,000 milliseconds per day** (60 seconds × 60 minutes × 24 hours × 1,000 ms). Dividing the millisecond difference between two timestamps by 86,400,000 gives the number of days.

The formula:

**Days = (Date₂ − Date₁) in milliseconds ÷ 86,400,000**

This approach naturally handles all calendar irregularities — months with 28, 29, 30, or 31 days are baked into the underlying timestamp, not calculated separately.

## Leap Year Rules Explained

Leap years add exactly one extra day (February 29) every four years, but the rule has a critical exception that trips up many manual calculations:

- **Divisible by 4 → leap year** (e.g., 2024, 2028)
- **Divisible by 100 → NOT a leap year** (e.g., 1900, 2100)
- **Divisible by 400 → IS a leap year** (e.g., 2000)

This means **1900 was not a leap year** (divisible by 100, not 400), but **2000 was** (divisible by 400). The next exception year is 2100 — not a leap year despite being divisible by 4.

Why does this matter? If you're calculating the days between two dates that span 1900 or 2100, a naive "multiply years by 365.25" estimate will be wrong by at least one day.

## Calendar Days vs. Business Days

Many real-world deadlines are measured in **business days** (weekdays only), not calendar days. The rough conversion formula is:

**Business days ≈ Calendar days × 5/7**

This approximation assumes a standard 5-day workweek with no public holidays. In practice, it is very accurate for periods under a year:

| Timeframe | Calendar Days | Business Days (approx) |
|-----------|--------------|------------------------|
| 30-day return window | 30 | 22 |
| 45-day contractor term | 45 | 32 |
| 90-day probation period | 90 | 64 |
| 6 months | ~182 | ~130 |
| 1 year | 365–366 | ~260 |

For more precise business-day counts (especially around public holidays), the [Date Calculator](/date) applies actual calendar logic rather than the 5/7 approximation.

## Practical Example: 90 Days From Today

"What date is 90 days from April 18, 2026?"

Counting manually:

- April has 30 days; April 18 to April 30 = 12 days remaining in April
- May = 31 days (12 + 31 = 43 days)
- June = 30 days (43 + 30 = 73 days)
- 90 − 73 = 17 days into July → **July 17, 2026**

90 calendar days from April 18 = **July 17**. In business days, 90 calendar days ≈ 64 working days.

This kind of calculation is error-prone by hand. A **date calculator** handles it instantly and without risk of month-length mistakes.

## International Date Formats: A Source of Confusion

Date format ambiguity causes real-world errors every year. The three most common formats:

- **MM/DD/YYYY** — United States (e.g., 04/18/2026 = April 18)
- **DD/MM/YYYY** — UK, Australia, most of Europe (e.g., 04/18/2026 would be invalid; 18/04/2026 = April 18)
- **YYYY-MM-DD** — ISO 8601 international standard (e.g., 2026-04-18)

The ISO 8601 format (YYYY-MM-DD) is unambiguous and universally sortable — it is the standard used in software, databases, and international contracts. When writing dates in a legal or technical document, ISO 8601 eliminates the risk that "06/07/2026" is read as June 7 in one country and July 6 in another.

## Real-World Use Cases for Date Calculations

**Legal and compliance deadlines** are where precision matters most:

- Statutes of limitations are often measured in years or months from a specific event. Calculating the exact last valid filing date requires precise date arithmetic.
- Contractual "cure periods" (time to fix a default) are typically 10–30 calendar days.
- HIPAA breach notifications must be filed within 60 calendar days of discovery.

**Medical and pharmaceutical:**

- Prescription refill windows (e.g., "not before 25 days from last fill") require exact day counts.
- Vaccine schedules specify minimum intervals in days (e.g., second dose no earlier than 28 days after first).

**Personal finance:**

- Credit card billing cycles and payment due dates
- CD (certificate of deposit) maturity dates
- Mortgage rate lock expiration periods (typically 30, 45, or 60 days)

The [Age Calculator](/age) is closely related — it calculates the distance between a birth date and today in years, months, and days rather than total days alone.

For financial calculations tied to time periods, the [Unit Converter](/unit-converter) can help with any measurement conversions that come up alongside date-based planning.

## Tips for Accurate Date Counting

- **Include or exclude endpoints deliberately.** "30 days from June 1" can mean either June 30 (30 days later) or July 1 (31st day), depending on whether you count day zero. Legal contracts often specify "30 days from and including" or "30 days after" to avoid this ambiguity.
- **Watch for daylight saving time.** If you are calculating durations that include a DST transition, wall-clock time can appear to add or lose an hour. Day-level calculations are not affected, but hourly calculations are.
- **Business day calculations vary by country.** The US federal holiday list differs from UK bank holidays and Canadian statutory holidays. If your deadline is internationally significant, verify which country's calendar applies.

## Conclusion: Key Takeaways

- Days between dates = (timestamp difference in ms) ÷ 86,400,000 — the formula that handles all calendar edge cases automatically.
- Leap year rule: divisible by 4 = leap year, EXCEPT century years (1900, 2100), unless also divisible by 400 (2000).
- 30 calendar days ≈ 22 business days; 90 calendar days ≈ 64 business days (using the 5/7 rule).
- 90 days from April 18, 2026 = July 17, 2026.
- ISO 8601 (YYYY-MM-DD) is the unambiguous international date format used in software and legal documents.
- Many legal, medical, and financial deadlines depend on exact day counts — mental math is unreliable.

[Calculate the days between any two dates — or find a date 90 days from now](/date) in one click.
