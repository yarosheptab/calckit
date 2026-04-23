import type { Metadata } from 'next'
import BmiCalculator from '../bmi-calculator/BmiCalculator'

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
  description: 'Find the ideal weight range for your height and body frame. Uses BMI-based healthy ranges to give you a realistic target weight for your age and gender.',
  keywords: ['ideal weight calculator', 'healthy weight calculator', 'ideal body weight', 'target weight calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/bmi-calculator' },
  openGraph: {
    title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
    description: 'Find the ideal weight range for your height and body frame based on healthy BMI ranges.',
    url: 'https://calckit.yaro-labs.com/ideal-weight-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideal Weight Calculator – Healthy Weight Range for Your Height',
    description: 'Find the healthy weight range for your height and body frame.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Ideal Weight Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/ideal-weight-calculator`,
      description: 'Find the ideal weight range for your height and body frame.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Ideal Weight Calculator', item: `${BASE}/ideal-weight-calculator` },
      ],
    },
  ],
})

export default function IdealWeightCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <BmiCalculator pageTitle="Ideal Weight Calculator" />
    </>
  )
}

