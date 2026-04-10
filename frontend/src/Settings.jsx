// ============================================================
// FILE: src/pages/Settings.jsx
// ============================================================
import AppLayout from './AppLayout'

const pageTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '20px',
}

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e4e9',
  borderRadius: '10px',
  padding: '20px',
  maxWidth: '500px',
}

const labelStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '6px',
  textTransform: 'uppercase',
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  marginBottom: '16px',
  background: '#fafafa',
}

const btnStyle = {
  padding: '10px 18px',
  background: '#1a1a2e',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
}

export default function Settings() {
  return (
    <AppLayout>
      <p style={pageTitleStyle}>Settings</p>

      <div style={cardStyle}>
        <label style={labelStyle}>Brand Name</label>
        <input style={inputStyle} placeholder="Spothole" />

        <label style={labelStyle}>Location</label>
        <input style={inputStyle} placeholder="Brgy. Sample" />

        <button style={btnStyle}>Save Changes</button>
      </div>
    </AppLayout>
  )
}