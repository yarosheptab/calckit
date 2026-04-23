import type { Metadata } from 'next'
import UnitConverterCalculator from './UnitConverterCalculator'

export const metadata: Metadata = {
  title: 'Unit Converter — Length, Weight, Temperature, Data',
  description: 'Convert between units of length, weight, temperature, and data storage. Instant conversions, no signup.',
  alternates: { canonical: 'https://calckit.yaro-labs.com/unit-converter' },
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
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert kilometers to miles?',
          acceptedAnswer: { '@type': 'Answer', text: 'Multiply kilometers by 0.621371 to get miles. Going the other way, multiply miles by 1.60934 to get kilometers. Quick shortcut: 5 miles ≈ 8 km.' },
        },
        {
          '@type': 'Question',
          name: 'How do I convert Celsius to Fahrenheit?',
          acceptedAnswer: { '@type': 'Answer', text: 'Use °F = (°C × 9/5) + 32. So 20°C = 68°F. To convert Fahrenheit to Celsius: °C = (°F − 32) × 5/9.' },
        },
        {
          '@type': 'Question',
          name: 'How many megabytes are in a gigabyte?',
          acceptedAnswer: { '@type': 'Answer', text: 'In binary (used by computers): 1 GB = 1,024 MB. In decimal (storage manufacturers): 1 GB = 1,000 MB. This is why a 128 GB drive shows as ~119 GB on your OS.' },
        },
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
