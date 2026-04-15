import { card, mono } from './styles'

interface Props {
  label: string
  sub: string
  subColor: string
  category: string
  pulse?: boolean
}

export default function StatCard({ label, sub, subColor, category, pulse }: Props) {
  return (
    <div style={{ ...card, justifyContent: 'center', gap: '6px', position: 'relative' }}>
      {pulse && (
        <div className="pulse-dot" style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)',
        }} />
      )}
      <p style={mono}>{category}</p>
      <p style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', margin: 0 }}>
        {label}
      </p>
      <p style={{ ...mono, color: subColor }}>{sub}</p>
    </div>
  )
}
