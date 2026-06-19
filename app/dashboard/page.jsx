'use client'
export const dynamic = 'force-dynamic'

import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'
import { SUMMARY, BIOMARKERS, STATUS_META } from '../data/dashboard.js'

const NOTIFICATIONS = [
  { id: 1, icon: '🧬', title: 'Blood panel ready', body: 'Your Apr 2025 results are now available.', time: '2h ago', unread: true },
  { id: 2, icon: '📋', title: 'Physician note added', body: 'Dr. Patel left a note on your ApoB marker.', time: '1d ago', unread: true },
  { id: 3, icon: '💊', title: 'Supplement reminder', body: 'Take your Vitamin D — 3 days streak!', time: '2d ago', unread: false },
  { id: 4, icon: '📈', title: 'Score improved', body: 'Duramater score rose from 68 → 72.', time: '5d ago', unread: false },
]

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

/* Sidebar */
const SIDE_MENU = [
  { id: 'Overview', label: 'Home', icon: '⊞' },
  { id: 'Plan',      label: 'Plan',       icon: '☰' },
  { id: 'Services',  label: 'Services',   icon: '✦' },
  { id: 'Reports',   label: 'Reports',    icon: '📋' },
]
const SIDE_CONNECT = []
const SIDE_BOTTOM = []

/* Plan page */
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
        {[{ title: 'Protocol plan', desc: 'Your personalised health protocol is ready. Book a consultation with your Duramater physician to walk through next steps.', cta: '🔒 Coming soon', dark: true }].map(c => (
          <div key={c.title} className={`dm-plan-card${c.dark ? ' dm-plan-dark' : ''}`}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <button className="dm-plan-btn" disabled={c.cta && c.cta.includes('Coming soon')}>{c.cta}</button>
          </div>
        ))}
      </div>

      <div className="dm-plan-section">
        <h2 className="dm-plan-section-title">Action plan</h2>
        <div className="dm-plan-grid">
          {[
            { title: 'Food plan', desc: 'Personalised dietary guidance to support your biomarkers, metabolic health, and overall longevity goals.', cta: '🔒 Coming soon' },
            { title: 'Supplementary plan', desc: 'Recommended supplements and timing to support your recovery, nutrient balance, and biological age improvement.', cta: '🔒 Coming soon' },
          ].map(c => (
            <div key={c.title} className="dm-plan-card">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <button className="dm-plan-btn" disabled>{c.cta}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dm-progress-card">
        <h3>Protocol progress</h3>
        {[{ label: 'LDL reduction plan', pct: 78, color: '#3ecf8e' }, { label: 'Vitamin D supplementation', pct: 45, color: '#d8a93a' }, { label: 'Uric acid dietary protocol', pct: 30, color: '#d56aa6' }].map(p => (
          <div key={p.label} className="dm-prog-item">
            <div className="dm-prog-meta"><span>{p.label}</span><span>{p.pct}%</span></div>
            <div className="dm-prog-bar"><div className="dm-prog-fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Services page */
const SERVICES = [
  { icon: '🧬', title: 'Genetic testing', desc: 'Full genomic sequencing to understand your health predispositions and longevity potential.', bg: '#e6f1fb', color: '#185FA5', cta: '🔒 Coming soon' },
  { icon: '🏃', title: 'VO2 Max test', desc: 'Lab-grade cardiorespiratory fitness — one of the strongest longevity predictors.', bg: '#faeeda', color: '#854F0B', cta: '🔒 Coming soon' },
  { icon: '🔬', title: 'Full body MRI', desc: 'Head-to-toe MRI screening with AI-assisted analysis and physician review.', bg: '#eeedfe', color: '#534AB7', cta: '🔒 Coming soon' },
  { icon: '📊', title: 'DEXA scan', desc: 'Body composition and bone density — integrated directly into your dashboard.', bg: '#e1f5ee', color: '#0F6E56', cta: '🔒 Coming soon' },
  { icon: '🦠', title: 'Gut microbiome test', desc: 'Deep sequencing of your gut microbiome with personalised nutrition recommendations.', bg: '#fcebeb', color: '#A32D2D', cta: '🔒 Coming soon' },
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
            <button className="dm-svc-btn" disabled>{s.cta}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Reports + Timeline combined */
const REPORTS = [
  { icon: '📄', title: 'Blood panel — Jul 2024', date: 'Completed Jul 12, 2024 · 106 biomarkers' },
]

const TL_EVENTS = [
  { color: '#3ecf8e', title: 'Advanced blood panel completed', body: '106 biomarkers tested. Biological age 29.9 — 3.3 years younger. 6 markers out of range.', date: 'Apr 28, 2025' },
  { color: '#d8a93a', title: 'Physician consultation', body: 'Reviewed ApoB, Uric Acid, and Vitamin D with Dr. Patel. Protocol plan updated.', date: 'Apr 30, 2025' },
  { color: '#3ecf8e', title: 'Genetic report delivered', body: 'Full genomic panel completed. No significant APOE or BRCA variants detected.', date: 'Jan 14, 2025' },
  { color: '#d56aa6', title: 'Full body MRI + DEXA scan', body: 'No incidental findings. Bone density T-score +0.8. Lean mass 73.2 kg.', date: 'Nov 8, 2024' },
  { color: '#3ecf8e', title: 'First blood panel', body: 'Baseline 106-marker panel. Superpower score 64 — now improved to 72.', date: 'Jul 12, 2024' },
]

function CombinedReportsTimelinePage() {
  const bloodEvents = TL_EVENTS.filter(ev => /blood panel/i.test(ev.title) || /blood panel/i.test(ev.body) || /first blood panel/i.test(ev.title))
  const keyNames = ['Cholesterol, Total','LDL Cholesterol','HDL Cholesterol','Triglycerides','Apolipoprotein B (ApoB)','Hemoglobin','Ferritin','Vitamin D, 25-OH']
  const keyBiomarkers = BIOMARKERS.filter(b => keyNames.includes(b.name))

  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Reports</h1>
      <p className="dm-page-sub">Your lab reports and blood-panel timeline</p>

      <div className="dm-report-list">
        {REPORTS.map(r => (
          <div key={r.title} className="dm-report-row">
            <div className="dm-report-icon">{r.icon}</div>
            <div><div className="dm-report-name">{r.title}</div><div className="dm-report-date">{r.date}</div></div>
            <button className="dm-report-dl">↓ Download</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 26 }}>Blood panel timeline</h2>
      <div className="dm-timeline">
        {bloodEvents.map((ev, i) => (
          <div key={i} className="dm-tl-item">
            <div className="dm-tl-col">
              <div className="dm-tl-dot" style={{ background: ev.color }} />
              {i < bloodEvents.length - 1 && <div className="dm-tl-line" />}
            </div>

            <div className="dm-tl-body">
              <h3>{ev.title}</h3>
              <p>{ev.body}</p>
              <div className="dm-tl-date">{ev.date}</div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>Key biomarkers from this panel</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {keyBiomarkers.map(k => (
                    <div key={k.name} className="dm-bio-mini">
                      <div style={{ fontWeight: 600 }}>{k.name}</div>
                      <div style={{ color: 'var(--ink-soft)' }}>{k.value} {k.unit}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
        {bloodEvents.length === 0 && <div className="dm-empty">No blood-panel timeline events yet.</div>}
      </div>
    </div>
  )
}

/* Main dashboard */
const DATA_NAV = ['Heart Health','Thyroid Health','Immune Health','Hormone Health','Metabolic Health','Nutrient Status','Liver Health','Kidney Health','Inflammation Markers','Hematology']
const BIOMARKER_TABS = ['Duramater Score', 'All Biomarkers', ...DATA_NAV]
const CATEGORY_MAP = {
  'Heart Health': 'Cardiometabolic',
  'Thyroid Health': 'Thyroid',
  'Immune Health': 'Energy & Blood',
  'Hormone Health': 'Hormones',
  'Metabolic Health': 'Metabolic',
  'Nutrient Status': 'Nutrient Status',
  'Liver Health': 'Liver',
  'Kidney Health': 'Kidney',
  'Inflammation Markers': 'Inflammation',
  'Hematology': 'Hematology',
}

const CATEGORY_SCORES = {
  'Heart Health':          88,
  'Thyroid Health':        92,
  'Immune Health':         79,
  'Hormone Health':        85,
  'Metabolic Health':      74,
  'Nutrient Status':       83,
  'Liver Health':          91,
  'Kidney Health':         95,
  'Inflammation Markers':  77,
  'Hematology':            86,
}

const CATEGORY_INSIGHTS = {
  'Heart Health':          'Risk of cardiovascular event in the next 10 years is estimated at ~8%.',
  'Thyroid Health':        'Risk of hypothyroidism based on current TSH trend is approximately 10%.',
  'Immune Health':         'Immune response markers are mildly suppressed — monitoring advised.',
  'Hormone Health':        'Testosterone levels are within range; cortisol slightly elevated.',
  'Metabolic Health':      'Insulin sensitivity is borderline — dietary adjustments recommended.',
  'Nutrient Status':       'Vitamin D deficiency detected; B12 levels are optimal.',
  'Liver Health':          'Liver enzymes are within normal range; no signs of hepatic stress.',
  'Kidney Health':         'Kidney filtration rate (eGFR) is excellent at 98 mL/min/1.73m².',
  'Inflammation Markers':  'Mild systemic inflammation detected; CRP elevated at 2.4 mg/L.',
  'Hematology':            'Blood cell counts are healthy; haemoglobin is optimal for your age.',
}

export default function Dashboard() {
  const router = useRouter()
  const user = { name: 'Demo User', email: 'demo@example.com' }
  const loading = false
  const signOut = () => {}

  const [tab, setTab] = useState('Overview')
  const [dataNav, setDataNav] = useState('All Biomarkers')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [report, setReport] = useState(null)
  const fileRef = useRef(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const notifRef = useRef(null)

  const unreadCount = notifications.filter(n => n.unread).length
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BIOMARKERS.filter((b) =>
      (statusFilter === 'all' || b.status === statusFilter) &&
      (!q || b.name.toLowerCase().includes(q) || b.system.toLowerCase().includes(q)),
    )
  }, [query, statusFilter])

  const isScoreTab = dataNav === 'Duramater Score'

  const categoryRows = useMemo(() => {
    if (dataNav === 'All Biomarkers') return rows
    if (isScoreTab) return []
    const system = CATEGORY_MAP[dataNav]
    return rows.filter((b) =>
      system ? b.system === system || b.name.toLowerCase().includes(dataNav.toLowerCase())
             : b.system === dataNav || b.name.toLowerCase().includes(dataNav.toLowerCase()),
    )
  }, [rows, dataNav, isScoreTab])

  const sectionStats = useMemo(() => {
    const counts = { optimal: 0, normal: 0, out: 0 }
    categoryRows.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1 })
    return { total: categoryRows.length, ...counts }
  }, [categoryRows])

  const groups = useMemo(() => {
    const map = new Map()
    categoryRows.forEach((r) => { if (!map.has(r.system)) map.set(r.system, []); map.get(r.system).push(r) })
    return [...map.entries()]
  }, [categoryRows])

  const onTab = (t) => { if (t === 'Home') return router.push('/'); setTab(t) }
  const onUpload = (e) => { const f = e.target.files?.[0]; if (f) setReport({ name: f.name }); e.target.value = '' }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: 'var(--cream)' }}>
      <aside className="dm-sidebar">
        <div className="dm-sb-logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>{BRAND.wordmark}</div>
        <div className="dm-sb-section">
          <div className="dm-sb-label">Biomarkers</div>
          <nav className="dm-sb-nav">
            {BIOMARKER_TABS.map((item, i) => (
              <a key={i} className={dataNav === item ? 'active' : ''} onClick={() => setDataNav(item)}>
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="dm-sb-divider" />
        <div className="dm-sb-section">
          <div className="dm-sb-label"></div>
          <nav className="dm-sb-nav">{SIDE_CONNECT.map(item => (<a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>))}</nav>
        </div>
        <div className="dm-sb-bottom">
          <nav className="dm-sb-nav">{SIDE_BOTTOM.map(item => (<a key={item.label}><span className="dm-nav-icon">{item.icon}</span>{item.label}</a>))}</nav>
        </div>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
      <header className={`nav scrolled`} style={{ position: 'sticky', top: 12, zIndex: 60 }}>
        <div className="container">
          <a className="wordmark" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
            {BRAND.wordmark}
          </a>

          <nav className="nav-links">
            {SIDE_MENU.map((item, i) => (
              <a
                key={i}
                onClick={() => onTab(item.id)}
                style={{
                  cursor: 'pointer',
                  opacity: tab === item.id ? 1 : 0.6,
                  fontWeight: tab === item.id ? 600 : 500,
                  borderBottom: tab === item.id ? '2px solid var(--ink)' : '2px solid transparent',
                  paddingBottom: 2,
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            {/* Notification Bell */}
            <div className="nav-notif-wrap" ref={notifRef}>
              <button
                className="nav-notif-btn"
                aria-label="Notifications"
                onClick={() => setNotifOpen(v => !v)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="nav-notif-badge">{unreadCount}</span>}
              </button>

              {notifOpen && (
                <div className="nav-notif-dropdown">
                  <div className="nav-notif-header">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <button className="nav-notif-markread" onClick={markAllRead}>Mark all read</button>
                    )}
                  </div>
                  <div className="nav-notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`nav-notif-item${n.unread ? ' unread' : ''}`}>
                        <div className="nav-notif-icon">{n.icon}</div>
                        <div className="nav-notif-body">
                          <div className="nav-notif-title">{n.title}</div>
                          <div className="nav-notif-text">{n.body}</div>
                          <div className="nav-notif-time">{n.time}</div>
                        </div>
                        {n.unread && <div className="nav-notif-dot" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Circle */}
            <button className="nav-profile-btn" aria-label="Profile">
              {user.name?.[0]?.toUpperCase() ?? 'D'}
            </button>

          </div>
        </div>
      </header>

        <div style={{ flex: 1 }}>
          <div className="dm-content">
          {tab === 'Plan' && <PlanPage />}
          {tab === 'Services' && <ServicesPage />}
          {tab === 'Reports' && <CombinedReportsTimelinePage />}
          {tab === 'Overview' && (
            <div>
              <div className="dash-head">
                <h1>Welcome, {user.name.split(' ')[0]}</h1>
                {report ? (
                  <div className="dash-uploaded" style={{ margin: 0 }}>✓ <b>{report.name}</b> processed
                    <button className="dash-reupload" onClick={() => fileRef.current?.click()}>Upload another</button>
                  </div>
                ) : (
                  <button className="dash-records" onClick={() => fileRef.current?.click()}>↑ Upload Lab Report</button>
                )}
              </div>

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

              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={onUpload} />

              <div className="dm-biomarker-section">


                {isScoreTab ? (
                  <div className="dm-bm-score-card">
                    <div className="dm-bm-score-z">
                      <div className="dm-ba-top">
                        <div className="dm-ba-label">Duramater score</div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="dm-ba-age-lbl">Score</div>
                          <div className="dm-ba-num">{SUMMARY.score.value}</div>
                          <div className="dm-ba-sub">{SUMMARY.score.message}</div>
                        </div>
                      </div>
                      <div>
                        <div className="dm-ba-track">
                          <div className="dm-ba-fill" style={{ width: `${SUMMARY.score.value}%`, background: '#8de0c6' }} />
                          <div className="dm-ba-mkr" style={{ left: `${SUMMARY.score.value}%` }} />
                        </div>
                        <div className="dm-ba-lbls"><span>0</span><span>60</span><span>80</span><span>100</span></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>

                    {/* Category Section Heading */}
                    {dataNav !== 'All Biomarkers' && CATEGORY_MAP[dataNav] && (
                      <div className="dm-cat-heading">
                        <div className="dm-cat-title-row">
                          <h2 className="dm-cat-title">{CATEGORY_MAP[dataNav]}</h2>
                          <span className="dm-cat-score-inline">{CATEGORY_SCORES[dataNav]}<span className="dm-cat-score-of">/100</span></span>
                        </div>
                        <p className="dm-cat-insight">{CATEGORY_INSIGHTS[dataNav]}</p>
                      </div>
                    )}

                    <div className="dash-controls">
                      <div className="dash-search"><span aria-hidden>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search biomarkers or categories…" /></div>
                      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All statuses</option>
                        <option value="optimal">Optimal</option>
                        <option value="normal">Normal</option>
                        <option value="out">Out of Range</option>
                      </select>
                    </div>

                    <div className="dash-table">
                      <div className="dash-trow dash-thead"><span>Marker</span><span>Status</span><span>Result</span><span>Reference range</span><span>Trend</span></div>
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
