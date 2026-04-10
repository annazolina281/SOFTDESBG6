// ============================================================
// FILE: src/pages/Videos.jsx
// ============================================================
import { useState } from 'react'
import AppLayout from './AppLayout'

const pageTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1a1a2e',
  marginBottom: '20px',
}

const uploadZoneStyle = {
  border: '2px dashed #d1d5db',
  borderRadius: '10px',
  background: '#ffffff',
  padding: '40px 20px',
  textAlign: 'center',
  marginBottom: '20px',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s',
}

const uploadTextStyle = {
  color: '#6b7280',
  fontSize: '14px',
  marginBottom: '4px',
}

const uploadSubStyle = {
  color: '#9ca3af',
  fontSize: '12px',
  marginBottom: '16px',
}

const browseBtnStyle = {
  padding: '8px 22px',
  background: '#1a1a2e',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
}

const toolbarStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '12px',
}

const searchInputStyle = {
  flex: 1,
  padding: '9px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#1a1a2e',
  background: '#ffffff',
  outline: 'none',
}

const filterBtnStyle = {
  padding: '9px 18px',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: '500',
  color: '#374151',
  cursor: 'pointer',
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

const columns = ['Filename', 'Type', 'Uploaded', 'Status', 'Action']

export default function Videos() {
  const [search, setSearch] = useState('')
  const [dragOver, setDragOver] = useState(false)

  return (
    <AppLayout>
      <p style={pageTitleStyle}>Video / Image Upload</p>

      <div
        style={{
          ...uploadZoneStyle,
          borderColor: dragOver ? '#1a1a2e' : '#d1d5db',
          background: dragOver ? '#f0f0f5' : '#ffffff',
        }}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false) }}
      >
        <p style={uploadTextStyle}>Drag and drop video or image here</p>
        <p style={uploadSubStyle}>.mp4, .avi, .jpg, .png accepted</p>
        <button style={browseBtnStyle}>Browse Files</button>
      </div>

      <div style={toolbarStyle}>
        <input
          style={searchInputStyle}
          type="text"
          placeholder="Search video..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#1a1a2e'}
          onBlur={e => e.target.style.borderColor = '#d1d5db'}
        />
        <button style={filterBtnStyle}>Filter</button>
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
          <tr>
            <td colSpan={5} style={emptyRowStyle}>
              No files uploaded yet.
            </td>
          </tr>
        </tbody>
      </table>
    </AppLayout>
  )
}