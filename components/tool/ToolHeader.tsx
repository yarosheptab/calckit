import Link from 'next/link'

interface ToolHeaderProps {
  title: string
  description: string
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
      <div className="text-sm text-gray-400 mb-3">
        <Link href="/" className="hover:text-gray-600 transition-colors">calckit</Link>
        {' / '}
        <span>{title}</span>
      </div>
      <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
        {title}
      </h1>
      <p className="text-[15px] text-gray-500 leading-relaxed max-w-lg">{description}</p>
    </div>
  )
}
