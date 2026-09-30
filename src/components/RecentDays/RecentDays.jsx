import Panel from '../Panel/Panel.jsx'
import Button from '../Button/Button.jsx'
import DayCard from '../DayCard/DayCard.jsx'
import { getRecentDays, isSameDay } from '../../utils/dates.js'
import './RecentDays.css'

const DAY_COUNT = 7

export default function RecentDays({ transactions, isLarge, onAddForDay, onUpdate, onDelete, onExport }) {
  const days = getRecentDays(DAY_COUNT)

  return (
    <Panel
      size="lg"
      title="Last 7 Days"
      subtitle="Daily spend activity with quick add and edit actions"
      action={
        <Button variant="outline" size="xs" onClick={onExport}>
          Export Ledger
        </Button>
      }
    >
      <div className="recent-days__list">
        {days.map((day) => (
          <DayCard
            key={day.getTime()}
            day={day}
            transactions={transactions.filter((transaction) => isSameDay(transaction.date, day))}
            isLarge={isLarge}
            onAdd={() => onAddForDay(day)}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Panel>
  )
}
