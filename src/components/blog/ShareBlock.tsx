import { useState } from 'react'
import { track } from '../../lib/analytics'
import { useLocale } from '../../lib/locale'

export function ShareBlock({ title, slug }: { title: string; slug: string }) {
  const locale = useLocale()
  const [copied, setCopied] = useState(false)
  const url = `https://lucholabs.dev/blog/${slug}`
  const labels = locale === 'es'
    ? { share: 'Compartir esta entrada', copy: 'Copiar enlace', copied: '¡Copiado!' }
    : { share: 'Share this post', copy: 'Copy link', copied: 'Copied' }

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
    track('Share click', { channel: 'copy' })
  }

  function shareLink(channel: string, href: string) {
    return (
      <a
        key={channel}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        onClick={() => track('Share click', { channel })}
      >
        {channel === 'linkedin' ? 'LinkedIn' : channel === 'x' ? 'X' : 'WhatsApp'}
      </a>
    )
  }

  return (
    <div className="share-block">
      <p className="share-block-label">{labels.share}</p>
      <div className="share-btns">
        <button className="share-btn" onClick={handleCopy}>
          {copied ? labels.copied : labels.copy}
        </button>
        {shareLink(
          'linkedin',
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        )}
        {shareLink(
          'x',
          `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        )}
        {shareLink(
          'whatsapp',
          `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
        )}
      </div>
    </div>
  )
}
