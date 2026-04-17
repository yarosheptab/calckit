import Link from 'next/link'

interface RelatedTool {
  name: string
  href: string
}

export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="mt-5">
      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
        Related tools
      </span>
      <div className="flex gap-2 mt-2.5 flex-wrap">
        {tools.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className="text-sm font-medium text-gray-600 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {t.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
