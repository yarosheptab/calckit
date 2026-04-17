import { ImageResponse } from 'next/og'
import { ogImageMarkup } from '@/lib/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Unit Converter — calckit'

export default function OG() {
  return new ImageResponse(
    ogImageMarkup('Unit Converter', 'Length · Weight · Temperature · Data'),
    { width: 1200, height: 630 }
  )
}
