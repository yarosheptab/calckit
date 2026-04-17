---
title: "How to Count the Days Between Two Dates (Including Leap Years)"
date: "2026-04-19"
excerpt: "Learn how to count days between two dates manually, handle leap years correctly, and convert the result to weeks, months, or business days."
---

## Why Counting Days Between Dates Is Surprisingly Tricky

Return policies, probationary periods, visa durations, loan terms, and lease agreements all depend on exact day counts. Off by one day and you miss a deadline. The challenge is that months have different lengths, and a leap year can sneak an extra day into your calculation.

This guide shows you **how to count days between dates** step by step, including a full manual example spanning two years.

---

## Step 1: Convert Both Dates to a Comparable Form

Write both dates in a consistent format: **January 15, 2024** and **April 18, 2026**. It helps to think of each date as a point on a timeline. You will work from left to right, segment by segment, rather than trying to subtract raw date numbers.

## Step 2: Check for Leap Years Between the Dates

A leap year adds one day (February 29) to the calendar. A year is a leap year if it is divisible by 4 — except century years, which must also be divisible by 400. Between January 2024 and April 2026, we have:

- **2024**: 2024 ÷ 4 = 506 — leap year. February has **29 days**.
- **2025**: 2025 ÷ 4 = 506.25 — not a leap year. February has 28 days.
- **2026**: not a leap year.

## Step 3: Count Days Month by Month

Break the span into three segments:

1. **January 15, 2024 → December 31, 2024** (rest of 2024)
2. **All of 2025**
3. **January 1, 2026 → April 18, 2026**

**Segment 1 — rest of 2024:**

Start from January 15. Days remaining in January: 31 − 15 = 16 days. Then add every full month through December:

February (29, leap) + March (31) + April (30) + May (31) + June (30) + July (31) + August (31) + September (30) + October (31) + November (30) + December (31) = 305 days.

Total for segment 1: 16 + 305 = **321 days**.

**Segment 2 — all of 2025:** 365 days (not a leap year).

**Segment 3 — January 1 to April 18, 2026:**

January (31) + February (28) + March (31) + 18 days of April = **108 days**.

## Step 4: Add All Segments Together

321 + 365 + 108 = **794 days** between January 15, 2024 and April 18, 2026.

(Note: results vary depending on whether both endpoints are included. Most calculators count the start day but not the end day — the same convention used here.)

## Step 5: Convert to Weeks, Months, or Business Days

- **Weeks:** 794 ÷ 7 = **113.4 weeks** (113 full weeks, 3 extra days)
- **Approximate months:** 794 ÷ 30.44 ≈ **26.1 months**
- **Business days:** Multiply by 5/7. 794 × 0.714 ≈ **567 business days** (assumes no public holidays)

For exact business-day counts, you need to exclude weekends manually and account for local holidays — the [CalcKit date calculator](/date) handles this automatically.

---

## Days in Each Month — Quick Reference

| Month | Days (Regular Year) | Days (Leap Year) |
|-------|--------------------|--------------------|
| January | 31 | 31 |
| February | 28 | 29 |
| March | 31 | 31 |
| April | 30 | 30 |
| May | 31 | 31 |
| June | 30 | 30 |
| July | 31 | 31 |
| August | 31 | 31 |
| September | 30 | 30 |
| October | 31 | 31 |
| November | 30 | 30 |
| December | 31 | 31 |
| **Full year** | **365** | **366** |

The only month that changes between regular and leap years is February.

---

## Practical Use Cases

**30-day return policy:** If you bought something on March 25, add 30 days: April 24 is the last day to return it.

**90-day job probation starting January 6:** January has 25 remaining days, February has 28, and you need 37 more days into March → March 37 does not exist, so count: 25 + 28 = 53 days through February; 90 − 53 = 37 more days into March → **April 5** is day 90.

**Passport expiry:** Many countries require your passport to be valid at least 6 months beyond your travel date. Count forward 6 calendar months from your travel date and compare to the expiry date printed in your passport.

**Lease end date:** If your lease starts May 1 and runs 12 months, it ends **April 30** of the following year — not May 1 (which would be 12 months + 1 day).

---

## Try It Without the Math

Manual date counting works well for a span of a few weeks. Once you cross year boundaries — especially with leap years involved — it gets tedious and error-prone. The [CalcKit date calculator](/date) accepts any two dates and returns the exact number of days, weeks, and months in one click.

Need to see your age in days? Combine this with the [age calculator](/age). Want to convert days into another time unit? The [unit converter](/unit-converter) has you covered.

---

## Key Takeaways

- Break long date spans into year or month segments to avoid errors.
- Always check whether any February in your range falls in a leap year.
- 2024 is a leap year (366 days); 2025 and 2026 are not.
- Business days ≈ calendar days × 5/7, but exclude public holidays for precision.
- Month-by-month counting is the most reliable manual method for multi-year spans.
