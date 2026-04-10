// ============================================================
// FILE: src/components/Navbar.jsx (UPDATED BRAND + LOCATION)
// ============================================================
import { useNavigate } from 'react-router-dom'

export default function Navbar({ location = 'Brgy. Sample', brand = 'Spothole' }) {
  const navigate = useNavigate()

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '56px',
      padding: '0 28px',
      background: '#fff',
      borderBottom: '1px solid #e2e4e9'
    }}>
      <span style={{ fontWeight: '700' }}>{brand}</span>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span>{location}</span>
        <button
          onClick={() => navigate('/login')}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '5px 12px',
            cursor: 'pointer'
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  )
}