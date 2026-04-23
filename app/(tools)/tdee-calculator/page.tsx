import type { Metadata } from 'next'
import CalorieCalculator from '../calorie-calculator/CalorieCalculator'

export const metadata: Metadata = {
  title: 'TDEE Calculator – Total Daily Energy Expenditure',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level. Use TDEE to set accurate calorie goals for weight loss.',
  keywords: ['TDEE calculator', 'total daily energy expenditure', 'maintenance calories calculator', 'daily calorie needs'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/calorie-calculator' },
  openGraph: {
    title: 'TDEE Calculator – Total Daily Energy Expenditure',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level. Use TDEE to set accurate calorie goals for weight loss.',
    url: 'https://calckit.yaro-labs.com/tdee-calculator',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator – Total Daily Energy Expenditure',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level. Use TDEE to set accurate calorie goals for weight loss.',
  },
}


const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'TDEE Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      url: `${BASE}/tdee-calculator`,
      description: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, weight, height, and activity level.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'TDEE Calculator', item: `${BASE}/tdee-calculator` },
      ],
    },
  ],
})

export default function TdeeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CalorieCalculator pageTitle="TDEE Calculator" />
    </>
  )
}

