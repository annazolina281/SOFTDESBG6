// ============================================================
// FILE: src/pages/CCTVFeeds.jsx
// ============================================================
import { useState } from 'react'
import AppLayout from './AppLayout'

const pageTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '20px',
}

const headerRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '14px',
}

const sectionTitleStyle = {
  fontSize: '15px',
  fontWeight: '600',
  color: '#1a1a2e',
}

const addBtnStyle = {
  padding: '8px 18px',
  background: '#1a1a2e',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
}

const formCardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e4e9',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
}

const formTitleStyle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '14px',
}

const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
}

const inputStyle = {
  padding: '9px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#1a1a2e',
  background: '#fafafa',
  outline: 'none',
  width: '100%',
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  background: '#ffffff',
  borderRadius: '10px',
  overflow: 'hidden',
  border: '1px solid #e2e4e9',
}

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '11px',
  fontWeight: '700',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  background: '#f9fafb',
  borderBottom: '1px solid #e2e4e9',
}

const emptyRowStyle = {
  padding: '40px 16px',
  textAlign: 'center',
  color: '#9ca3af',
  fontSize: '13px',
}

const columns = ['ID', 'Name', 'Location', 'IP Address', 'Status', 'Action']

const formFields = [
  { placeholder: 'Camera Name', field: 'name' },
  { placeholder: 'Location',    field: 'location' },
  { placeholder: 'Stream URL',  field: 'streamUrl' },
  { placeholder: 'IP Address',  field: 'ipAddress' },
]

export default function CCTVFeeds() {
  const [form, setForm] = useState({ name: '', location: '', streamUrl: '', ipAddress: '' })
  const [cameras, setCameras] = useState([])

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleAdd = () => {
    if (!form.name || !form.ipAddress) return
    setCameras([...cameras, { ...form, id: cameras.length + 1, status: 'Online' }])
    setForm({ name: '', location: '', streamUrl: '', ipAddress: '' })
  }

  return (
    <AppLayout>
      <div style={headerRowStyle}>
        <p style={pageTitleStyle}>CCTV Cameras</p>
        <button
          style={addBtnStyle}
          onMouseOver={e => e.target.style.background = '#2d2d4e'}
          onMouseOut={e => e.target.style.background = '#1a1a2e'}
          onClick={handleAdd}
        >
          + Add Camera
        </button>
      </div>

      <div style={formCardStyle}>
        <p style={formTitleStyle}>Add new CCTV feed</p>
        <div style={formGridStyle}>
          {formFields.map(({ placeholder, field }) => (
            <input
              key={field}
              style={inputStyle}
              type="text"
              placeholder={placeholder}
              value={form[field]}
              onChange={handleChange(field)}
              onFocus={e => e.target.style.borderColor = '#1a1a2e'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
          ))}
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={thStyle}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cameras.length === 0 ? (
            <tr>
              <td colSpan={6} style={emptyRowStyle}>
                No cameras added yet.
              </td>
            </tr>
          ) : (
            cameras.map(cam => (
              <tr key={cam.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{cam.id}</td>
                <td style={{ padding: '12px 16px' }}>{cam.name}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{cam.location}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{cam.ipAddress}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                    {cam.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button style={{ background: 'none', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => setCameras(cameras.filter(c => c.id !== cam.id))}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AppLayout>
  )
}