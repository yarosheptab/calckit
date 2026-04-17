interface BreakdownRow {
  label: string
  value: string
  barPct?: number // legacy — ignored in new UI; will be removed in Task 10
}

interface BarData {
  pct: number
  left: string
  right: string
}

interface ResultPanelProps {
  label: string
  value: string
  subtitle?: string
  rows?: BreakdownRow[]
  bar?: BarData
}

export default function ResultPanel({ label, value, subtitle, rows, bar }: ResultPanelProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden sticky top-20">
      {/* Primary result */}
      <div className="px-6 pt-6 pb-5 border-b border-blue-100">
        <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-2">
          {label}
        </div>
        <div className="font-mono text-[52px] font-semibold text-blue-900 tracking-tight leading-none mb-1">
          {value}
        </div>
        {subtitle && <div className="text-sm text-blue-300">{subtitle}</div>}
      </div>

      {/* Breakdown rows */}
      {rows && rows.length > 0 && (
        <div className="bg-white px-6 py-1">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm text-gray-500">{row.label}</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Optional progress bar */}
      {bar && (
        <div className="bg-white px-6 pb-5">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, bar.pct))}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-blue-600 font-semibold">{bar.left}</span>
            <span className="text-xs text-gray-400 font-semibold">{bar.right}</span>
          </div>
        </div>
      )}
    </div>
  )
}
