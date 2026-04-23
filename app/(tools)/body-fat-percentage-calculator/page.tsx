import type { Metadata } from 'next'
import BodyFatCalculator from '../body-fat-calculator/BodyFatCalculator'

export const metadata: Metadata = {
  title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
  description: 'Estimate your body fat percentage using the US Navy or BMI method. Find out where you fall in healthy body composition ranges for your age and gender.',
  keywords: ['body fat percentage calculator', 'body fat calculator', 'body composition calculator', 'fat percentage estimator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/body-fat-calculator' },
  openGraph: {
    title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
    description: 'Estimate your body fat percentage and see where you fall in healthy body composition ranges for your age and gender.',
    url: 'https://calckit.yaro-labs.com/body-fat-percentage-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Percentage Calculator – Estimate Your Body Composition',
    description: 'Estimate your body fat percentage using the US Navy or BMI method.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Body Fat Percentage Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/body-fat-percentage-calculator`,
      description: 'Estimate your body fat percentage using the US Navy or BMI method.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Body Fat Percentage Calculator', item: `${BASE}/body-fat-percentage-calculator` },
      ],
    },
  ],
})

export default function BodyFatPercentageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <BodyFatCalculator pageTitle="Body Fat Percentage Calculator" />
    </>
  )
}
