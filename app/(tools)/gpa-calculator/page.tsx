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


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'GPA Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/gpa-calculator`,
      description: 'Quickly calculate your GPA from letter grades or percentages.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'GPA Calculator', item: `${BASE}/gpa-calculator` },
      ],
    },
  ],
})

export default function GpaCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <GradeCalculator pageTitle="GPA Calculator" />
    </>
  )
}

