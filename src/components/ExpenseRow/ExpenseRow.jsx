import { useState } from 'react'
import Button from '../Button/Button.jsx'
import { formatCurrency, parseAmount } from '../../utils/format.js'
import './ExpenseRow.css'

export default function ExpenseRow({ transaction, isLarge, onSave, onDelete }) {
  const [editing, setEditing] = useState(false)

  function handleSave(event) {
    event.preventDefault()
    const { description, category, amount } = Object.fromEntries(new FormData(event.currentTarget))
    const parsedAmount = parseAmount(amount)
    if (!description.trim() || parsedAmount === null) return
    onSave({
      description: description.trim(),
      category: category.trim() || 'Uncategorized',
      amount: parsedAmount,
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <form
        className="expense-row expense-row--editing"
        onSubmit={handleSave}
        onKeyDown={(event) => event.key === 'Escape' && setEditing(false)}
      >
        <input
          className="expense-row__input expense-row__input--description"
          name="description"
          defaultValue={transaction.description}
          aria-label="Description"
          autoFocus
          required
        />
        <input
          className="expense-row__input expense-row__input--category"
          name="category"
          defaultValue={transaction.category}
          aria-label="Category"
        />
        <input
          className="expense-row__input expense-row__input--amount"
          name="amount"
          inputMode="decimal"
          defaultValue={transaction.amount.toFixed(2)}
          aria-label="Amount"
          required
        />
        <div className="expense-row__actions">
          <Button type="submit" variant="soft-success" size="tiny">
            Save
          </Button>
          <Button variant="subtle" size="tiny" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="expense-row">
      <div className="expense-row__text">
        <span className="expense-row__description">{transaction.description}</span>
        <span className="expense-row__category">{transaction.category}</span>
      </div>
      <span className={`expense-row__amount ${isLarge ? 'is-large' : ''}`}>
        {formatCurrency(transaction.amount)}
      </span>
      <div className="expense-row__actions">
        <Button variant="subtle" size="tiny" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <Button variant="soft-danger" size="tiny" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}
