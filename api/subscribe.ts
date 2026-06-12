import { VercelRequest, VercelResponse } from '@vercel/node'

type SubscribeBody = {
  email?: unknown
  website?: unknown
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).setHeader('Allow', 'POST').json({ error: 'method not allowed' })
    return
  }

  let body: SubscribeBody

  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) as SubscribeBody : req.body ?? {}
  } catch {
    res.status(400).json({ error: 'invalid email' })
    return
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'invalid email' })
    return
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    res.status(200).json({ ok: true })
    return
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID

  if (!apiKey || !groupId) {
    res.status(500).json({ error: 'subscribe not configured' })
    return
  }

  try {
    const upstreamResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    })

    if (!upstreamResponse.ok) {
      res.status(502).json({ error: 'upstream failure' })
      return
    }

    res.status(200).json({ ok: true })
  } catch {
    res.status(502).json({ error: 'upstream failure' })
  }
}
