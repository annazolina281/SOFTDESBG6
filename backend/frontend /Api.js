// src/api.js
// In development, Vite proxies /api/* to localhost:5000 automatically.
// In production, set VITE_API_URL to your Render backend URL in Vercel's
// environment variables, e.g. https://softdesbg6.onrender.com
//
// All fetch calls in the app use API() so the base URL is managed here.

const BASE = import.meta.env.VITE_API_URL || ''

export const API = (path) => `${BASE}${path}`
