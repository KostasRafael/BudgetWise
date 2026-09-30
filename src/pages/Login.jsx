import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import AuthPrompt from '../components/AuthPrompt/AuthPrompt.jsx'
import LoginForm from '../components/LoginForm/LoginForm.jsx'
import { login } from '../api/auth.js'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const { signedUpEmail, sessionExpired, from } = location.state ?? {}
  let notice = null
  if (signedUpEmail) notice = 'Account created. Log in to continue.'
  else if (sessionExpired) notice = 'Your session has expired. Please log in again.'

  async function handleSubmit({ email, password }) {
    setError(null)
    setSubmitting(true)
    try {
      await login({ email: email.trim(), password })
      navigate(from ?? '/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      navAction={<AuthPrompt prompt="New to BudgetWise?" linkText="Sign Up" to="/signup" />}
    >
      <LoginForm
        onSubmit={handleSubmit}
        error={error}
        notice={notice}
        submitting={submitting}
        defaultEmail={signedUpEmail}
      />
    </AuthLayout>
  )
}
