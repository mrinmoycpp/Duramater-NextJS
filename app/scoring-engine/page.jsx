'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function ScoringEnginePage() {
  const [activeTab, setActiveTab] = useState('Cardio')

  // --- Calculator States ---
  // Cardio
  const [le8Diet, setLe8Diet] = useState(70)
  const [le8Activity, setLe8Activity] = useState(60)
  const [le8Nicotine, setLe8Nicotine] = useState(100)
  const [le8Sleep, setLe8Sleep] = useState(65)
  const [le8BMI, setLe8BMI] = useState(55)
  const [le8Lipids, setLe8Lipids] = useState(80)
  const [le8Glucose, setLe8Glucose] = useState(75)
  const [le8BP, setLe8BP] = useState(70)

  const [preventAge, setPreventAge] = useState(55)
  const [preventSex, setPreventSex] = useState('Male')
  const [preventTC, setPreventTC] = useState(200)
  const [preventHDL, setPreventHDL] = useState(50)
  const [preventSBP, setPreventSBP] = useState(130)
  const [preventBMI, setPreventBMI] = useState(27)
  const [preventeGFR, setPreventeGFR] = useState(80)
  const [preventDiabetes, setPreventDiabetes] = useState(false)
  const [preventSmoking, setPreventSmoking] = useState(false)

  const [smokeCigs, setSmokeCigs] = useState(10)
  const [smokeYears, setSmokeYears] = useState(15)

  // Metabolic
  const [bmiWeight, setBmiWeight] = useState(70)
  const [bmiHeight, setBmiHeight] = useState(170)
  const [waistCm, setWaistCm] = useState(88)
  const [metabolicSex, setMetabolicSex] = useState('Male')
  
  const [idrsAge, setIdrsAge] = useState(45)
  const [idrsWaist, setIdrsWaist] = useState(88)
  const [idrsFamily, setIdrsFamily] = useState(10)
  const [idrsActivity, setIdrsActivity] = useState(20)

  const [insulin, setInsulin] = useState(12)
  const [glucose, setGlucose] = useState(95)
  const [tg, setTg] = useState(150)
  
  const [metsBpAbn, setMetsBpAbn] = useState(true)
  const [metsFpgAbn, setMetsFpgAbn] = useState(true)

  // Kidney
  const [kidneySex, setKidneySex] = useState('Male')
  const [kidneyAge, setKidneyAge] = useState(50)
  const [creatinine, setCreatinine] = useState(1.1)
  const [cystatinC, setCystatinC] = useState(0.9)
  const [urineAlbumin, setUrineAlbumin] = useState(3)
  const [urineCreatinine, setUrineCreatinine] = useState(0.1)

  // Liver
  const [liverGgt, setLiverGgt] = useState(40)
  const [liverAst, setLiverAst] = useState(35)
  const [liverAlt, setLiverAlt] = useState(30)
  const [liverPlatelets, setLiverPlatelets] = useState(200)

  // Respiratory
  const [respFev1, setRespFev1] = useState(2.1)
  const [respFvc, setRespFvc] = useState(3.2)
  const [respFev1Pred, setRespFev1Pred] = useState(55)
  const [respMmrc, setRespMmrc] = useState(2)
  const [resp6mwd, setResp6mwd] = useState(300)

  // Thyroid
  const [tsh, setTsh] = useState(2.5)
  const [ft4, setFt4] = useState(15)
  const [ft3, setFt3] = useState(5)
  const [antiTpo, setAntiTpo] = useState(18)

  // Blood & Nutrients
  const [bloodSex, setBloodSex] = useState('Male')
  const [bloodHb, setBloodHb] = useState(12.5)
  const [iron, setIron] = useState(60)
  const [tibc, setTibc] = useState(380)
  const [mcv, setMcv] = useState(72)
  const [rbc, setRbc] = useState(4.5)

  // Bone
  const [measuredCa, setMeasuredCa] = useState(8.5)
  const [albuminCa, setAlbuminCa] = useState(3.2)
  const [vitD, setVitD] = useState(32)

  // Inflam
  const [crp, setCrp] = useState(2.1)
  const [anc, setAnc] = useState(4500)
  const [alc, setAlc] = useState(1800)

  // Hormone
  const [hormoneSex, setHormoneSex] = useState('Male')
  const [hormoneTesto, setHormoneTesto] = useState(15)
  const [shbg, setShbg] = useState(40)
  const [lh, setLh] = useState(8)
  const [fsh, setFsh] = useState(5)

  // Overall Score
  const [ovCardio, setOvCardio] = useState(72)
  const [ovMetabolic, setOvMetabolic] = useState(65)
  const [ovKidney, setOvKidney] = useState(80)
  const [ovLiver, setOvLiver] = useState(78)
  const [ovCancer, setOvCancer] = useState(90)
  const [ovResp, setOvResp] = useState(85)
  const [ovBlood, setOvBlood] = useState(75)
  const [ovThyroid, setOvThyroid] = useState(100)
  const [ovBone, setOvBone] = useState(88)
  const [ovInflam, setOvInflam] = useState(70)

  // --- Formula Calculations (Live) ---

  // Cardio: LE8 Score
  const le8Score = useMemo(() => {
    const sum = le8Diet + le8Activity + le8Nicotine + le8Sleep + le8BMI + le8Lipids + le8Glucose + le8BP
    return (sum / 8).toFixed(1)
  }, [le8Diet, le8Activity, le8Nicotine, le8Sleep, le8BMI, le8Lipids, le8Glucose, le8BP])

  // Cardio: PREVENT CVD Risk
  const preventResult = useMemo(() => {
    const age10 = (preventAge - 55) / 10
    const non_HDL = ((preventTC - preventHDL) * 0.02586) - 3.5
    const HDL03 = ((preventHDL * 0.02586) - 1.3) / 0.3
    const SBP_lt110 = (Math.min(preventSBP, 110) - 110) / 20
    const SBP_gte110 = (Math.max(preventSBP, 110) - 130) / 20
    const BMI_lt30 = (Math.min(preventBMI, 30) - 25) / 5
    const BMI_gte30 = (Math.max(preventBMI, 30) - 30) / 5
    const eGFR_lt60 = (Math.min(preventeGFR, 60) - 60) / -15
    const eGFR_gte60 = (Math.max(preventeGFR, 60) - 90) / -15

    const isMale = preventSex === 'Male'
    const lp = (isMale ? -2.2 : -2.5)
      + 0.55 * age10
      + 0.45 * non_HDL
      - 0.35 * HDL03
      + 0.28 * SBP_gte110
      + 0.6 * (preventDiabetes ? 1 : 0)
      + 0.45 * (preventSmoking ? 1 : 0)
      + 0.3 * eGFR_lt60

    const risk = Math.exp(lp) / (1 + Math.exp(lp))
    
    // Risk to Score Transform
    const riskPercent = risk * 100
    let score = 95
    if (riskPercent < 5) score = 100 - (riskPercent / 5) * 10
    else if (riskPercent < 10) score = 89 - ((riskPercent - 5) / 5) * 14
    else if (riskPercent < 20) score = 74 - ((riskPercent - 10) / 10) * 19
    else if (riskPercent < 30) score = 54 - ((riskPercent - 20) / 10) * 19
    else score = Math.max(15, 34 - ((riskPercent - 30) / 70) * 19)

    return {
      riskPercent: (riskPercent).toFixed(2),
      score: score.toFixed(1),
      transforms: { age10, non_HDL, HDL03, SBP_lt110, SBP_gte110, BMI_lt30, BMI_gte30, eGFR_lt60, eGFR_gte60 }
    }
  }, [preventAge, preventSex, preventTC, preventHDL, preventSBP, preventBMI, preventeGFR, preventDiabetes, preventSmoking])

  // Cardio: Pack-years
  const packYears = useMemo(() => {
    return ((smokeCigs / 20) * smokeYears).toFixed(1)
  }, [smokeCigs, smokeYears])

  // Metabolic: BMI & Indian cutoffs
  const metabolicBmi = useMemo(() => {
    const value = bmiWeight / ((bmiHeight / 100) ** 2)
    let category = 'Normal'
    if (value < 18.5) category = 'Underweight'
    else if (value < 23) category = 'Normal'
    else if (value < 27.5) category = 'Overweight'
    else category = 'Obese'
    return { value: value.toFixed(1), category }
  }, [bmiWeight, bmiHeight])

  // Metabolic: W-HtR
  const wHtr = useMemo(() => {
    const value = waistCm / bmiHeight
    return { value: value.toFixed(3), abnormal: value > 0.5 }
  }, [waistCm, bmiHeight])

  // Metabolic: IDRS
  const idrsScore = useMemo(() => {
    let agePts = 0
    if (idrsAge >= 50) agePts = 30
    else if (idrsAge >= 35) agePts = 20

    let waistPts = 0
    const isMale = metabolicSex === 'Male'
    if (isMale) {
      if (idrsWaist >= 100) waistPts = 20
      else if (idrsWaist >= 90) waistPts = 10
    } else {
      if (idrsWaist >= 90) waistPts = 20
      else if (idrsWaist >= 80) waistPts = 10
    }

    const total = agePts + waistPts + Number(idrsFamily) + Number(idrsActivity)
    let risk = 'Low risk'
    if (total >= 60) risk = 'High risk'
    else if (total >= 30) risk = 'Moderate risk'

    return { total, risk, breakdown: { agePts, waistPts } }
  }, [idrsAge, idrsWaist, idrsFamily, idrsActivity, metabolicSex])

  // Metabolic: HOMA-IR
  const homaIr = useMemo(() => {
    const val = (insulin * glucose) / 405
    return { val: val.toFixed(2), abnormal: val > 2.5 }
  }, [insulin, glucose])

  // Metabolic: TyG Index
  const tygIndex = useMemo(() => {
    const val = Math.log((tg * glucose) / 2)
    return { val: val.toFixed(2), abnormal: val > 8.8 }
  }, [tg, glucose])

  // Metabolic: NCEP ATP III
  const metSResult = useMemo(() => {
    const isMale = metabolicSex === 'Male'
    const wcAbn = isMale ? waistCm >= 90 : waistCm >= 80
    const hdlAbn = isMale ? preventHDL < 40 : preventHDL < 50
    const count = (wcAbn ? 1 : 0)
      + (tg >= 150 ? 1 : 0)
      + (hdlAbn ? 1 : 0)
      + (metsBpAbn ? 1 : 0)
      + (metsFpgAbn ? 1 : 0)
    return { count, present: count >= 3, wcAbn, hdlAbn }
  }, [waistCm, tg, preventHDL, metsBpAbn, metsFpgAbn, metabolicSex])

  // Kidney: CKD-EPI 2021 Creatinine eGFR
  const egfrCr = useMemo(() => {
    const isFemale = kidneySex === 'Female'
    const kappa = isFemale ? 0.7 : 0.9
    const alpha = isFemale ? -0.241 : -0.302
    const Scr = creatinine
    
    const minPart = Math.min(Scr / kappa, 1)
    const maxPart = Math.max(Scr / kappa, 1)
    
    const val = 142 
      * Math.pow(minPart, alpha) 
      * Math.pow(maxPart, -1.200) 
      * Math.pow(0.9938, kidneyAge) 
      * (isFemale ? 1.012 : 1)

    let kdigo = 'KDIGO G1 (Normal)'
    if (val < 15) kdigo = 'KDIGO G5 (Kidney Failure)'
    else if (val < 30) kdigo = 'KDIGO G4 (Severely Decreased)'
    else if (val < 45) kdigo = 'KDIGO G3b (Moderate-Severe)'
    else if (val < 60) kdigo = 'KDIGO G3a (Mild-Moderate)'
    else if (val < 90) kdigo = 'KDIGO G2 (Mildly Decreased)'

    return { val: val.toFixed(1), kdigo }
  }, [kidneySex, kidneyAge, creatinine])

  // Kidney: CKD-EPI 2012 Cystatin C eGFR
  const egfrCys = useMemo(() => {
    const isFemale = kidneySex === 'Female'
    const Scys = cystatinC
    
    const minPart = Math.min(Scys / 0.8, 1)
    const maxPart = Math.max(Scys / 0.8, 1)
    
    const val = 133 
      * Math.pow(minPart, -0.499) 
      * Math.pow(maxPart, -1.328) 
      * Math.pow(0.996, kidneyAge) 
      * (isFemale ? 0.932 : 1)

    return val.toFixed(1)
  }, [kidneySex, kidneyAge, cystatinC])

  // Kidney: UACR
  const uacr = useMemo(() => {
    if (urineCreatinine === 0) return '0.0'
    const val = urineAlbumin / urineCreatinine
    let cat = 'A1 (Normal)'
    if (val > 300) cat = 'A3 (Severely Increased)'
    else if (val >= 30) cat = 'A2 (Moderately Increased)'
    return { val: val.toFixed(1), cat }
  }, [urineAlbumin, urineCreatinine])

  // Kidney: KFRE 4-Variable
  const kfreResult = useMemo(() => {
    const isMale = kidneySex === 'Male'
    const egfrVal = parseFloat(egfrCr.val)
    const uacrVal = parseFloat(uacr.val) || 10
    
    const lp4 = (-0.2201) * ((kidneyAge / 10) - 7.036) 
      + 0.2467 * (isMale ? 1 - 0.5642 : 0 - 0.5642)
      - 0.5567 * ((egfrVal / 5) - 7.222) 
      + 0.4510 * (Math.log(uacrVal) - 5.137)

    const risk2yr = 1 - Math.pow(0.9832, Math.exp(lp4))
    const risk5yr = 1 - Math.pow(0.9365, Math.exp(lp4))

    return {
      yr2: (risk2yr * 100).toFixed(1),
      yr5: (risk5yr * 100).toFixed(1)
    }
  }, [kidneySex, kidneyAge, egfrCr, uacr])

  // Liver: FLI
  const fliResult = useMemo(() => {
    const bmiVal = parseFloat(metabolicBmi.value)
    const y = 0.953 * Math.log(tg) + 0.139 * bmiVal + 0.718 * Math.log(liverGgt) + 0.053 * waistCm - 15.745
    const fliScore = (Math.exp(y) / (1 + Math.exp(y))) * 100
    let interpretation = 'Intermediate'
    if (fliScore >= 60) interpretation = 'Fatty liver likely'
    else if (fliScore < 30) interpretation = 'Fatty liver excluded'
    return { score: fliScore.toFixed(1), interpretation }
  }, [tg, metabolicBmi, liverGgt, waistCm])

  // Liver: FIB-4
  const fib4Result = useMemo(() => {
    const value = (kidneyAge * liverAst) / (liverPlatelets * Math.sqrt(liverAlt))
    let cat = 'Indeterminate'
    if (kidneyAge >= 65) {
      if (value < 2.0) cat = 'Low (fibrosis unlikely)'
      else if (value > 2.67) cat = 'High (advanced fibrosis risk)'
    } else {
      if (value < 1.3) cat = 'Low (fibrosis unlikely)'
      else if (value > 2.67) cat = 'High (advanced fibrosis risk)'
    }
    return { value: value.toFixed(2), cat }
  }, [kidneyAge, liverAst, liverAlt, liverPlatelets])

  // Respiratory: Spirometry
  const fevFvc = useMemo(() => {
    const ratio = respFev1 / respFvc
    const ob = ratio < 0.70
    let gold = 'GOLD Applicable (N/A)'
    if (ob) {
      if (respFev1Pred >= 80) gold = 'GOLD 1 (Mild)'
      else if (respFev1Pred >= 50) gold = 'GOLD 2 (Moderate)'
      else if (respFev1Pred >= 30) gold = 'GOLD 3 (Severe)'
      else gold = 'GOLD 4 (Very Severe)'
    }
    return { ratio: ratio.toFixed(2), obstructed: ob, gold }
  }, [respFev1, respFvc, respFev1Pred])

  // Respiratory: BODE
  const bodeIndex = useMemo(() => {
    const bmiVal = parseFloat(metabolicBmi.value)
    const bmiPts = bmiVal <= 21 ? 1 : 0
    
    let fevPts = 0
    if (respFev1Pred <= 35) fevPts = 3
    else if (respFev1Pred < 50) fevPts = 2
    else if (respFev1Pred < 65) fevPts = 1

    let mrcPts = 0
    if (respMmrc === 2) mrcPts = 1
    else if (respMmrc === 3) mrcPts = 2
    else if (respMmrc >= 4) mrcPts = 3

    let walkPts = 0
    if (resp6mwd <= 149) walkPts = 3
    else if (resp6mwd < 250) walkPts = 2
    else if (resp6mwd < 350) walkPts = 1

    const total = bmiPts + fevPts + mrcPts + walkPts
    return { total, breakdown: { bmiPts, fevPts, mrcPts, walkPts } }
  }, [metabolicBmi, respFev1Pred, respMmrc, resp6mwd])

  // Thyroid Category
  const thyroidCategory = useMemo(() => {
    let cat = 'Euthyroid'
    if (tsh >= 0.4 && tsh <= 4.0) {
      cat = 'Euthyroid (Normal)'
    } else if (tsh > 4.0) {
      if (ft4 < 12) cat = 'Overt Hypothyroidism'
      else cat = 'Subclinical Hypothyroidism'
    } else {
      if (ft4 > 22 || ft3 > 6.8) cat = 'Overt Hyperthyroidism'
      else cat = 'Subclinical Hyperthyroidism'
    }
    const autoimmune = antiTpo > 34
    return { cat, autoimmune }
  }, [tsh, ft4, ft3, antiTpo])

  // Blood & Anemia: WHO Severity
  const anemiaResult = useMemo(() => {
    const isMale = bloodSex === 'Male'
    const cutoff = isMale ? 13.0 : 12.0
    const an = bloodHb < cutoff
    let severity = 'No anemia'
    if (an) {
      if (bloodHb < 8.0) severity = 'Severe'
      else if (bloodHb <= 10.9) severity = 'Moderate'
      else severity = 'Mild'
    }
    return { an, severity }
  }, [bloodSex, bloodHb])

  // Blood & Anemia: TSAT & Mentzer
  const tsat = useMemo(() => {
    if (tibc === 0) return 0
    const val = (iron / tibc) * 100
    return val.toFixed(1)
  }, [iron, tibc])

  const mentzer = useMemo(() => {
    if (rbc === 0) return 0
    const val = mcv / rbc
    return { val: val.toFixed(1), cat: val < 13 ? 'Thalassemia Trait' : 'Iron Deficiency' }
  }, [mcv, rbc])

  // Bone Ca
  const correctedCa = useMemo(() => {
    const val = measuredCa + 0.8 * (4.0 - albuminCa)
    return val.toFixed(2)
  }, [measuredCa, albuminCa])

  // Inflam: NLR
  const nlr = useMemo(() => {
    if (alc === 0) return '0.00'
    return (anc / alc).toFixed(2)
  }, [anc, alc])

  // Hormonal: FAI
  const fai = useMemo(() => {
    if (shbg === 0) return '0.0'
    const val = 100 * hormoneTesto / shbg
    return val.toFixed(1)
  }, [hormoneTesto, shbg])

  const lhFsh = useMemo(() => {
    if (fsh === 0) return '0.00'
    return (lh / fsh).toFixed(2)
  }, [lh, fsh])

  // Overall Score
  const overallResult = useMemo(() => {
    const total = ovCardio * 0.25
      + ovMetabolic * 0.22
      + ovKidney * 0.12
      + ovLiver * 0.10
      + ovCancer * 0.08
      + ovResp * 0.07
      + ovBlood * 0.06
      + ovThyroid * 0.04
      + ovBone * 0.03
      + ovInflam * 0.03

    // Guardrails
    const flags = []
    if (le8Glucose < 20 || sGlucose < 50) flags.push('Fasting glucose/HbA1c indicates undiagnosed diabetes')
    if (parseFloat(egfrCr.val) < 60 || parseFloat(uacr.val) >= 30) flags.push('eGFR/UACR indicates Chronic Kidney Disease (CKD)')
    if (liverAlt > 120 || liverAst > 120) flags.push('AST/ALT > 3x Upper Limit (acute liver injury)')
    if (crp > 10) flags.push('hs-CRP > 10 mg/L (acute illness/inflammation — pause chronic score)')
    if (parseFloat(metabolicBmi.value) >= 30) flags.push('BMI is in Class 2+ Obesity band')

    return {
      score: total.toFixed(1),
      isCapped: flags.length > 0,
      activeFlags: flags
    }
  }, [ovCardio, ovMetabolic, ovKidney, ovLiver, ovCancer, ovResp, ovBlood, ovThyroid, ovBone, ovInflam, egfrCr, uacr, liverAlt, liverAst, crp, metabolicBmi])

  // Component logic for AHA Lipids / Glucose
  const sGlucose = useMemo(() => {
    return le8Glucose < 5.7 ? 100 : le8Glucose < 6.5 ? 60 : 20
  }, [le8Glucose])

  return (
    <div className="scoring-reference-page">
      <header className="page-header">
        <div className="container">
          <Link href="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1>Health Scoring Engine Reference</h1>
          <p className="subtitle">
            Evidence-Based Health Scoring Engine Formula Reference (India v2.0) with Live Interactive Calculators.
          </p>
        </div>
      </header>

      <div className="container main-content">
        {/* Navigation Sidebar */}
        <aside className="sidebar">
          <div className="nav-menu">
            <button className={`nav-item ${activeTab === 'Cardio' ? 'active' : ''}`} onClick={() => setActiveTab('Cardio')}>
              ❤️ Cardio
            </button>
            <button className={`nav-item ${activeTab === 'Metabolic' ? 'active' : ''}`} onClick={() => setActiveTab('Metabolic')}>
              🩸 Metabolic
            </button>
            <button className={`nav-item ${activeTab === 'Kidney' ? 'active' : ''}`} onClick={() => setActiveTab('Kidney')}>
              🫘 Kidney
            </button>
            <button className={`nav-item ${activeTab === 'Liver' ? 'active' : ''}`} onClick={() => setActiveTab('Liver')}>
              🟤 Liver
            </button>
            <button className={`nav-item ${activeTab === 'Respiratory' ? 'active' : ''}`} onClick={() => setActiveTab('Respiratory')}>
              🫁 Respiratory
            </button>
            <button className={`nav-item ${activeTab === 'Thyroid' ? 'active' : ''}`} onClick={() => setActiveTab('Thyroid')}>
              🦋 Thyroid
            </button>
            <button className={`nav-item ${activeTab === 'Blood' ? 'active' : ''}`} onClick={() => setActiveTab('Blood')}>
              💉 Blood / Nutr
            </button>
            <button className={`nav-item ${activeTab === 'Bone' ? 'active' : ''}`} onClick={() => setActiveTab('Bone')}>
              🦴 Bone & Minerals
            </button>
            <button className={`nav-item ${activeTab === 'Inflam' ? 'active' : ''}`} onClick={() => setActiveTab('Inflam')}>
              🔥 Inflammation
            </button>
            <button className={`nav-item ${activeTab === 'Hormone' ? 'active' : ''}`} onClick={() => setActiveTab('Hormone')}>
              ⚗️ Hormones
            </button>
            <button className={`nav-item ${activeTab === 'Overall' ? 'active' : ''}`} onClick={() => setActiveTab('Overall')}>
              🏆 Overall Body Score
            </button>
          </div>
        </aside>

        {/* Tab Contents */}
        <main className="details-panel">
          {activeTab === 'Cardio' && (
            <div className="tab-pane">
              <h2>Cardiovascular Scoring</h2>
              <p className="description">
                Cardiovascular health is evaluated using the AHA Life's Essential 8 (LE8) composite score, the AHA PREVENT 10-Year CVD Risk model, and cumulative tobacco exposure.
              </p>

              {/* Calculator 1: LE8 */}
              <div className="calculator-card">
                <h3>AHA Life's Essential 8 (LE8) Composite Score</h3>
                <div className="math-block">
                  <code>LE8_total = (S_diet + S_physical_activity + S_nicotine + S_sleep + S_BMI + S_lipids + S_glucose + S_BP) / 8</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Diet Score: {le8Diet}</label>
                    <input type="range" min="0" max="100" value={le8Diet} onChange={e => setLe8Diet(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Physical Activity: {le8Activity}</label>
                    <input type="range" min="0" max="100" value={le8Activity} onChange={e => setLe8Activity(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Nicotine: {le8Nicotine}</label>
                    <input type="range" min="0" max="100" value={le8Nicotine} onChange={e => setLe8Nicotine(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Sleep: {le8Sleep}</label>
                    <input type="range" min="0" max="100" value={le8Sleep} onChange={e => setLe8Sleep(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>BMI: {le8BMI}</label>
                    <input type="range" min="0" max="100" value={le8BMI} onChange={e => setLe8BMI(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Lipids: {le8Lipids}</label>
                    <input type="range" min="0" max="100" value={le8Lipids} onChange={e => setLe8Lipids(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Glucose: {le8Glucose}</label>
                    <input type="range" min="0" max="100" value={le8Glucose} onChange={e => setLe8Glucose(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Blood Pressure: {le8BP}</label>
                    <input type="range" min="0" max="100" value={le8BP} onChange={e => setLe8BP(Number(e.target.value))} />
                  </div>
                </div>
                <div className="result-badge success">
                  LE8 Composite Score: {le8Score} — {Number(le8Score) >= 80 ? 'Optimal' : Number(le8Score) >= 50 ? 'Moderate' : 'Needs Intervention'}
                </div>
              </div>

              {/* Calculator 2: PREVENT */}
              <div className="calculator-card">
                <h3>AHA PREVENT 10-Yr CVD Risk</h3>
                <div className="math-block">
                  <code>LP = β₀ + Σ(βⱼ × Xⱼ) | Risk = exp(LP) / (1 + exp(LP))</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Age (years): {preventAge}</label>
                    <input type="range" min="30" max="90" value={preventAge} onChange={e => setPreventAge(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Total Cholesterol (mg/dL): {preventTC}</label>
                    <input type="range" min="100" max="350" value={preventTC} onChange={e => setPreventTC(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>HDL-C (mg/dL): {preventHDL}</label>
                    <input type="range" min="20" max="100" value={preventHDL} onChange={e => setPreventHDL(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Systolic BP (mmHg): {preventSBP}</label>
                    <input type="range" min="90" max="200" value={preventSBP} onChange={e => setPreventSBP(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>BMI: {preventBMI}</label>
                    <input type="range" min="15" max="50" value={preventBMI} onChange={e => setPreventBMI(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>eGFR: {preventeGFR}</label>
                    <input type="range" min="15" max="120" value={preventeGFR} onChange={e => setPreventeGFR(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Sex</label>
                    <select value={preventSex} onChange={e => setPreventSex(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="input-group checkboxes">
                    <label>
                      <input type="checkbox" checked={preventDiabetes} onChange={e => setPreventDiabetes(e.target.checked)} />
                      Has Diabetes
                    </label>
                    <label>
                      <input type="checkbox" checked={preventSmoking} onChange={e => setPreventSmoking(e.target.checked)} />
                      Current Smoker
                    </label>
                  </div>
                </div>
                <div className="transforms-preview">
                  <strong>Transforms:</strong> age10 = {preventResult.transforms.age10.toFixed(3)} | nonHDL = {preventResult.transforms.non_HDL.toFixed(3)} | HDL03 = {preventResult.transforms.HDL03.toFixed(3)} | SBP_gte110 = {preventResult.transforms.SBP_gte110.toFixed(3)} | eGFR_lt60 = {preventResult.transforms.eGFR_lt60.toFixed(3)}
                </div>
                <div className="result-badge warning">
                  Calculated CVD Risk: {preventResult.riskPercent}% | Organ Score Transform: {preventResult.score} / 100
                </div>
              </div>

              {/* Calculator 3: Tobacco Pack-Years */}
              <div className="calculator-card">
                <h3>Pack-Years / Tobacco Exposure</h3>
                <div className="math-block">
                  <code>Pack_years = (cigarettes_per_day / 20) × years_smoked</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Cigarettes / Day: {smokeCigs}</label>
                    <input type="range" min="0" max="60" value={smokeCigs} onChange={e => setSmokeCigs(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Years Smoked: {smokeYears}</label>
                    <input type="range" min="0" max="50" value={smokeYears} onChange={e => setSmokeYears(Number(e.target.value))} />
                  </div>
                </div>
                <div className="result-badge info">
                  Pack-Years Exposure: {packYears}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Metabolic' && (
            <div className="tab-pane">
              <h2>Metabolic & Diabetes Risk</h2>
              <p className="description">
                Cardiometabolic health indicators tailored with Asian Indian specific cutoffs and insulin sensitivity indexes.
              </p>

              {/* Calculator 1: BMI & Waist */}
              <div className="calculator-card">
                <h3>Body Mass Index (BMI) & Waist-to-Height Ratio (W-HtR)</h3>
                <div className="math-block">
                  <code>BMI = weight_kg / (height_m)² | W_HtR = waist_cm / height_cm</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Weight (kg): {bmiWeight}</label>
                    <input type="range" min="30" max="150" value={bmiWeight} onChange={e => setBmiWeight(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Height (cm): {bmiHeight}</label>
                    <input type="range" min="100" max="220" value={bmiHeight} onChange={e => setBmiHeight(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Waist (cm): {waistCm}</label>
                    <input type="range" min="40" max="150" value={waistCm} onChange={e => setWaistCm(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    BMI: {metabolicBmi.value} — Category: {metabolicBmi.category} (Asian Indian Cutoffs)
                  </div>
                  <div className={`result-badge ${wHtr.abnormal ? 'danger' : 'success'}`}>
                    W-HtR: {wHtr.value} — {wHtr.abnormal ? '⚠️ Above 0.5 threshold (Abnormal)' : 'Normal'}
                  </div>
                </div>
              </div>

              {/* Calculator 2: IDRS */}
              <div className="calculator-card">
                <h3>Indian Diabetes Risk Score (IDRS)</h3>
                <div className="math-block">
                  <code>IDRS = Age_pts + Waist_pts + FamilyHx_pts + PhysActivity_pts</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Age (years): {idrsAge}</label>
                    <input type="range" min="15" max="85" value={idrsAge} onChange={e => setIdrsAge(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Waist (cm): {idrsWaist}</label>
                    <input type="range" min="40" max="150" value={idrsWaist} onChange={e => setIdrsWaist(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Sex</label>
                    <select value={metabolicSex} onChange={e => setMetabolicSex(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Family History</label>
                    <select value={idrsFamily} onChange={e => setIdrsFamily(Number(e.target.value))}>
                      <option value="0">No history (0 pts)</option>
                      <option value="10">One parent has diabetes (10 pts)</option>
                      <option value="20">Both parents have diabetes (20 pts)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Physical Activity</label>
                    <select value={idrsActivity} onChange={e => setIdrsActivity(Number(e.target.value))}>
                      <option value="0">Regular exercise + strenuous (0 pts)</option>
                      <option value="20">Either regular or strenuous (20 pts)</option>
                      <option value="30">Sedentary/No exercise (30 pts)</option>
                    </select>
                  </div>
                </div>
                <div className="result-badge info">
                  IDRS Score: {idrsScore.total} — {idrsScore.risk} (Age pts: {idrsScore.breakdown.agePts}, Waist pts: {idrsScore.breakdown.waistPts})
                </div>
              </div>

              {/* Calculator 3: HOMA-IR & TyG */}
              <div className="calculator-card">
                <h3>Insulin Sensitivity & Metabolic Syndrome</h3>
                <div className="math-block">
                  <code>HOMA_IR = (insulin × glucose) / 405 | TyG = ln[(TG × glucose) / 2]</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Fasting Insulin (µIU/mL): {insulin}</label>
                    <input type="range" min="2" max="50" value={insulin} onChange={e => setInsulin(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Fasting Glucose (mg/dL): {glucose}</label>
                    <input type="range" min="50" max="250" value={glucose} onChange={e => setGlucose(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Triglycerides (mg/dL): {tg}</label>
                    <input type="range" min="50" max="500" value={tg} onChange={e => setTg(Number(e.target.value))} />
                  </div>
                  <div className="input-group checkboxes">
                    <label>
                      <input type="checkbox" checked={metsBpAbn} onChange={e => setMetsBpAbn(e.target.checked)} />
                      BP ≥ 130/85 or Treated
                    </label>
                    <label>
                      <input type="checkbox" checked={metsFpgAbn} onChange={e => setMetsFpgAbn(e.target.checked)} />
                      FPG ≥ 100 or Treated
                    </label>
                  </div>
                </div>
                <div className="results-box">
                  <div className={`result-badge ${homaIr.abnormal ? 'warning' : 'success'}`}>
                    HOMA-IR: {homaIr.val} — {homaIr.abnormal ? 'Insulin Resistance Likely (>2.5)' : 'Normal'}
                  </div>
                  <div className={`result-badge ${tygIndex.abnormal ? 'warning' : 'success'}`}>
                    TyG Index: {tygIndex.val} — {tygIndex.abnormal ? 'Elevated Cardiometabolic Risk (>8.8)' : 'Normal'}
                  </div>
                  <div className={`result-badge ${metSResult.present ? 'danger' : 'success'}`}>
                    MetS Criteria: {metSResult.count}/5 — {metSResult.present ? 'Metabolic Syndrome PRESENT' : 'Normal'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Kidney' && (
            <div className="tab-pane">
              <h2>Kidney Health & Failure Risk</h2>
              <p className="description">
                Filtration efficiency calculations using the CKD-EPI formula, microalbuminuria ratios, and the 4-Variable Kidney Failure Risk Equation (KFRE).
              </p>

              {/* Calculator 1: CKD-EPI */}
              <div className="calculator-card">
                <h3>eGFRcr & eGFRcys (CKD-EPI 2021/2012)</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Serum Creatinine (mg/dL): {creatinine}</label>
                    <input type="range" min="0.4" max="5.0" step="0.1" value={creatinine} onChange={e => setCreatinine(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Serum Cystatin C (mg/L): {cystatinC}</label>
                    <input type="range" min="0.3" max="4.0" step="0.1" value={cystatinC} onChange={e => setCystatinC(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Age: {kidneyAge}</label>
                    <input type="range" min="18" max="95" value={kidneyAge} onChange={e => setKidneyAge(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Sex</label>
                    <select value={kidneySex} onChange={e => setKidneySex(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    eGFRcr (Creatinine): {egfrCr.val} mL/min/1.73m² — {egfrCr.kdigo}
                  </div>
                  <div className="result-badge success">
                    eGFRcys (Cystatin C): {egfrCys} mL/min/1.73m²
                  </div>
                </div>
              </div>

              {/* Calculator 2: UACR & KFRE */}
              <div className="calculator-card">
                <h3>UACR & KFRE (Kidney Failure Risk Equation)</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Urine Albumin (mg/dL): {urineAlbumin}</label>
                    <input type="range" min="1" max="100" value={urineAlbumin} onChange={e => setUrineAlbumin(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Urine Creatinine (g/dL): {urineCreatinine}</label>
                    <input type="range" min="0.01" max="0.5" step="0.01" value={urineCreatinine} onChange={e => setUrineCreatinine(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge info">
                    UACR: {uacr.val} mg/g — Category: {uacr.cat}
                  </div>
                  <div className="result-badge warning">
                    2-Year Failure Risk: {kfreResult.yr2}% | 5-Year Failure Risk: {kfreResult.yr5}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Liver' && (
            <div className="tab-pane">
              <h2>Liver Function & Fibrosis Indexes</h2>
              <p className="description">
                Evaluation of hepatic lipid storage and advanced fibrosis staging using non-invasive clinical indices.
              </p>

              <div className="calculator-card">
                <h3>Fatty Liver Index (FLI) & FIB-4 Index</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>GGT (U/L): {liverGgt}</label>
                    <input type="range" min="5" max="200" value={liverGgt} onChange={e => setLiverGgt(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>AST (U/L): {liverAst}</label>
                    <input type="range" min="5" max="200" value={liverAst} onChange={e => setLiverAst(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>ALT (U/L): {liverAlt}</label>
                    <input type="range" min="5" max="200" value={liverAlt} onChange={e => setLiverAlt(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Platelets (×10⁹/L): {liverPlatelets}</label>
                    <input type="range" min="50" max="600" value={liverPlatelets} onChange={e => setLiverPlatelets(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    Fatty Liver Index: {fliResult.score} — {fliResult.interpretation}
                  </div>
                  <div className="result-badge success">
                    FIB-4 Score: {fib4Result.value} — Category: {fib4Result.cat}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Respiratory' && (
            <div className="tab-pane">
              <h2>Respiratory Assessment</h2>
              <p className="description">
                Spirometry airflow classification and the multidimensional BODE prognosis index for chronic obstructive pulmonary disease.
              </p>

              <div className="calculator-card">
                <h3>Spirometry (FEV1/FVC) & BODE Index</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>FEV1 (L): {respFev1}</label>
                    <input type="range" min="0.5" max="6.0" step="0.1" value={respFev1} onChange={e => setRespFev1(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>FVC (L): {respFvc}</label>
                    <input type="range" min="1.0" max="8.0" step="0.1" value={respFvc} onChange={e => setRespFvc(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>FEV1 % Predicted: {respFev1Pred}%</label>
                    <input type="range" min="10" max="120" value={respFev1Pred} onChange={e => setRespFev1Pred(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>mMRC Dyspnoea Grade: {respMmrc}</label>
                    <input type="range" min="0" max="4" value={respMmrc} onChange={e => setRespMmrc(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>6-Min Walk Distance (m): {resp6mwd}</label>
                    <input type="range" min="50" max="700" value={resp6mwd} onChange={e => setResp6mwd(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge info">
                    FEV1/FVC Ratio: {fevFvc.ratio} — {fevFvc.obstructed ? `Obstruction Present | ${fevFvc.gold}` : 'No obstruction'}
                  </div>
                  <div className="result-badge warning">
                    BODE Index: {bodeIndex.total}/10 (BMI: {bodeIndex.breakdown.bmiPts} FEV1: {bodeIndex.breakdown.fevPts} mMRC: {bodeIndex.breakdown.mrcPts} 6MWD: {bodeIndex.breakdown.walkPts})
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Thyroid' && (
            <div className="tab-pane">
              <h2>Thyroid Profile Staging</h2>
              <p className="description">
                Staging thyroid function categories based on combined TSH, FT4, and FT3 values, with autoimmune antibody screening.
              </p>

              <div className="calculator-card">
                <h3>TSH / FT4 / FT3 Staging</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>TSH (mIU/L): {tsh}</label>
                    <input type="range" min="0.01" max="15.0" step="0.1" value={tsh} onChange={e => setTsh(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Free T4 (pmol/L): {ft4}</label>
                    <input type="range" min="5" max="40" value={ft4} onChange={e => setFt4(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Free T3 (pmol/L): {ft3}</label>
                    <input type="range" min="1" max="15" value={ft3} onChange={e => setFt3(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Anti-TPO (IU/mL): {antiTpo}</label>
                    <input type="range" min="5" max="250" value={antiTpo} onChange={e => setAntiTpo(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    Thyroid Status: {thyroidCategory.cat}
                  </div>
                  <div className={`result-badge ${thyroidCategory.autoimmune ? 'danger' : 'success'}`}>
                    Autoimmune Flag: {thyroidCategory.autoimmune ? '⚠️ Autoimmune Antibodies Elevated (anti-TPO > 34)' : 'Negative'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Blood' && (
            <div className="tab-pane">
              <h2>Hematology & Nutrients</h2>
              <p className="description">
                Hemoglobin thresholds, iron transport capacity (TSAT), and structural red blood cell indices.
              </p>

              <div className="calculator-card">
                <h3>WHO Anemia & Iron Studies</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Sex</label>
                    <select value={bloodSex} onChange={e => setBloodSex(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Hemoglobin (g/dL): {bloodHb}</label>
                    <input type="range" min="5" max="20" step="0.1" value={bloodHb} onChange={e => setBloodHb(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Serum Iron (µg/dL): {iron}</label>
                    <input type="range" min="20" max="220" value={iron} onChange={e => setIron(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>TIBC (µg/dL): {tibc}</label>
                    <input type="range" min="150" max="500" value={tibc} onChange={e => setTibc(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>MCV (fL): {mcv}</label>
                    <input type="range" min="50" max="120" value={mcv} onChange={e => setMcv(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>RBC (million/µL): {rbc}</label>
                    <input type="range" min="2" max="7" step="0.1" value={rbc} onChange={e => setRbc(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    WHO Anemia Staging: {anemiaResult.severity} {anemiaResult.an ? 'Anemia' : ''}
                  </div>
                  <div className="result-badge success">
                    TSAT: {tsat}% — {Number(tsat) < 16 ? '⚠️ Iron Deficiency (severe)' : Number(tsat) < 20 ? 'Borderline Low' : 'Normal'}
                  </div>
                  <div className="result-badge success">
                    Mentzer Index: {mentzer.val} — Indicates {mentzer.cat}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Bone' && (
            <div className="tab-pane">
              <h2>Bone & Mineral Scoring</h2>
              <p className="description">
                Physiological mineral concentration scoring with calcium correction transforms and Vitamin D status.
              </p>

              <div className="calculator-card">
                <h3>Corrected Calcium</h3>
                <div className="math-block">
                  <code>Corrected Ca = measured Ca + 0.8 × (4.0 − albumin)</code>
                </div>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Measured Calcium (mg/dL): {measuredCa}</label>
                    <input type="range" min="6.0" max="12.0" step="0.1" value={measuredCa} onChange={e => setMeasuredCa(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Serum Albumin (g/dL): {albuminCa}</label>
                    <input type="range" min="2.0" max="6.0" step="0.1" value={albuminCa} onChange={e => setAlbuminCa(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Vitamin D (ng/mL): {vitD}</label>
                    <input type="range" min="5" max="100" value={vitD} onChange={e => setVitD(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    Corrected Calcium: {correctedCa} mg/dL — {parseFloat(correctedCa) < 8.5 ? 'Low' : parseFloat(correctedCa) > 10.2 ? 'High' : 'Normal'}
                  </div>
                  <div className="result-badge success">
                    Vitamin D Status: {vitD} ng/mL — {vitD < 10 ? 'Severe Deficiency' : vitD < 30 ? 'Insufficiency' : 'Sufficient'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Inflam' && (
            <div className="tab-pane">
              <h2>Systemic Inflammation Tiers</h2>
              <p className="description">
                Cardiovascular risk stratification based on hs-CRP tiers and immune cell ratios.
              </p>

              <div className="calculator-card">
                <h3>hs-CRP & NLR Index</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>hs-CRP (mg/L): {crp}</label>
                    <input type="range" min="0.1" max="15.0" step="0.1" value={crp} onChange={e => setCrp(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>ANC (Neutrophils/µL): {anc}</label>
                    <input type="range" min="1000" max="10000" step="100" value={anc} onChange={e => setAnc(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>ALC (Lymphocytes/µL): {alc}</label>
                    <input type="range" min="500" max="5000" step="50" value={alc} onChange={e => setAlc(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    hs-CRP CVD Risk: {crp > 10 ? '⚠️ Pause Chronic Interpretation (Acute Illness)' : crp > 3 ? 'High Risk' : crp >= 1 ? 'Average Risk' : 'Low Risk'}
                  </div>
                  <div className="result-badge success">
                    NLR (Neutrophil/Lymphocyte Ratio): {nlr} — {parseFloat(nlr) > 3.0 ? 'Elevated Systemic Stress' : 'Normal'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Hormone' && (
            <div className="tab-pane">
              <h2>Hormonal Profile</h2>
              <p className="description">
                Reproductive hormone index calculator including androgen bounds and pituitary feedback ratios.
              </p>

              <div className="calculator-card">
                <h3>Free Androgen Index & Pituitary Ratios</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Total Testosterone (nmol/L): {hormoneTesto}</label>
                    <input type="range" min="0.5" max="45" step="0.5" value={hormoneTesto} onChange={e => setHormoneTesto(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>SHBG (nmol/L): {shbg}</label>
                    <input type="range" min="10" max="150" value={shbg} onChange={e => setShbg(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>LH (IU/L): {lh}</label>
                    <input type="range" min="1" max="30" value={lh} onChange={e => setLh(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>FSH (IU/L): {fsh}</label>
                    <input type="range" min="1" max="30" value={fsh} onChange={e => setFsh(Number(e.target.value))} />
                  </div>
                </div>
                <div className="results-box">
                  <div className="result-badge success">
                    Free Androgen Index (FAI): {fai}% — {hormoneSex === 'Male' ? 'Male (Normal 35–92)' : 'Female (Normal 0.7–6.4)'}
                  </div>
                  <div className="result-badge success">
                    LH/FSH Ratio: {lhFsh} — {parseFloat(lhFsh) > 2.0 ? '⚠️ High Ratio (May suggest PCOS profile)' : 'Typical'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Overall' && (
            <div className="tab-pane">
              <h2>Overall Body Score</h2>
              <p className="description">
                Calculates the global body wellness score using a weighted composition of all organ system scores, subject to specific guardrail override conditions.
              </p>

              <div className="calculator-card">
                <h3>Weighted Overall Score</h3>
                <div className="calc-grid">
                  <div className="input-group">
                    <label>Cardio (25%): {ovCardio}</label>
                    <input type="range" min="0" max="100" value={ovCardio} onChange={e => setOvCardio(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Metabolic (22%): {ovMetabolic}</label>
                    <input type="range" min="0" max="100" value={ovMetabolic} onChange={e => setOvMetabolic(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Kidney (12%): {ovKidney}</label>
                    <input type="range" min="0" max="100" value={ovKidney} onChange={e => setOvKidney(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Liver (10%): {ovLiver}</label>
                    <input type="range" min="0" max="100" value={ovLiver} onChange={e => setOvLiver(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Cancer Prev (8%): {ovCancer}</label>
                    <input type="range" min="0" max="100" value={ovCancer} onChange={e => setOvCancer(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Respiratory (7%): {ovResp}</label>
                    <input type="range" min="0" max="100" value={ovResp} onChange={e => setOvResp(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Blood/Nutr (6%): {ovBlood}</label>
                    <input type="range" min="0" max="100" value={ovBlood} onChange={e => setOvBlood(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Thyroid (4%): {ovThyroid}</label>
                    <input type="range" min="0" max="100" value={ovThyroid} onChange={e => setOvThyroid(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Bone/Min (3%): {ovBone}</label>
                    <input type="range" min="0" max="100" value={ovBone} onChange={e => setOvBone(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label>Inflammation (3%): {ovInflam}</label>
                    <input type="range" min="0" max="100" value={ovInflam} onChange={e => setOvInflam(Number(e.target.value))} />
                  </div>
                </div>

                <div className="results-box">
                  <div className="result-badge success" style={{ fontSize: '1.25rem', padding: '15px' }}>
                    🏆 Overall Body Score: {overallResult.score} / 100
                  </div>
                  {overallResult.isCapped && (
                    <div className="guardrails-list">
                      <h4>⚠️ Active Guardrail Overrides:</h4>
                      <ul>
                        {overallResult.activeFlags.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                      <p className="guardrail-desc">
                        Under clinical guidelines, the presence of any of these indicators overrides the positive scores and requires direct clinical follow-up.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        .scoring-reference-page {
          background-color: #0c0d0e;
          color: #f4f5f6;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding-bottom: 80px;
        }
        .page-header {
          background: linear-gradient(135deg, #18191c 0%, #0d0e11 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px 0;
          margin-bottom: 40px;
        }
        .back-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-block;
          margin-bottom: 15px;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: #ffffff;
        }
        h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          letter-spacing: -0.025em;
        }
        .subtitle {
          color: #9ca3af;
          font-size: 1.1rem;
          margin: 0;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .main-content {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
        }
        .sidebar {
          background-color: #141517;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          height: fit-content;
        }
        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .nav-item {
          background: none;
          border: none;
          color: #9ca3af;
          text-align: left;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }
        .nav-item.active {
          background-color: #f5f5f4;
          color: #0c0d0e;
          font-weight: 600;
        }
        .details-panel {
          background-color: #141517;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 30px;
        }
        h2 {
          font-size: 1.75rem;
          margin-top: 0;
          margin-bottom: 12px;
        }
        .description {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .calculator-card {
          background-color: #1a1b1e;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 30px;
        }
        .calculator-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.15rem;
        }
        .math-block {
          background-color: #0d0e10;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #38bdf8;
          overflow-x: auto;
        }
        .calc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          font-size: 0.85rem;
          color: #9ca3af;
        }
        .input-group input[type="range"] {
          background: #27282b;
          border-radius: 8px;
          height: 6px;
          outline: none;
          accent-color: #ffffff;
        }
        .input-group select {
          background-color: #27282b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 10px;
          border-radius: 6px;
          outline: none;
        }
        .input-group.checkboxes {
          justify-content: center;
          gap: 15px;
        }
        .input-group.checkboxes label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #f4f5f6;
        }
        .results-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 15px;
        }
        .result-badge {
          padding: 12px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-block;
          width: fit-content;
        }
        .result-badge.success {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .result-badge.warning {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .result-badge.danger {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .result-badge.info {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .transforms-preview {
          background-color: #0d0e10;
          border-radius: 6px;
          padding: 10px 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 15px;
        }
        .guardrails-list {
          margin-top: 20px;
          background-color: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 8px;
          padding: 20px;
        }
        .guardrails-list h4 {
          margin-top: 0;
          margin-bottom: 12px;
          color: #ef4444;
        }
        .guardrails-list ul {
          margin: 0;
          padding-left: 20px;
          color: #d1d5db;
        }
        .guardrails-list li {
          margin-bottom: 6px;
          font-size: 0.9rem;
        }
        .guardrail-desc {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-top: 15px;
          margin-bottom: 0;
        }
        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
