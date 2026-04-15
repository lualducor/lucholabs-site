export default function ThesisBanner() {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px 16px' }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'rgba(34,197,94,0.7)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          ★ Meritorious Thesis
        </span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>
          Open Source Hearing-Impaired Accessibility Tool
        </span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
          B.Sc Systems Engineering · Adopted by SENA & Universidad ECCI · 2024
        </span>
      </div>
    </div>
  )
}
