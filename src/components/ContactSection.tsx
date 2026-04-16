import { contact } from '../data/resume'

export default function ContactSection() {
  return (
    <section aria-label="Contact" style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: '24px',
        fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Contact
      </h2>

      <div className="contact-grid">
        <div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', lineHeight: 1.6 }}>
            Open to technical collaboration and interesting system problems.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {contact.map(item => (
              <a
                key={item.label}
                href={item.href}
                {...(!item.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 20px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px', textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)', fontSize: '13px',
                  fontFamily: 'ui-monospace, monospace',
                  transition: 'border-color 0.15s, color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.color = 'rgba(255,255,255,0.85)'
                  el.style.backgroundColor = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.05)'
                  el.style.color = 'rgba(255,255,255,0.6)'
                  el.style.backgroundColor = 'rgba(255,255,255,0.03)'
                }}
              >
                <span style={{ flexGrow: 1 }}>{item.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '32px', borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <p style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: '12px',
          }}>
            Availability
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: '8px' }}>
            Open to remote roles
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Based in Bogotá, Colombia. Available for US & European time zones. Automation Engineering · API Integration · Remote
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '64px', paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
          lucholabs.dev
        </span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
          Bogotá, Colombia
        </span>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 420px) 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
