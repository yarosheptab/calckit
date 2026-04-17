interface TwoColLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
}

export default function TwoColLayout({ left, right }: TwoColLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6 max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-5">{left}</div>
      <div>{right}</div>
    </div>
  )
}
