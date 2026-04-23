import { createOgImageResponse } from '@/lib/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Loan Calculator — calckit'
export default async function OG() {
  return createOgImageResponse('Loan Calculator', 'Monthly payment & total interest')
}
