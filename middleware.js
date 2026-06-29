import { NextResponse } from 'next/server'

function base64urlToBytes(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

function base64urlToJson(value) {
  const text = new TextDecoder().decode(base64urlToBytes(value))
  return JSON.parse(text)
}

async function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [header, payload, signature] = parts
  const unsigned = `${header}.${payload}`
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret && process.env.NODE_ENV === 'production') return null
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret || 'duramater-local-dev-secret'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64urlToBytes(signature),
    new TextEncoder().encode(unsigned)
  )

  if (!isValid) return null

  try {
    const data = base64urlToJson(payload)
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null
    return data
  } catch {
    return null
  }
}

export async function middleware(request) {
  const token = request.cookies.get('auth_token')?.value
  const user = await verifyAuthToken(token)

  if (user) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/'
  url.searchParams.set('auth', 'required')
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
