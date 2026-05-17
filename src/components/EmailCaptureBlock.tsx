import { track } from '../lib/analytics'

type EmailCaptureVariant = 'cv' | 'lab' | 'blog' | 'talk'

type EmailCaptureBlockProps = {
  variant?: EmailCaptureVariant
  headline?: string
  subheadline?: string
}

export default function EmailCaptureBlock({
  variant = 'cv',
  headline = 'Notified when I publish.',
  subheadline = 'Build logs, postmortems, occasional rants. No spam.',
}: EmailCaptureBlockProps) {
  return (
    <section aria-label="Email updates" className="mb-20 rounded-[20px] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-white/45">
          Updates
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
          {headline}
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/60">
          {subheadline}
        </p>
      </div>

      <form
        action="mailto:lualducor@gmail.com?subject=Subscribe&body=Subscribe%20me%20to%20updates%20at%20lucholabs.dev"
        method="post"
        encType="text/plain"
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={() => {
          track('email_capture', { variant, location: window.location.pathname })
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="min-h-11 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
        />
        <button
          type="submit"
          className="min-h-11 rounded-xl border border-white/12 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}
