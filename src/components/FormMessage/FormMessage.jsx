import './FormMessage.css'

export default function FormMessage({ tone = 'success', children }) {
  if (!children) return null
  return (
    <p className={`form-message form-message--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  )
}
