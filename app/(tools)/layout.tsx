import RelatedTools from '@/components/tool/RelatedTools'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedTools />
    </>
  )
}
