import { request } from './client.js'

const BASE = '/expenses'

// The API uses `title`; the UI uses `description`.
function fromApi({ id, _id, user, title, amount, category, date }) {
  return { id: id ?? _id, user, description: title, amount: Number(amount), category, date: new Date(date) }
}

// Accept either the bare record(s) or a wrapper like { expenses: [...] } / { expense: {...} }.
function unwrap(data, key) {
  return data?.[key] ?? data?.data ?? data
}

function toApi({ description, amount, category, date }) {
  const body = { title: description, amount, category }
  if (date) body.date = date.toISOString()
  return body
}

export async function fetchTransactions({ signal } = {}) {
  const data = await request(BASE, { signal })
  return unwrap(data, 'expenses').map(fromApi)
}

export async function createTransaction(transaction) {
  const data = await request(BASE, { method: 'POST', body: JSON.stringify(toApi(transaction)) })
  return fromApi(unwrap(data, 'expense'))
}

export async function updateTransaction(id, updates) {
  const data = await request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(toApi(updates)) })
  return fromApi(unwrap(data, 'expense'))
}

export async function deleteTransaction(id) {
  await request(`${BASE}/${id}`, { method: 'DELETE' })
}
