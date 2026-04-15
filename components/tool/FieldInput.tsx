interface FieldInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  min?: string
  step?: string
}

export default function FieldInput({ label, id, type = 'number', value, onChange, placeholder, min, step }: FieldInputProps) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: '#6b7280', marginBottom: '4px' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        style={{
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: '5px',
          padding: '7px 10px',
          fontSize: '11px',
          color: '#111',
          background: '#fff',
          transition: 'border-color 120ms ease',
        }}
      />
    </div>
  )
}
