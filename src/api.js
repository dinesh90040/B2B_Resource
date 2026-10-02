export const API_BASE = '/api'
export const getAuthToken = () => 'demo-admin.demo@campus.edu' // Using demo bypass for now

export async function fetchApi(endpoint, options = {}) {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer demo-admin.demo@campus.edu` } : {}), // Hardcoding the valid demo prefix that the backend expects
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    let error
    try {
      error = await res.json()
    } catch {
      error = {}
    }
    throw new Error(error?.error?.message || `API error: ${res.statusText}`)
  }
  return res.json()
}
