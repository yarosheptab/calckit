import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Compound Interest', 'Future value with compounding and contributions'),
    { width: 1200, height: 630 }
  )
}
