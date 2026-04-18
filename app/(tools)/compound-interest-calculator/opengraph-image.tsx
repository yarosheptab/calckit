import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Compound Interest Calculator — calckit'

export default async function OG() {
  return createOgImageResponse('Compound Interest', 'Future value with compounding and contributions')
}
