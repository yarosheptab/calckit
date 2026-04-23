import { createOgImageResponse } from '@/lib/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'BMI Calculator — calckit'
export default async function OG() {
  return createOgImageResponse('BMI Calculator', 'Body mass index & healthy weight range')
}
