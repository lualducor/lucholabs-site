import { VercelRequest, VercelResponse } from '@vercel/node'
import { timingSafeEqual } from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const { code, state } = req.query

  if (!code || typeof code !== 'string') {
    res.status(400).json({ error: 'code required' })
    return
  }

  if (!state || typeof state !== 'string') {
    res.status(400).json({ error: 'state required' })
    return
  }

  const cookieState = req.cookies.oauth_state
  if (!cookieState) {
    res.status(400).json({ error: 'state missing' })
    return
  }

  try {
    if (!timingSafeEqual(Buffer.from(cookieState), Buffer.from(state))) {
      res.status(400).json({ error: 'state mismatch' })
      return
    }
  } catch {
    res.status(400).json({ error: 'state mismatch' })
    return
  }

  res.setHeader('Set-Cookie', 'oauth_state=; Path=/; Max-Age=0')

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    res.status(500).json({ error: 'missing oauth credentials' })
    return
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        state,
      }),
    })

    if (!tokenRes.ok) {
      res.status(502).json({ error: 'github oauth failed' })
      return
    }

    const data = (await tokenRes.json()) as { access_token?: string }

    if (!data.access_token) {
      res.status(502).json({ error: 'github oauth failed' })
      return
    }

    const token = data.access_token
    const siteOrigin = 'https://lucholabs.dev'

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">
  <title>Authenticating...</title>
</head>
<body>
  <script>
    try {
      if (window.opener) {
        const message = \`authorization:github:success:{\\"token\\":\\"${token.replace(/"/g, '\\"')}\\",\\"provider\\":\\"github\\"}\`;
        window.opener.postMessage(message, '${siteOrigin}');
      }
    } catch (e) {
      console.error('postMessage failed:', e);
    }
    setTimeout(() => window.close(), 500);
  </script>
</body>
</html>`

    res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').setHeader('Cache-Control', 'no-store').send(html)
  } catch {
    res.status(502).json({ error: 'github oauth failed' })
  }
}
