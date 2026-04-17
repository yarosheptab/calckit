export function ogImageMarkup(title: string, subtitle: string) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
        <span style={{ color: '#93c5fd', fontSize: 24, fontWeight: 800 }}>calc</span>
        <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 800 }}>kit</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#ffffff', fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginBottom: 18, letterSpacing: '-1px' }}>
          {title}
        </div>
        <div style={{ color: '#93c5fd', fontSize: 26, fontWeight: 500 }}>
          {subtitle}
        </div>
      </div>
    </div>
  )
}
