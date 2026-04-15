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
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter — Length, Weight, Temperature, Data',
    description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Unit Converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: 'https://calckit.yaro-labs.com/unit-converter',
  description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
}

export default function UnitConverterPage() {
  const schemaStr = JSON.stringify(schema)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <UnitConverterCalculator />
    </>
  )
}
