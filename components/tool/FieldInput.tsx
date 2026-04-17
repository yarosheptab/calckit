import { Label } from '@/components/ui/label'
import { TooltipIcon } from './TooltipIcon'

interface FieldInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  prefix?: string
  suffix?: string
  tooltip?: string
  placeholder?: string
  type?: string
  min?: string
  max?: string
  step?: string
  id?: string
}

export default function FieldInput({
  label, value, onChange, prefix, suffix, tooltip, placeholder, type = 'number', min, max, step, id,
}: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="flex items-center gap-1.5">
        {label}
        {tooltip && <TooltipIcon text={tooltip} />}
      </Label>
      <div className="flex items-center h-11 border border-gray-200 rounded-lg bg-white overflow-hidden transition-all focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/10">
        {prefix && (
          <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-100 h-full flex items-center select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="flex-1 px-3 h-full text-[15px] font-medium text-gray-900 bg-transparent outline-none"
        />
        {suffix && (
          <span className="px-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-100 h-full flex items-center whitespace-nowrap select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
