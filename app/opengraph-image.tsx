import { createOgImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'calckit — Free Online Calculators'

export default async function OG() {
  return createOgImageResponse('Free Online Calculators', 'Mortgage · Compound · ROI · Currency · Units · Tip · Tax')
}
