import { useLocation } from 'react-router-dom'
import { card, mono } from './styles'
import { getLocaleFromPath, t, type LocaleString } from '../../lib/locale'

interface Props {
  label: LocaleString
  sub: LocaleString
  subColor: string
  category: LocaleString
  pulse?: boolean
}

export default function StatCard({ label, sub, subColor, category, pulse }: Props) {
  const locale = getLocaleFromPath(useLocation().pathname)
  return (
    <div data-reveal style={{ ...card, justifyContent: 'center', gap: '6px', position: 'relative' }}>
      {pulse && (
        <div className="pulse-dot" style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: '#22c55e',
        }} />
      )}
      <p style={mono}>{t(category, locale)}</p>
      <p style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.03em', margin: 0 }}>
        {t(label, locale)}
      </p>
      <p style={{ ...mono, color: subColor }}>{t(sub, locale)}</p>
    </div>
  )
}
