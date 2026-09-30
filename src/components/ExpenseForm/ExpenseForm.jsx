import { useEffect, useId, useRef } from 'react'
import Panel from '../Panel/Panel.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import { parseAmount } from '../../utils/format.js'
import { fromDateInputValue, toDateInputValue } from '../../utils/dates.js'
import userIcon from '../../assets/icons/user.svg'
import tagIcon from '../../assets/icons/tag.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import './ExpenseForm.css'

export default function ExpenseForm({ date, onDateChange, focusRequest, categories = [], onAddExpense }) {
  const descriptionRef = useRef(null)
  const categoryListId = useId()

  // Focus the description whenever a day's "+ Add" button asks for it.
  useEffect(() => {
    if (focusRequest) descriptionRef.current?.focus()
  }, [focusRequest])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const { description, category, amount } = Object.fromEntries(new FormData(form))
    const parsedAmount = parseAmount(amount)
    if (!description.trim() || parsedAmount === null) return

    const day = fromDateInputValue(date)
    if (day) day.setHours(12)

    onAddExpense({
      description: description.trim(),
      category: category.trim() || 'Uncategorized',
      amount: parsedAmount,
      date: day ?? new Date(),
    })
    form.reset()
    onDateChange(toDateInputValue(new Date()))
  }

  return (
    <Panel
      as="form"
      title="Add New Expense"
      subtitle="Post transactions to instantly sync dashboard totals."
      onSubmit={handleSubmit}
    >
      <div className="expense-form__fields">
        <TextField
          ref={descriptionRef}
          label="Product/Description"
          icon={userIcon}
          name="description"
          placeholder="e.g. AWS Cloud Server"
          autoComplete="off"
          required
        />
        <TextField
          label="Category"
          icon={tagIcon}
          name="category"
          placeholder="e.g. Entertainment"
          autoComplete="off"
          list={categoryListId}
        />
        {/* Suggests categories already in use; any new value is allowed too. */}
        <datalist id={categoryListId}>
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
        <TextField
          label="Date"
          icon={calendarIcon}
          name="date"
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          onClick={(event) => {
            try {
              event.currentTarget.showPicker()
            } catch {
              // Older browsers: fall back to typing the date.
            }
          }}
          className={date ? '' : 'is-empty'}
        />
        <TextField
          label="Amount"
          icon={userIcon}
          name="amount"
          inputMode="decimal"
          placeholder="e.g. 120.00"
          autoComplete="off"
          required
        />
      </div>
      <Button type="submit" block>
        Add Expense
      </Button>
    </Panel>
  )
}
