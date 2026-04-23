import type { Metadata } from 'next'
import TipCalculator from '../tip-calculator/TipCalculator'

export const metadata: Metadata = {
  title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
  description: 'Split any restaurant bill evenly among friends and calculate the tip per person. Enter total, tip percentage, and number of people to see each share instantly.',
  keywords: ['bill splitter', 'split the bill calculator', 'restaurant bill splitter', 'tip splitter calculator'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/tip-calculator' },
  openGraph: {
    title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
    description: 'Split any restaurant bill evenly among friends and calculate the tip per person.',
    url: 'https://calckit.yaro-labs.com/bill-splitter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bill Splitter – Split the Check & Calculate Tip Per Person',
    description: 'Split any bill evenly and calculate each person\'s share including tip.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Bill Splitter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${BASE}/bill-splitter`,
      description: 'Split any restaurant bill evenly among friends and calculate the tip per person.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Bill Splitter', item: `${BASE}/bill-splitter` },
      ],
    },
  ],
})

export default function BillSplitterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <TipCalculator pageTitle="Bill Splitter" />
    </>
  )
}
