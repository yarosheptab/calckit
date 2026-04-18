import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Tip Calculator — calckit'

export default async function OG() {
  return createOgImageResponse('Tip Calculator', 'Split the bill & calculate gratuity')
}
