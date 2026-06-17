// ---------------------------------------------------------------------------
// Dashboard data (Superpower-style). Representative sample values for a logged-in
// member — swap for real per-user API data later.
// ---------------------------------------------------------------------------

export const SUMMARY = {
  score: { value: 72, outOf: 100, message: 'Your score is fair. Stick to the plan to keep improving.' },
  bioAge: { value: 29.9, note: '3.3 years younger than your actual age' },
  results: { optimal: 41, normal: 25, outOfRange: 6, asOf: '24 Apr' },
}



// keep CATEGORY_TABS, BIOMARKERS, STATUS_META exactly as they are

export const CATEGORY_TABS = [
  'Blood', 'Genetic', 'Gut', 'Toxins', 'Allergies', 'VO2 Max', 'Cancer', 'Glucose', 'MRI', 'DEXA',
]

// status: 'optimal' | 'normal' | 'out'
// history: small series for the trend sparkline (oldest → newest)
export const BIOMARKERS = [
  // --- top-level scores ---
  { name: 'Health Score', system: 'Overview', status: 'normal', value: '72', unit: 'points', range: [80, 100], history: [60, 64, 68, 70, 72] },
  { name: 'Biological Age', system: 'Overview', status: 'optimal', value: '29.9', unit: 'years', range: [0, 32.75], history: [33, 32, 31, 30.5, 29.9] },
  { name: 'Pace of Aging', system: 'Overview', status: 'optimal', value: '90', unit: '%', range: [0, 100], history: [102, 98, 95, 92, 90] },

  // --- Cardiometabolic ---
  { name: 'Cholesterol, Total', system: 'Cardiometabolic', status: 'optimal', value: '133', unit: 'mg/dL', range: [130, 180], history: [150, 145, 140, 136, 133] },
  { name: 'LDL Cholesterol', system: 'Cardiometabolic', status: 'optimal', value: '78', unit: 'mg/dL', range: [0, 100], history: [110, 100, 92, 84, 78] },
  { name: 'HDL Cholesterol', system: 'Cardiometabolic', status: 'optimal', value: '58', unit: 'mg/dL', range: [40, 90], history: [48, 50, 53, 56, 58] },
  { name: 'Triglycerides', system: 'Cardiometabolic', status: 'normal', value: '128', unit: 'mg/dL', range: [0, 150], history: [160, 150, 142, 135, 128] },
  { name: 'Apolipoprotein B (ApoB)', system: 'Cardiometabolic', status: 'out', value: '112', unit: 'mg/dL', range: [40, 100], history: [105, 108, 110, 111, 112] },
  { name: 'Creatine Kinase (CK)', system: 'Cardiometabolic', status: 'out', value: '340', unit: 'U/L', range: [70, 250], history: [250, 280, 300, 320, 340] },
  { name: 'hs-CRP', system: 'Cardiometabolic', status: 'optimal', value: '0.6', unit: 'mg/L', range: [0, 1], history: [1.4, 1.1, 0.9, 0.7, 0.6] },

  // --- Metabolic ---
  { name: 'Glucose, Fasting', system: 'Metabolic', status: 'normal', value: '96', unit: 'mg/dL', range: [70, 99], history: [104, 101, 99, 97, 96] },
  { name: 'Hemoglobin A1c (HbA1c)', system: 'Metabolic', status: 'normal', value: '5.5', unit: '%', range: [4, 5.6], history: [5.8, 5.7, 5.6, 5.5, 5.5] },
  { name: 'Insulin, Fasting', system: 'Metabolic', status: 'optimal', value: '6.2', unit: 'µIU/mL', range: [2, 8], history: [9, 8, 7.2, 6.6, 6.2] },
  { name: 'Leptin', system: 'Metabolic', status: 'optimal', value: '8.1', unit: 'ng/mL', range: [1, 18], history: [12, 11, 10, 9, 8.1] },

  // --- Liver ---
  { name: 'Alanine Transaminase (ALT)', system: 'Liver', status: 'optimal', value: '24', unit: 'U/L', range: [7, 56], history: [33, 30, 28, 26, 24] },
  { name: 'Aspartate Transaminase (AST)', system: 'Liver', status: 'optimal', value: '22', unit: 'U/L', range: [8, 48], history: [30, 28, 26, 24, 22] },
  { name: 'Albumin', system: 'Liver', status: 'optimal', value: '4.6', unit: 'g/dL', range: [3.5, 5], history: [4.3, 4.4, 4.5, 4.5, 4.6] },
  { name: 'Total Bilirubin', system: 'Liver', status: 'normal', value: '0.9', unit: 'mg/dL', range: [0.1, 1.2], history: [0.7, 0.8, 0.8, 0.9, 0.9] },

  // --- Kidney ---
  { name: 'Creatinine', system: 'Kidney', status: 'optimal', value: '0.9', unit: 'mg/dL', range: [0.6, 1.3], history: [1.0, 1.0, 0.95, 0.9, 0.9] },
  { name: 'eGFR', system: 'Kidney', status: 'optimal', value: '104', unit: 'mL/min', range: [90, 120], history: [96, 98, 100, 102, 104] },
  { name: 'Uric Acid', system: 'Kidney', status: 'out', value: '7.4', unit: 'mg/dL', range: [3.5, 7.2], history: [6.8, 7.0, 7.1, 7.3, 7.4] },
  { name: 'Blood Urea Nitrogen (BUN)', system: 'Kidney', status: 'normal', value: '15', unit: 'mg/dL', range: [7, 20], history: [18, 17, 16, 15, 15] },

  // --- Thyroid ---
  { name: 'TSH', system: 'Thyroid', status: 'optimal', value: '1.8', unit: 'mIU/L', range: [0.4, 4], history: [2.6, 2.3, 2.1, 1.9, 1.8] },
  { name: 'Free T4', system: 'Thyroid', status: 'optimal', value: '1.2', unit: 'ng/dL', range: [0.8, 1.8], history: [1.0, 1.1, 1.1, 1.2, 1.2] },
  { name: 'Free T3', system: 'Thyroid', status: 'normal', value: '3.1', unit: 'pg/mL', range: [2.3, 4.2], history: [2.8, 2.9, 3.0, 3.0, 3.1] },

  // --- Hormones ---
  { name: 'Testosterone, Total', system: 'Hormones', status: 'normal', value: '540', unit: 'ng/dL', range: [300, 1000], history: [470, 490, 510, 525, 540] },
  { name: 'Cortisol, AM', system: 'Hormones', status: 'optimal', value: '14', unit: 'µg/dL', range: [6, 18], history: [19, 17, 16, 15, 14] },
  { name: 'Vitamin D, 25-OH', system: 'Hormones', status: 'out', value: '22', unit: 'ng/mL', range: [30, 80], history: [18, 19, 20, 21, 22] },

  // --- Energy & Blood ---
  { name: 'Ferritin', system: 'Energy & Blood', status: 'normal', value: '95', unit: 'ng/mL', range: [30, 300], history: [70, 78, 84, 90, 95] },
  { name: 'Vitamin B12', system: 'Energy & Blood', status: 'optimal', value: '610', unit: 'pg/mL', range: [200, 900], history: [420, 480, 540, 580, 610] },
  { name: 'Hemoglobin', system: 'Energy & Blood', status: 'optimal', value: '15.1', unit: 'g/dL', range: [13.5, 17.5], history: [14.2, 14.5, 14.8, 15, 15.1] },
]

export const STATUS_META = {
  optimal: { label: 'Optimal', color: '#3a9c63' },
  normal: { label: 'Normal', color: '#d8a93a' },
  out: { label: 'Out of Range', color: '#d56aa6' },
}
