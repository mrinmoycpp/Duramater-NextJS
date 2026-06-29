'use client'
import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

function apiPath(path) {
  return `${API_BASE}${path}`
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async (token) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const res = await fetch(apiPath('/api/auth/me'), {
        headers,
        credentials: 'include',
      })
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        throw new Error('Invalid token')
      }
    } catch (e) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    
    // Check if we are returning from Google OAuth
    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('token')
    
    if (urlToken) {
      localStorage.setItem('token', urlToken)
      window.history.replaceState({}, document.title, window.location.pathname)
      fetchMe(urlToken).finally(() => {
        if (mounted) setLoading(false)
      })
      return
    }

    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token || storedUser) {
      fetchMe(token).finally(() => {
        if (mounted) setLoading(false)
      })
      return () => { mounted = false }
    }

    fetchMe().finally(() => {
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [fetchMe])

  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const res = await fetch(apiPath('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errData = await res.json()
        return { error: { message: errData.error || 'Failed to sign in' } }
      }

      const { token, user: loggedInUser } = await res.json()
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      return { data: { user: loggedInUser } }
    } catch (err) {
      return { error: { message: err.message } }
    }
  }, [])

  const registerWithEmail = useCallback(async (email, password, name) => {
    try {
      const res = await fetch(apiPath('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const errData = await res.json()
        return { error: { message: errData.error || 'Failed to register' } }
      }

      const { token, user: loggedInUser } = await res.json()
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      return { data: { user: loggedInUser } }
    } catch (err) {
      return { error: { message: err.message } }
    }
  }, [])

  const signInWithGoogle = useCallback((mode = 'login') => {
    const authMode = mode === 'register' ? 'register' : 'login'
    localStorage.setItem('googleAuthMode', authMode)

    const params = new URLSearchParams({
      mode: authMode,
      redirect: '/dashboard',
    })

    window.location.href = `/api/auth/google?${params.toString()}`
  }, [])

  const signOut = useCallback(async () => {
    await fetch(apiPath('/api/auth/logout'), {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {})
    document.cookie = 'auth_token=; Max-Age=0; path=/'
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return { user, loading, signInWithEmail, registerWithEmail, signInWithGoogle, signOut }
}
