import { card, mono } from './styles'

interface Props {
  company: string
  role: string
  period: string
}

export default function MiniExperienceCard({ company, role, period }: Props) {
  return (
    <div style={{ ...card, gap: '6px', justifyContent: 'center' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
        {company}
      </p>
      <p style={mono}>{role}</p>
      <p style={{ ...mono, color: 'rgba(255,255,255,0.25)' }}>{period}</p>
    </div>
  )
}
