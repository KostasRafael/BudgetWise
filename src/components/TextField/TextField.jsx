import { useId } from 'react'
import './TextField.css'

export default function TextField({ label, icon, prefix, className = '', ...inputProps }) {
  const id = useId()

  return (
    <div className="text-field">
      {label && (
        <label className="text-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`text-field__box ${prefix ? 'text-field__box--prefixed' : ''}`}>
        {icon && <img className="text-field__icon" src={icon} alt="" width="16" height="16" />}
        {prefix && <span className="text-field__prefix">{prefix}</span>}
        <input className={`text-field__input ${className}`.trim()} id={id} {...inputProps} />
      </div>
    </div>
  )
}
