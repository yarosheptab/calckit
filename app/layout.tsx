import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const siteTitle = 'calckit — Free Online Calculators'
const siteDescription = 'Calculators — Mortgage, Compound Interest, ROI, Currency Converter, Unit Converter, Tip Calculator, Tax Estimator. Free, no account needed.'

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'calculators',
    'mortgage calculator',
    'compound interest calculator',
    'ROI calculator',
    'currency converter',
    'unit converter',
    'tip calculator',
    'tax calculator',
    'free online calculators',
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://calckit.yaro-labs.com',
    siteName: 'calckit',
    type: 'website',
    images: [{ url: 'https://calckit.yaro-labs.com/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PGJKRZZF" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'calckit',
                  url: 'https://calckit.yaro-labs.com',
                  description: siteDescription,
                  publisher: { '@type': 'Organization', name: 'Yaro Labs', url: 'https://yaro-labs.com' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: { '@type': 'EntryPoint', urlTemplate: 'https://calckit.yaro-labs.com/search?q={search_term_string}' },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Organization',
                  name: 'Yaro Labs',
                  url: 'https://yaro-labs.com',
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PGJKRZZF');`,
          }}
        />
      </body>
    </html>
  )
}
