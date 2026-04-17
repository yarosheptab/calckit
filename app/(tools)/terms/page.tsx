import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs. All calculator results are for informational purposes only.',
  openGraph: {
    title: 'Terms of Use — calckit',
    description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs.',
    url: 'https://calckit.yaro-labs.com/terms',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use — calckit',
    description: 'Terms of use for calckit, a free calculator site operated by Yaro Labs.',
  },
}

const h2Style = { fontSize: '14px', fontWeight: 600, color: '#111827', marginTop: '28px', marginBottom: '8px' } as const
const pStyle = { fontSize: '13px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 10px' } as const

export default function TermsPage() {
  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <Link href="/" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
        ← Back to home
      </Link>
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', marginBottom: '6px' }}>Terms of Use</h1>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>Last updated: 16 April 2026</p>

      <h2 style={h2Style}>1. Acceptance</h2>
      <p style={pStyle}>
        By using calckit.yaro-labs.com ("calckit"), you agree to these terms. calckit is operated by Yaro Labs. If you do not agree, please do not use the site.
      </p>

      <h2 style={h2Style}>2. Free Service</h2>
      <p style={pStyle}>
        calckit is provided free of charge. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
      </p>

      <h2 style={h2Style}>3. Informational Purposes Only</h2>
      <p style={pStyle}>
        All calculators on calckit — including mortgage, compound interest, ROI, currency, unit conversion, tip, and tax calculators — produce results for <strong style={{ fontWeight: 600, color: '#374151' }}>informational purposes only</strong>. Results are estimates based on the inputs you provide and simplified assumptions. Nothing on calckit constitutes financial, legal, tax, or professional advice. Always consult a qualified professional before making financial or legal decisions.
      </p>

      <h2 style={h2Style}>4. No Warranties</h2>
      <p style={pStyle}>
        calckit is provided "as is" without warranties of any kind. We make no guarantees about the accuracy, completeness, or fitness for a particular purpose of any calculation result. Exchange rates for currency conversion are sourced from open.er-api.com and may not reflect real-time market rates.
      </p>

      <h2 style={h2Style}>5. Limitation of Liability</h2>
      <p style={pStyle}>
        To the maximum extent permitted by law, Yaro Labs shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of calckit or reliance on any calculation result.
      </p>

      <h2 style={h2Style}>6. Intellectual Property</h2>
      <p style={pStyle}>
        All content, design, and code on calckit is the property of Yaro Labs unless otherwise noted. You may not reproduce or redistribute it without written permission.
      </p>

      <h2 style={h2Style}>7. Changes</h2>
      <p style={pStyle}>
        We may update these terms at any time. The "last updated" date at the top of this page will reflect changes. Continued use of calckit after changes constitutes acceptance.
      </p>

      <h2 style={h2Style}>8. Contact</h2>
      <p style={pStyle}>
        Questions? Email us at{' '}
        <a href="mailto:hello@yaro-labs.com" style={{ color: '#2563eb' }}>hello@yaro-labs.com</a>.
      </p>
    </main>
  )
}
