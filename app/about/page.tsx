import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'About calckit — Free Online Calculators' },
  description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected. Built by Yaro Labs.',
  openGraph: {
    title: 'About calckit — Free Online Calculators',
    description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected.',
    url: 'https://calckit.yaro-labs.com/about',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About calckit — Free Online Calculators',
    description: 'calckit is a free collection of everyday calculators — mortgage, compound interest, ROI, currency, units, tips, and taxes. No account, no ads, no data collected.',
  },
}

const BASE = 'https://calckit.yaro-labs.com'

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'calckit',
      url: BASE,
      description: 'Free online calculators for everyday math, personal finance, and health. No account required, no ads.',
      foundingDate: '2024',
      sameAs: [
        'https://yaro-labs.com',
        'https://open-launch.com/projects/calckit',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'calckit', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE}/about` },
      ],
    },
  ],
})

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '16px' }}>About calckit</h1>
        <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
          calckit is a free collection of everyday calculators: mortgage, compound interest, ROI, currency conversion, unit conversion, tips, and taxes. No account needed, no ads, no data collected.
        </p>
        <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
          All calculations run directly in your browser. For currency conversions, exchange rates are fetched from{' '}
          <a href="https://open.er-api.com" style={{ color: '#2563eb' }}>open.er-api.com</a> and cached for one hour.
        </p>
        <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
          calckit is built by{' '}
          <a href="https://yaro-labs.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>Yaro Labs</a>.
        </p>
        <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6 }}>
          Tax estimates use simplified 2025 US federal brackets and are for informational purposes only. Always consult a tax professional for advice specific to your situation.
        </p>
      </div>
    </>
  )
}
