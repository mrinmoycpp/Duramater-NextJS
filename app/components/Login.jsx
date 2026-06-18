"use client"

import { useEffect, useState } from 'react'
import { BRAND } from '../data/content.js'
import { useAuth } from '../hooks/useAuth.js'
import SocialAuth from './SocialAuth.jsx'

export default function Login({ open, onClose }) {
  const { signInWithGoogle, signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [activeTab, setActiveTab] = useState('terms')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [pendingAction, setPendingAction] = useState(null) // 'google' | 'email' | null
  const [pendingEmail, setPendingEmail] = useState('')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) {
      setEmail('')
      setStatus({ state: 'idle', msg: '' })
      setActiveTab('terms')
      setPendingAction(null)
      setPendingEmail('')
      return
    }
    const accepted = localStorage.getItem('termsAccepted') === 'true'
    setTermsAccepted(accepted)
    setActiveTab('terms')
  }, [open])

  if (!open) return null

  const close = () => {
    onClose && onClose()
    setTimeout(() => { setEmail(''); setStatus({ state: 'idle', msg: '' }) }, 300)
  }

  const performGoogleSignIn = async () => {
    setStatus({ state: 'loading', msg: '' })
    const { error } = await signInWithGoogle()
    if (error) setStatus({ state: 'error', msg: error.message })
  }

  const performEmailSignIn = async (emailToUse) => {
    setStatus({ state: 'loading', msg: '' })
    const { error } = await signInWithEmail(emailToUse)
    if (error) setStatus({ state: 'error', msg: error.message })
    else setStatus({ state: 'sent', msg: '' })
  }

  const handleGoogle = async () => {
    if (!termsAccepted) {
      setPendingAction('google')
      setActiveTab('terms')
      return
    }
    await performGoogleSignIn()
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    if (!termsAccepted) {
      setPendingAction('email')
      setPendingEmail(email)
      setActiveTab('terms')
      return
    }
    await performEmailSignIn(email)
  }

  const handleAcceptTerms = async () => {
    localStorage.setItem('termsAccepted', 'true')
    setTermsAccepted(true)
    setActiveTab('sign-in')
    if (pendingAction === 'google') {
      setPendingAction(null)
      await performGoogleSignIn()
    } else if (pendingAction === 'email') {
      const e = pendingEmail || email
      setPendingAction(null)
      setPendingEmail('')
      await performEmailSignIn(e)
    }
  }

  return (
    <div className="drawer-backdrop open" onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="waitlist-card" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: 640, width: '100%' }}>
        <button className="drawer-close" style={{ color: 'var(--ink)', position: 'absolute', top: 16, right: 18 }} onClick={close} aria-label="Close">×</button>

        <div className="tabs" style={{ padding: '0 24px 10px' }}>
          <button
            className={`${activeTab === 'sign-in' ? 'active' : ''} ${!termsAccepted ? 'disabled' : ''}`}
            disabled={!termsAccepted}
            title={!termsAccepted ? 'Accept terms first' : 'Sign in'}
            onClick={() => {
              if (termsAccepted) setActiveTab('sign-in')
            }}
          >
            Sign in
          </button>
          <button className={activeTab === 'terms' ? 'active' : ''} onClick={() => setActiveTab('terms')}>Terms & Conditions</button>
        </div>

        {status.state === 'sent' ? (
          <div className="success-box">
            <div className="check">✉</div>
            <h3>Check your email</h3>
            <p className="hint">We sent a secure sign-in link to <b>{email}</b>. Click it to access your dashboard.</p>
            <button className="btn btn-green" onClick={close}>Got it</button>
          </div>
        ) : (
          <>
            {activeTab === 'sign-in' ? (
              <>
                <span className="wl-eyebrow">{BRAND.display}</span>
                <h2 className="wl-title">Sign in</h2>
                <p className="wl-sub">Access your health dashboard, reports and personalised plan.</p>

                <SocialAuth onAuthed={handleGoogle} disabled={!termsAccepted} />
                <div className="auth-divider"><span>or with email</span></div>

                <form onSubmit={handleEmailSubmit}>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" disabled={!termsAccepted} />
                  </div>
                  {status.state === 'error' && <p className="form-msg err">{status.msg}</p>}
                  <button className="btn btn-green btn-block" style={{ marginTop: 16 }} disabled={status.state === 'loading' || !termsAccepted}>
                    {status.state === 'loading' ? 'Sending…' : 'Email me a sign-in link'}
                  </button>
                  {!termsAccepted && <p className="form-msg" style={{ marginTop: 8 }}>Please accept the Terms & Conditions to continue.</p>}
                </form>

                <p className="wl-proof">New here? Signing in creates your account automatically.</p>
              </>
            ) : (
              <>
                <span className="wl-eyebrow">{BRAND.display}</span>
                <h2 className="wl-title">Terms & Conditions</h2>
                <p className="wl-sub">Review our terms before signing in with email or Google.</p>
                <div style={{ padding: '18px 0' }}>
                  <p>
                    By continuing, you agree to our <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Terms</a> and <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Privacy Policy</a>.
                  </p>
                  <p>We use your email to create an account and store your preferences securely. Your data is protected according to our policies.</p>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button onClick={() => setActiveTab('sign-in')}>Back to sign in</button>
                  <button className="btn btn-green" onClick={handleAcceptTerms}>Accept & continue</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
