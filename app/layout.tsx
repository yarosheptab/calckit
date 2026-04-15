import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'calckit — Free calculators for everyday math',
  description: 'Mortgage, interest, ROI, currency, unit conversions, and more. No account. No ads.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PGJKRZZF" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
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
