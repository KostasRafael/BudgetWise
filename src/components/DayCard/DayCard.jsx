import Card from '../Card/Card.jsx'
import Button from '../Button/Button.jsx'
import ExpenseRow from '../ExpenseRow/ExpenseRow.jsx'
import { formatCurrency } from '../../utils/format.js'
import { formatDayLabel, formatDaySublabel } from '../../utils/dates.js'
import './DayCard.css'

export default function DayCard({ day, transactions, isLarge, onAdd, onUpdate, onDelete }) {
  const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  return (
    <Card className="day-card">
      <div className="day-card__header">
        <div className="day-card__heading">
          <span className="day-card__date">{formatDayLabel(day)}</span>
          <span className="day-card__weekday">{formatDaySublabel(day)}</span>
        </div>
        <Button variant="soft-success" size="tiny" onClick={onAdd}>
          + Add
        </Button>
      </div>

      <div className="day-card__subtotal">
        <span className="day-card__subtotal-label">Daily total</span>
        <span className="day-card__subtotal-value">{formatCurrency(total)}</span>
      </div>

      <div className="day-card__expenses">
        {transactions.length === 0 ? (
          <p className="day-card__empty">No expenses logged</p>
        ) : (
          transactions.map((transaction) => (
            <ExpenseRow
              key={transaction.id}
              transaction={transaction}
              isLarge={isLarge(transaction)}
              onSave={(updates) => onUpdate(transaction.id, updates)}
              onDelete={() => onDelete(transaction.id)}
            />
          ))
        )}
      </div>
    </Card>
  )
}
