import './AuthCard.css'

export default function AuthCard({ title, subtitle, width = 480, onSubmit, error, notice, children, footer }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(Object.fromEntries(new FormData(event.currentTarget)))
  }

  return (
    <form className="auth-card" style={{ maxWidth: width }} onSubmit={handleSubmit}>
      <div className="auth-card__header">
        <h1 className="auth-card__title">{title}</h1>
        <p className="auth-card__subtitle">{subtitle}</p>
      </div>
      {notice && !error && <p className="auth-card__notice">{notice}</p>}
      {error && (
        <p className="auth-card__error" role="alert">
          {error}
        </p>
      )}
      {children}
      {footer && <div className="auth-card__footer">{footer}</div>}
    </form>
  )
}
