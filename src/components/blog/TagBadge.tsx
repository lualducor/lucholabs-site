import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface TagBadgeProps {
  tag: string
  active?: boolean
}

export function TagBadge({ tag, active = false }: TagBadgeProps) {
  return (
    <Link
      to={`/blog/tag/${encodeURIComponent(tag)}`}
      className={cn('transition-colors')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '999px',
        border: active ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.12)',
        backgroundColor: active ? 'rgba(34,197,94,0.12)' : 'transparent',
        color: active ? 'rgba(134,239,172,0.95)' : 'rgba(255,255,255,0.55)',
        textDecoration: 'none',
        fontFamily: 'ui-monospace, monospace',
        fontSize: '11px',
        letterSpacing: '0.03em',
      }}
    >
      #{tag}
    </Link>
  )
}
