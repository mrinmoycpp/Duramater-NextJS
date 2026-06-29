'use client'
export const dynamic = 'force-dynamic'

import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND } from '../data/content.js'
import { STATUS_META } from '../data/dashboard.js'
import { useAuth } from '../hooks/useAuth.js'

const API = 'http://localhost:4000'

const NOTIFICATIONS = [
  { id: 1, icon: '🧬', title: 'Blood panel ready', body: 'Your latest results are now available.', time: 'Just now', unread: true },
  { id: 2, icon: '📋', title: 'Physician note added', body: 'Review your biomarker results above.', time: '1d ago', unread: false },
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
function CombinedReportsTimelinePage({ liveBiomarkers, reportMeta }) {
  const bloodReports = reportMeta ? [reportMeta] : []

  const keyBiomarkers = liveBiomarkers
    ? liveBiomarkers.filter(b =>
        ['Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'Hemoglobin', 'Ferritin', 'Vitamin D'].some(k =>
          b.name.toLowerCase().includes(k.toLowerCase())
        )
      ).slice(0, 8)
    : []

  return (
    <div className="dm-page">
      <h1 className="dm-page-title">Reports</h1>
      <p className="dm-page-sub">Your lab reports and blood-panel timeline</p>

      <div className="dm-report-list">
        {bloodReports.length === 0 && (
          <div className="dm-empty" style={{ padding: '24px 0' }}>No reports uploaded yet. Upload a lab report from the Overview tab.</div>
        )}
        {bloodReports.map((r, i) => (
          <div key={i} className="dm-report-row">
            <div className="dm-report-icon">📄</div>
            <div>
              <div className="dm-report-name">{r.fileName || 'Lab Report'}</div>
              <div className="dm-report-date">Completed {r.date} · {r.biomarkerCount || 0} biomarkers</div>
            </div>
            <button className="dm-report-dl" disabled>↓ Download</button>
          </div>
        ))}
      </div>

      {keyBiomarkers.length > 0 && (
        <>
          <h2 style={{ marginTop: 26 }}>Key biomarkers from latest panel</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 12 }}>
            {keyBiomarkers.map(k => (
              <div key={k.name} className="dm-bio-mini">
                <div style={{ fontWeight: 600 }}>{k.name}</div>
                <div style={{ color: 'var(--ink-soft)' }}>{k.value} {k.unit}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* Category score / insight defaults (used only when backend does not return a value for that category) */
const DEFAULT_CATEGORY_SCORES = {
  'Heart Health': null, 'Thyroid Health': null, 'Immune Health': null,
  'Hormone Health': null, 'Metabolic Health': null, 'Nutrient Status': null,
  'Liver Health': null, 'Kidney Health': null, 'Inflammation Markers': null,
  'Hematology': null, 'Cancer Prevention': null,
}

const DEFAULT_CATEGORY_INSIGHTS = {
  'Heart Health': '', 'Thyroid Health': '', 'Immune Health': '',
  'Hormone Health': '', 'Metabolic Health': '', 'Nutrient Status': '',
  'Liver Health': '', 'Kidney Health': '', 'Inflammation Markers': '',
  'Hematology': '', 'Cancer Prevention': '',
}

/* Main dashboard */
const DATA_NAV = ['Heart Health','Thyroid Health','Immune Health','Hormone Health','Metabolic Health','Nutrient Status','Liver Health','Kidney Health','Inflammation Markers','Hematology','Cancer Prevention']
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
  'Cancer Prevention': 'Tumor Markers',
}

export default function Dashboard() {
  const router = useRouter()
  const { user: authUser, loading, signOut } = useAuth()
  const user = authUser

  // All live state starts null — populated exclusively from the backend
  const [liveSummary, setLiveSummary] = useState(null)
  const [liveBiomarkers, setLiveBiomarkers] = useState(null)
  const [liveCategoryScores, setLiveCategoryScores] = useState(DEFAULT_CATEGORY_SCORES)
  const [liveCategoryInsights, setLiveCategoryInsights] = useState(DEFAULT_CATEGORY_INSIGHTS)
  const [liveRiskFlags, setLiveRiskFlags] = useState([])
  const [reportMeta, setReportMeta] = useState(null)

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
    if (!loading && !authUser) {
      router.replace('/?auth=required')
    }
  }, [authUser, loading, router])

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // On mount: auto-load the latest completed report if auth is ready
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || !authUser) return

    const loadLatestReport = async () => {
      try {
        const latestRes = await fetch(`${API}/api/upload/reports/latest`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!latestRes.ok) return
        const latestData = await latestRes.json()
        if (latestData && latestData.reportId) {
          setReport({ name: latestData.fileName || 'Latest Report', status: 'COMPLETED', reportId: latestData.reportId })
          fetchResult(latestData.reportId, token)
        }
      } catch (err) {
        console.error('Failed to load latest report:', err)
      }
    }
    loadLatestReport()
  }, [authUser])

  const rows = useMemo(() => {
    if (!liveBiomarkers) return []
    const q = query.trim().toLowerCase()
    return liveBiomarkers.filter((b) =>
      (statusFilter === 'all' || b.status === statusFilter) &&
      (!q || b.name.toLowerCase().includes(q) || b.system.toLowerCase().includes(q)),
    )
  }, [query, statusFilter, liveBiomarkers])

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

  const onUpload = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    e.target.value = ''
    try {
      setReport({ name: f.name, status: 'UPLOADING' })
      // Clear out the previous report's data while the new one processes
      setLiveBiomarkers(null)
      setLiveSummary(null)
      setLiveCategoryScores(DEFAULT_CATEGORY_SCORES)
      setLiveCategoryInsights(DEFAULT_CATEGORY_INSIGHTS)
      
      const token = localStorage.getItem('token')

      // Step 1 — Get presigned upload URL
      const urlRes = await fetch(`${API}/api/upload/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ fileName: f.name, mimeType: f.type || 'application/pdf', fileSizeBytes: f.size })
      })
      if (!urlRes.ok) {
        const errData = await urlRes.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to get upload URL')
      }
      const { uploadUrl, reportId } = await urlRes.json()

      // Step 2 — Upload file to local server (PUT)
      const s3Res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': f.type || 'application/pdf' },
        body: f
      })
      if (!s3Res.ok) throw new Error('Failed to upload file')

      // Step 3 — Confirm upload & start inline processing
      const confirmRes = await fetch(`${API}/api/upload/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ reportId })
      })
      if (!confirmRes.ok) throw new Error('Failed to confirm upload')

      setReport({ name: f.name, status: 'PROCESSING', reportId })

      // Step 4 — Poll status every 3 s
      const poll = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API}/api/upload/status/${reportId}`, {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
          })
          if (!statusRes.ok) return
          const statusData = await statusRes.json()
          if (statusData.status === 'COMPLETED') {
            clearInterval(poll)
            setReport({ name: f.name, status: 'COMPLETED', reportId })
            fetchResult(reportId, token)
          } else if (statusData.status === 'FAILED') {
            clearInterval(poll)
            setReport({ name: f.name, status: 'FAILED', errorMsg: 'Processing failed. Please try again.' })
          }
        } catch (pollErr) {
          console.error('Poll error:', pollErr)
        }
      }, 3000)

    } catch (err) {
      console.error(err)
      setReport({ name: f.name, status: 'FAILED', errorMsg: err.message || String(err) })
    }
  }

  // Fetch results from backend and map into frontend-friendly shapes
  const fetchResult = async (reportId, token) => {
    try {
      const res = await fetch(`${API}/api/upload/result/${reportId}`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      })
      if (!res.ok) throw new Error('Failed to fetch result')
      const data = await res.json()

      // --- Map biomarkers ---
      const mappedBiomarkers = (data.biomarkers || []).map(b => {
        let mappedStatus = 'normal'
        if (b.status === 'NORMAL') mappedStatus = 'optimal'
        else if (['HIGH', 'LOW', 'CRITICAL_HIGH', 'CRITICAL_LOW'].includes(b.status)) mappedStatus = 'out'

        let labelOverride = undefined
        if (
          b.rawName.toLowerCase().includes('b12') ||
          b.rawName.toLowerCase().includes('cobalamin') ||
          b.rawName.toLowerCase().includes('vitamin b12')
        ) {
          const val = Number(b.parsedValue)
          if (val >= 200 && val <= 300) {
            mappedStatus = 'normal'
            labelOverride = 'Borderline'
          }
        }

        let mappedSystem = b.biomarkerDefinition?.category || 'Other'
        if      (mappedSystem === 'LIPID_PANEL')    mappedSystem = 'Cardiometabolic'
        else if (mappedSystem === 'LIVER_FUNCTION')  mappedSystem = 'Liver'
        else if (mappedSystem === 'KIDNEY_FUNCTION') mappedSystem = 'Kidney'
        else if (mappedSystem === 'CBC')             mappedSystem = 'Hematology'
        else if (mappedSystem === 'THYROID')         mappedSystem = 'Thyroid'
        else if (mappedSystem === 'METABOLIC' || mappedSystem === 'DIABETES') mappedSystem = 'Metabolic'
        else if (mappedSystem === 'INFLAMMATION')    mappedSystem = 'Inflammation'
        else if (mappedSystem === 'HORMONES')        mappedSystem = 'Hormones'
        else if (mappedSystem === 'VITAMINS')        mappedSystem = 'Nutrient Status'
        else if (mappedSystem === 'ELECTROLYTES')    mappedSystem = 'Energy & Blood'
        else if (mappedSystem === 'TUMOR_MARKERS')   mappedSystem = 'Tumor Markers'
        else {
          mappedSystem = mappedSystem.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
        }

        return {
          name: b.rawName,
          system: mappedSystem,
          status: mappedStatus,
          statusLabel: labelOverride,
          value: b.parsedValue !== null && b.parsedValue !== undefined
            ? b.parsedValue.toString()
            : (b.rawValue || '—'),
          unit: b.unit || '',
          range: [b.appliedRefMin ?? 0, b.appliedRefMax ?? 0],
          history: [Number(b.parsedValue) || 0],
        }
      })

      setLiveBiomarkers(mappedBiomarkers)

      // --- Compute summary counts ---
      const optimalCount = mappedBiomarkers.filter(b => b.status === 'optimal').length
      const normalCount  = mappedBiomarkers.filter(b => b.status === 'normal').length
      const outCount     = mappedBiomarkers.filter(b => b.status === 'out').length

      const overallScoreObj = (data.healthScores || []).find(hs => hs.category === 'OVERALL')
      const overallScoreVal = overallScoreObj ? overallScoreObj.score : null

      const ageMarker = mappedBiomarkers.find(m => m.name.toLowerCase() === 'age')
      const chronoAge = ageMarker ? parseInt(ageMarker.value, 10) : 40

      let bioAge = null
      if (overallScoreVal !== null) {
        const delta = (overallScoreVal - 75) * -0.6
        bioAge = {
          value: Math.round(chronoAge + delta),
          delta: Math.abs(delta) > 0 ? (delta > 0 ? `+${Math.round(delta)}` : `${Math.round(delta)}`) : '0',
          label: delta > 0 ? 'years older' : (delta < 0 ? 'years younger' : 'same as chronological')
        }
      }

      setLiveSummary({
        score: {
          value: overallScoreVal,
          outOf: 100,
          message: overallScoreObj?.summary || 'Score calculated from your latest report.',
        },
        bioAge,
        results: {
          optimal: optimalCount,
          normal: normalCount,
          outOfRange: outCount,
          asOf: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        },
      })

      // --- Map category scores & insights from backend ---
      const newCategoryScores   = { ...DEFAULT_CATEGORY_SCORES }
      const newCategoryInsights = { ...DEFAULT_CATEGORY_INSIGHTS }

      ;(data.healthScores || []).forEach(hs => {
        const map = {
          'LIPID_PANEL':     'Heart Health',
          'THYROID':         'Thyroid Health',
          'METABOLIC':       'Metabolic Health',
          'DIABETES':        'Metabolic Health',
          'LIVER_FUNCTION':  'Liver Health',
          'KIDNEY_FUNCTION': 'Kidney Health',
          'INFLAMMATION':    'Inflammation Markers',
          'CBC':             'Hematology',
          'VITAMINS':        'Nutrient Status',
          'HORMONES':        'Hormone Health',
          'ELECTROLYTES':    'Immune Health',
          'TUMOR_MARKERS':   'Cancer Prevention',
        }
        const frontendCat = map[hs.category]
        if (frontendCat) {
          newCategoryScores[frontendCat] = hs.score
          if (hs.summary) newCategoryInsights[frontendCat] = hs.summary
        }
      })

      setLiveCategoryScores(newCategoryScores)
      setLiveCategoryInsights(newCategoryInsights)
      setLiveRiskFlags(data.riskFlags || [])

      // Store metadata for Reports tab
      setReportMeta({
        fileName: data.fileName,
        date: data.reportDate
          ? new Date(data.reportDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : new Date(data.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        biomarkerCount: mappedBiomarkers.length,
      })

    } catch (err) {
      console.error('fetchResult error:', err)
    }
  }

  const hasData = liveBiomarkers !== null

  if (loading || !authUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--cream)', color: 'var(--ink)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Checking your session...</div>
      </div>
    )
  }

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
              <button className="nav-profile-btn" aria-label="Profile" onClick={() => { signOut(); window.location.href = '/'; }} title="Click to Sign Out">
                {user.name?.[0]?.toUpperCase() ?? 'D'}
              </button>
            </div>
          </div>
        </header>

        <div style={{ flex: 1 }}>
          <div className="dm-content">
            {tab === 'Plan'     && <PlanPage />}
            {tab === 'Services' && <ServicesPage />}
            {tab === 'Reports'  && <CombinedReportsTimelinePage liveBiomarkers={liveBiomarkers} reportMeta={reportMeta} />}
            {tab === 'Overview' && (
              <div>
                <div className="dash-head">
                  <h1>Welcome, {user?.name?.split(' ')[0]}</h1>
                  {report ? (
                    <div className="dash-uploaded" style={{ margin: 0 }}>
                      ✓ <b>{report.name}</b>{' '}
                      {report.status === 'UPLOADING'   ? 'uploading...'
                       : report.status === 'PROCESSING' ? 'processing...'
                       : report.status === 'FAILED'     ? <span style={{ color: 'red' }}>failed: {report.errorMsg}</span>
                       : 'processed'}
                      <button className="dash-reupload" onClick={() => fileRef.current?.click()}>Upload another</button>
                    </div>
                  ) : (
                    <button className="dash-records" onClick={() => fileRef.current?.click()}>↑ Upload Lab Report</button>
                  )}
                </div>



                {/* Hero score cards */}
                <div className="dm-hero-cards">
                  <div className="dm-sc-card">
                    <div className="dm-sc-bg" />
                    <div className="dm-sc-z">
                      <div className="dm-sc-top">
                        <div className="dm-sc-label">Overall Wellness Score</div>
                        <div style={{ textAlign: 'right' }}>
                          {liveSummary ? (
                            <>
                              <div className="dm-sc-num">{liveSummary.score.value ?? '—'}</div>
                              <div className="dm-sc-status">Behavior Change Summary</div>
                              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Not a diagnosis</div>
                            </>
                          ) : (
                            <>
                              <div className="dm-sc-num" style={{ fontSize: 22, opacity: 0.6 }}>—</div>
                              <div className="dm-sc-status" style={{ opacity: 0.6 }}>Upload a report</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="dm-sc-track">
                          <div className="dm-sc-fill" style={{ width: `${liveSummary?.score?.value ?? 0}%` }} />
                          <div className="dm-sc-mkr" style={{ left: `${liveSummary?.score?.value ?? 0}%` }} />
                        </div>
                        <div className="dm-sc-lbls"><span>0</span><span>60</span><span>80</span><span>100</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="dm-ba-card">
                    <div className="dm-ba-bg" />
                    <div className="dm-ba-z">
                      <div className="dm-ba-top">
                        <div className="dm-ba-label">Results Summary</div>
                        <div style={{ textAlign: 'right' }}>
                          {liveSummary ? (
                            <>
                              <div className="dm-ba-age-lbl">Markers</div>
                              <div className="dm-ba-num" style={{ fontSize: 20, lineHeight: 1.2 }}>
                                {liveSummary.results.optimal + liveSummary.results.normal + liveSummary.results.outOfRange}
                              </div>
                              <div className="dm-ba-sub">
                                {liveSummary.results.optimal} optimal · {liveSummary.results.outOfRange} out of range
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="dm-ba-age-lbl">Markers</div>
                              <div className="dm-ba-num" style={{ opacity: 0.5 }}>—</div>
                              <div className="dm-ba-sub" style={{ opacity: 0.5 }}>No report yet</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="dm-ba-track">
                          <div className="dm-ba-fill" style={{
                            left: '0%',
                            width: liveSummary
                              ? `${Math.round((liveSummary.results.optimal / (liveSummary.results.optimal + liveSummary.results.normal + liveSummary.results.outOfRange || 1)) * 100)}%`
                              : '0%'
                          }} />
                          <div className="dm-ba-mkr" style={{ left: liveSummary ? '44%' : '0%' }} />
                        </div>
                        <div className="dm-ba-lbls">
                          <span>Optimal</span><span>Normal</span><span>Out of Range</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dm-ba-card">
                    <div className="dm-sc-bg" style={{ background: 'radial-gradient(ellipse at 70% 50%, #1e3a8a 0%, #1e40af 45%, #172554 80%)' }} />
                    <div className="dm-ba-z">
                      <div className="dm-ba-top">
                        <div className="dm-ba-label">Biological Age</div>
                        <div style={{ textAlign: 'right' }}>
                          {liveSummary && liveSummary.bioAge ? (
                            <>
                              <div className="dm-ba-age-lbl">Estimated</div>
                              <div className="dm-ba-num" style={{ fontSize: 68, lineHeight: 1 }}>
                                {liveSummary.bioAge.value}
                              </div>
                              <div className="dm-ba-sub" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                <span style={{ color: liveSummary.bioAge.delta.startsWith('+') ? '#fca5a5' : '#86efac' }}>
                                  {liveSummary.bioAge.delta}
                                </span>
                                {liveSummary.bioAge.label}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="dm-ba-age-lbl">Estimated</div>
                              <div className="dm-ba-num" style={{ opacity: 0.5 }}>—</div>
                              <div className="dm-ba-sub" style={{ opacity: 0.5 }}>Upload report</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                          Based on phenotypic age calculation
                        </div>
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
                          <div className="dm-ba-label">Overall Wellness Score</div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="dm-ba-age-lbl">Score</div>
                            <div className="dm-ba-num">{liveSummary?.score?.value ?? '—'}</div>
                            <div className="dm-ba-sub">{liveSummary?.score?.message ?? 'Upload a report to see your score'}</div>
                          </div>
                        </div>
                        <div>
                          <div className="dm-ba-track">
                            <div className="dm-ba-fill" style={{ width: `${liveSummary?.score?.value ?? 0}%`, background: '#8de0c6' }} />
                            <div className="dm-ba-mkr" style={{ left: `${liveSummary?.score?.value ?? 0}%` }} />
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
                            {liveCategoryScores[dataNav] !== null ? (
                              <span className="dm-cat-score-inline">
                                {liveCategoryScores[dataNav]}<span className="dm-cat-score-of">/100</span>
                              </span>
                            ) : (
                              <span className="dm-cat-score-inline" style={{ opacity: 0.4 }}>—<span className="dm-cat-score-of">/100</span></span>
                            )}
                          </div>
                          <p className="dm-cat-insight">
                            {liveCategoryInsights[dataNav] || 'Upload a lab report to see insights for this category.'}
                          </p>
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

                        {/* Empty state — no report uploaded yet */}
                        {!hasData && (
                          <div className="dash-empty" style={{ padding: '40px 0', textAlign: 'center' }}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>🧬</div>
                            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>No lab report uploaded yet</div>
                            <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 18 }}>
                              Upload a blood panel PDF to see your real biomarker values, health scores, and risk flags.
                            </div>
                            <button className="dash-records" onClick={() => fileRef.current?.click()}>↑ Upload Lab Report</button>
                          </div>
                        )}

                        {hasData && groups.length === 0 && (
                          <div className="dash-empty">No markers match your search.</div>
                        )}

                        {hasData && groups.map(([system, items]) => (
                          <div key={system}>
                            <div className="dash-group-label">{system}</div>
                            {items.map((b) => {
                              const meta = STATUS_META[b.status]
                              return (
                                <div className="dash-trow" key={b.name}>
                                  <span className="d-name">{b.name}</span>
                                  <span className="d-status"><i style={{ background: meta.color }} />{b.statusLabel || meta.label}</span>
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
