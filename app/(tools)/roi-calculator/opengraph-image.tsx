import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'ROI Calculator — calckit'

export default async function OG() {
  return createOgImageResponse('ROI Calculator', 'Return on investment & annualized return')
}
