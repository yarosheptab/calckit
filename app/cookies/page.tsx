import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for calckit — what cookies we use (Google Analytics), how to control them, and how to opt out.',
  openGraph: {
    title: 'Cookie Policy — calckit',
    description: 'Cookie policy for calckit — what cookies we use and how to control them.',
    url: 'https://calckit.yaro-labs.com/cookies',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy — calckit',
    description: 'Cookie policy for calckit — what cookies we use and how to control them.',
  },
}

const h2Style = { fontSize: '14px', fontWeight: 600, color: '#111827', marginTop: '28px', marginBottom: '8px' } as const
const pStyle = { fontSize: '13px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 10px' } as const

export default function CookiesPage() {
  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <Link href="/" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
        ← Back to home
      </Link>
      <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', marginBottom: '6px' }}>Cookie Policy</h1>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>Last updated: 16 April 2026</p>

      <h2 style={h2Style}>What Are Cookies?</h2>
      <p style={pStyle}>
        Cookies are small text files stored by your browser when you visit a website. They help sites remember your preferences and understand how visitors use the site.
      </p>

      <h2 style={h2Style}>Cookies We Use</h2>
      <p style={pStyle}>
        calckit uses a minimal set of cookies:
      </p>
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '14px 18px', marginBottom: '16px' }}>
        <p style={{ ...pStyle, margin: '0 0 10px', fontWeight: 600, color: '#374151' }}>Google Analytics 4 (GA4)</p>
        <p style={{ ...pStyle, margin: 0 }}>
          We use GA4 to understand site traffic — which pages are popular, how long visitors stay, and general geographic regions. GA4 sets cookies (such as <code style={{ fontSize: '12px', background: '#e5e7eb', padding: '1px 5px', borderRadius: '3px' }}>_ga</code> and <code style={{ fontSize: '12px', background: '#e5e7eb', padding: '1px 5px', borderRadius: '3px' }}>_ga_*</code>) to distinguish sessions and measure usage. These cookies do not identify you personally. Data is processed by Google in accordance with their privacy policy.
        </p>
      </div>
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '14px 18px', marginBottom: '16px' }}>
        <p style={{ ...pStyle, margin: '0 0 10px', fontWeight: 600, color: '#374151' }}>Cookie Consent (localStorage)</p>
        <p style={{ ...pStyle, margin: 0 }}>
          When you interact with the cookie banner, your choice ("accepted" or "declined") is saved in your browser's localStorage under the key <code style={{ fontSize: '12px', background: '#e5e7eb', padding: '1px 5px', borderRadius: '3px' }}>calckit-cookie-consent</code>. This is not a cookie — it stays in your browser only and is never sent to our servers. It persists until you clear your browser storage.
        </p>
      </div>

      <h2 style={h2Style}>No Other Tracking</h2>
      <p style={pStyle}>
        We do not use advertising cookies, retargeting pixels, or third-party tracking scripts beyond GA4. All calculator computations run in your browser — no inputs are sent anywhere.
      </p>

      <h2 style={h2Style}>How to Control Cookies</h2>
      <p style={pStyle}>
        You have several options to control cookies:
      </p>
      <ul style={{ ...pStyle, paddingLeft: '20px', margin: '0 0 10px' }}>
        <li style={{ marginBottom: '6px' }}><strong style={{ color: '#374151' }}>Cookie banner:</strong> Click "Decline" on the banner at the bottom of any page to opt out of GA4 analytics.</li>
        <li style={{ marginBottom: '6px' }}><strong style={{ color: '#374151' }}>Browser settings:</strong> Most browsers let you block or delete cookies. Refer to your browser's help documentation for instructions.</li>
        <li style={{ marginBottom: '6px' }}><strong style={{ color: '#374151' }}>Google opt-out:</strong> You can also opt out of Google Analytics across all sites using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>Google Analytics Opt-out Browser Add-on</a>.</li>
        <li><strong style={{ color: '#374151' }}>Clear localStorage:</strong> Open your browser's developer tools (F12), go to Application → Local Storage, and delete the <code style={{ fontSize: '12px', background: '#e5e7eb', padding: '1px 5px', borderRadius: '3px' }}>calckit-cookie-consent</code> entry to reset your consent choice.</li>
      </ul>

      <h2 style={h2Style}>Changes</h2>
      <p style={pStyle}>
        We may update this cookie policy from time to time. The "last updated" date above will reflect any changes.
      </p>

      <h2 style={h2Style}>Contact</h2>
      <p style={pStyle}>
        Questions about how we use cookies? Email us at{' '}
        <a href="mailto:hello@yaro-labs.com" style={{ color: '#2563eb' }}>hello@yaro-labs.com</a>.
      </p>
    </main>
  )
}
