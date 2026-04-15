interface BreakdownRow {
  label: string
  value: string
  barPct?: number   // 0–100, if provided renders a mini bar
}

interface ResultPanelProps {
  label: string
  value: string
  subtitle?: string
  rows?: BreakdownRow[]
}

export default function ResultPanel({ label, value, subtitle, rows }: ResultPanelProps) {
  return (
    <div>
      <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 500, marginBottom: '3px' }}>{label}</div>
      <div style={{ fontSize: '30px', fontWeight: 800, color: '#111', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '2px' }}>
        {value}
      </div>
      {subtitle && <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '14px' }}>{subtitle}</div>}
      {rows && rows.length > 0 && (
        <>
          <div style={{ height: '1px', background: '#f0f0f0', margin: '12px 0' }} />
          {rows.map((row, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                <span style={{ color: '#6b7280' }}>{row.label}</span>
                <span style={{ color: '#111', fontWeight: 600 }}>{row.value}</span>
              </div>
              {row.barPct !== undefined && (
                <div style={{ height: '3px', background: '#f3f4f6', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${row.barPct}%`, background: '#2563eb', borderRadius: '2px' }} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
