import AuthCard from '../AuthCard/AuthCard.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import AuthPrompt from '../AuthPrompt/AuthPrompt.jsx'
import userIcon from '../../assets/icons/user.svg'
import mailIcon from '../../assets/icons/mail.svg'
import lockIcon from '../../assets/icons/lock.svg'

export default function SignupForm({ onSubmit, error, submitting }) {
  return (
    <AuthCard
      title="Create an account"
      subtitle="Get started with BudgetWise free today."
      onSubmit={onSubmit}
      error={error}
      footer={
        <AuthPrompt
          variant="inline"
          prompt="Already have an account?"
          linkText="Log in"
          to="/login"
        />
      }
    >
      <div className="auth-card__fields">
        <TextField
          label="Full Name"
          icon={userIcon}
          name="fullName"
          placeholder="e.g. John Doe"
          autoComplete="name"
          required
        />
        <TextField
          label="Email Address"
          icon={mailIcon}
          name="email"
          type="email"
          placeholder="e.g. john@example.com"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          icon={lockIcon}
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <TextField
          label="Confirm Password"
          icon={lockIcon}
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" block disabled={submitting}>
        {submitting ? 'Creating Account…' : 'Create Account'}
      </Button>
    </AuthCard>
  )
}
