import { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).setHeader('Allow', 'GET, POST').json({ error: 'method not allowed' })
    return
  }

  const state = crypto.randomBytes(16).toString('hex')

  res.setHeader(
    'Set-Cookie',
    `oauth_state=${state}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=600`
  )

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).json({ error: 'missing OAUTH_GITHUB_CLIENT_ID' })
    return
  }

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('scope', 'repo')
  authUrl.searchParams.set('state', state)

  res.status(302).setHeader('Location', authUrl.toString()).end()
}
