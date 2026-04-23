import type { Metadata } from 'next'
import DateCalculator from '../date-calculator/DateCalculator'

export const metadata: Metadata = {
  title: 'Date Difference Calculator – Find Time Between Two Dates',
  description: 'Find the difference between two dates in days, weeks, months, and years. Great for calculating ages, contract durations, or time until an event.',
  keywords: ['date difference calculator', 'time between dates', 'date duration calculator', 'how many days between dates'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/date-calculator' },
  openGraph: {
    title: 'Date Difference Calculator – Find Time Between Two Dates',
    description: 'Find the difference between two dates in days, weeks, months, and years.',
    url: 'https://calckit.yaro-labs.com/date-difference-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Difference Calculator – Find Time Between Two Dates',
    description: 'Find the difference between two dates in days, weeks, months, and years.',
  },
}

export default function DateDifferenceCalculatorPage() {
  return <DateCalculator pageTitle="Date Difference Calculator" />
}
