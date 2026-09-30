import { useState } from 'react'
import { useNavigate } from 'react-router'
import AuthLayout from '../components/AuthLayout/AuthLayout.jsx'
import AuthPrompt from '../components/AuthPrompt/AuthPrompt.jsx'
import SignupForm from '../components/SignupForm/SignupForm.jsx'
import { signup } from '../api/auth.js'

export default function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit({ fullName, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setError(null)
    setSubmitting(true)
    try {
      await signup({ name: fullName.trim(), email: email.trim(), password })
      navigate('/login', { state: { signedUpEmail: email.trim() } })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      navAction={<AuthPrompt prompt="Already have an account?" linkText="Log In" to="/login" />}
    >
      <SignupForm onSubmit={handleSubmit} error={error} submitting={submitting} />
    </AuthLayout>
  )
}
