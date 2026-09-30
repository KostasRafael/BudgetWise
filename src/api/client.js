// Requests go to /api, which is proxied to the backend: by Vite in dev (vite.config.js)
// and by Netlify in production (public/_redirects). Keeping the API on the same site is
// what lets the sameSite: 'lax' auth cookie be sent, so leave VITE_API_URL unset in production.
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    // Send the JWT cookie the server set at login, even when the API is on another origin.
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })

  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    // Prefer the server's own message, e.g. { message: 'Email already in use' }.
    const error = new Error(data?.message ?? data?.error ?? `Request failed: ${response.status} ${response.statusText}`)
    error.status = response.status
    throw error
  }
  return data
}
