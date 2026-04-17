import type { Metadata } from 'next'
import CurrencyConverter from '../currency-converter/CurrencyConverter'

export const metadata: Metadata = {
  title: 'Exchange Rate Converter – Live Currency Exchange Rates',
  description: 'Convert currencies using live exchange rates. Get the current exchange rate between any two world currencies — perfect for travel planning and international payments.',
  keywords: ['exchange rate converter', 'currency exchange calculator', 'live exchange rates', 'forex converter'],
  alternates: { canonical: 'https://calckit.yaro-labs.com/currency-converter' },
  openGraph: {
    title: 'Exchange Rate Converter – Live Currency Exchange Rates',
    description: 'Convert currencies using live exchange rates. Get the current rate between any two world currencies.',
    url: 'https://calckit.yaro-labs.com/exchange-rate-converter',
    siteName: 'calckit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exchange Rate Converter – Live Currency Exchange Rates',
    description: 'Convert currencies using live exchange rates — perfect for travel and international payments.',
  },
}

export default function ExchangeRateConverterPage() {
  return <CurrencyConverter />
}
