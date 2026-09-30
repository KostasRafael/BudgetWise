import { useState } from 'react'
import Panel from '../Panel/Panel.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import { parseAmount } from '../../utils/format.js'
import './BudgetForm.css'

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

export default function BudgetForm({ budget, monthLabel, disabled = false, onSetBudget }) {
  const [value, setValue] = useState(budget > 0 ? numberFormatter.format(budget) : '')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const amount = parseAmount(value)
    if (amount === null) return
    setSaving(true)
    try {
      await onSetBudget(amount)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Panel
      as="form"
      title="Set Monthly Budget"
      subtitle={monthLabel ? `Your spending threshold for ${monthLabel}.` : 'Establish your visual spending threshold.'}
      gap={20}
      onSubmit={handleSubmit}
    >
      <div className="budget-form__row">
        <TextField
          aria-label="Monthly budget"
          prefix="$"
          inputMode="decimal"
          placeholder="e.g. 3,000"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled || saving}
          required
        />
        <Button type="submit" size="compact" disabled={disabled || saving}>
          {saving ? 'Saving…' : 'Set Budget'}
        </Button>
      </div>
    </Panel>
  )
}
