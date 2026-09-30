import Card from '../Card/Card.jsx'
import Badge from '../Badge/Badge.jsx'
import './MetricCard.css'

export default function MetricCard({ label, value, valueTone = 'default', tag, tagTone = 'neutral' }) {
  return (
    <Card className="metric-card">
      <p className="metric-card__label">{label}</p>
      <p className={`metric-card__value metric-card__value--${valueTone}`}>{value}</p>
      <Badge size="sm" tone={tagTone}>
        {tag}
      </Badge>
    </Card>
  )
}
