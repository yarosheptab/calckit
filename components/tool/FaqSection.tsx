export interface FaqItem { q: string; a: string }

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-16 pt-2">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <h3 className="font-semibold text-gray-900 text-[15px] mb-2">{item.q}</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
