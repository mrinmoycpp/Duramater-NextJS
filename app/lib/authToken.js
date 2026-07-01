const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

function base64url(input) {
  const str = typeof input === 'string' ? input : String.fromCharCode(...new Uint8Array(input))
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function decodeBase64url(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
  const binary = atob(padded)
  return binary
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is required in production.')
  }
  return 'duramater-local-dev-secret'
}

async function signAuthToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    ...user,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  }

  const headerEncoded = base64url(JSON.stringify(header))
  const payloadEncoded = base64url(JSON.stringify(payload))
  const unsigned = `${headerEncoded}.${payloadEncoded}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getAuthSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(unsigned)
  )

  return `${unsigned}.${base64url(signature)}`
}

async function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [header, payload, signature] = parts
  const unsigned = `${header}.${payload}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getAuthSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const signatureBytes = new Uint8Array(
    atob(signature.replace(/-/g, '+').replace(/_/g, '/'))
      .split('')
      .map(c => c.charCodeAt(0))
  )

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    new TextEncoder().encode(unsigned)
  )

  if (!isValid) return null

  try {
    const data = JSON.parse(decodeBase64url(payload))
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null
    return data
  } catch {
    return null
  }
}

export { signAuthToken, verifyAuthToken }
