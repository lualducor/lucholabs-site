import { Clock3 } from 'lucide-react'

interface ReadingTimeProps {
  time: string
}

export function ReadingTime({ time }: ReadingTimeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      <Clock3 size={14} strokeWidth={1.75} />
      <span>· {time}</span>
    </span>
  )
}
