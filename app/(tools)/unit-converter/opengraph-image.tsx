import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Unit Converter — calckit'

export default async function OG() {
  return createOgImageResponse('Unit Converter', 'Length · Weight · Temperature · Data')
}
