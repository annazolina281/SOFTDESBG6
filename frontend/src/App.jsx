// ============================================================
// FILE: src/App.jsx (UPDATED ROUTES)
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import CCTVFeeds from "./CCTVFeeds";
import LiveStreams from "./LiveStreams";
import Settings from "./Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/cctv-feeds" element={<CCTVFeeds />} />
        <Route path="/live-streams" element={<LiveStreams />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}