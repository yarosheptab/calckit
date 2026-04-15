import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — calckit',
  description: 'Privacy policy for calckit.yaro-labs.com, operated by Yaro Labs.',
}

const h2Style = { fontSize: '14px', fontWeight: 600, color: '#111827', marginTop: '28px', marginBottom: '8px' } as const
const pStyle = { fontSize: '13px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 10px' } as const

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <Link href="/" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
        ← Back to home
      </Link>
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', marginBottom: '6px' }}>Privacy Policy</h1>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>Last updated: 16 April 2026</p>

      <h2 style={h2Style}>1. Introduction</h2>
      <p style={pStyle}>
        calckit.yaro-labs.com ("calckit", "we", "us") is operated by Yaro Labs. This policy explains how we handle information when you use calckit. All calculator logic runs entirely in your browser — no calculation inputs or results are ever sent to our servers. For currency conversions, exchange rates are fetched via our own server-side proxy (sourced from open.er-api.com); no personal data is included in those requests.
      </p>

      <h2 style={h2Style}>2. Information We Collect</h2>
      <p style={pStyle}>
        We use Google Analytics 4 (GA4) to collect anonymous usage data — pages visited, time on page, and general geographic region (country level). GA4 uses cookies to distinguish sessions. We also store your cookie consent choice in your browser's localStorage under the key <code style={{ fontSize: '12px', background: '#f3f4f6', padding: '1px 5px', borderRadius: '3px' }}>calckit-cookie-consent</code>. We do not operate user accounts, and we do not store any form data you enter into calculators.
      </p>

      <h2 style={h2Style}>3. How We Use Information</h2>
      <p style={pStyle}>
        Analytics data is used solely to understand which tools are popular and how to improve the site. We do not use it for advertising, profiling, or any commercial purpose beyond operating calckit.
      </p>

      <h2 style={h2Style}>4. Sharing</h2>
      <p style={pStyle}>
        We share anonymous analytics data with Google (GA4). We do not sell, rent, or share any data with other third parties.
      </p>

      <h2 style={h2Style}>5. Your Rights</h2>
      <p style={pStyle}>
        You may decline analytics cookies via the cookie banner or by clearing your browser's cookies and localStorage at any time. If you are in the EU/EEA, you have the right to access, rectify, or erase any personal data we hold about you. Because we collect no personal data beyond anonymous analytics, there is typically nothing to access or erase. For questions, email us at{' '}
        <a href="mailto:hello@yaro-labs.com" style={{ color: '#2563eb' }}>hello@yaro-labs.com</a>.
      </p>

      <h2 style={h2Style}>6. Changes</h2>
      <p style={pStyle}>
        We may update this policy occasionally. The "last updated" date at the top of this page will reflect any changes. Continued use of calckit after changes constitutes acceptance of the updated policy.
      </p>

      <h2 style={h2Style}>7. Contact</h2>
      <p style={pStyle}>
        Questions about this policy? Email us at{' '}
        <a href="mailto:hello@yaro-labs.com" style={{ color: '#2563eb' }}>hello@yaro-labs.com</a>.
      </p>
    </main>
  )
}
