export default function AboutPage() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: '16px' }}>About calckit</h1>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        calckit is a free collection of everyday calculators: mortgage, compound interest, ROI, currency conversion, unit conversion, tips, and taxes. No account needed, no ads, no data collected.
      </p>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        All calculations run directly in your browser. For currency conversions, exchange rates are fetched from{' '}
        <a href="https://open.er-api.com" style={{ color: '#2563eb' }}>open.er-api.com</a> and cached for one hour.
      </p>
      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>
        calckit is part of the{' '}
        <a href="https://yaro-labs.com" style={{ color: '#2563eb' }}>yaro-labs.com</a> family of developer and productivity tools.
      </p>
      <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.6 }}>
        Tax estimates use simplified 2024 US federal brackets and are for informational purposes only. Always consult a tax professional for advice specific to your situation.
      </p>
    </div>
  )
}
