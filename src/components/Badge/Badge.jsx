import './Badge.css'

export default function Badge({ tone = 'success', size = 'md', children }) {
  return <span className={`badge badge--${size} badge--${tone}`}>{children}</span>
}
