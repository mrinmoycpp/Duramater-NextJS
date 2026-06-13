'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'
import { useAuth } from '../hooks/useAuth.js'
import {
  SUMMARY, TOP_TABS, CATEGORY_TABS, BIOMARKERS, STATUS_META,
} from '../data/dashboard.js'

function Sparkline({ history, color }) {
  const w = 84, h = 28, pad = 3
  const min = Math.min(...history), max = Math.max(...history)
  const span = max - min || 1
  const pts = history.map((v, i) => {
    const x = pad + (i / (history.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / span) * (h - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const last = pts[pts.length - 1].split(',')
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.6" fill={color} />
    </svg>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) router.replace('/')
  }, [loading, user, router])

  const [tab, setTab] = useState('Data')
  const [cat, setCat] = useState('Blood')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [report, setReport] = useState(null)
  const fileRef = useRef(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BIOMARKERS.filter((b) =>
      (statusFilter === 'all' || b.status === statusFilter) &&
      (!q || b.name.toLowerCase().includes(q) || b.system.toLowerCase().includes(q)),
    )
  }, [query, statusFilter])

  const groups = useMemo(() => {
    const map = new Map()
    rows.forEach((r) => { if (!map.has(r.system)) map.set(r.system, []); map.get(r.system).push(r) })
    return [...map.entries()]
  }, [rows])

  const onTab = (t) => {
    if (t === 'Home') return router.push('/')
    setTab(t)
  }

  const onUpload = (e) => {
    const f = e.target.files?.[0]
    if (f) setReport({ name: f.name })
    e.target.value = ''
  }

  if (loading || !user) {
    return <div className="dash-gate">Loading your dashboard…</div>
  }

  return (
    <div className="dash">
      <header className="dash-top">
        <span className="wordmark" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>{BRAND.wordmark}</span>
        <nav className="dash-tabs">
          {TOP_TABS.map((t) => (
            <button key={t} className={t === tab ? 'active' : ''} onClick={() => onTab(t)}>{t}</button>
          ))}
        </nav>
        <div className="dash-account">
          <span className="dash-hi">Hi, {user.name.split(' ')[0]}</span>
          <button className="dash-signout" onClick={() => { signOut(); router.push('/') }}>Sign out</button>
        </div>
      </header>

      <div className="dash-body">
        <div className="dash-head">
          <h1>Data</h1>
          <button className="dash-records">▣ Health Records</button>
        </div>

        <div className="dash-cards">
          <div className="dash-card score">
            <div className="dc-label">{BRAND.display} score</div>
            <div className="score-ring">
              <div className="score-num">{SUMMARY.score.value}</div>
              <div className="score-of">out of {SUMMARY.score.outOf}</div>
            </div>
            <p className="dc-msg">{SUMMARY.score.message}</p>
          </div>
          <div className="dash-card bioage">
            <div className="dc-label">Biological Age</div>
            <div className="bioage-num">{SUMMARY.bioAge.value}</div>
            <p className="dc-msg">{SUMMARY.bioAge.note}</p>
          </div>
          <div className="dash-card results">
            <div className="dc-results-head">
              <div className="dc-label light">Results</div>
              <div className="dc-asof">As of {SUMMARY.results.asOf}</div>
            </div>
            <ul className="dc-results-list">
              <li><b style={{ color: STATUS_META.optimal.color }}>{SUMMARY.results.optimal}</b> Optimal</li>
              <li><b style={{ color: STATUS_META.normal.color }}>{SUMMARY.results.normal}</b> Normal</li>
              <li><b style={{ color: STATUS_META.out.color }}>{SUMMARY.results.outOfRange}</b> Out of range</li>
            </ul>
          </div>
        </div>

        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={onUpload} />
        {report ? (
          <div className="dash-uploaded">
            ✓ <b>{report.name}</b> processed — {BIOMARKERS.length} biomarkers fed into your dashboard.
            <button className="dash-reupload" onClick={() => fileRef.current?.click()}>Upload another</button>
          </div>
        ) : (
          <button className="dash-upload-zone" onClick={() => fileRef.current?.click()}>
            <span className="duz-icon" aria-hidden>↑</span>
            <span className="duz-text">
              <b>Upload your lab report</b>
              <span>PDF or image — we'll auto-fill your biomarker values</span>
            </span>
            <span className="duz-cta">Upload report</span>
          </button>
        )}

        <div className="dash-cats">
          {CATEGORY_TABS.map((c) => (
            <button key={c} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="dash-controls">
          <div className="dash-search">
            <span aria-hidden>⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Status</option>
            <option value="optimal">Optimal</option>
            <option value="normal">Normal</option>
            <option value="out">Out of Range</option>
          </select>
        </div>

        {cat !== 'Blood' ? (
          <div className="dash-empty">No {cat} data yet — your next panel will populate this tab.</div>
        ) : (
          <div className="dash-table">
            <div className="dash-trow dash-thead">
              <span>Name</span><span>Status</span><span>Value</span><span>Optimal range</span><span>History</span>
            </div>
            {groups.length === 0 && <div className="dash-empty">No markers match your search.</div>}
            {groups.map(([system, items]) => (
              <div className="dash-group" key={system}>
                <div className="dash-group-label">{system}</div>
                {items.map((b) => {
                  const meta = STATUS_META[b.status]
                  return (
                    <div className="dash-trow" key={b.name}>
                      <span className="d-name">{b.name}</span>
                      <span className="d-status"><i style={{ background: meta.color }} />{meta.label}</span>
                      <span className="d-value">{b.value} <em>{b.unit}</em></span>
                      <span className="d-range">{b.range[0]} – {b.range[1]}</span>
                      <span className="d-history"><Sparkline history={b.history} color={meta.color} /></span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
