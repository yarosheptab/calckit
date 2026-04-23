import { createOgImageResponse } from '@/lib/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Inflation Calculator — calckit'
export default async function OG() {
  return createOgImageResponse('Inflation Calculator', 'Purchasing power over time')
}
