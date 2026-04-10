// ============================================================
// FILE: src/components/Sidebar.jsx
// ============================================================
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard',    to: '/dashboard' },
  { label: 'Videos',       to: '/videos' },
  { label: 'CCTV Feeds',   to: '/cctv-feeds' },
  { label: 'Live Streams', to: '/live-streams' },
  { label: 'Settings',     to: '/settings' },
]

const sidebarStyle = {
  width: '220px',
  minWidth: '220px',
  background: '#ffffff',
  borderRight: '1px solid #e2e4e9',
  padding: '8px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}

const linkBase = {
  display: 'block',
  padding: '10px 20px',
  borderRadius: '6px',
  margin: '0 8px',
  color: '#4b5563',
  fontWeight: '500',
  transition: 'background 0.15s, color 0.15s',
}

export default function Sidebar() {
  return (
    <aside style={sidebarStyle}>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? '#1a1a2e' : 'transparent',
            color: isActive ? '#ffffff' : '#4b5563',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  )
}