import { NextResponse } from 'next/server'
import { signAuthToken } from '../../../lib/authToken.js'
import { createUser } from '../../../lib/userStore.js'

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

function setAuthCookie(response, token) {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const name = String(body.name || '').trim()

  if (!isEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
  }

  const result = createUser({ email, password, name })
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 409 })
  }

  const token = await signAuthToken(result.user)
  const response = NextResponse.json({ token, user: result.user })
  setAuthCookie(response, token)
  return response
}
