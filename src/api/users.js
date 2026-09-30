import { request } from './client.js'
import { getCurrentUser, saveCurrentUser } from './auth.js'

// Both routes act on the logged-in user, identified by the JWT cookie.
const PROFILE_PATH = '/users/me'
const PASSWORD_PATH = '/users/me/password'

export async function updateProfile({ name, email }) {
  const data = await request(PROFILE_PATH, { method: 'PATCH', body: JSON.stringify({ name, email }) })
  // Keep the header in sync, even if the server only replies with a message.
  const user = { ...getCurrentUser(), name, email, ...(data?.user ?? {}) }
  saveCurrentUser(user)
  return user
}

export async function changePassword({ currentPassword, newPassword }) {
  await request(PASSWORD_PATH, {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  })
}
