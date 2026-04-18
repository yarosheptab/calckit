import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export function ogImageMarkup(title: string, subtitle: string) {
  const words = title.split(' ')
  const accentWord = words[words.length - 1]
  const mainTitle = words.slice(0, -1).join(' ')

  return (
    <div
      style={{
        background: '#ffffff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        fontFamily: 'Inter',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#2563eb', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>calc</span>
        <span style={{ color: '#0f172a', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>kit</span>
      </div>

      {/* Title block */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 44, height: 4, background: '#2563eb', borderRadius: 2, marginBottom: 28, display: 'flex' }} />

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 22 }}>
          {mainTitle ? (
            <span style={{ color: '#0f172a', fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px' }}>
              {mainTitle}
            </span>
          ) : null}
          <span style={{ color: '#2563eb', fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px' }}>
            {accentWord}
          </span>
        </div>

        <div style={{ color: '#64748b', fontSize: 22, fontWeight: 700, lineHeight: 1.5 }}>
          {subtitle}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', color: '#94a3b8', fontSize: 15, fontWeight: 700 }}>
        calckit.yaro-labs.com
      </div>
    </div>
  )
}

export async function createOgImageResponse(title: string, subtitle: string) {
  const font = await readFile(join(process.cwd(), 'assets/Inter-Bold.ttf'))
  return new ImageResponse(ogImageMarkup(title, subtitle), {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Inter', data: font, weight: 700, style: 'normal' }],
  })
}
