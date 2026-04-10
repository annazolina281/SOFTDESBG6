// ============================================================
// FILE: src/pages/Register.jsx
// ============================================================
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f4f5f7',
}

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e4e9',
  borderRadius: '12px',
  padding: '40px 36px',
  width: '100%',
  maxWidth: '420px',
}

const headingStyle = {
  fontSize: '22px',
  fontWeight: '700',
  color: '#1a1a2e',
  textAlign: 'center',
  marginBottom: '4px',
}

const subheadingStyle = {
  fontSize: '13px',
  color: '#6b7280',
  textAlign: 'center',
  marginBottom: '28px',
}

const sectionLabelStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '14px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e2e4e9',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#1a1a2e',
  background: '#fafafa',
  outline: 'none',
  marginBottom: '16px',
  transition: 'border-color 0.15s',
}

const primaryBtnStyle = {
  width: '100%',
  padding: '11px',
  background: '#1a1a2e',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: '4px',
  transition: 'background 0.15s',
}

const loginLinkStyle = {
  display: 'block',
  textAlign: 'center',
  fontSize: '13px',
  color: '#1a1a2e',
  fontWeight: '500',
  marginTop: '20px',
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', lguName: ''
  })

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const fields = [
    { label: 'Full Name',        field: 'fullName',         type: 'text',     placeholder: 'Juan Dela Cruz' },
    { label: 'Email',            field: 'email',            type: 'email',    placeholder: 'you@example.com' },
    { label: 'Password',         field: 'password',         type: 'password', placeholder: '••••••••' },
    { label: 'Confirm Password', field: 'confirmPassword',  type: 'password', placeholder: '••••••••' },
    { label: 'LGU / BRGY Name',  field: 'lguName',          type: 'text',     placeholder: 'Brgy. Sample, City' },
  ]

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Spothole</h1>
        <p style={subheadingStyle}>Create an account</p>

        <p style={sectionLabelStyle}>Account Details</p>

        <form onSubmit={handleRegister}>
          {fields.map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label style={labelStyle}>{label}</label>
              <input
                style={inputStyle}
                type={type}
                placeholder={placeholder}
                value={form[field]}
                onChange={handleChange(field)}
                onFocus={e => e.target.style.borderColor = '#1a1a2e'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
                required
              />
            </div>
          ))}

          <button
            style={primaryBtnStyle}
            type="submit"
            onMouseOver={e => e.target.style.background = '#2d2d4e'}
            onMouseOut={e => e.target.style.background = '#1a1a2e'}
          >
            Create Account
          </button>
        </form>

        <Link to="/login" style={loginLinkStyle}>
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}