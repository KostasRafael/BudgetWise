import AuthCard from '../AuthCard/AuthCard.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import AuthPrompt from '../AuthPrompt/AuthPrompt.jsx'
import mailIcon from '../../assets/icons/mail.svg'
import lockIcon from '../../assets/icons/lock.svg'
import './LoginForm.css'

export default function LoginForm({ onSubmit, error, notice, submitting, defaultEmail }) {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Securely access your financial control board."
      width={450}
      onSubmit={onSubmit}
      error={error}
      notice={notice}
      footer={
        <AuthPrompt
          variant="inline"
          prompt="Don't have an account?"
          linkText="Sign up"
          to="/signup"
        />
      }
    >
      <div className="auth-card__fields">
        <TextField
          label="Email Address"
          icon={mailIcon}
          name="email"
          type="email"
          placeholder="john@example.com"
          defaultValue={defaultEmail}
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          icon={lockIcon}
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          autoFocus={Boolean(defaultEmail)}
          required
        />
        <div className="login-form__forgot">
          <a href="#forgot-password">Forgot password?</a>
        </div>
      </div>

      <Button type="submit" block disabled={submitting}>
        {submitting ? 'Logging In…' : 'Log In'}
      </Button>
    </AuthCard>
  )
}
