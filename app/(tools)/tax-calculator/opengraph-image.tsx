import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Income Tax Calculator — calckit'

export default async function OG() {
  return createOgImageResponse('Income Tax Calculator', 'US federal brackets · 2024 standard deduction')
}
