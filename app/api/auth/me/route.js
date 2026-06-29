import { NextResponse } from 'next/server'
import { verifyAuthToken } from '../../../lib/authToken.js'

export async function GET(request) {
  const auth = request.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : request.cookies.get('auth_token')?.value
  const user = verifyAuthToken(token)

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id || user.sub,
    email: user.email,
    name: user.name,
    picture: user.picture,
    provider: user.provider,
  })
}
