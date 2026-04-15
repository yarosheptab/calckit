interface TwoColLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
}

export default function TwoColLayout({ left, right }: TwoColLayoutProps) {
  return (
    <div className="two-col-layout">
      <div style={{ padding: '20px 20px 28px', background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        {left}
      </div>
      <div style={{ padding: '20px 20px 28px', background: '#f9fafb' }}>
        {right}
      </div>
    </div>
  )
}
