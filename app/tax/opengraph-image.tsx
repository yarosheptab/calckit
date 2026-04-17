import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Income Tax Calculator', 'US federal brackets · 2024 standard deduction'),
    { width: 1200, height: 630 }
  )
}
