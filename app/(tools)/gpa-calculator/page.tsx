import type { Metadata } from 'next'
import GradeCalculator from '../grade-calculator/GradeCalculator'

export const metadata: Metadata = {
  title: 'GPA Calculator – Calculate Your Grade Point Average',
  description: 'Quickly calculate your GPA from letter grades or percentages. Supports weighted and unweighted GPA calculations for high school and college courses.',
  keywords: ['GPA calculator', 'grade point average calculator', 'college GPA calculator', 'high school GPA'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/grade-calculator' },
  openGraph: {
    title: 'GPA Calculator – Calculate Your Grade Point Average',
    description: 'Quickly calculate your GPA from letter grades or percentages. Supports weighted and unweighted GPA calculations for high school and college.',
    url: 'https://calckit.yaro-labs.com/gpa-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator – Calculate Your Grade Point Average',
    description: 'Calculate your weighted or unweighted GPA from letter grades or percentages.',
  },
}

export default function GpaCalculatorPage() {
  return <GradeCalculator pageTitle="GPA Calculator" />
}
