import type { CSSProperties } from 'react'

export const card: CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '16px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
}

export const mono: CSSProperties = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
}

export const pill = (color: string): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '11px',
  fontFamily: 'ui-monospace, monospace',
  padding: '3px 10px',
  borderRadius: '999px',
  border: `1px solid ${color}`,
  color,
  whiteSpace: 'nowrap' as const,
})
