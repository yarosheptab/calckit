'use client'

interface CalcButtonProps {
  onClick: () => void
  label?: string
}

export default function CalcButton({ onClick, label = 'Calculate' }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 600,
        padding: '9px 0',
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'background 120ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
      onMouseLeave={e => (e.currentTarget.style.background = '#2563eb')}
    >
      {label}
    </button>
  )
}
