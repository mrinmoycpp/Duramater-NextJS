'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

function toUser(session) {
  const u = session?.user
  if (!u) return null
  const m = u.user_metadata || {}
  return {
    id: u.id,
    email: u.email,
    name: m.full_name || m.name || u.email?.split('@')[0] || 'Member',
    avatar: m.avatar_url || m.picture || null,
  }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(toUser(data.session))
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session))
      setLoading(false)
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }, [])

  const signInWithEmail = useCallback(async (email) => {
    if (!supabase) return
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  return { user, loading, signInWithGoogle, signInWithEmail, signOut }
}
