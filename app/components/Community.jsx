'use client'

import { useReveal } from '../hooks/hooks.js'

export default function Community() {
  const ref = useReveal()
  return (
    <section className="community section" id="community" ref={ref}>
      <div className="container">
        <div className="community-head reveal">
          <span className="eyebrow">The Architecture of Health</span>
          <h2 style={{ marginTop: 14 }}>Clinical mastery meets computation.</h2>
          <p>
            True preventative health requires clinical mastery powered by kinetic data intelligence.
          </p>
        </div>
        <div className="founder reveal" style={{ backgroundImage: 'url(/assets/team/manthan.jpg)' }}>
          <span className="role">Doctor, MBBS</span>
          <h3>Dr. Manthan Patel</h3>
          <p>Engineering the clinical protocols and intervention models for hyper-personalized longevity.</p>
        </div>
      </div>
    </section>
  )
}
