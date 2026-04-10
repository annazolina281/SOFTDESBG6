// ============================================================
// FILE: src/pages/Dashboard.jsx (UPDATED LABELS FROM PDF)
// ============================================================
import AppLayout from './AppLayout'

export default function Dashboard() {
  return (
    <AppLayout>
      <h2>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {['Total Today', 'Critical', 'High', 'Cameras Online'].map(label => (
          <div key={label} style={{ padding: '16px', background: '#fff', border: '1px solid #ddd' }}>
            <p>{label}</p>
            <h2>—</h2>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', marginTop: '20px', gap: '16px' }}>
        <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
          CCTV Location
        </div>

        <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd' }}>
          <h4>Recent Detection</h4>
          <p>Cam1</p>
          <p>Cam2</p>
          <p>Cam3</p>
        </div>
      </div>
    </AppLayout>
  )
}