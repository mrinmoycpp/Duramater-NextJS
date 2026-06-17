'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'
import { SUMMARY, CATEGORY_TABS, BIOMARKERS, STATUS_META } from '../data/dashboard.js'

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

/* ── Sidebar nav items ──────────────────────────────────── */
const SIDE_MENU = [
  { id: 'Data',      label: 'Overview',   icon: '⊞' },
  { id: 'Data',      label: 'Biomarkers', icon: '〜' },
  { id: 'Plan',      label: 'Plan',       icon: '☰' },
  { id: 'Services',  label: 'Services',   icon: '✦' },
  { id: 'Reports',   label: 'Reports',    icon: '📋' },
  { id: 'Timeline',  label: 'Timeline',   icon: '↕' },
]
const SIDE_CONNECT = [

]
const SIDE_BOTTOM = [

]

/* ── Plan page ──────────────────────────────────────────── */
function PlanPage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Your plan</h1>
      <p className="dm-page-sub">Personalised recommendations based on your latest results</p>
      <div className="dm-pending-banner">
        <span className="dm-pending-dot" />
        <span>Pending action — book your consultation before May 19, 2025</span>
      </div>
      <div className="dm-plan-grid">
        {[
          { title: 'Protocol plan', desc: 'Your personalised health protocol is ready. Book a consultation with your Duramater physician to walk through next steps.', cta: 'Book consultation ↗', dark: true },
          { title: 'Advanced blood panel', desc: 'Recommended follow-up for your ApoB and Vitamin D markers. Schedule at a partner clinic near you.', cta: 'Schedule test ↗' },
          { title: 'VO2 Max assessment', desc: 'Track your cardiorespiratory fitness — a key longevity predictor. Next available slot: 22 May.', cta: 'Book slot ↗' },
          { title: 'DEXA body composition', desc: 'Measure lean mass, fat distribution and bone density. Results integrate directly with your dashboard.', cta: 'Book slot ↗' },
        ].map(c => (
          <div key={c.title} className={`dm-plan-card${c.dark ? ' dm-plan-dark' : ''}`}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <button className="dm-plan-btn">{c.cta}</button>
          </div>
        ))}
      </div>
      <div className="dm-progress-card">
        <h3>Protocol progress</h3>
        {[
          { label: 'LDL reduction plan', pct: 78, color: '#3ecf8e' },
          { label: 'Vitamin D supplementation', pct: 45, color: '#d8a93a' },
          { label: 'Uric acid dietary protocol', pct: 30, color: '#d56aa6' },
        ].map(p => (
          <div key={p.label} className="dm-prog-item">
            <div className="dm-prog-meta"><span>{p.label}</span><span>{p.pct}%</span></div>
            <div className="dm-prog-bar"><div className="dm-prog-fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Services page ──────────────────────────────────────── */
const SERVICES = [
  { icon: '🧪', title: 'Advanced blood panel',       desc: 'Comprehensive 106-marker blood test with full longevity and hormone analysis.',               bg: '#eaf3de', color: '#3B6D11', cta: 'Book now ↗' },
  { icon: '🧬', title: 'Genetic testing',            desc: 'Full genomic sequencing to understand your health predispositions and longevity potential.',  bg: '#e6f1fb', color: '#185FA5', cta: 'Book now ↗' },
  { icon: '🏃', title: 'VO2 Max test',               desc: 'Lab-grade cardiorespiratory fitness — one of the strongest longevity predictors.',            bg: '#faeeda', color: '#854F0B', cta: 'Book now ↗' },
  { icon: '🔬', title: 'Full body MRI',              desc: 'Head-to-toe MRI screening with AI-assisted analysis and physician review.',                   bg: '#eeedfe', color: '#534AB7', cta: 'Book now ↗' },
  { icon: '📊', title: 'DEXA scan',                  desc: 'Body composition and bone density — integrated directly into your dashboard.',                bg: '#e1f5ee', color: '#0F6E56', cta: 'Book now ↗' },
  { icon: '🩺', title: 'Physician consultation',     desc: '1:1 video consultation with a Duramater longevity physician to review your results.',         bg: '#fbeaf0', color: '#993556', cta: 'Book now ↗' },
  { icon: '🦠', title: 'Gut microbiome test',        desc: 'Deep sequencing of your gut microbiome with personalised nutrition recommendations.',         bg: '#fcebeb', color: '#A32D2D', cta: 'Book now ↗' },
  { icon: '🌿', title: 'Allergy panel',              desc: 'Complete IgE allergy screening across food, environmental, and contact allergens.',           bg: '#f1efe8', color: '#5F5E5A', cta: 'Book now ↗' },
  { icon: '💧', title: 'Continuous glucose monitor', desc: '14-day CGM with real-time glucose tracking and metabolic health insights.',                   bg: '#eaf3de', color: '#3B6D11', cta: 'Get started ↗' },
]
function ServicesPage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Services</h1>
      <p className="dm-page-sub">All Duramater services available to you</p>
      <div className="dm-svc-grid">
        {SERVICES.map(s => (
          <div key={s.title} className="dm-svc-card">
            <div className="dm-svc-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <button className="dm-svc-btn">{s.cta}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Reports page ───────────────────────────────────────── */
const REPORTS = [
  { icon: '📄', title: 'Advanced blood panel — Apr 2025',  date: 'Completed Apr 28, 2025 · 106 biomarkers' },
  { icon: '📄', title: 'Physician summary — Apr 2025',     date: 'Dr. M. Patel · Apr 30, 2025' },
  { icon: '🧬', title: 'Genetic report — Jan 2025',        date: 'Completed Jan 14, 2025 · Full genomic panel' },
  { icon: '🔬', title: 'Full body MRI — Nov 2024',         date: 'Completed Nov 8, 2024 · AI-assisted review' },
  { icon: '📊', title: 'DEXA body composition — Nov 2024', date: 'Completed Nov 8, 2024 · Bone density + lean mass' },
  { icon: '📄', title: 'Blood panel — Jul 2024',           date: 'Completed Jul 12, 2024 · 106 biomarkers' },
]
function ReportsPage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Reports</h1>
      <p className="dm-page-sub">All your lab results and physician summaries</p>
      <div className="dm-report-list">
        {REPORTS.map(r => (
          <div key={r.title} className="dm-report-row">
            <div className="dm-report-icon">{r.icon}</div>
            <div><div className="dm-report-name">{r.title}</div><div className="dm-report-date">{r.date}</div></div>
            <button className="dm-report-dl">↓ Download</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Timeline page ──────────────────────────────────────── */
const TL_EVENTS = [
  { color: '#3ecf8e', title: 'Advanced blood panel completed',  body: '106 biomarkers tested. Biological age 29.9 — 3.3 years younger. 6 markers out of range.', date: 'Apr 28, 2025' },
  { color: '#d8a93a', title: 'Physician consultation',         body: 'Reviewed ApoB, Uric Acid, and Vitamin D with Dr. Patel. Protocol plan updated.',           date: 'Apr 30, 2025' },
  { color: '#3ecf8e', title: 'Genetic report delivered',       body: 'Full genomic panel completed. No significant APOE or BRCA variants detected.',             date: 'Jan 14, 2025' },
  { color: '#d56aa6', title: 'Full body MRI + DEXA scan',     body: 'No incidental findings. Bone density T-score +0.8. Lean mass 73.2 kg.',                    date: 'Nov 8, 2024' },
  { color: '#3ecf8e', title: 'First blood panel',             body: 'Baseline 106-marker panel. Superpower score 64 — now improved to 72.',                     date: 'Jul 12, 2024' },
]
function TimelinePage() {
  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Timeline</h1>
      <p className="dm-page-sub">Your health journey over time</p>
      <div className="dm-timeline">
        {TL_EVENTS.map((ev, i) => (
          <div key={i} className="dm-tl-item">
            <div className="dm-tl-col">
              <div className="dm-tl-dot" style={{ background: ev.color }} />
              {i < TL_EVENTS.length - 1 && <div className="dm-tl-line" />}
            </div>
            <div className="dm-tl-body">
              <h3>{ev.title}</h3>
              <p>{ev.body}</p>
              <div className="dm-tl-date">{ev.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main dashboard ─────────────────────────────────────── */
const DATA_NAV = ['Longevity Markers','Heart Health','Thyroid Health','Immune Regulation','Hormone Health','Metabolic Health','Nutrients','Liver Health','Kidney Health','Inflammation','Blood']

export default function Dashboard() {
const router = useRouter()

const user = {
  name: 'Demo User',
  email: 'demo@example.com',
}

const loading = false

const signOut = () => {}

  const [tab, setTab] = useState('Data')
  const [cat, setCat] = useState('Blood')
  const [dataNav, setDataNav] = useState('Longevity Markers')
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



  return (
    <div className="dm-layout">

      {/* ── Sidebar ──────────────────────────────── */}
      <aside className="dm-sidebar">
        <div className="dm-sb-logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          {BRAND.wordmark}
        </div>

        <div className="dm-sb-section">
          <div className="dm-sb-label">Menu</div>
          <nav className="dm-sb-nav">
            {SIDE_MENU.map((item, i) => (
              <a key={i} className={tab === item.id ? 'active' : ''} onClick={() => onTab(item.id)}>
                <span className="dm-nav-icon">{item.icon}</span>{item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="dm-sb-divider" />

        <div className="dm-sb-section">
          <div className="dm-sb-label"></div>
          <nav className="dm-sb-nav">
            {SIDE_CONNECT.map(item => (
              <a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>
            ))}
          </nav>
        </div>


        <div className="dm-sb-bottom">
          <nav className="dm-sb-nav">
            {SIDE_BOTTOM.map(item => (
              <a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────── */}
      <div className="dm-main">
        

        {/* Page content */}
        <div className="dm-content">

          {/* ── PLAN ── */}
          {tab === 'Plan' && <PlanPage />}

          {/* ── SERVICES ── */}
          {tab === 'Services' && <ServicesPage />}

          {/* ── REPORTS ── */}
          {tab === 'Reports' && <ReportsPage />}

          {/* ── TIMELINE ── */}
          {tab === 'Timeline' && <TimelinePage />}

          {/* ── DATA (overview) ── */}
          {tab === 'Data' && (
            <div>
              <div className="dash-head">
                <h1>Welcome, {user.name.split(' ')[0]}</h1>
                <button className="dash-records">▣ Health Records</button>
              </div>

              {/* Hero cards — score + bio age */}
              <div className="dm-hero-cards">
                <div className="dm-sc-card">
                  <div className="dm-sc-bg" />
                  <div className="dm-sc-z">
                    <div className="dm-sc-top">
                      <div className="dm-sc-label">Duramater score</div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="dm-sc-num">{SUMMARY.score.value}</div>
                        <div className="dm-sc-status">On Track</div>
                      </div>
                    </div>
                    <div>
                      <div className="dm-sc-track">
                        <div className="dm-sc-fill" style={{ width: `${SUMMARY.score.value}%` }} />
                        <div className="dm-sc-mkr" style={{ left: `${SUMMARY.score.value}%` }} />
                      </div>
                      <div className="dm-sc-lbls"><span>0</span><span>60</span><span>80</span><span>100</span></div>
                    </div>
                  </div>
                </div>

                <div className="dm-ba-card">
                  <div className="dm-ba-bg" />
                  <div className="dm-ba-z">
                    <div className="dm-ba-top">
                      <div className="dm-ba-label">Biological age</div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="dm-ba-age-lbl">Age</div>
                        <div className="dm-ba-num">{SUMMARY.bioAge.value}</div>
                        <div className="dm-ba-sub">{SUMMARY.bioAge.note}</div>
                      </div>
                    </div>
                    <div>
                      <div className="dm-ba-track">
                        <div className="dm-ba-fill" style={{ left: '20%', width: '36%' }} />
                        <div className="dm-ba-mkr" style={{ left: '44%' }} />
                      </div>
                      <div className="dm-ba-lbls"><span>−5</span><span>Current</span><span>+5</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload zone */}
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
                    <span>PDF or image — we&apos;ll auto-fill your biomarker values</span>
                  </span>
                  <span className="duz-cta">Upload report</span>
                </button>
              )}

              {/* Data nav + biomarker table */}
              <div className="dm-data-layout">
                <nav className="dm-data-nav">
                  <div className="dm-data-nav-title">All data</div>
                  {DATA_NAV.map(item => (
                    <a key={item} className={dataNav === item ? 'active' : ''} onClick={() => setDataNav(item)}>
                      <span className="dm-data-dot" />&nbsp;{item}
                    </a>
                  ))}
                </nav>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 className="dm-bm-title">Biomarkers</h2>
                  <div className="dm-bm-counts">
                    <div className="dm-bm-ci"><div className="dm-bm-n">72</div><div className="dm-bm-l">Total</div></div>
                    <div className="dm-bm-ci"><div className="dm-bm-n">{SUMMARY.results.optimal}</div><div className="dm-bm-l">Optimal</div></div>
                    <div className="dm-bm-ci"><div className="dm-bm-n">{SUMMARY.results.normal}</div><div className="dm-bm-l">In range</div></div>
                    <div className="dm-bm-ci"><div className="dm-bm-n">{SUMMARY.results.outOfRange}</div><div className="dm-bm-l">Out of range</div></div>
                  </div>
                  <div className="dm-bm-strip">
                    <div style={{ flex: SUMMARY.results.optimal, background: '#3ecf8e', height: 5, borderRadius: 3 }} />
                    <div style={{ flex: SUMMARY.results.normal,  background: '#f0d060', height: 5, borderRadius: 3 }} />
                    <div style={{ flex: SUMMARY.results.outOfRange, background: '#d56aa6', height: 5, borderRadius: 3 }} />
                  </div>

                  <div className="dash-controls">
                    <div className="dash-search">
                      <span aria-hidden>⌕</span>
                      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search biomarkers…" />
                    </div>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="all">All statuses</option>
                      <option value="optimal">Optimal</option>
                      <option value="normal">Normal</option>
                      <option value="out">Out of Range</option>
                    </select>
                  </div>

                  <div className="dash-table">
                    <div className="dash-trow dash-thead">
                      <span>Name</span><span>Status</span><span>Value</span><span>Optimal range</span><span>History</span>
                    </div>
                    {groups.length === 0 && <div className="dash-empty">No markers match your search.</div>}
                    {groups.map(([system, items]) => (
                      <div key={system}>
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}