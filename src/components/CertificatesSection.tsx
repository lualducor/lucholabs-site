import { certificates } from '../data/resume'

export default function CertificatesSection() {
  return (
    <section aria-label="Credentials" style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Credentials
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {certificates.map(cert => (
          <div
            key={cert.title}
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
              justifyContent: 'space-between', gap: '16px',
              padding: '20px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '200px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: '0 0 4px 0' }}>
                  {cert.title}
                </p>
                <p style={{
                  fontFamily: 'ui-monospace, monospace', fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)', margin: 0,
                }}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cert.topics.map(t => (
                  <span key={t} translate="no" style={{
                    fontSize: '11px', fontFamily: 'ui-monospace, monospace',
                    padding: '2px 8px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {cert.credentialUrl !== undefined && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px', fontFamily: 'ui-monospace, monospace',
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                  alignSelf: 'center', whiteSpace: 'nowrap',
                  padding: '6px 14px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              >
                View Credential →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
