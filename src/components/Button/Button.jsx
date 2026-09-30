import { Link } from 'react-router'
import './Button.css'

export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  to,
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${block ? 'btn--block' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim()

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}
