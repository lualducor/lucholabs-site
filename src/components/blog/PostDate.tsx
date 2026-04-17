import { useMemo } from 'react'

const formatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

interface PostDateProps {
  date: string
}

export function PostDate({ date }: PostDateProps) {
  const formattedDate = useMemo(() => formatter.format(new Date(date)), [date])

  return (
    <time dateTime={date} style={{ color: 'rgba(255,255,255,0.55)' }}>
      {formattedDate}
    </time>
  )
}
