const dayLabelFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a, b) {
  return startOfDay(a).getTime() === startOfDay(b).getTime()
}

/** The last `count` days, newest first, each at local midnight. */
export function getRecentDays(count, now = new Date()) {
  const today = startOfDay(now)
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(today)
    day.setDate(today.getDate() - i)
    return day
  })
}

/** "Sep 25" */
export function formatDayLabel(day) {
  return dayLabelFormatter.format(day)
}

/** "Today", "Yesterday", or the weekday name. */
export function formatDaySublabel(day, now = new Date()) {
  const today = startOfDay(now)
  const diffDays = Math.round((today - startOfDay(day)) / 86_400_000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return weekdayFormatter.format(day)
}

/** Date -> "YYYY-MM-DD" for <input type="date">, in local time. */
export function toDateInputValue(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** "YYYY-MM-DD" -> Date at local midnight, or null if empty/invalid. */
export function fromDateInputValue(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  if (!match) return null
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}
