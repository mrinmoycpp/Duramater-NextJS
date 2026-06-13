'use client'

import { useEffect, useState } from 'react'
import { BRAND } from '../data/content.js'
import { useAuth } from '../hooks/useAuth.js'
import SocialAuth from './SocialAuth.jsx'

export default function Login({ open, onClose }) {
  const { signInWithGoogle, signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const onGoogle = async () => {
    setStatus({ state: 'loading', msg: '' })
    const { error } = await signInWithGoogle()
    if (error) setStatus({ state: 'error', msg: error.message })
    // on success the browser redirects to Google, so nothing else to do here
  }

  const onEmail = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    const { error } = await signInWithEmail(email)
    if (error) setStatus({ state: 'error', msg: error.message })
    else setStatus({ state: 'sent', msg: '' })
  }

  const close = () => {
    onClose()
    setTimeout(() => { setEmail(''); setStatus({ state: 'idle', msg: '' }) }, 300)
  }

  return (
    <div className="drawer-backdrop open" onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="waitlist-card" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" style={{ color: 'var(--ink)', position: 'absolute', top: 16, right: 18 }} onClick={close} aria-label="Close">×</button>

        {status.state === 'sent' ? (
          <div className="success-box">
            <div className="check">✉</div>
            <h3>Check your email</h3>
            <p className="hint">We sent a secure sign-in link to <b>{email}</b>. Click it to access your dashboard.</p>
            <button className="btn btn-green" onClick={close}>Got it</button>
          </div>
        ) : (
          <>
            <span className="wl-eyebrow">{BRAND.display}</span>
            <h2 className="wl-title">Sign in</h2>
            <p className="wl-sub">Access your health dashboard, reports and personalised plan.</p>

            <SocialAuth onAuthed={onGoogle} />
            <div className="auth-divider"><span>or with email</span></div>

            <form onSubmit={onEmail}>
              <div className="field">
                <label>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              {status.state === 'error' && <p className="form-msg err">{status.msg}</p>}
              <button className="btn btn-green btn-block" style={{ marginTop: 16 }} disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Sending…' : 'Email me a sign-in link'}
              </button>
            </form>

            <p className="wl-proof">New here? Signing in creates your account automatically.</p>
          </>
        )}
      </div>
    </div>
  )
}
