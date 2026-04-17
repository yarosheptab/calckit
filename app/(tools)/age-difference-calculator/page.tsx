import type { Metadata } from 'next'
import AgeCalculator from '../age-calculator/AgeCalculator'

export const metadata: Metadata = {
  title: 'Age Difference Calculator – Find the Gap Between Two Birthdays',
  description: 'Calculate the age difference between two people using their birthdays. See the gap in years, months, and days — great for couples, siblings, or any two dates.',
  keywords: ['age difference calculator', 'age gap calculator', 'difference in age calculator', 'birthday age difference'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/age-calculator' },
  openGraph: {
    title: 'Age Difference Calculator – Find the Gap Between Two Birthdays',
    description: 'Calculate the age difference between two people using their birthdays — in years, months, and days.',
    url: 'https://calckit.yaro-labs.com/age-difference-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Difference Calculator – Find the Gap Between Two Birthdays',
    description: 'Find the age gap between two people in years, months, and days.',
  },
}

export default function AgeDifferenceCalculatorPage() {
  return <AgeCalculator />
}
