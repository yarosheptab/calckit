export interface FaqItem { q: string; a: string }

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-16 pt-2">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {items.map((item, i) => (
          <div key={i} className="px-6 py-5">
            <h3 className="font-semibold text-gray-900 text-[15px] mb-1.5">{item.q}</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
