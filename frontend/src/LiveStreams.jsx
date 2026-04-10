// ============================================================
// FILE: src/pages/LiveStreams.jsx (UPDATED TITLES)
// ============================================================
import { useState } from 'react'
import AppLayout from './AppLayout'

export default function LiveStreams() {
  const [active, setActive] = useState('Camera 1')

  return (
    <AppLayout>
      <h2>Live Monitoring</h2>

      <div style={{ marginBottom: '10px' }}>
        {['Camera 1', 'Camera 2', 'Camera 3'].map(cam => (
          <button key={cam} onClick={() => setActive(cam)}>
            {cam}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
          Live CCTV feed — {active}
        </div>

        <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
          <h4>History</h4>
          <p>No detections recorded.</p>
        </div>
      </div>
    </AppLayout>
  )
}