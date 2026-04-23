import type { Metadata } from 'next'
import PercentageCalculator from './PercentageCalculator'

export const metadata: Metadata = {
  title: 'Percentage Calculator — % Of, What %, & % Change',
  description: 'Calculate percentages instantly: find X% of a number, what percentage one number is of another, or the percentage change between two values.',
  alternates: { canonical: 'https://calckit.yaro-labs.com/percentage-calculator' },
  keywords: ['percentage calculator', 'percent calculator', 'percent change calculator', 'percentage increase calculator', 'what percent of calculator'],
  openGraph: {
    title: 'Percentage Calculator — % Of, What %, & % Change',
    description: 'Calculate percentages instantly: find X% of a number, what percentage one number is of another, or the percentage change between two values.',
    url: 'https://calckit.yaro-labs.com/percentage-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator — % Of, What %, & % Change',
    description: 'Calculate percentages instantly: find X% of a number, what percentage one number is of another, or the percentage change between two values.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Percentage Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/percentage-calculator`,
      description: 'Calculate percentages instantly: find X% of a number, what percentage one number is of another, or the percentage change between two values.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Percentage Calculator', item: `${BASE}/percentage-calculator` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate percentage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To find X% of a number: multiply the number by X and divide by 100. Example: 15% of $80 = 80 × 0.15 = $12. For percentage change: subtract the old value from the new, divide by the absolute old value, and multiply by 100. Example: price went from $50 to $65 → (65−50)/50 × 100 = +30%.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is 20% of $150?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '20% of $150 = $30. To verify: 10% of $150 = $15, doubled = $30. Quick mental math: move the decimal one place left to get 10%, then adjust. For 15%: find 10% ($15) + half of 10% ($7.50) = $22.50.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate a percentage increase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New − Old) / Old) × 100. Example: salary went from $60,000 to $66,000 → (6,000 / 60,000) × 100 = 10% raise.',
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage is 30 out of 200?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '30 out of 200 = 15%. Formula: (30 / 200) × 100 = 15%. This is the same as asking "30 is what percent of 200?" Divide the part by the whole and multiply by 100.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate a discount percentage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use the percentage change formula. If an item dropped from $80 to $60: ((60 − 80) / 80) × 100 = −25%. Or use \"X% of\": if it's 25% off $80, the discount is $20, leaving $60. This calculator handles all three forms.",
          },
        },
      ],
    },
  ],
})

export default function PercentagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PercentageCalculator />
    </>
  )
}
