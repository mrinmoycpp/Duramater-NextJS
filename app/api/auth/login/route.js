import { NextResponse } from 'next/server'
import { signAuthToken } from '../../../lib/authToken.js'
import { findUserByCredentials } from '../../../lib/userStore.js'

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

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  try {
    const user = findUserByCredentials(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const token = await signAuthToken(user)
    const response = NextResponse.json({ token, user })
    setAuthCookie(response, token)
    return response
  } catch (error) {
    if (error.message.includes('Filesystem operations not supported')) {
      return NextResponse.json(
        { error: 'Email/password authentication is not configured. Please use Google OAuth or configure a database.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 })
  }
}
