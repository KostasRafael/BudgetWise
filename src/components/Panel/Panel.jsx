import Card from '../Card/Card.jsx'
import './Panel.css'

export default function Panel({ title, subtitle, action, size = 'md', gap = 24, children, ...props }) {
  return (
    <Card className={`panel panel--${size}`} style={{ gap }} {...props}>
      <div className="panel__header">
        <div className="panel__heading">
          <h2 className="panel__title">{title}</h2>
          <p className="panel__subtitle">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </Card>
  )
}
