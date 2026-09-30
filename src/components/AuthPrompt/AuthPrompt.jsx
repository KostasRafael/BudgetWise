import { Link } from 'react-router'
import './AuthPrompt.css'

export default function AuthPrompt({ prompt, linkText, to, variant = 'nav' }) {
  return (
    <p className={`auth-prompt auth-prompt--${variant}`}>
      {prompt}{' '}
      <Link className="auth-prompt__link" to={to}>
        {linkText}
      </Link>
    </p>
  )
}
