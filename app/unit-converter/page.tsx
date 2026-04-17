import type { Metadata } from 'next'
import UnitConverterCalculator from './UnitConverterCalculator'

export const metadata: Metadata = {
  title: 'Unit Converter — Length, Weight, Temperature, Data',
  description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'data storage converter', 'metric imperial converter'],
  openGraph: {
    title: 'Unit Converter — Length, Weight, Temperature, Data',
    description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
    url: 'https://calckit.yaro-labs.com/unit-converter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — Length, Weight, Temperature, Data',
    description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Unit Converter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/unit-converter`,
      description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Unit Converter', item: `${BASE}/unit-converter` },
      ],
    },
  ],
})

export default function UnitConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <UnitConverterCalculator />
    </>
  )
}
