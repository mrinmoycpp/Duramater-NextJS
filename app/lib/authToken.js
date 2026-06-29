import crypto from 'node:crypto'

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function decodeBase64url(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(normalized, 'base64').toString('utf8')
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is required in production.')
  }
  return 'duramater-local-dev-secret'
}

export function signAuthToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    ...user,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  }

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`
  const signature = crypto
    .createHmac('sha256', getAuthSecret())
    .update(unsigned)
    .digest('base64url')

  return `${unsigned}.${signature}`
}

export function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [header, payload, signature] = parts
  const unsigned = `${header}.${payload}`
  const expected = crypto
    .createHmac('sha256', getAuthSecret())
    .update(unsigned)
    .digest('base64url')

  const provided = Buffer.from(signature)
  const valid = Buffer.from(expected)
  if (provided.length !== valid.length || !crypto.timingSafeEqual(provided, valid)) {
    return null
  }

  try {
    const data = JSON.parse(decodeBase64url(payload))
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null
    return data
  } catch {
    return null
  }
}
