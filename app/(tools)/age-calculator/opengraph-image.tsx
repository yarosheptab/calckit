import { createOgImageResponse } from '@/lib/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Age Calculator — calckit'
export default async function OG() {
  return createOgImageResponse('Age Calculator', 'Your exact age in years, months & days')
}
