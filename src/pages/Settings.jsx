import { Link, useNavigate } from 'react-router'
import Navbar from '../components/Navbar/Navbar.jsx'
import UserProfile from '../components/UserProfile/UserProfile.jsx'
import Button from '../components/Button/Button.jsx'
import ProfileForm from '../components/ProfileForm/ProfileForm.jsx'
import PasswordForm from '../components/PasswordForm/PasswordForm.jsx'
import { clearSession, getCurrentUser, logout } from '../api/auth.js'
import { changePassword, updateProfile } from '../api/users.js'
import './Settings.css'

export default function Settings() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Still leave the page; the local session is already cleared.
    }
    navigate('/login', { replace: true })
  }

  // Wraps an API call so an expired session sends the user back to log in.
  function withSessionCheck(apiCall) {
    return async (values) => {
      try {
        return await apiCall(values)
      } catch (err) {
        if (err.status === 401) {
          clearSession()
          navigate('/login', { replace: true, state: { sessionExpired: true, from: '/settings' } })
        }
        throw err
      }
    }
  }

  return (
    <div className="settings">
      <Navbar>
        {/* Baseline alignment puts the link on the same line as the user's name. */}
        <div className="settings__account">
          <Link className="settings__back" to="/dashboard">
            Back to dashboard
          </Link>
          <UserProfile name={user?.name ?? user?.email ?? 'My Account'} />
        </div>
        <Button variant="subtle" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar>

      <main className="settings__content">
        <div className="settings__heading">
          <h1 className="settings__title">Account Settings</h1>
          <p className="settings__subtitle">Manage your personal details and password.</p>
        </div>
        <ProfileForm user={user} onSave={withSessionCheck(updateProfile)} />
        <PasswordForm onSave={withSessionCheck(changePassword)} />
      </main>
    </div>
  )
}
