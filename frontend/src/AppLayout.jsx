// ============================================================
// FILE: src/components/AppLayout.jsx
// ============================================================
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: '#f4f5f7',
}

const bodyStyle = {
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
}

const contentStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '28px',
}

export default function AppLayout({ children }) {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <div style={bodyStyle}>
        <Sidebar />
        <main style={contentStyle}>
          {children}
        </main>
      </div>
    </div>
  )
}