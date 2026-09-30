import { request } from './client.js'

/** Date -> "YYYY-MM" in local time, the key the budgets API uses for a month. */
export function toMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

// The API returns { month, amount, ... }; a month with no budget yet has amount 0.
export async function fetchBudget(month, { signal } = {}) {
  const data = await request(`/budgets/${month}`, { signal })
  return Number(data?.amount ?? 0)
}

/** Creates or updates the budget for `month`. */
export async function saveBudget(month, amount) {
  const data = await request(`/budgets/${month}`, { method: 'PUT', body: JSON.stringify({ amount }) })
  return Number(data?.amount ?? amount)
}
