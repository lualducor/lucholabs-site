export function Callout({ type, children }: { type: 'note' | 'warning' | 'result'; children: React.ReactNode }) {
  return <div className={`callout callout-${type}`}>{children}</div>
}
