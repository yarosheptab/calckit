import { cn } from '@/lib/utils'

interface SegmentedToggleProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer',
            value === opt
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
