import { useLocation } from 'react-router-dom'
import { card, mono } from './styles'
import { getLocaleFromPath, t, type LocaleString } from '../../lib/locale'

interface Props {
  company: string
  role: LocaleString
  period: string
}

export default function MiniExperienceCard({ company, role, period }: Props) {
  const locale = getLocaleFromPath(useLocation().pathname)
  return (
    <div data-reveal style={{ ...card, gap: '6px', justifyContent: 'center' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
        {company}
      </p>
      <p style={mono}>{t(role, locale)}</p>
      <p style={{ ...mono, color: 'rgba(255,255,255,0.25)' }}>{period}</p>
    </div>
  )
}
