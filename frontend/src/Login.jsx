// ============================================================
// FILE: src/pages/Login.jsx
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
  maxWidth: '400px',
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

const forgotStyle = {
  display: 'block',
  textAlign: 'right',
  fontSize: '12px',
  color: '#6b7280',
  marginBottom: '16px',
  cursor: 'pointer',
}

const dividerStyle = {
  textAlign: 'center',
  fontSize: '12px',
  color: '#9ca3af',
  margin: '20px 0',
}

const registerLinkStyle = {
  display: 'block',
  textAlign: 'center',
  fontSize: '13px',
  color: '#1a1a2e',
  fontWeight: '500',
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

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Spothole</h1>
        <p style={subheadingStyle}>Sign in to your account</p>

        <p style={sectionLabelStyle}>Credentials</p>

        <form onSubmit={handleLogin}>
          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#1a1a2e'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
            required
          />

          <label style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#1a1a2e'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
            required
          />

          <span style={forgotStyle}>Forgot password?</span>

          <button
            style={primaryBtnStyle}
            type="submit"
            onMouseOver={e => e.target.style.background = '#2d2d4e'}
            onMouseOut={e => e.target.style.background = '#1a1a2e'}
          >
            Sign In
          </button>
        </form>

        <div style={dividerStyle}>— or —</div>

        <Link to="/register" style={registerLinkStyle}>
          Create an account
        </Link>
      </div>
    </div>
  )
}