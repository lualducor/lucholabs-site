export default function ThesisBanner() {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '32px 40px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '16px', fontWeight: 600, color: '#ffffff',
          letterSpacing: '-0.02em', margin: 0,
        }}>
          Meritorious Thesis — Open Source Accessibility Tool
        </h2>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: 'rgba(34,197,94,0.9)',
          backgroundColor: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '999px', padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          Live · In Use · 2024–Present
        </span>
      </div>

      {/* Story */}
      <p style={{
        fontSize: '14px', color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.75, margin: '0 0 24px 0',
        maxWidth: '860px',
      }}>
        During my final semester at Universidad ECCI, I worked alongside a hearing-impaired classmate
        who struggled to follow lectures in real time. There was no tooling. No solution. So I built one.
        The system runs on an NGINX server with a Node.js layer connected to Mozilla DeepSpeech, extended
        with a custom dictionary engine tuned for academic Spanish. It generates live subtitles from the
        teacher's voice directly to the student's screen — and stores a full text transcript for later
        review. Built entirely on open source software. Zero licensing cost. Deployable by any institution.
        Adopted by SENA Regional Amazonas and Universidad ECCI in 2024 — and still running today at
        academic events and presentations across both institutions. Speaking at the AI &amp; Cybersecurity
        Forum, Bogotá — May 2025 on cybersecurity in the golden era of AI.
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Node.js', 'DeepSpeech', 'NGINX', 'Open Source', 'Accessibility'].map(tag => (
          <span
            key={tag}
            translate="no"
            style={{
              fontFamily: 'ui-monospace, monospace', fontSize: '11px',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
