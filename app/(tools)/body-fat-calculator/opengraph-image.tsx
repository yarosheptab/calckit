import { createOgImageResponse } from '@/lib/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Body Fat Calculator — calckit'
export default async function OG() {
  return createOgImageResponse('Body Fat Calculator', 'Body fat percentage by Navy method')
}
