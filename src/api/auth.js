import { request } from './client.js'

// The JWT lives in an httpOnly cookie that JavaScript can't read. We keep the
// logged-in user here so the UI knows who is signed in; the server still checks
// the cookie on every request and answers 401 when it's missing or expired.
const USER_KEY = 'budgetwise.user'

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return Boolean(getCurrentUser())
}

/** Remember the logged-in user, e.g. after login or a profile update. */
export function saveCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/** Forget the user locally, e.g. after the server rejects the cookie. */
export function clearSession() {
  localStorage.removeItem(USER_KEY)
}

// Creates the account only; the user logs in afterwards.
export async function signup({ name, email, password }) {
  const data = await request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  return data?.user
}

export async function login({ email, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const user = data?.user ?? { email }
  saveCurrentUser(user)
  return user
}

/** Asks the server to clear the cookie, then forgets the user locally. */
export async function logout() {
  try {
    await request('/auth/logout', { method: 'POST' })
  } finally {
    clearSession()
  }
}
