import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'calckit — Free Online Calculators'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Free Online Calculators', 'Mortgage · Compound · ROI · Currency · Units · Tip · Tax'),
    { width: 1200, height: 630 }
  )
}
