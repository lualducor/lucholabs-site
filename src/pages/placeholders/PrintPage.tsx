import { Link } from 'react-router-dom'

export function PrintPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
          Placeholder
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Coming soon — Print
        </h1>
        <Link className="text-sm text-white/70 transition hover:text-white" to="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}
