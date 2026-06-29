'use client'

import { useState } from 'react'
import { BRAND } from '../data/content.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Please try again.')
      setStatus({ state: 'done', msg: data.message })
      setEmail('')
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-signup">
            <div className="wordmark">{BRAND.wordmark}</div>
            <div className="tagline">NABL Certified Labs · Secure Data · Built on India's DPDP Framework</div>
            <p>Sign up for the latest in personalised health, insights, and updates.</p>
            <form className="signup-row" onSubmit={submit}>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <button className="btn btn-cream" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? '…' : 'Get Connected'}
              </button>
            </form>
            {status.state === 'done' && <p className="form-msg ok" style={{ color: 'var(--gold)' }}>{status.msg}</p>}
            {status.state === 'error' && <p className="form-msg err" style={{ color: '#e08a78' }}>{status.msg}</p>}

            <div className="app-badges">
              <span className="app-badge"><span className="ico">▶</span><span><small>Get it on</small><b>Google Play</b></span></span>
              <span className="app-badge"><span className="ico"></span><span><small>Download on the</small><b>App Store</b></span></span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#what-we-test">What We Test</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#faqs">FAQs</a>
            <a href="#community">Community</a>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <a href="#" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer">X</a>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DuraMater Health. All rights reserved.</span>
          <span className="legal">
            <a href="#">Terms</a><a href="#">Privacy Policy</a><a href="#">Medical Consent</a><a href="#">DPDP Compliance</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
